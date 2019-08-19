import { useState, useEffect } from './react';
import parseJWT from './util/jwt-parse';

/**
* React hook to handle session from your browser storage
* @param sessionKey This required parameter is used as the browser storage key. This should be a unique string per app. For example your package.json's name value.
* @param keepOnWindowClosed This optional parameter will determine if useSession will work with LocalStorage or SessionStorage. Default value is true, so default storage is LocalStorage
* @returns If there is a session in your browser storage then it will be returned. If there is no session, it will return null.
*/
function useSession(sessionKey: string, keepOnWindowClosed: boolean = true)
  : { session: object | string | null, save: (sessionValue: object | string) => void, saveJWT: (jwt: string) => void, clear: () => void } {

  if (!sessionKey) {
    throw new Error("sessionKey was not provided to useSession hook. Example: useSession('facebook-session')");
  }

  const getStorage = (): Storage => {
    return keepOnWindowClosed ? localStorage : sessionStorage;
  }

  const getStorageValue = () => {
    try {
      const storageValue: string | null = getStorage().getItem(sessionKey);

      if (storageValue != null) {
        // There is a session in the storage already
        try {
          const session = JSON.parse(storageValue);
          return session;
        } catch {
          // Oops... It seems it wasn't an object, returning as String then
          return storageValue;
        }
      }

    } catch {
      // This catch block handles the known issues listed here: https://caniuse.com/#feat=namevalue-storage
      console.warn("useSession could not access the browser storage. Session will be lost when closing browser window")
    }

    return null;
  };

  const [state, setState] = useState<object | string | null>(getStorageValue);

  const save = (sessionValue: object | string) => {

    if (typeof sessionValue == "object" || typeof sessionValue === "string") {
      getStorage().setItem(sessionKey, typeof sessionValue == "object" ? JSON.stringify(sessionValue) : sessionValue);
      setState(sessionValue);
    } else {
      throw new Error("useSession hook only accepts objects or strings as session values");
    }
  }

  const saveJWT = (jwt: string) => {

    let parsedObject: any;

    try {
      parsedObject = parseJWT(jwt);
      parsedObject.token = jwt;
    } catch (ex) {
      throw new Error("Could not parse provided Json Web Token: " + ex);
    }

    save(parsedObject);
  }

  const clear = () => {
    getStorage().removeItem(sessionKey);
    setState(null);
  }

  const syncState = (event) => {
    if (event.key === sessionKey) {
      setState(getStorageValue());
    }
  }

  useEffect(() => {
    window.addEventListener("storage", syncState);
    return () => {
      window.removeEventListener("storage", syncState);
    };
  }, [sessionKey]);

  return { session: state, save, saveJWT, clear };
};

export default useSession;
