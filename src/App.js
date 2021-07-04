import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



// import {
//   provider,
//   getUserData,
//   createNewUser,
//   getProjects,
//   getCommittees,
//   getMembers,
//   getUpdates,
//   updateContributors,
// } from "shared/firebase";
import * as fb from "shared/firebase";

//import dummydata from 'shared/dummydata';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";

//Screens
//import Splash from "containers/Splash/Splash";
//import Landing from "containers/Landing/Landing";
//import ProjectsPage from "containers/Projects/ProjectsPage";
//import ProjectPage from "containers/Projects/ProjectPage/ProjectPage";
//import CommitteePage from "containers/Committees/CommitteePage/CommitteePage";
//import CommitteesPage from "containers/Committees/CommitteesPage";
import AddItemPage from "containers/Add_Item_Page/AddItemPage";
import { ModalProvider } from "styled-react-modal";
import { useMediaQuery } from "react-responsive";
//import ProfilePage from "containers/ProfilePage/ProfilePage";
import {
SplashPage,
LandingPage,
ProjectsPage,
ProjectPage,
CommitteePage,
CommitteesPage,
ProfilePage,
NotFoundPage,
} from "containers/pages"





let userListener;
//   projectsListener,
//   committeesListener,
//   membersListener,
//   updatesListener;

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

      listeners[type] = fb.getCollectionRef({groupID:"cmu-against-ice", collection:type}).onSnapshot(function (querySnapshot) {
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
    setupListenersAndData();
  });

  const isSignedIn = (user && Object.keys(user).length !== 0);

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            
            user, // ID of current user
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
              setUser(userData);
              window.localStorage.setItem("user", JSON.stringify(userData));
              setupListenersAndData();
              
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
            getMemberData: (email) => {
              if ( !membersData ){ setupListenersAndData(); }
              if( membersData && email in membersData){
                  let _memberData = {...membersData[email], updates:[], isCurrentUser: email===user.email};
                  if(!_memberData.isSignedOn)return _memberData;
                  const _id = _memberData.userId;
                  console.log(_id);
                  if (updatesData) {
                    _memberData["updates"] = Object.values(updatesData).filter(
                      (v) => v.authorId == _id
                    );
                  }
                  return _memberData;
              }
              return null;
            },
           
            // getProjectData: (currentID)=>{if(currentID!==null&& data!=null) return data["projects"][currentID] }
            getProjectData: (projectId) => {
              
              if ( !projectsData ){ setupListenersAndData(); }
              console.log(projectsData);
              if (projectId === null || !(projectId in projectsData)) return {};
              let _projectData = {...projectsData[projectId], contributors:[], updates:[]};
             
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
                <Route path="/addItem" component={AddItemPage} />
                <Route path="/projects/:projectId" component={ProjectPage} />
                <Route path="/projects" component={ProjectsPage} />
                <Route path="/myinfo" component={ProfilePage} />

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








    // if (!projectsListener) setupProjectListener();
    // if (!committeesListener) setupCommitteeListener();
    // if (!membersListener) setupMembersListener();
    // if (!updatesListener) setupUpdatesListener();

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

/*

Get members on project.


Members for each 

projects: "immigration" {
  role: ___
}




*/

// if (!projectsListener) setupProjectListener();
              // if (!committeesListener) setupCommitteeListener();
              // if (!membersListener) setupMembersListener();
              // if (!updatesListener) setupUpdatesListener();
              
             
 // function setupUpdatesListener() {
  //   updatesListener = getUpdates().onSnapshot(function (querySnapshot) {
  //     let _updatesData = {};
  //     querySnapshot.forEach(function (doc) {
  //       _updatesData[doc.id] = { ...doc.data(), id: doc.id };
  //     });
  //     //console.log(_projectsData);
  //     setUpdatesData(_updatesData);
  //     window.localStorage.setItem("updates", JSON.stringify(_updatesData));
  //   });
  // }

  // function setupProjectListener() {
  //   projectsListener = getProjects({ groupID: "cmu-against-ice" }).onSnapshot(
  //     function (querySnapshot) {
  //       let _projectsData = {};
  //       querySnapshot.forEach(function (doc) {
  //         _projectsData[doc.id] = { ...doc.data(), id: doc.id };
  //       });
  //       //console.log(_projectsData);
  //       setProjectsData(_projectsData);
  //       window.localStorage.setItem("projects", JSON.stringify(_projectsData));
  //     }
  //   );
  // }

  // function setupCommitteeListener() {
  //   committeesListener = getCommittees({
  //     groupID: "cmu-against-ice",
  //   }).onSnapshot(function (querySnapshot) {
  //     let _committeesData = {};
  //     querySnapshot.forEach(function (doc) {
  //       _committeesData[doc.id] = { ...doc.data(), id: doc.id };
  //     });
  //     // console.log(_committeesData);
  //     setCommitteesData(_committeesData);
  //     window.localStorage.setItem(
  //       "committees",
  //       JSON.stringify(_committeesData)
  //     );
  //   });
  // }

  // function setupMembersListener() {
  //   membersListener = getMembers({
  //     groupID: "cmu-against-ice",
  //   }).onSnapshot(function (querySnapshot) {
  //     let _membersData = {};
  //     querySnapshot.forEach(function (doc) {
  //       _membersData[doc.id] = { ...doc.data(), id: doc.id };
  //     });
  //     setMembersData(_membersData);
  //     window.localStorage.setItem("members", JSON.stringify(_membersData));
  //   });
  // }

  //updateContributors();
    // let _user = JSON.parse(window.localStorage.getItem("user"));
    // let _projectsData = JSON.parse(window.localStorage.getItem("projects"));
    // let _committeesData = JSON.parse(window.localStorage.getItem("committees"));
    // let _membersData = JSON.parse(window.localStorage.getItem("members"));
    // let _updatesData = JSON.parse(window.localStorage.getItem("updates"));
    // if (_user) {
    //   setUser(_user);
    //   if (!projectsListener) setupProjectListener();
    //   else if (_projectsData) setProjectsData(_projectsData);
    //   if (!committeesListener) setupCommitteeListener();
    //   else if (_committeesData) setCommitteesData(_committeesData);
    //   if (!membersListener) setupMembersListener();
    //   else if (_membersData) setMembersData(_membersData);
    //   if (!updatesListener) setupUpdatesListener();
    //   else if (_updatesData) setUpdatesData(_updatesData);
    // }