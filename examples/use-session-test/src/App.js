import React from 'react';
import { useSession, SessionType } from 'react-use-session';
import './App.css';

function App() {

  const JSON_WEB_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWFjdC11c2Utc2Vzc2lvbi1leGFtcGxlIiwiaWF0IjoxNTQxMDgwMjAwLCJleHAiOjE5MTk3Njg0MDAsImF1ZCI6ImxvY2FsaG9zdDozMDAwIiwic3ViIjoiZ2FicmllbGJiMDMwNkBnbWFpbC5jb20iLCJHaXZlbk5hbWUiOiJHYWJyaWVsIiwiU3VybmFtZSI6IkJhc2lsaW8gQnJpdG8iLCJSb2xlIjoiQ3JlYXRvciJ9.GK23QsdEgMzGmxCwX9CjEg5lbSztZ7C67vKc7L09KgI";

  const { session, login, logout } = useSession(() => JSON_WEB_TOKEN, { type: SessionType.JWT });

  return (
    <div className="App">
      {
        session ?
          <div>
            <p>You are logged in as: <code>{session.GivenName}</code>. Your email is: <code>{session.sub}</code></p>
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
