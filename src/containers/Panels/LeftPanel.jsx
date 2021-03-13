import React, { useContext } from "react"
import styled from "styled-components"
import ControlContext from '../../shared/control-context'
import { NavLink } from 'react-router-dom'
import Folder from '../../assets/Panel/folder1.png'


export default function LeftPanel() {
    const {
        user,
        logoutUser,
    } = useContext(ControlContext);



    return (
        <Panel>
            <section>
                <PhotoUrl src={user && user.photoUrl} alt='Profile' />
                {/* <Name>{user && user.displayName.split(' ')[0]}</Name> */}
            </section>
            <Line />
            <div>
                <PhotoIcon src={Folder} alt='Projects' />
                <MenuText>PROJECTS</MenuText>
            </div>
            <div>
                <PhotoIcon src={Folder} alt='Projects' />
                <MenuText>PROJECTS</MenuText>
            </div>
            <div>
                <PhotoIcon src={Folder} alt='Projects' />
                <MenuText>PROJECTS</MenuText>
            </div>
            <div>
                <PhotoIcon src={Folder} alt='Projects' />
                <MenuText>PROJECTS</MenuText>
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
