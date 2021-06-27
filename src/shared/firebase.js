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
} else {
    firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

export function getUserRef(userId) { return db.collection("users").doc(userId); }
// export const getProjects = () => { return db.collection('projects');};

// export const getProjectRef = id => { return db.collection('projects').doc(id);};

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


export async function moveUsers(committeeId, committeeData) {
    // Add team
    await getCommitteeRef({ id: committeeId, groupID: "cmu-against-ice" }).update(committeeData);
}



export async function getUserData(userId) {
    let res = await getUserRef(userId).get()
    return (res.exists) ? { ...res.data(), "id": userId } : false;
}


async function setUserData(userId, data) { await getUserRef(userId).set(data); }
export async function updateUserData(userId, data) { await getUserRef(userId).update(data); }


// export async function createProject(projectData) {
//     // Add team
//     let res = await db.collection("projects").add(projectData);
//    // let userData = await getUserData(user.id);
//     return {...res, "id":res.id};
// }

// export async function updateProject(projectId, projectData) {
//     // Add team
//     await getProjectRef(projectId).update(projectData);
// }




export const getProjects = ({ groupID = "cmu-against-ice" }) => { 
    return db.collection("groups").doc(groupID).collection('projects'); 
};


export const getProjectRef = ({ id, groupID = "cmu-against-ice" }) => { return db.collection("groups").doc(groupID).collection('projects').doc(id); };

export async function createProject(projectData, { groupID = "cmu-against-ice" }) {
    // Add team
    let res = await db.collection("groups").doc(groupID).collection("projects").add(projectData);
    // let userData = await getUserData(user.id);
    return { ...res, "id": res.id };
}

export async function updateProject(projectId, projectData) {
    // Add team
    console.log(projectId);
    console.log( projectData);
    console.log("test");
    await getProjectRef({ id: projectId, groupID: "cmu-against-ice" }).update(projectData).then((e)=>{
        console.log("Go");
    });
}


export const getCommitteeRef = ({ id, groupID = "cmu-against-ice" }) => { return db.collection("groups").doc(groupID).collection('committees').doc(id); };

export const getCommittees = ({ groupID = "cmu-against-ice" }) => { 
    return db.collection("groups").doc(groupID).collection('committees'); 
};

export async function updateCommittee(committeeId, committeeData) {
    // Add team
    await getCommitteeRef({ id: committeeId, groupID: "cmu-against-ice" }).update(committeeData);
}
