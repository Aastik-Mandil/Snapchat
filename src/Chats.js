import React, { useState, useEffect } from 'react'
import "./Chats.css"
import { Avatar } from '@material-ui/core';
import { ChatBubble, RadioButtonUnchecked, Search } from '@material-ui/icons';
import { auth, db } from './firebase';
import Chat from './Chat'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const history = useHistory();
    const dispatch = useDispatch();

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history.push('/')
    }

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, data: doc.data()
            })));
        });
    }, []);

    const signOutUser = () => {
        auth.signOut();
        history.push('/')
    }

    return (
        <div className="chats">
            <div class="chats__header">
                <Avatar src={user?.profilePic} onClick={signOutUser} className="chats__avatar" />
                <div className="chats__search">
                    <Search className="chats__searchIcon" />
                    <input type="text" placeholder="Friends" />
                </div>
                <ChatBubble className="chats__chatIcon" />
            </div>
            <div className="chats__posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                    <Chat key={id} id={id} username={username} timestamp={timestamp} imageUrl={imageUrl} read={read} profilePic={profilePic} />
                ))}
            </div>
            <RadioButtonUnchecked className="chats_takePic" onClick={takeSnap} fontSize="large" />
        </div>
    )
}

export default Chats
