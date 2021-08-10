import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import UpdateBox from "components/UpdatesSection/UpdateBox";
import * as fb from "shared/firebase";
import { useParams } from "react-router-dom";
import ControlContext from "shared/control-context";
import NewUpdateBox from "./NewUpdateBox";
import { cleanUpdateModel } from "data_models/updatemodel";

// TODO verification

const UpdatesSection = ({ allowAddUpdate = true }) => {
  const appCtx = useContext(ControlContext);
  const [updates, setUpdates] = useState(null);
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);
  // Whether the update is a help request or a default update
  const [newUpdateType, setNewUpdateType] = useState("default");
  
   
  const [selectorOpen, setSelectorOpen] = useState(null);
  const urlParts = window.location.href.split("/");
  const isHome = urlParts.length==4;
  const params = useParams();
  const positionRef = useRef();
  let updateListener;
  
  //let committeeId=null, committeeName, projectId=null, projectName, sectionId=null, sectionName;

  const user = appCtx.user;

  function setupListener(ref) {
    updateListener = ref.onSnapshot(function (querySnapshot) {
      let _updateData = [];
      querySnapshot.forEach(function (doc) {
        _updateData.push({ ...doc.data(), id: doc.id });
      });
      window.localStorage.setItem("page_updates", JSON.stringify(_updateData));
      setUpdates(_updateData);
    });
  }

  useEffect(() => {
    if (updates == null) {
      if (urlParts.includes("committees")) {
        if ("committeeId" in params) {
          setupListener(fb.getCommitteeUpdates(params.committeeId));
        } else setupListener(fb.getCommitteeUpdates());
      } else if (urlParts.includes("projects")) {
        if ("projectId" in params) {
          if ("sectionId" in params) {
            setupListener(
              fb.getProjectUpdates(params.projectId, params.sectionId)
            );
          } else {
            setupListener(fb.getProjectUpdates(params.projectId));
          }
        } else {
          setupListener(fb.getProjectUpdates());
        }
      } else if (urlParts.includes("profile")) {
        setupListener(fb.getUserUpdates(user.id));
      } else if (urlParts.includes("past-projects")) {
      } else {
        setupListener(fb.getMainUpdates());
        // Home
      }
    }
    return () => {
      if (updateListener) updateListener();
    };
  }, []);

  return (
    <UpdatesContainer ref={positionRef}>
      <UpdatesMenu>
        <div className={"updateTitle"}>Updates</div>
        <div>
          {allowAddUpdate && (
            <ButtonTwo onClick={() => {setIsAddingUpdate(true); setNewUpdateType("request help")}}>
              {"Request Help"}
            </ButtonTwo>
          )}
          {allowAddUpdate && (
            <ButtonOne onClick={() => {setIsAddingUpdate(true);setNewUpdateType("default");}}>
              {"Add"}
            </ButtonOne>
          )}
        </div>
      </UpdatesMenu>
      {isAddingUpdate && (
        <NewUpdateBox
          key="testKey"
          updateType={newUpdateType}
          onSave={(newUpdateModel) => {
            let projectName = null,
              sectionName = null,
              committeeName = null;
            let _pid = "projectId" in params ? params.projectId : null;
            let _sid = "sectionId" in params ? params.sectionId : null;
            let _cid = "committeeId" in params ? params.committeeId : null;
            if (_cid) committeeName = appCtx.getCommitteeName(_cid);
            if (_pid) {
              const r = appCtx.getProjectName(_pid, _sid);
              projectName = r[0];
              sectionName = r[1];
            }
            
            let _newUpdate = cleanUpdateModel({
              author: appCtx.user.name??appCtx.user.displayName??"",
              authorId: appCtx.user.id,
              userId: appCtx.user.userId,
              projectId: _pid,
              sectionId: _sid,
              committeeId: _cid,
              projectName: projectName,
              sectionName: sectionName,
              committeeName: committeeName,
              isPinned:isHome || (newUpdateModel && newUpdateModel.type == "request help"),
              ...newUpdateModel,
            }); 
            fb.createUpdate(_newUpdate);
            console.log(_newUpdate);
          }}
          onCancel={() => {
            setIsAddingUpdate(false);
          }}
        />
      )}
      <UpdatesList>
        {updates &&
          updates
          .filter((u)=>u.isPinned)
            .sort((a, b) => b.date - a.date)
            .map((updateData) => {
              return (
                <UpdateBox
                  key={updateData.id}
                  id={updateData.id}
                  updateData={updateData}
                  isSelector={selectorOpen == updateData.id}
                  updateUpdate={(newUpdateData) => {
                    fb.updateUpdate(newUpdateData.id, newUpdateData);
                  }}
                  setSelectorOpen={(updateData) => {
                    setSelectorOpen(updateData.id)
                  }}
                  deleteUpdate={(updateData) => {
                    if (
                      window.confirm(
                        "Are you sure? This action cannot be reversed"
                      )
                    ) {
                      fb.deleteUpdate(updateData.id);
                    } else {
                      return;
                    }
                  }}
                />
              );
            })}
            <hr/>
            {updates &&
          updates
            .filter((u)=>!u.isPinned).sort((a, b) => b.date - a.date)
            .map((updateData) => {
              return (
                <UpdateBox
                  key={updateData.id}
                  id={updateData.id}
                  updateData={updateData}
                  isSelector={selectorOpen == updateData.id}
                  updateUpdate={(newUpdateData) => {
                    fb.updateUpdate(newUpdateData.id, newUpdateData);
                  }}
                  setSelectorOpen={(updateData) => {
                    setSelectorOpen(updateData.id)
                  }}
                  deleteUpdate={(updateData) => {
                    if (
                      window.confirm(
                        "Are you sure? This action cannot be reversed"
                      )
                    ) {
                      fb.deleteUpdate(updateData.id);
                    } else {
                      return;
                    }
                  }}
                />
              );
            })}
      </UpdatesList>
    </UpdatesContainer>
  );
};

export default UpdatesSection;

const UpdatesList = styled.div`
  overflow: scroll;
  height: 100%;
  box-sizing: content-box;
  padding: 15px;
  hr{
    margin-bottom:10px;
  }
`;
const UpdatesMenu = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  > div {
    display: flex;
  }
  .updateTitle {
    font-family: "Baloo 2";
    font-size: 21px;
    font-style: normal;
    font-weight: 600;
    text-align: baseline;
  }
  h3 {
    font-family: Baloo 2;
    font-style: normal;
    font-weight: 800;
    font-size: 21px;
    display: flex;
    align-items: center;
  }
  padding: 0px 0px 10px 10px;
`;
const UpdatesContainer = styled.div`
  width: 100%;
  height: 100%;
 // box-sizing: content-box;
`;
const ButtonOne = styled.button`
  background: #E6FAF5;
  border-radius: 60px;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: normal;
  color: #757575;
  height: 35px;
  width: 100px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border:1px solid #0CC998;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: 0.25s;
  &:hover {
    color:white;
    box-shadow: inset 0 0 0 2em #0cc998;
    transform: translateY(-0.25em);
  }
`;

const ButtonTwo = styled.button`
  background: #FFF7EC;
  border-radius: 60px;
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight:normal;
  color: #757575;
  height: 35px;
  width: 100px;
  margin: 10px 15px;
  cursor: pointer;
  border:1px solid #EAA828;
  transition: 0.25s;
  &:hover {
    color:white;
    box-shadow: inset 0 0 0 2em #EAA828;
    transform: translateY(-0.15em);
  }
`;

