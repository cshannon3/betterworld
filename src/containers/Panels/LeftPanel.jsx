import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import FolderIcon from '../../assets/Panel/folder1.png'
import NetworkIcon from '../../assets/Panel/network1.png'
import EarthIcon from '../../assets/Panel/planet-earth1.png'
import UserIcon from '../../assets/Panel/user1.png'
import { useHistory } from "react-router-dom";


export default function LeftPanel() {
    const {
        user,
        logoutUser,
    } = useContext(ControlContext);
    let history = useHistory();


    return (
        <Panel>
            <section>
                <PhotoUrl src={user && user.photoUrl} alt='Profile' />
                {/* <Name>{user && user.displayName.split(' ')[0]}</Name> */}
            </section>
            <Line />
            <div onClick={()=>{
              history.push("/");
            }}>
                <PhotoIcon src={EarthIcon} alt='Projects' />
                <MenuText>OVERVIEW</MenuText>
            </div>
            <div onClick={()=>{
              history.push("/project/immigrationjustice");
            }}>
                <PhotoIcon src={FolderIcon} alt='Projects' />
                <MenuText>PROJECTS</MenuText>
            </div>
            <div onClick={()=>{
              history.push("/committee");
            }}>
                <PhotoIcon src={NetworkIcon} alt='Projects' />
                <MenuText>COMMITTEES</MenuText>
            </div>
            <div>
                <PhotoIcon src={UserIcon} alt='Projects' />
                <MenuText>MY INFO</MenuText>
            </div>
            <LogoutBtn className='logoutBtn' onClick={() => logoutUser()}>Log Out</LogoutBtn>
        </Panel>
    )
}



const Line = styled.hr`
  height: 1px;
  border-color: white;
  width: 90%;
  margin: 30px 5% 30px 5%;
`

const Panel = styled.div`
  min-height: 100vh;
  width: 12%;
  min-width: 160px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: auto;
  background: linear-gradient(180deg, #0CCB97 0%, #00529D 96.87%);
`

const PhotoIcon = styled.img`
  width: 43px;
  height:auto;
  max-width: 100px;
  display: block;
  margin: 5vh auto 20px auto;
`
const MenuText = styled.h4`
width: 100%;
  color:white;
  font-size:medium;
  text-align: center;
  margin: 1vh auto 20px auto;
`
const PhotoUrl = styled.img`
  border-radius: 50px;
  width: 100px;
  max-width: 100px;
  display: block;
  margin: 5vh auto 20px auto;
`

const Name = styled.p`
  font-size: 18px;
  text-align: center;
`

const LogoutBtn = styled.button`
  width: 100px;
  font-size: 14px;
  display: block;
  margin-left: 3%;
  position: absolute;
  bottom: 3vh;
  cursor: pointer;
  background: #C4C4C4;
  border: none;
  padding: 10px;
  border-radius: 10px;
`
