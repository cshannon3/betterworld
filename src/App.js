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
import UserHome from "containers/UserHome/UserHome";

//const defaultGroupID = DEFAULT_GROUP_ID;

let userListener;


const App = () => {
  const [user, setUser] = useState(null);
  function setupListenersAndData() {
    if(!user){
      let _user = JSON.parse(window.localStorage.getItem("user"));
      setUser(_user);
    }
  }

  window.onload = function () {
    console.log("ON LOAD");
    setupListenersAndData();
    if(!user){
      let _user = JSON.parse(window.localStorage.getItem("user"));
      setUser(_user);

    }
  };

  useEffect(() => {
    if (!user) {
      let _user = JSON.parse(window.localStorage.getItem("user"));
      if (_user) setUser(_user);
      console.log(_user);
    }
  });

  const isSignedIn = (user && Object.keys(user).length !== 0);

  return (
    <Router>
      <React.Fragment>
        <ControlContext.Provider
          value={{
            
            user, // ID of current user
            groupName:"Activist Org",
            loginUser: async () => {
              // Authenticate and get User Info
              //TODO connect user list to member list
              let result = await firebase.auth().signInWithPopup(fb.provider);
              let userId = result.user.uid;
              let userData = await fb.getUserData(userId);
              if (!userData) userData = await fb.createNewUser(result);
              else userData = { id: userId, ...userData };
              window.localStorage.setItem("user", JSON.stringify(userData));
              console.log(userData);
              setUser(userData);
             

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
        
          }}
        >
          <ModalProvider>
            <div className="App__container">
              <Switch>
                <Route exact path="/:groupId/past-projects/:projectId" component={ArchivedProjectPage} />
                <Route exact path="/:groupId/projects/:projectId" component={ActiveProjectPage} />
                <Route exact path="/:groupId/projects/:projectId/:sectionId" component={ProjectSectionPage} />
                <Route exact path="/:groupId/projects" component={ProjectsPage} />
                <Route exact path="/:groupId/profile" component={ProfilePage} />
                <Route  exact path="/:groupId/committees/:committeeId" component={CommitteePage}/>
                <Route exact path="/:groupId/committees" component={CommitteesPage} />
                <Route exact path="/:groupId" component={LandingPage}/>
                <Route exact path="/">
                  {isSignedIn ? <UserHome /> : <SplashPage />}
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
