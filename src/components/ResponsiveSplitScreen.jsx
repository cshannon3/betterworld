import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import LeftPanel from "components/Panels/LeftPanel";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import {
  Breadcrumbs,
  BreadcrumbText,
  Arrow,
} from "styles/sharedStyles";
//TODO move sizing over from left panel

const ResponsiveSplitScreen = ({
  currentPage,
  LeftComponent,
  RightComponent,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  const Breadcrumb = () => {
    if(currentPage=="home")return (
        <Breadcrumbs>
        <NavLink to="/">
          <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
        </NavLink>
      </Breadcrumbs>
    );
    return (
      <Breadcrumbs>
        <NavLink to="/">
          <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
        </NavLink>
        <Arrow> &gt; </Arrow>
        <NavLink to={`/${currentPage}`}>
          <BreadcrumbText>{currentPage.toUpperCase()}</BreadcrumbText>
        </NavLink>
      </Breadcrumbs>
    );
  };

  return (
    <RowWrapper>
      <LeftPanel />
      <LeftStyle>
          <Breadcrumb/>
        <LeftComponent />
      </LeftStyle>
      <RightStyle>
        <RightComponent />
      </RightStyle>
    </RowWrapper>
  );
};
export default ResponsiveSplitScreen;

export const ResponsiveFullScreen = ({ currentPage, MainComponent }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  return (
    <RowWrapper>
      <LeftPanel />
      <MainComponent />
    </RowWrapper>
  );
};

const RowWrapper = styled.div`
  display: flex;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const LeftStyle = styled.div`
  width: 50vw;
  padding: 3vh 40px 10vh 40px;
`;

const RightStyle = styled.div`
  width: 50vw;
  background-color: white;
  padding: 3vh 40px 10vh 40px;
`;
