import ProjectContext from '../../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components"

export default function ProjectInfoModule() {
    const ctx = useContext(ProjectContext);

    return (<ProjectTitleBox>
        <div>
            <div>
                <ProjectsSubtitle>CMU AGAINST ICE</ProjectsSubtitle>
                <ProjectsTitle>Projects</ProjectsTitle>
            </div>
            <div>
                <ProjectsSubtitle>Target Date</ProjectsSubtitle>
                <DateTitle>{ctx.data["target date"]}</DateTitle>
            </div>
        </div>
        <ProjectName>{ctx.data["name"]}</ProjectName>
        <DescriptionText>{ctx.data["description"]}</DescriptionText>
        <div>
            <ProjectsSubtitle>
                People
            </ProjectsSubtitle>
            <ProjectsSubtitle>
                40 tasks completed
            </ProjectsSubtitle>
        </div>
    </ProjectTitleBox>)
}


const ProjectsSubtitle = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    
    color: #000000;
`;
const DescriptionText = styled.p`
font-family: Helvetica;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 24px;
`;
const ProjectName = styled.p`
font-family: Baloo 2;
font-style: normal;
font-weight: 800;
font-size: 26px;
line-height: 41px;
display: flex;
align-items: center;
letter-spacing: -0.02em;
`;

const DateTitle = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 70px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: black;
`;
const ProjectsTitle = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 70px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #0CC998;
`;

const ProjectTitleBox = styled.div`
  display: grid;
  grid-area: 1 / 1 / span 2 / span 2;
  padding: 0px 50px 0px 0px;
  &:nth-child(1) > div{
      display:flex;
      justify-content: space-between;
  }
 
 `
