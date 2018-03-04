// src/firebase.js
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCQAYNZKHkraWVnzb05W-dHdodeiW8Ua54",
    authDomain: "test-26ff4.firebaseapp.com",
    databaseURL: "https://test-26ff4.firebaseio.com",
    projectId: "test-26ff4",
    storageBucket: "test-26ff4.appspot.com",
    messagingSenderId: "242388076504"
};
firebase.initializeApp(config);
export default firebase;