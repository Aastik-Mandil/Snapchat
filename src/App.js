import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, selectUser } from './features/appSlice';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName, profilePic: authUser.photoUrl, id: authUser.uid,
        }));
      } else {
        dispatch(logout());
      }
    })
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
            <>
              <img className="app__logo" src="https://c0.klipartz.com/pngpicture/111/699/gratis-png-snapchat-logo-publicitario-snap-inc-snapchat-thumbnail.png" alt="Snapchat logo" />
              <div className="app_body">
                <div className="app__bodyBackground">
                  <Switch>
                    <Route path="/chats/view" exact>
                      <ChatView />
                    </Route>
                    <Route path="/chats" exact>
                      <Chats />
                    </Route>
                    <Route path="/preview" exact>
                      <Preview />
                    </Route>
                    <Route path="/" exact>
                      <WebcamCapture />
                    </Route>
                  </Switch>
                </div>
              </div>
            </>
          )}
      </Router>
    </div>
  );
}

export default App;
// login
// firebase init
// hosting
// existng project
// 
// 
// 
// 
