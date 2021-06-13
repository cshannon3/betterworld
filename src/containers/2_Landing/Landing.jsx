import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import LeftPanel from "containers/Panels/LeftPanel"
import ControlContext from '../../shared/control-context';
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import {committeeIcons} from "dummydata"
import { NavLink } from 'react-router-dom'

export default function Landing() {
  const ctrctx = useContext(ControlContext);
  let projectsData= ctrctx.getProjectsData();
  projectsData = projectsData?Object.values(projectsData):[];
  
  
  //const committeeData = ctrctx.data["committees"];
  const committeeData = Object.values(ctrctx.getCommitteesData());
  const quickData = ctrctx.data["quick_links"];
  console.log(committeeData);
  
  let history = useHistory();


  return (
    <Row>
      <LeftPanel />
      <ContentContainer>
        <OverviewSection>
          <h3>BETTERWORLD</h3>
          <h1>CMU Against ICE</h1>
          <p>We align ourselves with student movements mobilizing with Mijente under the #NoTechForICE campaign and organize to challenge the dominant narratives at CMU and in broader society.</p>
        </OverviewSection>
        <QuickLinksSection>
          <h3>Quick Links</h3>
          <Row>
          {quickData.map((data) =>
              <Tooltip title={data.tip}>
              <a href={data.url} target="_blank">
                <LinkBox>
                  <img src={data.icon} alt={data.title} />
                </LinkBox>
              </a>
            </Tooltip>
            )}
          </Row>
        </QuickLinksSection>
        <CommitteeSection>
          <h2> Committees</h2>
          <Row>
            {committeeData.map((data) =>
              <CommitteeBox onClick={()=>{
                history.push(`/committee/${data.id}`);
              }}>
                <div className="contentBox">
                  <div className="order">{`0${data["order"]}`}</div>
                  <div className="name">{data["name"]}</div>
                  <div className="line" />
                </div>
                <img src={committeeIcons[data["id"]]} alt={data["name"]} />
              </CommitteeBox>
            )}
          </Row>
        </CommitteeSection>
        <ProjectsSection>
          <h2> Projects/Actions</h2>
          <Row>
            {
              projectsData.map((project)=>{
               return( <ProjectBox onClick={()=>{
                  history.push(`/project/${project.id}`);
                }}>
                      <div className="name">{project.name}</div>
                      <div className="line"/>
                      <br/>
                      <p ><span >Start date:</span> 1/3/21</p>
                      <p><span >Est. Completion:</span> 12/2/21</p>
                      <br/>
                      <p><span>Task Count:</span> 13/30</p>
                      <p><span>Volunteers:</span> 4</p>
                </ProjectBox>)
              })
            }
          </Row>
        </ProjectsSection>
      </ContentContainer>
    </Row>
  )
}


const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow:scroll;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  width: 100%;
  padding: 3vh 40px 10vh 40px;
  h1 {
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 94px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #0CC998;
  }
  h2 {
    font-family: Baloo 2;
    font-style: normal;
    font-weight: 800;
    font-size: 26px;
    color: black;
  }
  h3 {
    font-weight: 800;
    font-size: 21px;
    line-height: 33px;
    color: black;
  }
  p {
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: 200;
    font-size: 22px;
    line-height: 27px;
    display: flex;
    align-items: center;
    color: #000000;
  }
`
const OverviewSection = styled.div`
  width:100%;
  min-height:
`
const QuickLinksSection = styled.div`
  width:100%;
`
// background: #FFFFFF;
// box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
// border-radius: 3px;
const CommitteeSection = styled.div`
  width:100%
`
const CommitteeBox = styled.div`
    position: relative;
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

      .name, .order {
        color:white;
        font-family: Baloo 2;
        font-weight:normal;
        font-size: 32px;
        line-height: 28px;
      }
      .name {
        font-weight:800;
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
    // background: white;
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // border-radius: 3px;
    img{
      height:54px;
      width:60px;
      margin:3px;
    }
`


const ProjectsSection = styled.div`
  width:100%;
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
  .name {
    color: #0CC998;
    font-family: Baloo 2;
    font-weight:normal;
    font-size: 32px;
    line-height: 28px;
    font-weight:800;
  }

  .line {
    background-color: #0CC998;
    width: 50px;
    height: 3px;
    margin-top:5px;
    border-radius: 11px;
  }
  p{
    font-family: Helvetica Neue;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }
  span{
    font-weight:bold;
  }
`
