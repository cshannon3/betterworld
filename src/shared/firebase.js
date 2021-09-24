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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); 
}

const db = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();


export const getCollectionRef = ({groupId, collection}) => { 
    return db.collection("groups").doc(groupId).collection(collection); 
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
    // TODO fix this to only set it when they join a group
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


// TODO update instances
export const getMembers = ({groupId}) => { //{ groupID = defaultGroupID }
   // const groupID = defaultGroupID ;
    return db.collection("groups").doc(groupId).collection('members'); 
};


// TODO figure out query
export const getGroups = (userData) => { //{ groupID = defaultGroupID }
    return db.collection("groups");//.where('id', 'in',  userData.groups)
};



export const getGroupRef = ({groupId}) => { //{ groupID = defaultGroupID }
    return db.collection("groups").doc(groupId); 
};




export async function updateGroup({groupId, name, url}) {
    //const groupID = defaultGroupID ;
    const groupData = await db.collection("groups").doc(groupId).get();
    let _newRes = [...groupData.data()["resources"], {name, url}]
    db.collection("groups").doc(groupId).update({
        resources:_newRes
    });
}
export const getUpdates = ({groupId}) => { 
    //const groupID = defaultGroupID ;
    return db.collection("groups").doc(groupId).collection('updates'); 
};


export const getUpdateRef = ({ id, groupId}) => { return db.collection("groups").doc(groupId).collection('updates').doc(id); };

export async function createUpdate({groupId, updateData}) {
   console.log("createUpdate");
    console.log(updateData);
    let res = await db.collection("groups").doc(groupId).collection("updates").add(updateData);
    // let userData = await getUserData(user.id);
    return { ...res, "id": res.id };
}

export async function updateUpdate({groupId, updateId, updateData}) {
    await db.collection("groups").doc(groupId).collection("updates").doc(updateId).update(updateData).then((e)=>{
        console.log("Go");
    });
}
export async function deleteUpdate({groupId, updateId}) {
    const groupID = defaultGroupID ;
    await db.collection("groups").doc(groupID).collection("updates").doc(updateId).delete().then((e)=>{
        console.log("deleted");
    });
}


export function getMainUpdates({groupId}) {
    return db.collection("groups").doc(groupId).collection("updates").where("isPinned", "==", true);
}

export function getCommitteeUpdates({groupId, committeeId=null}) {
    // Add team
    if(committeeId!=null){
        return db.collection("groups").doc(groupId).collection("updates").where("committeeId", "==", committeeId);
    }
    else{
        return db.collection("groups").doc(groupId).collection("updates").where("committeeId", "!=", null);
    }
}

export function getProjectUpdates({groupId, projectId=null, sectionId=null}) {
    // Add team
    let ref;
    if(sectionId!=null){
        return db.collection("groups").doc(groupId).collection("updates").where("sectionId", "==", sectionId);
    }
    else if (projectId!=null){
        return db.collection("groups").doc(groupId).collection("updates").where("projectId", "==", projectId);
    }else {
        return db.collection("groups").doc(groupId).collection("updates").where("projectId", "!=", null);
    }
}
export function getUserUpdates({groupId, userId=null}) {

    if(userId!=null){
        return db.collection("groups").doc(groupId).collection("updates").where("authorId", "==", userId);
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


export const getProjectRef = ({id, groupId}) => { 
    //const groupID = defaultGroupID ;
    return db.collection("groups").doc(groupId).collection('projects').doc(id); 
};

export async function createProject(projectData, { groupID = defaultGroupID }) {
    // Add team
    
    let res = await db.collection("groups").doc(groupID).collection("projects").add(projectData);
    // let userData = await getUserData(user.id);
    return { ...res, "id": res.id };
}

export async function updateProject({groupId, projectId, projectData}) {
    // Add team
    console.log(projectId);
    console.log( projectData);
    console.log("test");
    await getProjectRef({id:projectId, groupId}).update(projectData).then((e)=>{
        console.log("Go");
    });
}


export const getCommitteeRef = ({ id, groupId }) => { return db.collection("groups").doc(groupId).collection('committees').doc(id); };

export const getCommittees = (groupId) => { 
    return db.collection("groups").doc(groupId).collection('committees'); 
};

export async function updateCommittee({groupId, committeeId, committeeData}) {
    // Add team
    await getCommitteeRef({ id: committeeId, groupId}).update(committeeData);
}



export async function updateMember({groupId, memberId, memberData}) {
    await db.collection("groups").doc(groupId).collection("members").doc(memberId).update({...memberData});
}

