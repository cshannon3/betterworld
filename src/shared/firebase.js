// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import {DEFAULT_GROUP_ID} from "secret.js";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const defaultGroupID = DEFAULT_GROUP_ID;
console.log(defaultGroupID);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); 
}

const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();


export const getCollectionRef = ({groupID, collection}) => { 
    return db.collection("groups").doc(groupID).collection(collection); 
};


export function getUserRef(userId) { return db.collection("users").doc(userId); }

export async function createNewUser(result) {
    let data = {
        "id": result.user.uid,
        "displayName": result.user.displayName,
        "photoUrl": result.user.photoURL,
        "email": result.user.email,
        "createdAt": firebase.firestore.FieldValue.serverTimestamp(),
    };
    await setUserData(result.user.uid, data);
    let ref = db.collection("groups").doc(defaultGroupID ).collection('members').doc(result.user.email); 
    let snap = await ref.get();
    if(snap.exists){
        await ref.update({
            userId:data["id"],
            ...data
        });
        return {
            userId:data["id"],
            ...data,
            ...snap.data()
        }
    }
    else {
        const memberData ={
            ...data,
            userId:data["id"],
            id:result.user.email,
            bio:"",
            committees:{},
            isSignedOn:true,
            name:data["displayName"],
            projects:{},
            pronouns:"",
            userType:"member"
        };
        await ref.set(memberData);
        return memberData;

    }
}


export const getMembers = () => { //{ groupID = defaultGroupID }
    const groupID = defaultGroupID ;
    return db.collection("groups").doc(groupID).collection('members'); 
};



export const getGroups = (userData) => { //{ groupID = defaultGroupID }
    console.log(userData.groups);
    return db.collection("groups");//.where('id', 'in',  userData.groups)
};



export const getGroupRef = () => { //{ groupID = defaultGroupID }
    return db.collection("groups").doc(defaultGroupID); 
};




export async function updateGroup(name, url) {
    const groupID = defaultGroupID ;
    const groupData = await db.collection("groups").doc(groupID).get();
    let _newRes = [...groupData.data()["resources"], {name, url}]
    db.collection("groups").doc(groupID).update({
        resources:_newRes
    });
}
export const getUpdates = () => { 
    const groupID = defaultGroupID ;
    return db.collection("groups").doc(groupID).collection('updates'); 
};


export const getUpdateRef = ({ id, groupID = defaultGroupID }) => { return db.collection("groups").doc(groupID).collection('updates').doc(id); };

export async function createUpdate(updateData) {
    const groupID = defaultGroupID ;
   console.log("createUpdate");
    console.log(updateData);
    let res = await db.collection("groups").doc(groupID).collection("updates").add(updateData);
    // let userData = await getUserData(user.id);
    return { ...res, "id": res.id };
}

export async function updateUpdate(updateId, updateData) {
    const groupID = defaultGroupID ;
    await db.collection("groups").doc(groupID).collection("updates").doc(updateId).update(updateData).then((e)=>{
        console.log("Go");
    });
}
export async function deleteUpdate(updateId) {
    const groupID = defaultGroupID ;
    await db.collection("groups").doc(groupID).collection("updates").doc(updateId).delete().then((e)=>{
        console.log("deleted");
    });
}


export function getMainUpdates() {
    return db.collection("groups").doc(defaultGroupID).collection("updates").where("isPinned", "==", true);
}

export function getCommitteeUpdates(committeeId=null) {
    // Add team
    if(committeeId!=null){
        return db.collection("groups").doc(defaultGroupID).collection("updates").where("committeeId", "==", committeeId);
    }
    else{
        return db.collection("groups").doc(defaultGroupID).collection("updates").where("committeeId", "!=", null);
    }
}

export function getProjectUpdates(projectId=null, sectionId=null) {
    // Add team
    let ref;
    console.log(sectionId);
    if(sectionId!=null){
        return db.collection("groups").doc(defaultGroupID).collection("updates").where("sectionId", "==", sectionId);
    }
    else if (projectId!=null){
        return db.collection("groups").doc(defaultGroupID).collection("updates").where("projectId", "==", projectId);
    }else {
        return db.collection("groups").doc(defaultGroupID).collection("updates").where("projectId", "!=", null);
    }
}
export function getUserUpdates(userId=null) {

    if(userId!=null){
        return db.collection("groups").doc(defaultGroupID).collection("updates").where("authorId", "==", userId);
    }
}




export async function getUserData(userId) {
    let res = await getUserRef(userId).get()
    return (res.exists) ? { ...res.data(), "id": userId } : false;
}


async function setUserData(userId, data) { await getUserRef(userId).set(data); }
export async function updateUserData(userId, data) { await getUserRef(userId).update(data); }






export const getProjects = (groupID) => { 
    return db.collection("groups").doc(groupID).collection('projects'); 
};


export const getProjectRef = (id) => { 
    const groupID = defaultGroupID ;
    return db.collection("groups").doc(groupID).collection('projects').doc(id); 
};

export async function createProject(projectData, { groupID = defaultGroupID }) {
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
    await getProjectRef(projectId).update(projectData).then((e)=>{
        console.log("Go");
    });
}


export const getCommitteeRef = ( id, groupID ) => { return db.collection("groups").doc(groupID).collection('committees').doc(id); };

export const getCommittees = (groupID) => { 
    return db.collection("groups").doc(groupID).collection('committees'); 
};

export async function updateCommittee(committeeId, committeeData) {
    // Add team
    await getCommitteeRef({ id: committeeId, groupID: defaultGroupID }).update(committeeData);
}



export async function updateMember(memberId, memberData) {
    // Add team
    await db.collection("groups").doc(defaultGroupID).collection("members").doc(memberId).update({...memberData});
}

