import { useMemo, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import * as styles from "styles/sharedStyles";
import ControlContext from "shared/control-context";
import { cleanUpdateModel } from "data_models/updatemodel";
import UpdatesSection from "components/UpdatesSection/UpdatesSection";
import AddUpdateComponent from "components/UpdatesSection/AddUpdateComponent";
import * as fb from "shared/firebase";
import { useTable, useSortBy, useGlobalFilter } from "react-table";

import JitsiIcon from "assets/Landing/jitsi.png";
import DriveIcon from "assets/Landing/google-drive.png";
import DocIcon from "assets/Landing/google-docs.png";
import InstaIcon from "assets/Landing/insta.png";
import FBIcon from "assets/Landing/fb.png";
import TwitterIcon from "assets/Landing/twitter.png";
import FigmaIcon from "assets/Landing/figma.png";
import GeneralLinkIcon from "assets/Landing/link.png";
import LinkOutIcon from "assets/linkout.png";
import CloseIcon from "assets/closeicon.png";


import { fuzzyTextFilterFn } from "shared/utils";
//import { useHistory } from "react-router-dom";

import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import docIcon from "assets/Landing/google-docs.png";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useForm } from "react-hook-form";
import Tooltip from "@material-ui/core/Tooltip";

import { useCollection , useDocument} from 'react-firebase-hooks/firestore';


const getIconType = (url) => {
  if (url.includes("meet.jit.si")) return JitsiIcon;
  if (url.includes("drive.google.com")) return DriveIcon;
  if (url.includes("docs.google.com")) return DocIcon;
  if (url.includes("www.instagram.com")) return InstaIcon;
  if (url.includes("www.facebook.com")) return FBIcon;
  if (url.includes("www.twitter.com")) return TwitterIcon;
  else return GeneralLinkIcon;
};



