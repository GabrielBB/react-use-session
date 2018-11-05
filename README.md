<div  align="center">

<h1>

<br/>

👤

<br  />

react-use-session

</h1>

React hook to handle session from your browser storage

</div>

  

## Usage

  

#### Getting session

  

Import `useSession` from `react-use-session` and pass a sessionKey.

  
```jsx

import { useSession } from  'react-use-session';

  

const { session } = useSession('my-app');

  

```

  

If that key is found in your browser storage then its value will be returned as `session` since your app first render. If not, the returned value is `null`.

  

#### Saving or clearing session

  

To save a new session you use the `save` function, you can save any object or string, to clear the session you use the `clear` function, both functions are given to you by `useSession`.

  

```jsx

const { session, save, clear } = useSession('my-app');

```
#### Non-persistent session
  

If you don't want the session to be kept when the user closes the window. There is a second parameter called "keepOnWindowClosed" that you can assign to false. The default value is true, so session is persistent by default.
```jsx
const { session } = useSession('my-app', false);
```


#### Auto "JSON Web Token" Parsing

  

If you have a string containing a JSON Web Token, instead of calling `save`, you can call `saveJWT`, which will automatically parse the JWT to a Javascript Object, save it in the browser local storage, and return the object back to you.

  

```jsx

const { saveJWT } = useSession('my-app');

```

  


## Example


```jsx
import  React  from  'react';
import { useSession } from  'react-use-session';

function  App() {

const  JSON_WEB_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWFjdC11c2Utc2Vzc2lvbi1leGFtcGxlIiwiaWF0IjoxNTQxMDgwMjAwLCJleHAiOjE5MTk3Njg0MDAsImF1ZCI6ImxvY2FsaG9zdDozMDAwIiwic3ViIjoiZ2FicmllbGJiMDMwNkBnbWFpbC5jb20iLCJHaXZlbk5hbWUiOiJHYWJyaWVsIiwiU3VybmFtZSI6IkJhc2lsaW8gQnJpdG8iLCJSb2xlIjoiQ3JlYXRvciJ9.GK23QsdEgMzGmxCwX9CjEg5lbSztZ7C67vKc7L09KgI";

const { session, saveJWT, clear } = useSession('jwt-test-app');

return (
<div  className="App">
{
session ?
<div>
<p>You are logged in as: <code>{session.GivenName}</code></p>
<button  onClick={clear}>Log out</button>
</div>
:
<div>
<p>No session. Please log in</p>
<button  onClick={() =>  saveJWT(JSON_WEB_TOKEN)}>Log in</button>
</div>
}
</div>)
}

export  default  App;
```

  

![Screenshot](https://u.cubeupload.com/GabrielBB/reactusesession.gif)

## Code Documentation

``` typescript
/**

* React hook to handle session from your browser storage

* @param  sessionKey This required parameter is used as the browser storage key. This should be a unique string per app. For example your package.json's name value.

* @param  keepOnWindowClosed This optional parameter will determine if useSession will work with LocalStorage or SessionStorage. Default value is true, so default storage is LocalStorage

* @returns If there is a session in your browser storage then it will be returned. If there is no session, it will return null. It also returns 3 functions to handle the session

*/

declare  function  useSession(sessionKey:  string, keepOnWindowClosed?:  boolean): {

session:  object  |  string  |  null;

save: (sessionValue:  object  |  string) =>  void;

saveJWT: (jwt:  string) =>  void;

clear: () =>  void;

};
`
