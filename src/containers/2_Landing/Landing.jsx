import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
// import ControlContext from '../../shared/control-context'

// import ReactModal from 'react-modal'
// import Trashcan from 'assets/Landing/delete.svg'
// import GroupIcon from 'assets/Landing/group.png'
// import Pin from 'assets/Landing/pin.svg'
// import FilledPin from 'assets/Landing/filled-pin.svg'
// import Pencil from 'assets/Landing/pencil.svg'
// import { Title, Breadcrumbs, Input, FilterButton, ContentContainer, HeaderRow } from 'assets/StyledComponents/Shared'
// import { Link } from 'react-router-dom'
import LeftPanel from "containers/Panels/LeftPanel"
// import ModalContent from 'containers/Modal/AddModalContent'
// import DeleteModalContent from 'containers/Modal/DeleteModalContent'
// import { OverlayContainer } from 'assets/StyledComponents/Overlay'


export default function Landing() {
 


  return (
    <Row>
    <LeftPanel />
    <ContentContainer>
     <h1>Landing</h1>
    </ContentContainer>
  </Row>
  )
}





const Row = styled.div`
  display: flex;
  width: 100%;
`

const ContentContainer = styled.div`
  width: 100%;
  padding: 5vh 5% 0 5%;
`
const TeamsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`

const Team = styled.div`
  width: 30%;
  margin-right: 3%;
  height: 250px;
  background-color: #ECF6FF;
  border-radius: 15px;
  margin-bottom: 40px;
`

const TeamName = styled.p`
  margin-top: 10px;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EditIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 15px;
  cursor: pointer;
`

const TrashIcon = styled.img`
  position: absolute;
  top: 0px;
  right: 10px;
  height: 25px;
  width: 25px;
  cursor: pointer;
`

const PinIcon = styled.img`
  position: absolute;
  top: 0px;
  left: 15px;
  height: 25px;
  width: 25px;
  cursor: pointer;
`

const SectionName = styled.div`
  font-family: Open Sans;
  font-weight: bold;
  font-size: 18px;
  color: #9B9B9B;
  margin-top: 40px;
`

const AddCard = styled.div`
  width: 30%;
  height: 250px;
  border: 2px solid #0466C8;
  border-radius: 15px;
  margin-right: 3%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 40px;
`

const AddText = styled.p`
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0466C8;
  text-align: center;
`

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 0 auto;
  background: #0466C8;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 50px;
  height: 50px;
`
