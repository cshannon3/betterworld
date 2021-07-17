// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import {allUsers} from 'old/users';

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


export const getCollectionRef = ({groupID, collection}) => { 
    return db.collection("groups").doc(groupID).collection(collection); 
};


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


export const getMembers = ({ groupID = "cmu-against-ice" }) => { 
    return db.collection("groups").doc(groupID).collection('members'); 
};



export const getGroupRef = () => { //{ groupID = "cmu-against-ice" }
    return db.collection("groups").doc("cmu-against-ice"); 
};

export async function updateGroup(name, url) {
    const groupID = "cmu-against-ice" ;
    const groupData = await db.collection("groups").doc(groupID).get();
    let _newRes = [...groupData.data()["resources"], {name, url}]
    db.collection("groups").doc(groupID).update({
        resources:_newRes
    });
}
export const getUpdates = () => { 
    const groupID = "cmu-against-ice" ;
    return db.collection("groups").doc(groupID).collection('updates'); 
};


export const getUpdateRef = ({ id, groupID = "cmu-against-ice" }) => { return db.collection("groups").doc(groupID).collection('updates').doc(id); };

export async function createUpdate(updateData) {
    const groupID = "cmu-against-ice" ;
   console.log("createUpdate");
    console.log(updateData);
    let res = await db.collection("groups").doc(groupID).collection("updates").add(updateData);
    // let userData = await getUserData(user.id);
    return { ...res, "id": res.id };
}

export async function updateUpdate(updateId, updateData) {
    const groupID = "cmu-against-ice" ;
    await db.collection("groups").doc(groupID).collection("updates").doc(updateId).update(updateData).then((e)=>{
        console.log("Go");
    });
}
export async function deleteUpdate(updateId) {
    const groupID = "cmu-against-ice" ;
    await db.collection("groups").doc(groupID).collection("updates").doc(updateId).delete().then((e)=>{
        console.log("deleted");
    });
}



export function getCommitteeUpdates(committeeId=null) {
    // Add team
    if(committeeId!=null){
        return db.collection("groups").doc("cmu-against-ice").collection("updates").where("committeeId", "==", committeeId);
    }
    else{
        return db.collection("groups").doc("cmu-against-ice").collection("updates").where("committeeId", "!=", null);
    }

    
}

export function getProjectUpdates(projectId=null, sectionId=null) {
    // Add team
    let ref;
    console.log(sectionId);
    if(sectionId!=null){
        return db.collection("groups").doc("cmu-against-ice").collection("updates").where("sectionId", "==", sectionId);
    }
    else if (projectId!=null){
        return db.collection("groups").doc("cmu-against-ice").collection("updates").where("projectId", "==", projectId);
    }else {
        return db.collection("groups").doc("cmu-against-ice").collection("updates").where("projectId", "!=", null);
    }
}
export function getUserUpdates(userId=null) {

    if(userId!=null){
        return db.collection("groups").doc("cmu-against-ice").collection("updates").where("authorId", "==", userId);
    }
}




export async function getUserData(userId) {
    let res = await getUserRef(userId).get()
    return (res.exists) ? { ...res.data(), "id": userId } : false;
}


async function setUserData(userId, data) { await getUserRef(userId).set(data); }
export async function updateUserData(userId, data) { await getUserRef(userId).update(data); }






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

// export async function moveUsers() {
//     // Add team
//     // db.collection("users").
//     // await getCommitteeRef({ id: committeeId, groupID: "cmu-against-ice" }).update(committeeData);
//     // committeesListener = 

//     let  _usersData = {};
//     allUsers.forEach((u)=>{
//         _usersData[u.email] = {...u, userType:"member", isSignedOn:false, } ;
//     });
//     const users = await db.collection("users").get();
//     users.forEach((doc)=>{
//         const d = doc.data();
        
//         if(d.email in _usersData){
//             _usersData[d.email] = {..._usersData[d.email], ...d, id:doc.id, isSignedOn:true, userType:"member"}
//             console.log(_usersData[d.email]);
//         }
//         else {
//             _usersData[d.email] = {...d, id:doc.id,isSignedOn:true, userType:"guest", name: d.displayName, bio:"", pronouns:""}
//         }
        

//     });

//     const members = db.collection("groups").doc("cmu-against-ice").collection('members');
//     for (var k in _usersData ){
//        members.doc(k).set({..._usersData[k]});
//     }
    
// }


// export async function updateContributors() {
//     // Add team
//     // db.collection("users").
//     // await getCommitteeRef({ id: committeeId, groupID: "cmu-against-ice" }).update(committeeData);
//     // committeesListener = 

//     let  _usersData = {};
//     const members = await db.collection("groups").doc("cmu-against-ice").collection('members').get();
//     members.forEach((doc)=>{
//          _usersData[doc.id] = {...doc.data(), projects:{}, committees:{}};
//     });

//     const projects = await db.collection("groups").doc('cmu-against-ice').collection('projects').get();
    
//     projects.forEach((doc)=>{
//         const d = doc.data();
//         if("contributors" in d){
//             d.contributors.forEach((y)=>{
//                 if(y.email && y.email in _usersData){
//                     let proj = {"projectName":d.name, "roles":[]}; // Roles are parts where they are directly accountable -- can be project, section, or stage, and types
//                     if("sections" in d){
//                         d.sections.forEach((s)=>{
//                             if("stages" in s){
//                                 s.stages.forEach((st)=>{
//                                     if("contributors" in st){
                                       
//                                         st.contributors.forEach((c)=>{
//                                             console.log(c.name)
//                                             if(_usersData[y.email].name.includes(c.name)){
//                                                 console.log( c.name)
//                                                 proj["roles"].push({
//                                                     "section":s.name,
//                                                     "sectionId":s.id,
//                                                     "stage": st.name,
//                                                     "stageId":st.id,
//                                                     "role": "lead",
//                                                     "type": st.type,
//                                                 })
//                                             }
//                                         });
//                                     }
//                                 });
//                             }
//                         });
//                     }
//                     _usersData[y.email]["projects"][doc.id]=proj;
//                 }
//             });
//         }

       
//     });
//     console.log(_usersData);

//     const membersRef = await db.collection("groups").doc("cmu-against-ice").collection('members');
//     for (var k in _usersData ){
//        membersRef.doc(k).set({..._usersData[k]});
//     }
    
// }
