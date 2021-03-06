import React from 'react'
import "./Chat.css"
import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import ReactTimeago from 'react-timeago'
import { selectImage } from './features/appSlice';
import { useDispatch } from 'react-redux';
import { db } from './firebase';
import { useHistory } from 'react-router-dom';

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const open = () => {
        // if (!read) {
        dispatch(selectImage(imageUrl));
        db.collection('posts').doc(id).set({
            read: true
        }, { merge: true });
        history.push('/chats/view')
        // }
    }
    return (
        <div className="chat" onClick={open}>
            <Avatar src={profilePic} className="chat__avatar" />
            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    {!read && "Tap to view - "}
                    <ReactTimeago data={new Date(timestamp?.toDate()).toUTCString()} />
                </p>
            </div>
            {!read && <StopRounded className="chat__readIcon" />}
        </div>
    )
}

export default Chat
