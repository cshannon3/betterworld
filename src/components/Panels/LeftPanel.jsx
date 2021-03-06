import React, { useContext } from "react";
import styled from "styled-components";
import ControlContext from "../../shared/control-context";
import FolderIcon from "../../assets/Panel/folder1.png";
import NetworkIcon from "../../assets/Panel/network1.png";
import EarthIcon from "../../assets/Panel/planet-earth1.png";
import UserIcon from "../../assets/Panel/user1.png";
import { useHistory, useParams } from "react-router-dom";
// TODO highlight the active tab
//https://material-ui.com/components/drawers/
//import { useMediaQuery } from "react-responsive";

export default function LeftPanel({activeTab}) {
  const { user, logoutUser } = useContext(ControlContext);
  let history = useHistory();
  //const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const params = useParams();
  const groupId = params["groupId"];
  console.log(groupId);

  return (
    <Panel>
      <section>
        <PhotoUrl src={user && user.photoUrl} alt="Profile" />
        {user && user.isAdmin && <MemberType>Admin</MemberType>}
        {user && user.notifications && (
          <Notifs>{`${user.notifications.length} new notifications`}</Notifs>
        )}
      </section>
      <Line />
      <div
        className="active"
        id="overviewSideLink"
        onClick={() => {
          history.push(`/${groupId}`);
        }}
      >
        <PhotoIcon src={EarthIcon} alt="Overview" />
        <MenuText>OVERVIEW</MenuText>
      </div>
      <div
        id="projectSideLink"
        onClick={() => {
          history.push(`/${groupId}/projects`);
        }}
      >
        <PhotoIcon src={FolderIcon} alt="Projects" />
        <MenuText>PROJECTS</MenuText>
      </div>
      <div
        id="committeeSideLink"
        onClick={() => {
          history.push(`/${groupId}/committees`);
        }}
      >
        <PhotoIcon src={NetworkIcon} alt="Committees" />
        <MenuText>COMMITTEES</MenuText>
      </div>
      <div
        id="myInfoSideLink"
        onClick={() => {
          history.push(`/${groupId}/profile`);
        }}
      >
        <PhotoIcon src={UserIcon} alt="Projects" />
        <MenuText>MY INFO</MenuText>
      </div>
      <LogoutBtn className="logoutBtn" onClick={() => logoutUser()}>
        Log Out
      </LogoutBtn>
    </Panel>
  );
}

const MemberType = styled.h2`
  font-family: "Baloo 2";
  font-size: 20px;
  width: 100%;
  text-align: center;
  color: white;
`;

const Notifs = styled.p`
  width: 100%;
  text-align: center;
  color: white;
`;

const Line = styled.hr`
  height: 1px;
  border-color: white;
  width: 90%;
  margin: 30px 5% 30px 5%;
`;

const Panel = styled.div`
  min-height: 100vh;
  max-width: 150px;
  min-width: 150px;
  width: 150px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(180deg, #0ccb97 0%, #00529d 96.87%);
`;

const PhotoIcon = styled.img`
  width: 43px;
  height: auto;
  max-width: 100px;
  display: block;
  margin: 5vh auto 20px auto;
  cursor: pointer;
`;
const MenuText = styled.h4`
  width: 100%;
  color: white;
  font-size: medium;
  text-align: center;
  margin: 1vh auto 20px auto;
`;
const PhotoUrl = styled.img`
  border-radius: 50px;
  width: 100px;
  max-width: 100px;
  display: block;
  margin: 5vh auto 20px auto;
`;

const Name = styled.p`
  font-size: 18px;
  text-align: center;
`;

const LogoutBtn = styled.button`
  width: 100px;
  font-size: 14px;
  display: block;
  position: absolute;
  bottom: 3vh;
  margin-left: 25px;
  cursor: pointer;
  background: #c4c4c4;
  border: none;
  padding: 10px;
  border-radius: 10px;
`;

/* <div id="projectSideLink" onClick={()=>{
              history.push("/project/immigrationjustice");
            }}>
                <PhotoIcon src={FolderIcon} alt='Projects' />
                <MenuText>PROJECTS</MenuText>
            </div>
            <div id="committeeSideLink" onClick={()=>{
              history.push("/committee");
            }}>
                <PhotoIcon src={NetworkIcon} alt='Committees' />
                <MenuText>COMMITTEES</MenuText>
            </div> */

// isMobile? (
//   <Drawer
//       variant={isMobile?"temporary":"permenant"}
//       anchor="left"
//       open={false}
//       onClose={()=>{}}
//     >
//     <Panel>
//         <section>
//             <PhotoUrl src={user && user.photoUrl} alt='Profile' />
//             {/* <Name>{user && user.displayName.split(' ')[0]}</Name> */}
//             {user&& user.isAdmin && <MemberType>Admin</MemberType>}
//             {user && user.notifications && <p>{`${user.notifications.length} notifications`}</p>}
//         </section>
//         <Line />
//         <div className="active" id="overviewSideLink" onClick={()=>{
//           history.push("/");
//         }}>
//             <PhotoIcon src={EarthIcon} alt='Overview' />
//             <MenuText>OVERVIEW</MenuText>
//         </div>
//         <div id="projectSideLink" onClick={()=>{
//           history.push("/project/immigrationjustice");
//         }}>
//             <PhotoIcon src={FolderIcon} alt='Projects' />
//             <MenuText>PROJECTS</MenuText>
//         </div>
//         <div id="committeeSideLink" onClick={()=>{
//           history.push("/committee");
//         }}>
//             <PhotoIcon src={NetworkIcon} alt='Committees' />
//             <MenuText>COMMITTEES</MenuText>
//         </div>
//         <div id="myInfoSideLink"onClick={()=>{
//           history.push("/profile");
//         }}>
//             <PhotoIcon src={UserIcon} alt='User' />
//             <MenuText>MY INFO</MenuText>
//         </div>
//         <LogoutBtn className='logoutBtn' onClick={() => logoutUser()}>Log Out</LogoutBtn>
//     </Panel>
//     </Drawer>
// )
