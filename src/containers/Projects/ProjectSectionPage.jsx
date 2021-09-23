import { useMemo, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import * as styles from "styles/sharedStyles";
import ControlContext from "shared/control-context";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import * as fb from "shared/firebase";
import { useTable, useSortBy, useGlobalFilter } from "react-table";

import LinkOutIcon from "assets/linkout.png";
import { fuzzyTextFilterFn } from "shared/utils";
import { getIconType } from "shared/utils";
import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Tooltip from "@material-ui/core/Tooltip";

import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import AddLinkPopup from "components/AddLinkPopup";
import QuickLinksSection from "components/QuickLinks";



const ProjectSectionPage = () => {
  const ctrctx = useContext(ControlContext);
  const urlParts = window.location.href.split("/");
  const projectId = urlParts[urlParts.length - 2];
  const sectionId = urlParts[urlParts.length - 1];
  const [membersData, setMembersData] = useState(null);
  const [link, setLink] = useState(null);
  const [fileModalOpen, setFileModalOpen] = useState(false);

  const [membersSnapshot, loadingMembers, error] = useCollection(
    fb.getMembers(),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const [projectSnapshot, loadingProject, errorProject] = useDocument(
    fb.getProjectRef(projectId),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  if (!loadingMembers && !membersData) {
    const _mems = membersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMembersData(_mems);
  }
//TODO fix this so it's set by setstate
  const data =
    !loadingProject &&
    projectSnapshot.data()["sections"]?.filter((s) => s.id == sectionId)[0];
  const LeftComponent = () => {
    const stages = data["stages"].map((st) => st.name);
    // TODO change this

    let allContributors = [];
    membersData.forEach((member) => {
      if ("projects" in member && projectId in member.projects) {
        let _roles = member.projects[projectId].roles;
        if (_roles && _roles.filter((r) => r.sectionId === sectionId).length) {
          allContributors.push(member);
        }
      }
    });
    const getContributors = (stageData) => {
      let _contributors = [];
      if (!membersData) return [];
      membersData.forEach((member) => {
        if ("projects" in member && projectId in member.projects) {
          let _roles = member.projects[projectId].roles;
          if (
            _roles &&
            _roles.filter(
              (r) => r.stageId === stageData.id && r.sectionId === sectionId
            ).length
          ) {
            _contributors.push(member);
          }
        }
      });
      return _contributors;
    };
    if (link)
      return (
        <MainContainer>
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
        </MainContainer>
      );
    return loadingProject ? (
      <div>Loading</div>
    ) : (
      <MainContainer>
        <div>
          <h2>{data["name"]}</h2>
          <div className="header">
            <div>
              <styles.PageSubtitleText>{`Point Person:`}</styles.PageSubtitleText>
              <styles.RegularBodyText>
                {allContributors.length > 0 && allContributors[0].name}
              </styles.RegularBodyText>
            </div>
            <div>
              <styles.PageSubtitleText>{`Members (${allContributors.length})`}</styles.PageSubtitleText>
              <AvatarGroup max={7}>
                {allContributors
                  .slice(
                    0,
                    allContributors.length < 7 ? allContributors.length : 7
                  )
                  .map((c) => {
                    return ( <Tooltip
                        title={
                          <styles.ToolTipText>{c.name}</styles.ToolTipText>
                        }
                      >
                        <Avatar alt={c.name}>{c.name[0]/*"photoUrl" in c ? c.photoUrl: c.name[0]*/}</Avatar>
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
          </div>
          <div>
            <div className="description">
              <styles.PageSubtitleText>Description</styles.PageSubtitleText>
            </div>
            <styles.RegularBodyText style={{ padding: "5px 20px 20px 0px" }}>
              {" "}
              {data["description"]}
            </styles.RegularBodyText>
          </div>
        </div>
        <div className="tasks">
          <StagesComponent
            data={data["stages"].map((dd) => {
              return { ...dd, contributors: getContributors(dd) };
            })}
            membersData={membersData}
            clickLink={(_link) => {
              if (_link.includes("docs.google.com")) setLink(_link);
              else window.open(_link, "_blank");
            }}
            onAddMember={(rowData, member) => {
              let newMember = { ...member };
              console.log(rowData);
              if (!(projectId in newMember.projects)) {
                newMember.projects[projectId] = {
                  name: projectSnapshot.data()["name"],
                  roles: [],
                };
              }
              newMember.projects[projectId].roles = [
                ...newMember.projects[projectId].roles,
                {
                  role: "contributor",
                  stage: rowData["name"],
                  stageId: rowData["id"],
                  sectionId: sectionId,
                  projectId: projectId,
                  section: data["name"],
                  project: projectSnapshot.data()["name"],
                  type: rowData["type"],
                },
              ];
              console.log(newMember);
              fb.updateMember(member.id, { ...newMember });
            }}
            onAddLink={(rowData, name, url) => {
              const _name = name;
              console.log(_name);
              let projectSections = projectSnapshot.data().sections;
              let sectionIndex = projectSections.findIndex((s)=> s.id==data.id);
              let newSectionData = data; //?.filter((s) => s.id !== sectionId)
              let stageIndex =  newSectionData["stages"].findIndex((s)=> s.id== rowData["id"]);
              if( newSectionData.stages[stageIndex] && "resources" in newSectionData.stages[stageIndex]){
                newSectionData.stages[stageIndex].resources.push({
                  name:name,
                  url:url});
              }else{
                newSectionData.stages[stageIndex]["resources"] = [{
                  name:name,
                  url:url}]
              }
              projectSections[sectionIndex]=newSectionData;
              projectSnapshot.ref.update({
                sections: projectSections
              });
              setFileModalOpen(true);
            }}
            setModalOpen={(val) => setFileModalOpen(val)}
            onChangeStatus={(newStatus, rowData)=>{
              let projectSections = projectSnapshot.data().sections;
              let sectionIndex = projectSections.findIndex((s)=> s.id==data.id);
              let newSectionData = data; //?.filter((s) => s.id !== sectionId)
              let stageIndex =  newSectionData["stages"].findIndex((s)=> s.id== rowData["id"]);
              newSectionData.stages[stageIndex].status = newStatus;
              projectSections[sectionIndex]=newSectionData;
              projectSnapshot.ref.update({
                sections: projectSections
              });
            }}
          />
        </div>
      </MainContainer>
    );
  };


  if (!data) return null;
  return (
    <ResponsiveSplitScreen
      currentPage={"projects"}
      LeftComponent={LeftComponent}
      RightComponent={UpdatesSection}
      projectName={ !loadingProject && projectSnapshot.data()["name"]}
      sectionName = {data && data["name"]}
    />
  );
};

fuzzyTextFilterFn.autoRemove = (value) => !value;

const StagesComponent = ({
  data = [],
  membersData = [],
  clickLink,
  onAddMember,
  onAddLink,
  setModalOpen,
  onChangeStatus,
}) => {
  const columns = useMemo(
    () => [
      {
        width: 300,
        Header: "Stage",
        accessor: "name",
        Cell: ({ cell }) => (
          <StageTitle status={cell.row.values["status"]}>
            {" "}
            {cell.value}{" "}
          </StageTitle>
        ),
      },
      {
        Header: "People",
        accessor: "contributors",
        Cell: ({ cell }) => (
          <QuickLinksSection
            items={cell.value}
            type={"members"}
            membersData = {membersData}
            onAddMember = {(m)=>onAddMember(cell.row.original, m)}
          />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => (
          <StageStatus>
            <select name="status" id="status" value={cell.value} onChange={(v)=>onChangeStatus(v.target.value, cell.row.original)}>
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </StageStatus>
        ),
      },

      {
        Header: "Link",
        accessor: "resources",
        Cell: ({ cell }) => {
         // console.log(cell.value);
          return (
            <Popup
              trigger={
                <AvatarGroup max={3}>
                  {cell.value &&
                    cell.value
                      .slice(0, cell.value.length < 2 ? cell.value.length : 2)
                      .map((c) => {
                        return (
                          <Tooltip
                            title={
                              <styles.ToolTipText>{c.name}</styles.ToolTipText>
                            }
                          >
                            <Avatar
                              onClick={(e) => clickLink(c.url)}
                              alt="Doc Name"
                              src={getIconType(c.url)}
                            />
                          </Tooltip>
                        );
                      })}
                  <Avatar
                    alt="Remy Sharp"
                    onClick={(e) =>setModalOpen(true) }
                  >
                    +
                  </Avatar>
                </AvatarGroup>
              }
              position="left center"
            >
              <AddLinkPopup
                  onAddLink={(name, url)=> onAddLink(cell.row.original, name, url)}
                  setModalOpen={setModalOpen}
              />
            </Popup>
          );
        },
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
    <TableSection>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <span> &darr;</span>
                    ) : (
                      <span> &uarr;</span>
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableSection>
  );
};
export default ProjectSectionPage;

const MainContainer = styled.div`
  padding-top: 15px;
  width: 100%;
  height: 100%;
  .Modal {
    z-index: 999999;
  }
  .header {
    //height: 20%;
    display: flex;
    padding-top: 10px;
    justify-content: space-between;
    .date {
      color: green;
    }
  }
  .description {
    padding-top: 20px;
  }
  .descriptionText {
    font-size: 16px;
    padding: 10px 0px 60px 0px;
  }

  .tasks {
  }
  .buttons {
    height: 100px;
    width: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

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

const AddMemberPopUp = styled.div`
  height: 250px;
  overflow: scroll;
`;

const AddMemberTile = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const TableSection = styled.section`
  height: 100%;
  margin: auto;
  table {
    width: 100%;
  }
  thead {
    background-color: var(--brand-regular);
    border-radius: 0.4rem;
  }
  th,
  td {
    grid-column: span 2;
    text-align: left;
  }
  th {
    padding-bottom: 10px;
    font-family: "Baloo 2";
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 33px;
  }
  td {
    font-size: 16px;
  }
  span {
    margin-left: 1rem;
  }
`;

//could keep as "blocked" and black?
const StageTitle = styled.div`
  font-family: "Baloo 2";
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  display: flex;
  align-items: center;
  border-left: 5px solid;
  padding: 30px 5px;
  ${({ status }) =>
    status === "in progress"
      ? `border-left:10px solid #EFF265;`
      : status === "not started"
      ? `border-left:10px solid #ffcc81;`
      : `border-left:10px solid #0CC998;`}
`;

const StageStatus = styled.div`
  font-family: "Helvetica";
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 11px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  select {
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
`;

