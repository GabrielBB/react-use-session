# `useSession`

React hook to handle session from your browser local storage

## Usage

Import `useSession` from `react-use-session` and pass a function that returns your session object:

```jsx
import { useSession } from 'react-use-session';

 const user = { name: "Gabriel" };
 const { session } = useSession(() => user);

```
You have to tell the hook when it should work, that's why useSession gives you the `login` and `logout` functions:

```jsx
 const { session, login, logout } = useSession(() => user);
```

`login` saves the session object to the browser local storage and return it back. `logout` removes the session object from the local storage and returns `null`. `null` is also the initial value, that's how you know the user is not logged in.

Check this simple app with `login` and `logout` functionality:

```jsx
import React from 'react';
import { useSession } from 'react-use-session';

function App() {

  const user = { name: "Gabriel" };
  const { session, login, logout } = useSession(() => user);

  return (
    <div>
      {
        session ?
          <div>
            <p> You are logged in as: <code>{session.name}</code> </p>
            <button onClick={logout}>Log out</button>
          </div>
          :
          <div>
            <p>No session. Please log in</p>
            <button onClick={login}>Log in</button>
          </div>

      }

    </div>)
}

export default App;
```

This is what this code does:

// Uploading GIF later

### JSON Web Token support

What if you have an API that returns a JSON Web Token after you login. Well, just pass the token string to useSession and it will automatically convert it to a Javascript object for you. This is an example passing an asynchronous callback to useSession:

```jsx
import React from 'react';
import { useSession, SessionType } from 'react-use-session';

export default () => {
  const onLogin = async () => await (await fetch('https://api.com/login')).json().token;

  const { session } = useSession(onLogin, { type: SessionType.JWT, autoLogin: true });
  
  return (session ? <span>{`Token was parsed to an object. User name is: ${session.sub}`}</span> : 'Authenticating...')
}
```

```SessionType.JWT``` tells useSession that the value returned by ```onLogin``` callback will be a Json Web Token so it needs to parse it to a Javascript Object.

```autoLogin``` tells useSession to call your onLogin function from the start, without calling ```login``` function
