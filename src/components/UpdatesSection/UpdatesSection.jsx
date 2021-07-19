import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import UpdateBox from "components/UpdatesSection/UpdateBox";
import AddUpdateComponent from "components/UpdatesSection/AddUpdateComponent";
import * as fb from "shared/firebase";
import { useParams } from "react-router-dom";
import ControlContext from "shared/control-context";
import NewUpdateBox from "./NewUpdateBox";
import { cleanUpdateModel } from "data_models/updatemodel";

// import {
/*
Send in page info and this automatically gets resources
*/

const UpdatesSection = ({ allowAddUpdate = true }) => {
  const appCtx = useContext(ControlContext);
  const [updates, setUpdates] = useState(null);
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(null);
  const urlParts = window.location.href.split("/");
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
          //committeeId = params.committeeId;
          setupListener(fb.getCommitteeUpdates(params.committeeId));
        } else setupListener(fb.getCommitteeUpdates());
      } else if (urlParts.includes("projects")) {
        if ("projectId" in params) {
          //projectId = params.projectId;
          if ("sectionId" in params) {
            //sectionId = params.sectionId;
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
            <ButtonOne onClick={() => setIsAddingUpdate(true)}>
              {"Add"}
            </ButtonOne>
          )}
        </div>
      </UpdatesMenu>
      {isAddingUpdate && (
        <NewUpdateBox
          key="testKey"
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
              author: appCtx.user.name,
              authorId: appCtx.user.id,
              userId: appCtx.user.userId,
              projectId: _pid,
              sectionId: _sid,
              committeeId: _cid,
              projectName: projectName,
              sectionName: sectionName,
              committeeName: committeeName,
              ...newUpdateModel,
            }); //appCtx.getCommitteeName(params.committeeId)
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
            .sort((a, b) => b.date - a.date)
            .map((updateData) => {
              return (
                <UpdateBox
                  key={updateData.id}
                  id={updateData.id}
                  updateData={updateData}
                  isSelector={selectorOpen == updateData.id}
                  updateUpdate={(newUpdateData) => {
                    // let newUpdates = updates;
                    // let u = newUpdates.findIndex(
                    //   (up) => up.id == newUpdateData.id
                    // );
                    fb.updateUpdate(newUpdateData.id, newUpdateData);
                    // newUpdates[u] = newUpdateData;
                    // updateUpdates(newUpdates);
                  }}
                  setSelectorOpen={(updateData) => {
                    //setSelectorOpen(updateData.id)
                  }}
                  deleteUpdate={(updateData) => {
                    if (
                      window.confirm(
                        "Are you sure? This action cannot be reversed"
                      )
                    ) {
                      // let newUpdates = updates.filter(
                      //   (u) => u.id != updateData.id
                      // );
                      //todo add delete function
                      fb.deleteUpdate(updateData.id);
                      //updateUpdates(newUpdates);
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
  background: #0cc998;
  border-radius: 72.2872px;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: bold;
  color: white;
  height: 35px;
  width: 100px;
  margin: 10px;
  cursor: pointer;
`;

// const UpdatesSection = ({
//   updates = [],
//   selectorOpen,
//   user = null,
//   stages = null,
//   projectId=null,
//   committeeId=null,
//   sectionId=null,
//   page="home",
//   updateUpdates = (newUpdates) => {},
//   setSelectorOpen = (updateId) => {},
// }) => {

//   const urlParts = window.location.href.split("/");
/* <button>Filter</button> */
/* <AddUpdateComponent
            type={"default"}
            stages={[]}
            user={user}
            onSave={async (newUpdate) => {
              //   console.log("On Save");
              //   // add ids to new update
              //   const _newUpdate = {...newUpdate, "projectId":projectId, "committeeId":committeeId, "sectionId":sectionId}
              //   // TODO this gets added to db 
              //   await fb.createUpdate(_newUpdate);
              // if (updates) updateUpdates([...updates, _newUpdate]);
              // else updateUpdates([newUpdate]);
            }}
          /> */

//   return (
//     <UpdatesContainer >
//       <UpdatesMenu >
//         <div className={"updateTitle"}>
//           Updates
//         </div>
//         <div>
//           {/* <button>Filter</button> */}
//           <AddUpdateComponent
//             type={"default"}
//             stages={stages}
//             user={user}
//             onSave={async (newUpdate) => {
//                 console.log("On Save");
//                 // add ids to new update
//                 const _newUpdate = {...newUpdate, "projectId":projectId, "committeeId":committeeId, "sectionId":sectionId}
//                 // TODO this gets added to db
//                 await fb.createUpdate(_newUpdate);
//               if (updates) updateUpdates([...updates, _newUpdate]);
//               else updateUpdates([newUpdate]);
//             }}
//           />
//         </div>
//       </UpdatesMenu>
//       <UpdatesList>
//         {updates &&
//           updates
//             .sort((a, b) => b.date - a.date)
//             .map((updateData) => {
//               return (
//                 <UpdateBox
//                   key={updateData.id}
//                   id={updateData.id}
//                   updateData={updateData}
//                   isSelector={selectorOpen == updateData.id}
//                   updateUpdate={(newUpdateData) => {
//                     let newUpdates = updates;
//                     let u = newUpdates.findIndex(
//                       (up) => up.id == newUpdateData.id
//                     );
//                     fb.updateUpdate(newUpdateData.id, newUpdateData);
//                     newUpdates[u] = newUpdateData;
//                     updateUpdates(newUpdates);
//                   }}
//                   setSelectorOpen={(updateData) =>
//                     setSelectorOpen(updateData.id)
//                   }
//                   deleteUpdate={(updateData) => {
//                     if (
//                       window.confirm(
//                         "Are you sure? This action cannot be reversed"
//                       )
//                     ) {
//                       let newUpdates = updates.filter(
//                         (u) => u.id != updateData.id
//                       );
//                       //todo add delete function
//                       fb.deleteUpdate(updateData.id);
//                       updateUpdates(newUpdates);
//                     } else {
//                       return;
//                     }
//                   }}
//                 />
//               );
//             })}
//       </UpdatesList>
//     </UpdatesContainer>
//   );
// };

// export default UpdatesSection;

// const UpdatesList = styled.div`
//   overflow: scroll;
//   height: calc(100% - 95px);
//   padding: 15px;
// `;
// const UpdatesMenu = styled.div`
//   display: flex;
//   height: 75px;
//   justify-content: space-between;
//   > div {
//     display: flex;
//   }
//   .updateTitle{
//     font-family: 'Baloo 2';
//     font-size: 21px;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 33px;
//     letter-spacing: 0em;
//   }
//   h3 {
//     font-family: Baloo 2;
//     font-style: normal;
//     font-weight: 800;
//     font-size: 21px;
//     display: flex;
//     align-items: center;
//   }
//   padding: 0px 0px 10px 20px;
// `;
// const UpdatesContainer = styled.div`
//   width: 100%;
//   height: 100%;
// `;
