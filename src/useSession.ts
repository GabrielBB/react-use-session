import { useState } from './react';
import parseJWT from './util/jwt-parse';

function useSession(localStorageKey : string)
  : { session: object | string | null, save: (sessionValue: object | string) => void, saveJWT: (jwt: string) => void, clear: () => void } {

  if(!localStorageKey) {
    throw new Error("localStorageKey was not provided to useSession hook. Example: useSession('facebook-session')");
  }

  const initialState = () => {
    try {
      const localStorageValue: string | null = localStorage.getItem(localStorageKey);

      if (localStorageValue != null) {
        // There is a session in the localStorage already
        try {
          const session = JSON.parse(localStorageValue);
          return session;
        } catch {
          // Oops... It seems it wasn't an object, returning as String then
          return localStorageValue;
        }
      }

    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
      console.error("useSession could not access the browser local storage. Session will be lost when closing React application")
    }

    return null;
  };

  const [state, setState] = useState<object | string | null>(initialState);

  const save = (sessionValue: object | string) => {

    if (typeof sessionValue == "object" || typeof sessionValue === "string") {
      localStorage.setItem(localStorageKey, JSON.stringify(sessionValue));
      setState(sessionValue);
    } else {
      throw new Error("useSession hook only accepts objects or strings as session values");
    }
  }

  const saveJWT = (jwt: string) => {

    let parsedObject: any;

    try {
      parsedObject = parseJWT(jwt);
    } catch (ex) {
      throw new Error("Could not parse provided Json Web Token: " + ex);
    }

    save(parsedObject);
  }

  const clear = () => {
    localStorage.removeItem(localStorageKey);
    setState(null);
  }

  return { session: state, save, saveJWT, clear };
};

export default useSession;
