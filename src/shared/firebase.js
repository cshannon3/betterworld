// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

export function getUserRef(userId) { return db.collection("users").doc(userId); }
export const getUserTeams = uid => { return db.collection('teams').where('users', 'array-contains', uid);};


export async function createNewUser(result) {
    let data = {
        "id": result.user.uid,
        "displayName": result.user.displayName,
        "photoUrl": result.user.photoURL,
        "email": result.user.email,
        "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
        "teams": [],
    };
    await setUserData(result.user.uid, data);
    return data;
}


export async function getUserData(userId) {
    let res = await getUserRef(userId).get()
    return (res.exists) ? {...res.data(), "id":userId} : false;
}


async function setUserData(userId, data) {await getUserRef(userId).set(data);}
export async function updateUserData(userId, data) {await getUserRef(userId).update(data);}

