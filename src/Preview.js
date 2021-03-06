import React, { useEffect } from 'react';
import "./Preview.css";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage, selectcameraImage } from './features/cameraSlice';
import { useDispatch } from 'react-redux';
import { Close, Create, TextFields, Note, MusicNote, AttachFile, Crop, Timer, Send } from '@material-ui/icons';
import { v4 as uuid } from 'uuid';
import { storage, db } from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/appSlice';

function Preview() {
    const user = useSelector(selectUser);
    const cameraImage = useSelector(selectcameraImage);
    const history = useHistory();
    const dispatch = useDispatch();

    const closePreview = () => {
        dispatch(resetCameraImage());
    }
    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");
        uploadTask.on('state_change', null, (error) => {
            alert(error.message);
        }, () => {
            console.log(id);
            storage.ref('posts').child(id).getDownloadURL().then(url => {
                console.log(user);
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic || "",
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                history.push('/chats');
            })
        })
    }

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/');
        }
    }, [cameraImage, history]);

    return (
        <div className="preview">
            <Close className="preview__close" onClick={closePreview} />
            <div className="preview__toolbarRight">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Crop />
                <Timer />
            </div>
            <img src={cameraImage} alt="" />
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <Send className="preview__send" />
            </div>
        </div>
    )
}

export default Preview
