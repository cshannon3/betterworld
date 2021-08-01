import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import LeftPanel from "components/Panels/LeftPanel";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { Breadcrumbs, BreadcrumbText, Arrow } from "styles/sharedStyles";
import { Drawer } from "@material-ui/core";
import { useParams } from "react-router-dom";
import ControlContext from "shared/control-context";

import Split from "react-split";

//TODO figure out best way to do breadcrumbs
const Breadcrumb = ({ currentPage }) => {
  const urlParts = window.location.href.split("/");
  const params = useParams();
  const appCtx = useContext(ControlContext);
  const groupName = appCtx.groupName;
  let breadcrumbData = [["/", groupName]];

  if (urlParts.includes("committees")) {
    breadcrumbData.push(["arrow"]);
    breadcrumbData.push(["/committees", "Committees"]);
    if ("committeeId" in params) {
      const committeeName = appCtx.getCommitteeName(params.committeeId);
      breadcrumbData.push(["arrow"]);
      breadcrumbData.push([`/committees/${params.committeeId}`, committeeName]);
    }
  } else if (urlParts.includes("projects")) {
    breadcrumbData.push(["arrow"]);
    breadcrumbData.push(["/projects", "Projects"]);
    if ("projectId" in params) {
      if ("sectionId" in params) {
        const [projectName, sectionName] = appCtx.getProjectName(
          params.projectId,
          params.sectionId
        );
        breadcrumbData.push(["arrow"]);
        breadcrumbData.push([`/projects/${params.projectId}`, projectName]);
        breadcrumbData.push(["arrow"]);
        breadcrumbData.push([
          `/projects/${params.projectId}/${params.sectionId}`,
          sectionName,
        ]);
      } else {
        const [projectName] = appCtx.getProjectName(params.projectId);
        console.log(projectName);
        breadcrumbData.push(["arrow"]);
        breadcrumbData.push([`/projects/${params.projectId}`, projectName]);
      }
    }
  } else if (urlParts.includes("profile")) {
    breadcrumbData.push(["arrow"]);
    breadcrumbData.push([`/profile`, "Profile"]);
  } else if (urlParts.includes("past-projects")) {
  }

  return (
    <Breadcrumbs>
      {breadcrumbData.map((bc) => {
        return bc[0] === "arrow" ? (
          <Arrow> &gt; </Arrow>
        ) : (
          <NavLink to={bc[0]}>
            <BreadcrumbText>{bc[1]}</BreadcrumbText>
          </NavLink>
        );
      })}

      {/* <NavLink to="/">
        <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
      </NavLink> */}
    </Breadcrumbs>
  );

  // if (currentPage == "home")

  // //TODO nested breadcrumbs
  // return (
  //   <Breadcrumbs>
  //     <NavLink to="/">
  //       <BreadcrumbText>CMU AGAINST ICE</BreadcrumbText>
  //     </NavLink>
  //     <Arrow> &gt; </Arrow>
  //     <NavLink to={`/${currentPage}`}>
  //       <BreadcrumbText>
  //         {currentPage && currentPage.toUpperCase()}
  //       </BreadcrumbText>
  //     </NavLink>
  //   </Breadcrumbs>
  // );
};

const ResponsiveSplitScreen = ({
  currentPage,
  LeftComponent,
  RightComponent,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
 // const [sizes, setSizes] = useState([50, 50]);

  if (!isMobile)
    return (
      <RowWrapper>
        <LeftPanel />
        <StyledSplit
          onDrag={(sizes) => {
           // console.log(sizes[1]);
             if(sizes[1]<40.0){console.log("hide")}
          }}
        >
          <LeftStyle>
            <Breadcrumb />
            <LeftComponent />
          </LeftStyle>

          <RightStyle>
            <RightComponent />
          </RightStyle>
        </StyledSplit>
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

/* <RowWrapper> <LeftPanel />
        <LeftStyle>
          <Breadcrumb />
          <LeftComponent />
        </LeftStyle>
        <RightStyle>
          <RightComponent />
        </RightStyle> 
      </RowWrapper>*/
const RowWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledSplit = styled(Split)`
  display: flex;
  height: 100vh;
  .gutter {
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .gutter.gutter-horizontal {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
    cursor: col-resize;
  }
`;
const LeftStyle = styled.div`
  background-color: #ffffff;
  padding: 3vh 40px 10vh 40px;
`;

const RightStyle = styled.div`
  background-color: #eee;
  width: 50%;
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
