import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  provider,
  getUserData,
  createNewUser,
  getProjects,
  getCommittees,
  getMembers,
  updateContributors
} from "shared/firebase";
//import dummydata from 'shared/dummydata';
import firebase from "firebase/app";
import ControlContext from "shared/control-context";

//Screens
import Splash from "containers/1_Splash/Splash";
import Landing from "containers/2_Landing/Landing";
import ProjectsPage from "containers/Projects/ProjectsPage";
import ProjectPage from "containers/Projects/Project_Page/ProjectPage";
import CommitteePage from "containers/Committees/CommitteePage/CommitteePage";
import CommitteesPage from "containers/Committees/CommitteesPage";
import AddItemPage from "containers/Add_Item_Page/AddItemPage";
import { ModalProvider } from "styled-react-modal";
import data from "dummydata";
import { useMediaQuery } from "react-responsive";
import ProfilePage from "containers/ProfilePage/ProfilePage";

let userListener, projectsListener, committeesListener, membersListener;

const App = () => {
  const [user, setUser] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [committeesData, setCommitteesData] = useState(null);
  const [membersData, setMembersData] = useState(null);

  //const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  //const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  //const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  function setupProjectListener() {
    projectsListener = getProjects({ groupID: "cmu-against-ice" }).onSnapshot(
      function (querySnapshot) {
        let _projectsData = {};
        querySnapshot.forEach(function (doc) {
          _projectsData[doc.id] = { ...doc.data(), id: doc.id };
        });
        //console.log(_projectsData);
        setProjectsData(_projectsData);
        window.localStorage.setItem("projects", JSON.stringify(_projectsData));
      }
    );
  }

  function setupCommitteeListener() {
    committeesListener = getCommittees({
      groupID: "cmu-against-ice",
    }).onSnapshot(function (querySnapshot) {
      let _committeesData = {};
      querySnapshot.forEach(function (doc) {
        _committeesData[doc.id] = { ...doc.data(), id: doc.id };
      });
     // console.log(_committeesData);
      setCommitteesData(_committeesData);
      window.localStorage.setItem(
        "committees",
        JSON.stringify(_committeesData)
      );
    });
  }


  function setupMembersListener() {
    membersListener = getMembers({
      groupID: "cmu-against-ice",
    }).onSnapshot(function (querySnapshot) {
      let _membersData = {};
      querySnapshot.forEach(function (doc) {
        _membersData[doc.id] = { ...doc.data(), id: doc.id };
      });
      setMembersData(_membersData);
      window.localStorage.setItem(
        "members",
        JSON.stringify(_membersData)
      );
    });
  }

  window.onload = function () {
    console.log("ON LOAD");
    //updateContributors();
    let _user = JSON.parse(window.localStorage.getItem("user"));
    let _projectsData = JSON.parse(window.localStorage.getItem("projects"));
    let _committeesData = JSON.parse(window.localStorage.getItem("committees"));
    let _membersData = JSON.parse(window.localStorage.getItem("members"));
    if (_user) {
      setUser(_user);
      if (!projectsListener) setupProjectListener();
      else if (_projectsData) setProjectsData(_projectsData);
      if (!committeesListener) setupCommitteeListener();
      else if (_committeesData) setCommitteesData(_committeesData);
      if(!membersListener) setupMembersListener();
      else if(_membersData) setMembersData(_membersData);
    }
  };

  useEffect(() => {
    if (!user) {
      let _user = JSON.parse(window.localStorage.getItem("user"));
      if (_user) setUser(_user);
    }
    if (!projectsListener) setupProjectListener();
    if (!committeesListener) setupCommitteeListener();
    if(!membersListener) setupMembersListener();
  });

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            //isMobile:()=>{return useMediaQuery({ query: '(max-width: 1224px)' })},
            data: data,
            user, // ID of current user
            projectsData: projectsData,
            committeesData: committeesData,
            membersData: membersData,
            loginUser: async () => {
              // Authenticate and get User Info
              let result = await firebase.auth().signInWithPopup(provider);
             // console.log(result);
              let userId = result.user.uid;
              let userData = await getUserData(userId);
              //let data;
              if (!userData) userData = await createNewUser(result);
              else userData = { id: userId, ...userData };
              setupProjectListener();
              setUser(userData);
              window.localStorage.setItem("user", JSON.stringify(userData));
            },
            logoutUser: () => {
              firebase
                .auth()
                .signOut()
                .then(function () {
                  if (userListener) userListener();
                  window.localStorage.setItem("user", null);

                  window.location.replace("/");
                })
                .catch(function (error) {
                  console.log(error);
                });
            },

            // getProjectData: (currentID)=>{if(currentID!==null&& data!=null) return data["projects"][currentID] }
            getProjectData: (currentID) => {
              if (
                projectsData &&
                currentID !== null &&
                currentID in projectsData ) 
              {
                let _projectData = projectsData[currentID];
        
                if(membersData){
                //  console.log(membersData);
                  _projectData["contributors"]= Object.values(membersData).filter((v)=>(currentID in v.projects));///.map((o)=>{return {...o, ...o["projects"][currentID]};});
                  //console.log(_projectData["contributors"]);
                }else if (!("contributors" in _projectData)){
                  console.log("else");
                  _projectData["contributors"]=[];
                }
                
                return _projectData;
              } else {

                let _user = JSON.parse(window.localStorage.getItem("user"));
                let _projectsData = JSON.parse(
                  window.localStorage.getItem("projects")
                );

               
                console.log(_projectsData);
                console.log("not loaded");
                setUser(_user);
                setProjectsData(_projectsData);
                return _projectsData[currentID];
              }
            },
            getProjectsData: () => {
              if (projectsData) return projectsData;
              let _projectsData = JSON.parse(
                window.localStorage.getItem("projects")
              );
              if (_projectsData) {
                setProjectsData(_projectsData);
                return _projectsData;
              }
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
              let _committeesData = JSON.parse(
                window.localStorage.getItem("committees")
              );
              if (_committeesData) {
                setCommitteesData(_committeesData);
                return _committeesData;
              }
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
                <Route path="/:groupId" component={Landing} />

                <Route exact path="/">
                  {/*Conditional rendering based on whether user logged in*/}
                  {user ? <Landing /> : <Splash />}
                </Route>
              </Switch>
            </div>
          </ModalProvider>
        </ControlContext.Provider>
      </React.Fragment>
    </Router>
  );
};
export default App;

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