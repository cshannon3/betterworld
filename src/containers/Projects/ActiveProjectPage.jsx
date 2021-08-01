import React, { useMemo, useContext, useState, useEffect, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import { NavLink, useParams } from "react-router-dom";
import * as fb from "shared/firebase";
// import {
//   LadderModule,
//   AtAGlanceModule,
// } from "../../old/ProjectPage/Modules/modules";
import styled from "styled-components";

import ControlContext from "shared/control-context";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";

import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
//import styles from './search.module.css';
import * as styles from "styles/sharedStyles";
import { fuzzyTextFilterFn } from "shared/utils";
import { useHistory } from "react-router-dom";
import { cleanProjectModel } from "data_models/projectmodel";
import QuickLinksSection from "components/QuickLinks";

const ActiveProjectPage = () => {
  const { projectId } = useParams();
  const [link, setLink] = useState(null);
  const appCtx = useContext(ControlContext);
  const urlParts = window.location.href.split("/");
  console.log(urlParts);
  const [projectData, setProjectData] = useState(
    appCtx.getProjectData(projectId)
  );
  const user = appCtx.user;

  let helpRequests = [];
  let totalUpdates = [];

  projectData["sections"]?.forEach((section) => {
    if (section["updates"])
      section["updates"].forEach((update) => {
        totalUpdates.push({ ...update, section_name: section.name });
        if (update && update["type"] == "request help") {
          helpRequests.push({ ...update, section_name: section.name });
        }
      });
  });
  let contributorsSections = {};

  projectData["sections"]?.forEach((section) => {
    let names = [];
    projectData["contributors"]?.forEach((contr) => {
      if (
        contr.projects[projectData.id].roles.filter(
          (role) => role.sectionId == section.id
        ).length
      ) {
        names.push(contr);
      }
    });
    contributorsSections[section["id"]] = [...names];
  });

  const LeftComponent = () => {
    if (link)
      return (
        
       <LeftWrapper >
          <ProjectInfoContainer>
          <div>
            <ProjectsTitle>{projectData["name"]}</ProjectsTitle>
          </div>
          <div style={{ height: "100%" , width:"100%"}}>
          <button onClick={() => setLink(null)}>X</button>
          <a href={link} target="_blank">
            go to
          </a>
          <iframe
            width="100%"
            height="100%"
            src={link}
            allowFullScreen
          ></iframe>
          </div>
          </ProjectInfoContainer>
        </LeftWrapper>
      );
    return (
      <LeftWrapper>
        <ProjectInfoContainer>
          <div>
            <ProjectsTitle>{projectData["name"]}</ProjectsTitle>
          </div>
          <PointPerson>{`Point Person: ${projectData["point_person"]["name"]}`}</PointPerson>
          <DescriptionText>{projectData["description"]}</DescriptionText>
        </ProjectInfoContainer>
        <QuickLinksSection
          resources={projectData["resources"] ?? []}
          clickLink={(_link) => {
            if(_link.includes("docs.google.com")) setLink(_link);
            else window.open(_link, '_blank');
          }}
          addLink={(url, name) => {
            fb.getProjectRef({ id: projectId, groupID: "cmu-against-ice" })
              .get()
              .then((snapData) => {
                const d = snapData.data();
                snapData.ref.update({
                  resources: [...d["resources"], { url, name }],
                });
              });
          }}
        />
        <LadderModule
          projectData={projectData}
          contributors={contributorsSections}
        />
      </LeftWrapper>
    );
  };

  const RightComponent = () => {
    
    return (
      <RightStyle>
        {/* <AtAGlanceModule projectData={projectData} /> */}
        <UpdatesSection />
      </RightStyle>
    );
  };
  return (
    <ResponsiveSplitScreen
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
};

export default ActiveProjectPage;

const RightStyle = styled.div`
  height: 100%;
`;
const LeftStyle = styled.div`
  height: 100%;

`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width:100%;
`;


const ProjectInfoContainer = styled.div`
  height: 100%;
  padding: 0px 50px 0px 0px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ProjectsTitle = styled.h2`
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: bold;
  font-size: 60px;
  line-height: 70px;
  display: flex;
  align-items: center;
  color: #0cc998;
`;

const ProjectsSubtitle = styled.p`
  font-family: "Baloo 2";
  font-weight: 800;
  font-size: 16px;
  color: #000000;
  span {
    color: #0cc998;
  }
  white-space: pre-wrap;
  padding-bottom: 15px;
`;
const PointPerson = styled(ProjectsSubtitle)`
  padding-top: 15px;
`;

const DescriptionText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;

// const Flex = styled.div`
//   display: flex;
//   width: 100%;

//   ${({ isMobile }) =>
//     isMobile
//       ? `
// flex-direction: column;

// `
//       : `.GalleryStyle{
//       width: 50%;
//       height: 50vh;
//     }
//     `}
// `;

// Let the table remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = (value) => !value;

const LadderModule = ({ projectData, openLadderModal, contributors }) => {
  const data = projectData["sections"];
  // let contributors = {};
  let statuses = {};
  const history = useHistory();

  data.forEach((section) => {
    if ("stages" in section) {
      let stat = section["stages"].find(
        (stage) => stage.name === section["status"]
      );
      if (stat && "status" in stat) {
        statuses[section["id"]] = stat["status"];
      } else {
        statuses[section["id"]] = "Not Started";
      }
    } else {
      statuses[section["id"]] = "Not Started";
    }
  });

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => (
          <styles.RegularBodyText
            value={cell.value}
            onClick={
              () => history.push(`/${cell.row.original["id"]}`)
              // openLadderModal(cell.row.original)
            }
          >
            {cell.value}
          </styles.RegularBodyText>
        ),
        width: 200,
      },
      {
        width: 300,
        Header: "Team",
        accessor: "id",
        Cell: ({ cell }) => (
          <div>
            <AvatarGroup max={3}>
              {contributors[cell.value].map((c) => {
                return "photoUrl" in c ? (
                  <Avatar alt="Remy Sharp" src={c.photoUrl} />
                ) : (
                  <Avatar alt="Remy Sharp">{c.name[0]}</Avatar>
                );
              })}
            </AvatarGroup>
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => (
          <div>
            <styles.RegularBodyText>
              {cell.value}
              <br />({statuses[cell.row.original.id]})
            </styles.RegularBodyText>
          </div>
        ),
      },
      {
        Header: "Updates",
        accessor: "updates",
        Cell: ({ cell }) => (
          <div>
            <styles.RegularBodyText>
              {cell.value ? cell.value.length : 0} Updates
              <br />
              {cell.value
                ? cell.value.filter(
                    (update) => update["type"] == "request help"
                  ).length
                : 0}{" "}
              Help Requests
            </styles.RegularBodyText>
          </div>
        ),
      },
    ],
    []
  );

  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text(rows, id, filterValue) {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data, filterTypes }, useGlobalFilter, useSortBy);

  return (
    <TaskOverviewBox>
      <TitleBar>
        <div>
          <span>Sections Overview</span>
        </div>
      </TitleBar>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <span>&darr;</span>
                    ) : (
                      <span>&uarr;</span>
                    )
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                onClick={() =>
                  history.push(
                    `/projects/${projectData["id"]}/${row.original["id"]}`
                  )
                }
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </TaskOverviewBox>
  );
};

const TitleBar = styled(styles.GreyTitleBar)`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  font-family: "Baloo 2";
  font-weight: 800;
  font-size: 14px;
`;

const TaskOverviewBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-top: 20px;
  min-height:400px;
  overflow: scroll;
  table {
    width: 100%;
  }
  thead {
    background-color: var(--brand-regular);
    border-radius: 0.4rem;
  }
  tbody {
  }
  th,
  td {
    grid-column: span 2;
    padding: 1rem;
    text-align: left;
  }
  th {
    font-size: 18px;
    font-weight: bold;
    font-family: "Baloo 2";
  }
  td {
    font-size: 14px;
  }
  span {
    margin-left: 1rem;
  }
`;

const TableRow = styled.tr`
  background-color: #fbfbfb;
  cursor: pointer;
  &:hover {
    background-color: #cffcf0;
  }
`;
