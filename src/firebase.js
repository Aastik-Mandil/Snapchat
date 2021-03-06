import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC5DwJcoyulqwbR3OXvtHx2yG4bJ7alTMM",
    authDomain: "snapchat-11155.firebaseapp.com",
    projectId: "snapchat-11155",
    storageBucket: "snapchat-11155.appspot.com",
    messagingSenderId: "41905282616",
    appId: "1:41905282616:web:702c02c5a1a822577650cd",
    measurementId: "G-6J8XL5F365"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebaseapp.auth();
const storage = firebaseapp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };