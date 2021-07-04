import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import LeftPanel from "components/Panels/LeftPanel"
import ControlContext from '../../shared/control-context';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import {committeeIcons} from "data/dummydata"
import { NavLink } from 'react-router-dom'
import { EmphasizedSmallBodyText, LargeBodyText, PageSubtitleText, PageTitleText, ProjectCardText, ProjectCardTextWhite, SectionHeaderText, SmallestBodyTextBlack, SmallestBodyTextWhite } from "styles/sharedStyles";

import { useMediaQuery } from 'react-responsive';
 


export default function ProfilePage() {
  const ctrctx = useContext(ControlContext);

  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })
    

  const [profileData, setProfileData] = useState(
        ctrctx.getMemberData("conreshan@gmail.com")
  );
  console.log(profileData);
  return (
    <RowWrapper>
      <LeftPanel />
      <ContentContainer isMobile={isMobile}>
        <OverviewSection>
          <PageSubtitleText>BETTERWORLD</PageSubtitleText>
          <PageTitleText>{ctrctx.user && ctrctx.user.displayName}</PageTitleText>
        </OverviewSection>
      </ContentContainer>
    </RowWrapper>
  )
}

const RowWrapper = styled.div`
  display: flex;
  overflow:hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  } 
`

const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow:scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  } 
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  ${({ isMobile }) =>
  isMobile ?
  ` max-width: calc(100vw );
`: `max-width: calc(100vw - 170px);`
}
  padding: 3vh 40px 10vh 40px;
 
`
 const OverviewSection = styled.div`
`
const QuickLinksSection = styled.div`
  width:100%;
`
const CommitteeSection = styled.div`
  width:100%;
`
const CommitteeBox = styled.div`
    position: relative;
    cursor:pointer;
    height:111px;
    min-width:244px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    background: #0CC998;
    img {
      position: absolute;
      top:0px;
      right:0px;
      height:111px;
      min-width:244px;
    }
    .contentBox{
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding-left: 30px;
      height:100px;

     .order {
        color:white;
        font-family: 'Baloo 2';
        font-weight:normal;
        font-size: 26px;
        line-height: 28px;
      }
  
      .line {
        background-color:white;
        width: 50px;
        height: 3px;
        margin-top:5px;
        border-radius: 11px;
      }
    }
`

const LinkBox = styled.div`
    height:60px;
    min-width:60px;
    img{
      height:54px;
      width:60px;
      margin:3px;
    }
`


const ProjectsSection = styled.div`
  //width:100%;
`
const ProjectBox = styled.a`
  height:194px;
  min-width:244px;
  cursor: pointer;
  text-decoration: none;
  background: #FAFAFA;
  border: 1px solid #0CC998;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 15px;
`

const ArchivedProjectBox = styled.a`
  height:194px;
  min-width:244px;
  cursor: pointer;
  text-decoration: none;
  background: #B6B6B6;
  border: 1px solid #0CC998;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 15px;
 
`
