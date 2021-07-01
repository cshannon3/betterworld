import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import LeftPanel from "containers/Panels/LeftPanel";
import ControlContext from "../../shared/control-context";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import { committeeIcons } from "dummydata";
import { NavLink } from "react-router-dom";
import {
  EmphasizedSmallBodyText,
  LargeBodyText,
  PageSubtitleText,
  PageTitleText,
  ProjectCardText,
  ProjectCardTextWhite,
  SectionHeaderText,
  SmallestBodyTextBlack,
  SmallestBodyTextWhite,
  Breadcrumbs,
  BreadcrumbText,
  Arrow,
} from "styles/sharedStyles";

import { useMediaQuery } from "react-responsive";


export default function Landing() {
  const ctrctx = useContext(ControlContext);
  let projectsData = ctrctx.getProjectsData();
  projectsData = projectsData ? Object.values(projectsData) : [];
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const committeeData = Object.values(ctrctx.getCommitteesData());

  let history = useHistory();

  return (
    <RowWrapper>
      <LeftPanel />
      <ContentContainer isMobile={isMobile}>
        <OverviewSection>
          <Breadcrumbs>
             <NavLink to="/">
              <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
            </NavLink>
            <Arrow> &gt; </Arrow>
            <NavLink to="/committees">
              <BreadcrumbText>Committees</BreadcrumbText>
            </NavLink>
          </Breadcrumbs>
        </OverviewSection>
        <CommitteeSection>
          <SectionHeaderText> Committees</SectionHeaderText>
          <Row>
            {committeeData.map((data) => (
              <CommitteeBox
                onClick={() => {
                  history.push(`/committees/${data.id}`);
                }}
              >
                <div className="contentBox">
                  <div className="order">{`0${data["order"]}`}</div>
                  <ProjectCardTextWhite className="name">
                    {data["name"]}
                  </ProjectCardTextWhite>
                  <div className="line" />
                </div>
                <img src={committeeIcons[data["id"]]} alt={data["name"]} />
              </CommitteeBox>
            ))}
          </Row>
        </CommitteeSection>
      </ContentContainer>
    </RowWrapper>
  );
}

const RowWrapper = styled.div`
  display: flex;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isMobile }) =>
    isMobile
      ? ` max-width: calc(100vw );
`
      : `max-width: calc(100vw - 170px);`}
  padding: 3vh 40px 10vh 40px;
`;
const OverviewSection = styled.div``;
const QuickLinksSection = styled.div`
  width: 100%;
`;
const CommitteeSection = styled.div`
  width: 100%;
`;
const CommitteeBox = styled.div`
  position: relative;
  cursor: pointer;
  height: 111px;
  min-width: 244px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  background: #0cc998;
  img {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 111px;
    min-width: 244px;
  }
  .contentBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 30px;
    height: 100px;

    .order {
      color: white;
      font-family: "Baloo 2";
      font-weight: normal;
      font-size: 26px;
      line-height: 28px;
    }

    .line {
      background-color: white;
      width: 50px;
      height: 3px;
      margin-top: 5px;
      border-radius: 11px;
    }
  }
`;

const LinkBox = styled.div`
  height: 60px;
  min-width: 60px;
  img {
    height: 54px;
    width: 60px;
    margin: 3px;
  }
`;

const ProjectsSection = styled.div`
  //width:100%;
`;
const ProjectBox = styled.a`
  height: 194px;
  min-width: 244px;
  cursor: pointer;
  text-decoration: none;
  background: #fafafa;
  border: 1px solid #0cc998;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 15px;
`;

const ArchivedProjectBox = styled.a`
  height: 194px;
  min-width: 244px;
  cursor: pointer;
  text-decoration: none;
  background: #b6b6b6;
  border: 1px solid #0cc998;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 20px 15px;
`;
