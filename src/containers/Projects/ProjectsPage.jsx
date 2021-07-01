import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import LeftPanel from "containers/Panels/LeftPanel"
import ControlContext from '../../shared/control-context';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import {committeeIcons} from "dummydata"
import { useMediaQuery } from 'react-responsive';
import { EmphasizedSmallBodyText, LargeBodyText, PageSubtitleText, PageTitleText, ProjectCardText, ProjectCardTextWhite, SectionHeaderText, SmallestBodyTextBlack, SmallestBodyTextWhite } from "styles/sharedStyles";



export default function ProjectsPage() {
  const ctrctx = useContext(ControlContext);
  let projectsData= ctrctx.getProjectsData();
  projectsData = projectsData?Object.values(projectsData):[];
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })


  let history = useHistory();

  const formatDate = (d) =>{
    return d.substring(0, d.length-13)
  }

 
  const getNumUpdates= (projectData)=>{
    let numUpdates = 0;
    projectData["sections"].forEach((section) => {
      if (section["updates"])
        numUpdates+= section["updates"].length;
    });
    return numUpdates;
  }

  return (
    <RowWrapper>
      <LeftPanel />
      <ContentContainer isMobile={isMobile}>
      <OverviewSection>
          <PageSubtitleText>BETTERWORLD</PageSubtitleText>
          <PageTitleText>CMU Against ICE</PageTitleText>
       </OverviewSection>
        
        <ProjectsSection>
          <SectionHeaderText> Projects/Actions</SectionHeaderText>
          <Row>
            {
              projectsData.sort((a,b)=>a["end_date"]>b["end_date"]?-1:1).map((project)=>{
               return( 
               project["isArchived"]?
               <ArchivedProjectBox onClick={()=>{
                history.push(`/projects/${project.id}`);
              }}>
                    <ProjectCardText isArchived={project["isArchived"]}>{project.name}</ProjectCardText>
                    <div className="line"/>
                    <br/>
                    <SmallestBodyTextWhite><span >Start date:</span>{formatDate(project["start_date"])}</SmallestBodyTextWhite>
                    <SmallestBodyTextWhite><span >End Date: </span> {formatDate(project["end_date"])}</SmallestBodyTextWhite>
                    <br/>
                    <SmallestBodyTextWhite><span>Updates:</span> 22</SmallestBodyTextWhite>
                    <SmallestBodyTextWhite><span>Contributors:</span>{project["contributors"]?.length}</SmallestBodyTextWhite>
              </ArchivedProjectBox>:

               <ProjectBox onClick={()=>{
                  history.push(`/projects/${project.id}`);
                }}>
                      <ProjectCardText>{project.name}</ProjectCardText>
                      <div className="line"/>
                      <br/>
                      <SmallestBodyTextBlack ><span >Start date:</span> {formatDate(project["start_date"])}</SmallestBodyTextBlack>
                      <SmallestBodyTextBlack ><span >Est. Completion:</span>{formatDate(project["end_date"])}</SmallestBodyTextBlack>
                      <br/>
                      <SmallestBodyTextBlack ><span>Updates:</span> {getNumUpdates(project)}</SmallestBodyTextBlack>
                </ProjectBox>
                )
              })
            }
          </Row>
        </ProjectsSection>
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
  flex-wrap: wrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  } 
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isMobile }) =>
  isMobile ?
  ` max-width: calc(100vw );
`: `max-width: calc(100vw - 170px);`
}
  padding: 3vh 40px 10vh 40px;
 
`
 const OverviewSection = styled.div`
`

const ProjectsSection = styled.div`
  //width:100%;
`
const ProjectBox = styled.a`
  height:194px;
  min-width:244px;
  width:244px;
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
  width:244px;
  cursor: pointer;
  text-decoration: none;
  background: #B6B6B6;
  border: 1px solid #0CC998;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 15px;
 
`
