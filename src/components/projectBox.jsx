import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { EmphasizedSmallBodyText, LargeBodyText, PageSubtitleText, PageTitleText, ProjectCardText, ProjectCardTextWhite, SectionHeaderText, SmallestBodyTextBlack, SmallestBodyTextWhite } from "styles/sharedStyles";

  //history.push(`/projects/${project.id}`);
 const ProjectBox = ({project, onClick=()=>{}}) =>{
    const formatDate = (d) =>{
        return d.substring(0, d.length-13)
      }
      const getNumUpdates= (projectData)=>{
        let numUpdates = 0;
        if(projectData["updates"]) numUpdates = projectData["updates"].length;
        return numUpdates;
      }

   return( 
    project["isArchived"]?
    <ArchivedProjectBox onClick={onClick}>
         <ProjectCardText isArchived={project["isArchived"]}>{project.name}</ProjectCardText>
         <div className="line"/>
         <br/>
         <SmallestBodyTextWhite><span >Start date:</span>{formatDate(project["start_date"])}</SmallestBodyTextWhite>
         <SmallestBodyTextWhite><span >End Date: </span> {formatDate(project["end_date"])}</SmallestBodyTextWhite>
         <br/>
         <SmallestBodyTextWhite><span>Updates:</span> 22</SmallestBodyTextWhite>
         <SmallestBodyTextWhite><span>Contributors:</span>{project["contributors"]?.length}</SmallestBodyTextWhite>
   </ArchivedProjectBox>:

    <ProjectBoxStyle onClick={onClick}>
           <ProjectCardText>{project.name}</ProjectCardText>
           <div className="line"/>
           <br/>
           <SmallestBodyTextBlack ><span >Start date:</span> {formatDate(project["start_date"])}</SmallestBodyTextBlack>
           <SmallestBodyTextBlack ><span >Est. Completion:</span>{formatDate(project["end_date"])}</SmallestBodyTextBlack>
           <br/>
           <SmallestBodyTextBlack ><span>Updates:</span> {getNumUpdates(project)}</SmallestBodyTextBlack>
     </ProjectBoxStyle>
     );
}

export default ProjectBox;




const ProjectBoxStyle = styled.a`
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

