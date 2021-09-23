import React, { useMemo, useContext, useState, useEffect, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import { useParams } from "react-router-dom";
import * as fb from "shared/firebase";
import styled from "styled-components";

//import ControlContext from "shared/control-context";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";

import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import * as styles from "styles/sharedStyles";
import { fuzzyTextFilterFn } from "shared/utils";
import { useHistory } from "react-router-dom";
import QuickLinksSection from "components/QuickLinks";
import LinkOutIcon from "assets/linkout.png";
import Tooltip from "@material-ui/core/Tooltip";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const ActiveProjectPage = () => {
  const { groupId, projectId } = useParams();
  const [link, setLink] = useState(null);

  const [projectData, setProjectData] = useState(null);
  const [projectSnapshot, loadingProject, errorProject] = useDocument(
    fb.getProjectRef(projectId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  const [updatesSnapshot, loadingUpdates, errorUpdates] = useCollection(
    fb.getProjectUpdates(projectId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  const [membersSnapshot, loadingMembers, errorMembers] = useCollection(
    fb.getMembers(groupId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );


  let helpRequests = [];
  let totalUpdates = [];

  if (!loadingProject &&  !loadingUpdates &&!loadingMembers&& !projectData ) {
  
    let _projectData = {...projectSnapshot.data(),  id:projectSnapshot.id, contributors:[], updates:[]};
    _projectData["contributors"] = membersSnapshot.docs.filter((v) => (("projects" in v.data()) && (projectId in v.data().projects))).map((v)=>{return {...v.data(), id:v.id}});
    _projectData["updates"] = updatesSnapshot.docs.map((d)=>{return {...d.data(), id:d.id}});
   
    _projectData["sections"]?.forEach((section) => {
      section["updates"] =  _projectData["updates"]
      .filter((v) => v.sectionId == section.id);
    });
    
    setProjectData(_projectData);
    totalUpdates = _projectData["updates"];
    helpRequests = _projectData["updates"].filter((d)=>d.type == "request help");
  }


  // projectData && projectData["sections"]?.forEach((section) => {
  //   if (section["updates"])
  //     section["updates"].forEach((update) => {
  //       totalUpdates.push({ ...update, section_name: section.name });
  //       if (update && update["type"] == "request help") {
  //         helpRequests.push({ ...update, section_name: section.name });
  //       }
  //     });
  // });
  let contributorsSections = {};

  projectData &&projectData["sections"]?.forEach((section) => {
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
        <LeftWrapper>
          <ProjectInfoContainer>
            <div>
              <styles.PageTitleText>{projectData&&projectData["name"]}</styles.PageTitleText>
            </div>
            <div style={{ height: "100%", width: "100%" }}>
              <OptionsBar>
                <LinkBox href={link} target="_blank">
                  <img src={LinkOutIcon} />
                </LinkBox>
                <button onClick={() => setLink(null)}>Close</button>
              </OptionsBar>
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
      !projectData?<LeftWrapper></LeftWrapper>:
      <LeftWrapper>

        <ProjectInfoContainer>
          <div>
            <styles.PageTitleText>{projectData["name"]}</styles.PageTitleText>
          </div>
          <InfoRow2>
            <div>
            <styles.PageSubtitleText>{`Point Person:`}</styles.PageSubtitleText>
            <styles.LargeBodyText>{projectData["point_person"]["name"]}</styles.LargeBodyText>
          </div>
            <div>
              <styles.PageSubtitleText>{`Members (${projectData["contributors"]?.length})`}</styles.PageSubtitleText>
              <AvatarGroup max={7}>
                {projectData["contributors"]
                  ?.slice(
                    0,
                    projectData["contributors"]?.length < 7
                      ? projectData["contributors"]?.length
                      : 7
                  )
                  .map((c) => {
                    return (
                      <Tooltip
                        title={
                          <styles.ToolTipText>{c.name}</styles.ToolTipText>
                        }
                      >
                        <Avatar alt={c.name}>
                          {
                            c
                              .name[0] /*"photoUrl" in c ? c.photoUrl: c.name[0]*/
                          }
                        </Avatar>
                      </Tooltip>
                    );
                  })}
                <Tooltip
                  title={<styles.ToolTipText>Add Member</styles.ToolTipText>}
                >
                  <Avatar alt="add new">+</Avatar>
                </Tooltip>
              </AvatarGroup>
            </div>
          </InfoRow2>
          <div>
            <styles.LargeBodyText>
              {projectData["description"]}
            </styles.LargeBodyText>
          </div>
        </ProjectInfoContainer>
        <QuickLinksSection
          title={"Quick Links"}
          spacing={-10}
          position="bottom left"
          maxLength={11}
          items={projectData["resources"] ?? []}
          clickLink={(_link) => {
            if (_link.includes("docs.google.com")) setLink(_link);
            else window.open(_link, "_blank");
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
          groupId={groupId}
        />
      </LeftWrapper>
    );
  };

  return (
    <ResponsiveSplitScreen
      LeftComponent={LeftComponent}
      RightComponent={UpdatesSection}
      projectName={projectData && projectData["name"]}
    />
  );
};

export default ActiveProjectPage;

const InfoRow2 = styled.div`
  display: flex;
  justify-content:space-between;
  padding-bottom:40px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ProjectInfoContainer = styled.div`
  height: 100%;
  padding: 0px 50px 0px 0px;
  display: flex;
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

// Let the table remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = (value) => !value;

const LadderModule = ({
  projectData,
  openLadderModal,
  contributors,
  clickLink,
  groupId
}) => {
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
            onClick={() => history.push(`/${groupId}/${cell.row.original["id"]}`)}
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
                // TODO add back in
                //return"photoUrl" in c ? ( <Avatar alt="Remy Sharp" src={c.photoUrl} />) :
                return <Avatar alt="Remy Sharp">{c.name[0]}</Avatar>;
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
                    `/${groupId}/projects/${projectData["id"]}/${row.original["id"]}`
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
const OptionsBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const LinkBox = styled.a`
  height: 25px;
  padding: 0px 10px;
  img {
    height: 25px;
    width: 25px;
  }
`;
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
  min-height: 400px;
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

// const [membersSnapshot, loadingMembers, error] = useCollection(
//   fb.getMembers(),
//   { snapshotListenOptions: { includeMetadataChanges: true } }
// );

// if (!loadingMembers && !membersData) {
//   const _mems = membersSnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   setMembersData(_mems);
// }

// let allContributors = [];
// membersData.forEach((member) => {
//   if ("projects" in member && projectId in member.projects) {
//     let _roles = member.projects[projectId].roles;
//     if (_roles ) {
//       allContributors.push(member);
//     }
//   }
// });
  //const appCtx = useContext(ControlContext);
  //const urlParts = window.location.href.split("/");
  //console.log(urlParts);
  // const [projectData, setProjectData] = useState(
  //   appCtx.getProjectData(projectId)
  // );
  //const user = appCtx.user;
  //const [membersData, setMembersData] = useState(null);