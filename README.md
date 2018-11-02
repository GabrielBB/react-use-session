

<div align="center">
  <h1>
    <br/>
    👤
    <br />
    react-use-session
  </h1>
  React hook to handle session from your browser local storage
</div>

## Usage

#### Getting session

Import `useSession` from `react-use-session`

```jsx
import { useSession } from 'react-use-session';

 const { session } = useSession();

```

If there is a session already registered in your browser local storage then it will be returned since your app first render. If there is no session, it will return `null`. 

#### Saving or clearing session

To save a new session object you use the `save` function, to clear the session you use the `clear` function, both functions are given to you by `useSession`.

```jsx
 const { session, save, clear } = useSession();
```

When calling the `clear` function your session will go back to `null`.

#### Auto JSON Web Token Parsing

If you have a string containing a JSON Web Token, instead of calling `save`, you can call `saveJWT`, which will automatically parse the JWT to a Javascript Object, save it in the browser local storage, and return the object back to you.

```jsx
 const { saveJWT } = useSession();
```

#### "Show me an example":

```jsx
import React from 'react';
import { useSession } from 'react-use-session';

function App() {

  const JSON_WEB_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWFjdC11c2Utc2Vzc2lvbi1leGFtcGxlIiwiaWF0IjoxNTQxMDgwMjAwLCJleHAiOjE5MTk3Njg0MDAsImF1ZCI6ImxvY2FsaG9zdDozMDAwIiwic3ViIjoiZ2FicmllbGJiMDMwNkBnbWFpbC5jb20iLCJHaXZlbk5hbWUiOiJHYWJyaWVsIiwiU3VybmFtZSI6IkJhc2lsaW8gQnJpdG8iLCJSb2xlIjoiQ3JlYXRvciJ9.GK23QsdEgMzGmxCwX9CjEg5lbSztZ7C67vKc7L09KgI";

  const { session, saveJWT, clear } = useSession();

  return (
    <div className="App">
      {
        session ?
          <div>
            <p>You are logged in as: <code>{session.GivenName}</code></p>
            <button onClick={clear}>Log out</button>
          </div>
          :
          <div>
            <p>No session. Please log in</p>
            <button onClick={() => saveJWT(JSON_WEB_TOKEN)}>Log in</button>
          </div>

      }

    </div>)
}

export default App;

```

![Screenshot](https://u.cubeupload.com/GabrielBB/reactusesession.gif)
