import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import LeftPanel from "components/Panels/LeftPanel"
import ControlContext from '../../shared/control-context';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import {committeeIcons} from "data/dummydata"
import { useMediaQuery } from 'react-responsive';
import { EmphasizedSmallBodyText, LargeBodyText, PageSubtitleText, PageTitleText, ProjectCardText, ProjectCardTextWhite, SectionHeaderText, SmallestBodyTextBlack, SmallestBodyTextWhite } from "styles/sharedStyles";
import ProjectBox from "components/projectBox";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

export default function ProjectsPage() {
  const ctrctx = useContext(ControlContext);

  let projectsData= ctrctx.getProjectsData();
  projectsData = projectsData?Object.values(projectsData):[];

  let history = useHistory();
  const LeftComponent = ()=>{
    return (
      
      <LeftStyle>
       <OverviewSection>
      <PageTitleText>Projects</PageTitleText>
     
        {
        ctrctx.editMode? <EditTextarea
        style={{"font-weight": "200;", "font-size": "16px;"}}
        defaultValue={`We are a student group that......
        ... nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.
             `}
        /> :
        <LargeBodyText>
        We are a student group that......
        ... nudge towards holding CMU accountable and working toward real change. We believe that creating this will valuable since it will connect us more to the CMU community and spread the word.
        </LargeBodyText>
        }
       
      {/* <QuickLinksSection/> */}
   </OverviewSection>
   <ProjectsSection>

  
   <SectionHeaderText> Active Projects </SectionHeaderText>
   <Row>
     {
       projectsData.filter((v)=>!v.isArchived).sort((a,b)=>a["end_date"]>b["end_date"]?-1:1).map((project)=>{
        return( 
       <ProjectBox
       project={project}
       onClick={()=>history.push(`/projects/${project.id}`)}
       />
         )
       })
     }
   </Row>
   <SectionHeaderText> Archived Projects </SectionHeaderText>
   <Row>
     {
       projectsData.filter((v)=>v.isArchived).sort((a,b)=>a["end_date"]>b["end_date"]?-1:1).map((project)=>{
        return( 
          
       <ProjectBox
       project={project}
       onClick={()=>history.push(`/past-projects/${project.id}`)}
       />
       )
       })
     }
   </Row>
 </ProjectsSection>
 </LeftStyle>
 )
  }
  const RightComponent = ()=>{
    return (  
      <RightStyle>
          <UpdatesSection
          allowAddUpdate={false}
          />
      </RightStyle> 
      )
  }


  return (
    <ResponsiveSplitScreen
         currentPage={'projects'}
         LeftComponent={LeftComponent}
         RightComponent={RightComponent}
    />
   );
}

const RightStyle= styled.div`
  height:100%;
`
const LeftStyle= styled.div`
  height:100%;
`

const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
  margin-bottom:20px;
  max-width:600px;
 
`
 const OverviewSection = styled.div`
    margin-bottom:30px;
`

const ProjectsSection = styled.div`
  height:100%;
`
