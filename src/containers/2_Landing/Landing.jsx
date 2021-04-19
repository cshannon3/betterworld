import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import LeftPanel from "containers/Panels/LeftPanel"
import ControlContext from '../../shared/control-context';



export default function Landing() {
  const ctrctx = useContext(ControlContext);
  const projectData = ctrctx.data["projects"];
  const committeeData = ctrctx.data["committees"];

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
            <LinkBox>
                test
            </LinkBox>
            <LinkBox>
                test
            </LinkBox>
            <LinkBox>
                test
            </LinkBox>
            <LinkBox>
                test
            </LinkBox>
            </Row>
        </QuickLinksSection>
        <CommitteeSection>
          <h2> Committees</h2>
          <Row>
            {committeeData.map((data)=>
            <CommitteeBox >
            <div className="contentBox">
                <div className="order">{`0${data["order"]}`}</div>
                <div className="name">{data["name"]}</div>
                <div className="line"/>
            </div>
            <img src={data["icon"]} alt={data["name"]}/>
           </CommitteeBox>
            )}
            
            
          </Row>
        </CommitteeSection>

        <ProjectsSection>
          <h2> Projects/Actions</h2>
          <Row>
          <ProjectBox>test</ProjectBox>
          <ProjectBox>test</ProjectBox>
          <ProjectBox>test</ProjectBox>
          <ProjectBox>test</ProjectBox>
          </Row>
        </ProjectsSection>
      </ContentContainer>
    </Row>
  )
}


const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
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
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  
`
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
    background: #0CC998;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
`


const ProjectsSection = styled.div`
  width:100%
`
const ProjectBox = styled.div`
  height:194px;
  min-width:244px;
  background: #0CC998;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`