import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as fb from "shared/firebase";
import firebase from "firebase/app";
import ControlContext from "shared/control-context";
import {DEFAULT_GROUP_ID} from "secret.js";
//Screens
import AddItemPage from "containers/Add_Item_Page/AddItemPage";
import { ModalProvider } from "styled-react-modal";
import {
SplashPage,
LandingPage,
ProjectsPage,
ActiveProjectPage,
ArchivedProjectPage,
ProjectSectionPage,
CommitteePage,
CommitteesPage,
ProfilePage,
NotFoundPage,
} from "containers/pages"

const defaultGroupID = DEFAULT_GROUP_ID;

let userListener;

let listeners = {
  "projects":null,
  "committees":null,
  "members":null,
  "updates":null
}


const App = () => {
  const [user, setUser] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [committeesData, setCommitteesData] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [membersData, setMembersData] = useState(null);
  const [updatesData, setUpdatesData] = useState(null);
  
  function setupListenersAndData() {
    if(!user){
      let _user = JSON.parse(window.localStorage.getItem("user"));
      setUser(_user);

    }
    Object.keys(listeners).forEach((k)=>{
      if(k in listeners && listeners[k]==null){
        getLocalData(k);
        setupListener(k);
      } 
      else { 
        getLocalData(k);
      }
    });
  }


  function setupListener(type) {

      listeners[type] = fb.getCollectionRef({groupID:defaultGroupID, collection:type}).onSnapshot(function (querySnapshot) {
        let _collectionData = {};
        querySnapshot.forEach(function (doc) {
          _collectionData[doc.id] = { ...doc.data(), id: doc.id };
        });
        window.localStorage.setItem(type, JSON.stringify(_collectionData));
        switch (type){
          case "members": setMembersData(_collectionData); break;
          case "updates": setUpdatesData(_collectionData); break;
          case "committees": setCommitteesData(_collectionData); break;
          case "projects": setProjectsData(_collectionData);break;
        } 
      });
  }
 
  function getLocalData(type) {
      let _collectionData;
      switch (type){
        case "user": 
          if(!user){
            console.log("!user");
            _collectionData = JSON.parse(window.localStorage.getItem(type));
            console.log(_collectionData);
            setUser(_collectionData); 
          }else {
            console.log(user, "USER");
          }
          break;
        case "members": 
          if(!membersData){
            _collectionData = JSON.parse(window.localStorage.getItem(type));
            setMembersData(_collectionData); 
          }
          break;
        case "updates": 
          if(!updatesData){
            _collectionData = JSON.parse(window.localStorage.getItem(type));
            setUpdatesData(_collectionData); 
          }
          break;
        case "committees": 
          if(!committeesData){
            _collectionData = JSON.parse(window.localStorage.getItem(type));
            setCommitteesData(_collectionData); 
          }
          break;
        case "projects": 
          if(!projectsData){
            _collectionData = JSON.parse(window.localStorage.getItem(type));
            setProjectsData(_collectionData); 
          }
          break;
      } 
}
function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}



  window.onload = function () {
    console.log("ON LOAD");
    setupListenersAndData();
  };

  useEffect(() => {
    if (!user) {
      console.log("no user");
      let _user = JSON.parse(window.localStorage.getItem("user"));
      if (_user) setUser(_user);
    }
    //setupListenersAndData();
  });

  const isSignedIn = (user && Object.keys(user).length !== 0);

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            
            user, // ID of current user
            groupName:"CMU Against ICE",
            //getGroupData: async () => await fb.getGroupData(),
            projectsData: projectsData,
            committeesData: committeesData,
            membersData: membersData,
            //data: data,
            loginUser: async () => {
              // Authenticate and get User Info
              //TODO connect user list to member list
              let result = await firebase.auth().signInWithPopup(fb.provider);

              let userId = result.user.uid;
              // Get data from firebase
              console.log("user data");
              let userData = await fb.getUserData(userId);
           
              if (!userData) userData = await fb.createNewUser(result);
              else userData = { id: userId, ...userData };
              setupListenersAndData();
              
              let i = 0;
              while ( membersData === undefined  && updatesData===undefined && i<10){
                await sleep(200);
                i+=1;
                console.log(i);
              }
              if( membersData  && updatesData){
                userData = {...userData, ...membersData[userData.email], updates:[]};
                if (updatesData) {
                  userData["updates"] = Object.values(updatesData).filter(
                    (v) => v.authorId == userData.userId
                  );
                  let allNots = [];
                  Object.values(updatesData).forEach((update)=>{
                  
                    const notifs = update.notifications?.filter((v)=>v.userId==userData.userId);
                    if(notifs){
                      allNots.push(...notifs);
                    }
                  });
                  userData["notifications"]= allNots;
                }
                
            }
              console.log(userData);
              setUser(userData);
              window.localStorage.setItem("user", JSON.stringify(userData));

            },
            logoutUser: () => {
              firebase
                .auth()
                .signOut()
                .then(function () {
                  window.localStorage.setItem("user", null);
                  if (userListener){ userListener();}
                  
                  window.location.replace("/");
                }).catch(function (error) {
                  console.log(error);
                });
            },
           getMembersData: ()=>{
              if (membersData) return membersData;
              setupListenersAndData();
              if (membersData) return membersData;
              return false;
           },

            getMemberData: () => {
              if ( !membersData ){ setupListenersAndData(); }
              if( membersData && user && user.email in membersData){
                  let _memberData = {...membersData[user.email], updates:[], isCurrentUser: true};
                  if(!_memberData.isSignedOn)return _memberData;
                  
                  const _id = _memberData.userId;
                  if (updatesData) {
                    _memberData["updates"] = Object.values(updatesData).filter(
                      (v) => v.authorId == _id
                    );
                    let allNots = [];
                    Object.values(updatesData).forEach((update)=>{
                   
                      const notifs = update.notifications?.filter((v)=>v.userId==user.id);
                      if(notifs){
                        allNots.push(...notifs);
                      }
                    });
                    _memberData["notifications"]= allNots;
                  }
                  console.log(_memberData);
                  return _memberData;
              }else{
                return null;
              }
              
            },
           
            // getProjectData: (currentID)=>{if(currentID!==null&& data!=null) return data["projects"][currentID] }
            getProjectData: (projectId) => {
              
              let _projectsData = projectsData;
              if ( !_projectsData ){ 
                _projectsData = JSON.parse(window.localStorage.getItem("projects"));
                //console.log(_projectsData);
                if(_projectsData)
                setProjectsData(_projectsData);
                //setupListenersAndData(); 
              }
             // console.log(projectsData);

              if (projectId == null || _projectsData==null || !(projectId in _projectsData)) return null;
              let _projectData = {..._projectsData[projectId], contributors:[], updates:[]};
             
                if (membersData) {
                  _projectData["contributors"] = Object.values(
                    membersData
                  ).filter((v) => projectId in v.projects); ///.map((o)=>{return {...o, ...o["projects"][currentID]};});
                } 

                if (updatesData) {
                  _projectData["updates"] = Object.values(updatesData).filter(
                    (v) => v.projectId == projectId
                  );
                  //if(projectData["updates"]) numUpdates = projectData["updates"].length;
                  _projectData["sections"]?.forEach((section) => {
                    section["updates"] = Object.values(
                      _projectData["updates"]
                    ).filter((v) => v.sectionId == section.id);
                  });
                } 
                return _projectData; 
            },
            getProjectName: (projectId, sectionId) =>{
              if (
                projectsData &&
                projectId !== null &&
                projectId in projectsData
              ) {
                console.log("get name");
                if(!sectionId) return [projectsData[projectId].name, null];
                else if ("sections" in projectsData[projectId]){
                  let f = projectsData[projectId]["sections"].filter((sec)=>sec.id==sectionId);
                  if(f && f.length>0){
                    return [projectsData[projectId].name, f[0]["name"]];
                  }
                }
              }
              console.log("else");
              return "";
            },
            getProjectsData: () => {
              if (projectsData) return projectsData;
              setupListenersAndData();
              if (projectsData) return projectsData;
              return false;
            },
            getCommitteeData: (currentID) => {
              if (
                committeesData &&
                currentID !== null &&
                currentID in committeesData
              ) {
                return committeesData[currentID];
              } else {
                let _user = JSON.parse(window.localStorage.getItem("user"));
                let _committeesData = JSON.parse(
                  window.localStorage.getItem("committees")
                );
                // console.log(_committeesData);
                setUser(_user);
                setCommitteesData(_committeesData);
                return _committeesData[currentID];
              }
              return false;
            },
            getCommitteeName: (currentID) => {
              if (
                committeesData &&
                currentID !== null &&
                currentID in committeesData
              ) {
                return committeesData[currentID].name;
              } 
               return "committee";
            },
            getCommitteesData: () => {
              if (committeesData) return committeesData;
              setupListenersAndData();
              if (committeesData) return committeesData;
              return false;
            },
          }}
        >
          <ModalProvider>
            <div className="App__container">
              <Switch>
              {/* <Route path="/re" component={ReflexDemo} />
                <Route path="/addItem" component={AddItemPage} /> */}
                
                <Route exact path="/past-projects/:projectId" component={ArchivedProjectPage} />
                <Route exact path="/projects/:projectId" component={ActiveProjectPage} />
                <Route path="/projects/:projectId/:sectionId" component={ProjectSectionPage} />
                <Route exact path="/projects" component={ProjectsPage} />
                <Route path="/profile" component={ProfilePage} />

                <Route
                  path="/committees/:committeeId"
                  component={CommitteePage}
                />
                <Route path="/committees" component={CommitteesPage} />
                {/* <Route path="/:groupId" component={LandingPage} /> */}

                <Route exact path="/">
                  {/*Conditional rendering based on whether user logged in*/}
                  {isSignedIn ? <LandingPage /> : <SplashPage />}
                </Route>
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </ModalProvider>
        </ControlContext.Provider>
      </React.Fragment>
    </Router>
  );
};
export default App;






// getMemberData: (email) => {
//   if ( !membersData ){ setupListenersAndData(); }
//   if( membersData && email in membersData){
//       let _memberData = {...membersData[email], updates:[], isCurrentUser: email===user.email};
//       if(!_memberData.isSignedOn)return _memberData;
      
//       const _id = _memberData.userId;
//       if (updatesData) {
//         _memberData["updates"] = Object.values(updatesData).filter(
//           (v) => v.authorId == _id
//         );
//         let allNots = [];
//         Object.values(updatesData).forEach((update)=>{
       
//           const notifs = update.notifications?.filter((v)=>v.userId==user.id);
//           if(notifs){
//             allNots.push(...notifs);
//           }
//         });
//         _memberData["notifications"]= allNots;
//       }
//       console.log(_memberData);
//       return _memberData;
//   }else{
//     return null;
//   }
  
// },