const ProjectSectionPage = () => {
  const ctrctx = useContext(ControlContext);
  const urlParts = window.location.href.split("/");
  const projectId = urlParts[urlParts.length - 2];
  const sectionId = urlParts[urlParts.length - 1];
  const [membersData , setMembersData] = useState(null);
  const [link, setLink] = useState(null);
  const [fileModalOpen, setFileModalOpen] = useState(false);




  const [membersSnapshot, loadingMembers, error] = useCollection(
    fb.getMembers(),{ snapshotListenOptions: { includeMetadataChanges: true }, }
  );

  const [projectSnapshot, loadingProject, errorProject] = useDocument(
    fb.getProjectRef(projectId),{snapshotListenOptions: { includeMetadataChanges: true },}
  );


  if(!loadingMembers && !membersData){
    const _mems = membersSnapshot.docs.map(
      (doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    setMembersData(_mems);
  }

  const data =  !loadingProject && projectSnapshot.data()["sections"]?.filter((s) => s.id == sectionId)[0];
  const LeftComponent = () => {
    const stages = data["stages"].map((st) => st.name);
    // TODO change this 

      let allContributors = [];
      membersData.forEach((member) => {
        if ("projects" in member && projectId in member.projects) {
          let _roles = member.projects[projectId].roles;
          if (
            _roles &&
            _roles.filter((r) => ( r.sectionId === sectionId)).length
          ) {
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
            _roles.filter((r) => (r.stageId === stageData.id && r.sectionId === sectionId)).length
          ) {
            _contributors.push(member);
          }
        }
      });
      return _contributors;
    };
    if (link)
    return (
     <MainContainer >
        <div style={{ height: "100%" , width:"100%"}}>
        <OptionsBar>
        
       
        <LinkBox href={link} target="_blank">
         <img src={LinkOutIcon}/>
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
    return loadingProject? <div>Loading</div>:(
      <MainContainer>
   
          <div>
            <h2>{data["name"]}</h2>
            <div className="header">
            <div>
              <styles.PageSubtitleText>{`Point Person:`}</styles.PageSubtitleText>
              <styles.RegularBodyText>{allContributors.length>0 && allContributors[0].name}</styles.RegularBodyText>
              </div>
              <div>
              <styles.PageSubtitleText>{`Members (${allContributors.length})`}</styles.PageSubtitleText>
              <AvatarGroup max={7}>
                {allContributors
                  .slice(0, allContributors.length < 7 ? allContributors.length : 7)
                  .map((c) => {
                    return "photoUrl" in c ? (
                      <Tooltip title={<styles.ToolTipText>{c.name}</styles.ToolTipText>}>
                       <Avatar alt={c.name} src={c.photoUrl} />
                    </Tooltip>
                     
                    ) : (
                      <Tooltip title={<styles.ToolTipText>{c.name}</styles.ToolTipText>}>
                      <Avatar alt={c.name}>{c.name[0]}</Avatar>
                      </Tooltip>
                    );
                  })}
                  <Tooltip title={<styles.ToolTipText>Add Member</styles.ToolTipText>}>
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
              membersData={membersData }
              clickLink={(_link) => {
                if(_link.includes("docs.google.com")) setLink(_link);
                else window.open(_link, '_blank');
              }}
              onAddMember={(rowData, member)=>{
                let newMember = {...member};
                console.log(rowData);
                if(!(projectId in newMember.projects)){newMember.projects[projectId]={name:projectSnapshot.data()["name"], roles:[]}}
                        newMember.projects[projectId].roles = [...newMember.projects[projectId].roles, {
                          role:"contributor",
                          stage: rowData["name"],
                          stageId: rowData["id"],
                          sectionId:sectionId,
                          projectId:projectId,
                          section:data["name"],
                          project:projectSnapshot.data()["name"],
                          type:rowData["type"],
                        }];
                          console.log(newMember);
                fb.updateMember(member.id, {...newMember});
              }}
              onAddLink={(rowData)=>{
                setFileModalOpen(true);
                //fb.updateProject(member.id, {...newMember});
              }}
              setModalOpen={(val)=>setFileModalOpen(val)}
            />
          </div>
    
      </MainContainer>
    );
  };

  const RightComponent = () => {
    //const stages = data["stages"].map((st) => st.name);

    return (
      <UpdatesStyle>
        <UpdatesSection></UpdatesSection>
      </UpdatesStyle>
    );
  };

  if (!data) return null;
  return (
    <ResponsiveSplitScreen
      currentPage={"projects"}
      LeftComponent={LeftComponent}
      RightComponent={RightComponent}
    />
  );
};

fuzzyTextFilterFn.autoRemove = (value) => !value;

const StagesComponent = ({ data = [], membersData = [], clickLink, onAddMember, onAddLink, setModalOpen }) => {
//  const { register, handleSubmit, control } = useForm();
const [name, setName] = useState("");
const [webUrl, setWebUrl] = useState("");
const handleSubmit = (event) => {
  event.preventDefault();
  onAddLink(name, webUrl);
  //createLink(fileType, name, webUrl)
  //setModalOpen(false);
};


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
          <Popup
            trigger={
              <AvatarGroup max={3}>
                {cell.value
                  .slice(0, cell.value.length < 2 ? cell.value.length : 2)
                  .map((c) => {
                    return "photoUrl" in c ? (
                      <Avatar alt="Remy Sharp" src={c.photoUrl} />
                    ) : (
                      <Avatar alt="Remy Sharp">{c.name[0]}</Avatar>
                    );
                  })}
                <Avatar alt="Remy Sharp">+</Avatar>
              </AvatarGroup>
            }
            position="left center"
          >
            <AddMemberPopUp>
              {membersData?.map((m) => {
                return (
                  <AddMemberTile>
                    <div>
                      {m.name} 
                      </div>
                      {cell.value.filter(v=>v.name==m.name).length>0? <button onClick={()=>{}}>Remove</button>:
                      <button onClick={()=>{onAddMember(cell.row.original, m)
                      }}>Add</button>}
                    
                  </AddMemberTile>
                );
              })}
            </AddMemberPopUp>
          </Popup>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }) => (
          <StageStatus>
            <select name="status" id="status" value={cell.value}>
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
        Cell: ({ cell }) =>{
          console.log(cell.value);
        return (
          <Popup
            trigger={
             
              <AvatarGroup max={3}>
                {cell.value && cell.value.slice(0, cell.value.length < 2 ? cell.value.length : 2)
                  .map((c) => {
                    return ( <Tooltip title={<styles.ToolTipText>{c.name}</styles.ToolTipText>}>
                           <Avatar 
                           onClick={(e)=> clickLink(c.url)}
                           alt="Doc Name" src={getIconType(c.url)} 
                           />
                    </Tooltip>);
                    })}
                <Avatar alt="Remy Sharp" onClick={(e)=>{onAddLink(cell.row.original)}}>+</Avatar>
              </AvatarGroup>
             
                }
                position="left center"
          >
            <div>
            <form onSubmit={handleSubmit}>
        <X onClick={() => setModalOpen(false)}>X</X>
        <Title>Add a New File</Title>
        <Label>
          <SectionTitle>Name:</SectionTitle>
          <Input
            type="text"
            name="Name"
            placeholder="New File Name"
            onChange={(event) => setName(event.target.value)}
          />
        </Label>

        <div>
          <SectionTitle>URL:</SectionTitle>
          <Label>
            <Input
              type="text"
              placeholder="Website URL"
              name="URL"
              onChange={(event) => setWebUrl(event.target.value)}
            />
          </Label>
        </div>
        <BtnRow>
          <CancelBtn onClick={() => setModalOpen(false)}>Cancel</CancelBtn>
          <SubmitBtn type="submit" value="Create" />
        </BtnRow>
      </form>
            </div>
          </Popup>
        );
      }
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

//getTrGroupProps={(state, rowInfo, column, instance) => { return { onMouseEnter: (e, handleOriginal) =>{}}}

const UpdatesStyle = styled.div``;

const MainContainer = styled.div`
  padding-top: 15px;
  width:100%;
  height:100%;
.Modal{
  z-index:999999;
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
  .description{
    padding-top:20px;
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
  width:100%;
  display:flex;
  justify-content:flex-end;
`;
const LinkBox = styled.a`
  height: 25px;
  padding:0px 10px;
  img {
    height: 25px;
    width: 25px;
  }
`;
const CloseBox = styled.div`
  height: 25px;
  img {
    height: 25px;
    width: 25px;
  }
`;
const AddMemberPopUp = styled.div`
    height:250px;
    overflow:scroll;
`;

const AddMemberTile = styled.div`
    display:flex;
    justify-content:space-between;
    padding:5px;
`;

const TableSection = styled.section`
  height:100%;
  margin:auto;
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
  select{
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
`;



function AddFileModal({ setModalOpen, addLink = (url, name) => {} }) {
  //const { createLink } = useContext(ControlContext);
  const [name, setName] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    addLink(name, webUrl);
    //createLink(fileType, name, webUrl)
    setModalOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <X onClick={() => setModalOpen(false)}>X</X>
        <Title>Add a New File</Title>
        <Label>
          <SectionTitle>Name:</SectionTitle>
          <Input
            type="text"
            name="Name"
            placeholder="New File Name"
            onChange={(event) => setName(event.target.value)}
          />
        </Label>

        <div>
          <SectionTitle>URL:</SectionTitle>
          <Label>
            <Input
              type="text"
              placeholder="Website URL"
              name="URL"
              onChange={(event) => setWebUrl(event.target.value)}
            />
          </Label>
        </div>
        <BtnRow>
          <CancelBtn onClick={() => setModalOpen(false)}>Cancel</CancelBtn>
          <SubmitBtn type="submit" value="Create" />
        </BtnRow>
      </form>
    </div>
  );
}

const CancelBtn = styled.button`
  border: 1px solid black;
  background white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 20px;
  width: 35%;
  color: #0CC998;
  border: 1px solid #0CC998;
`;

const SubmitBtn = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  background: #0CC998;
  color: white;
  width: 60%;
  border: none;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Icon = styled.img`
  width: 50px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const X = styled.p`
  float: right;
  font-weight: bold;
  margin-left: 40px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #5c677d;
  padding: 10px 10px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: #9b9b9b;
`;

const Label = styled.label`
  width: 100%;
`;
