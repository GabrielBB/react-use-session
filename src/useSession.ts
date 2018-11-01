import { useState, useEffect } from './react';
import SessionType from './sessionType';
import parseJWT from './util/jwt-parse'

class Parameters {
  type?: SessionType = SessionType.OBJECT;
  autoLogin?: boolean = false;

  constructor(params: Parameters) {
    Object.assign(this, params)
  }
}

const KEY: string = "AUTHORIZATION";

function useSession(onLogin: () => Promise<any>, params: Parameters = new Parameters({}))
  : { session: any, login: () => void, logout: () => void } {

  const initialState = () => {
    try {
      const localStorageValue: string | null = localStorage.getItem(KEY);

      if (localStorageValue != null) {
        // There is a session in the localStorage already

        if (params.type === SessionType.JWT) {
          // It is a Json Web Token, let's parse it
          try {
            return parseJWT(localStorageValue);
          } catch (ex) {
            console.warn("SessionType was specified as JWT but value found in local storage could not be parsed to a JSON Web Token. Clearing session from local storage");
            localStorage.removeItem(KEY);
          }

        }
        else {
          // Session is an object then, let's try to use a simple JSON.parse
          try {
            const session = JSON.parse(localStorageValue);
            return session;
          } catch {
            // Oops... It seems it wasn't an object, returning as String then
            return localStorageValue;
          }
        }

      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
      console.error("useSession could not access the browser local storage. Session will be lost when closing React application")
    }

    return null;
  };

  const [state, setState] = useState(initialState);

  const login = async () => {
    let session = await onLogin();

    if (params.type === SessionType.JWT) {
      try {
        const parsedObject = parseJWT(session);
        localStorage.setItem(KEY, JSON.stringify(session));
        setState(parsedObject);
      } catch (ex) {
        throw new Error("SessionType was specified as JWT but the value couldn't be parsed to a JWT: " + ex);
      }
    } else if (typeof session == "object" || typeof session === "string") {
      localStorage.setItem(KEY, JSON.stringify(session));
      setState(session);
    } else {
      throw new Error("useSession hook only accepts objects or strings as session values");
    }


  }

  const logout = () => {
    localStorage.removeItem(KEY);
    setState(null);
  }

  useEffect(() => {
    if (params.autoLogin && state == null) {
      login();
    }
  }, [params.autoLogin]);

  return { session: state, login, logout };
};

export default useSession;
