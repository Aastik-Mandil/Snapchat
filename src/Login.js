import React from 'react'
import "./Login.css"
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { auth, provider } from './firebase';
import { login } from './features/appSlice';

function Login() {
    const dispatch = useDispatch();
    const signin = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch(login({
                    username: result.user.displayName, profilePic: result.user.photoUrl, id: result.user.uid,
                }));
            })
            .catch(err => alert(err.message));
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://c0.klipartz.com/pngpicture/111/699/gratis-png-snapchat-logo-publicitario-snap-inc-snapchat-thumbnail.png" alt="Snapchat logo" />
                <Button variant="outlined" onClick={signin}>Sign in</Button>
            </div>
        </div>
    )
}

export default Login
