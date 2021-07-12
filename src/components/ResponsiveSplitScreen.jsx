import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import LeftPanel from "components/Panels/LeftPanel";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, BreadcrumbText, Arrow } from "styles/sharedStyles";
import { Drawer } from "@material-ui/core";

//TODO figure out best way to do breadcrumbs
const Breadcrumb = ({currentPage}) => {
    const urlParts = window.location.href.split("/");

    if (currentPage == "home")
      return (
        <Breadcrumbs>
          <NavLink to="/">
            <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
          </NavLink>
        </Breadcrumbs>
      );
    //TODO nested breadcrumbs
    return (
      <Breadcrumbs>
        <NavLink to="/">
          <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
        </NavLink>
        <Arrow> &gt; </Arrow>
        <NavLink to={`/${currentPage}`}>
          <BreadcrumbText>{currentPage && currentPage.toUpperCase()}</BreadcrumbText>
        </NavLink>
      </Breadcrumbs>
    );
  };

const ResponsiveSplitScreen = ({
  currentPage,
  LeftComponent,
  RightComponent,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });

  
  if (!isMobile)
    return (
      <RowWrapper>
        <LeftPanel />
        <LeftStyle>
          <Breadcrumb />
          <LeftComponent />
        </LeftStyle>
        <RightStyle>
          <RightComponent />
        </RightStyle>
      </RowWrapper>
    );
  else {
      // TODO mobile layout
    return (
      <RowWrapper>
        <Drawer
          variant={isMobile ? "temporary" : "permenant"}
          anchor="left"
          open={false}
          onClose={() => {}}
        >
          <LeftPanel />
        </Drawer>
        <div>
        <TopStyle>
          <Breadcrumb />
          <LeftComponent />
        </TopStyle>
        <BottomStyle>
          <RightComponent />
        </BottomStyle>
      </div>
      </RowWrapper>
    );
  }
};
export default ResponsiveSplitScreen;


export const ResponsiveFullScreen = ({ currentPage, MainComponent }) => {

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
  width: 55vw;
  background-color: #FFFFFF;
  padding: 3vh 40px 10vh 40px;
`;

const RightStyle = styled.div`
  width: 45vw;
  max-width:800px;
  min-width:500px;
  
  height:100vh;
  background-color: #EEEEEE;
  padding: 3vh 20px 10vh 20px;
`;

const TopStyle = styled.div`
  width: 100%;
  padding: 3vh 40px 10vh 40px;
`;

const BottomStyle = styled.div`
  width: 100%;
  padding: 3vh 40px 10vh 40px;
`;
