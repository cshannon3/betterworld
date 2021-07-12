import { useMemo,useState, useContext, useEffect } from 'react';
import styled from "styled-components"
import Modal from 'styled-react-modal'
import * as styles from 'styles/sharedStyles';
import StagesComponent from "../../old/ProjectPage/Modals/LadderModal/StagesComponent";
import ProjectContext from "../../old/ProjectPage/ProjectContext";
import ControlContext from 'shared/control-context';
import { SlackSelector, SlackCounter } from '@charkour/react-reactions';
import { cleanUpdateModel } from 'data_models/updatemodel';
import UpdatesSection from 'components/UpdatesSection/UpdatesSection';
import AddUpdateComponent from 'components/UpdatesSection/AddUpdateComponent';
import * as fb from 'shared/firebase';
import { useMediaQuery } from "react-responsive";
import LeftPanel from "components/Panels/LeftPanel";
import { Link, NavLink , useParams} from "react-router-dom";
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { useAsyncDebounce } from 'react-table';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
//import styles from './search.module.css';

import {fuzzyTextFilterFn} from "shared/utils";
import { useHistory } from "react-router-dom";

import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";


const ProjectSectionPage = () =>{

    const ctrctx = useContext(ControlContext);
    const urlParts = window.location.href.split("/");
    const projectId = urlParts[urlParts.length - 2];
    const sectionId = urlParts[urlParts.length - 1];
   // console.log(projectId);
    //TODO refresh when things change
    const [projectData, setProjectData] = useState(
      ctrctx.getProjectData(projectId)
    );

    const [selectorOpen, setSelectorOpen] = useState(null);
    

    const data = projectData["sections"]?.filter((s)=>s.id==sectionId)[0];
    const LeftComponent = ()=>{
        const stages = data["stages"].map((st)=>st.name);

        return (  
        <MainContainer>
            <div>
               <div>
                <div className="header">
                    <div className="description">
                    <styles.PageSubtitleText>Description</styles.PageSubtitleText>
                     
                    </div>
                    <styles.RegularBodyText >
                        ---
                    </styles.RegularBodyText>

                </div>
                 <div>
                     <styles.RegularBodyText style={{padding:"20px 20px 20px 0px"}}>  {data["description"]}</styles.RegularBodyText>
                </div>
                </div>
                <div className="tasks">
                    <StagesComponent data={data["stages"].map((dd)=>{ return {...dd, "contributors": [...data["contributors"].filter((c)=>c.projects[projectId].roles.filter((r)=>r.stageId===dd.id).length)]} })} /> 
                </div>
                <div className="buttons" >
                    
                    <AddUpdateComponent
                        type={"request help"}
                        style={{color: "#0595A5"}}
                        stages={stages}
                        user={ctrctx.user}
                        onSave={(newUpdate) => {
                            const _newUpdate = {...newUpdate, "projectId":projectId, "committeeId":null, "sectionId":sectionId};
                            // todo add new update to DB
                            fb.createUpdate(_newUpdate);
                            const newSectionData = {...data, "updates":[...data["updates"], _newUpdate]}
                           // ctx.updateSection(newSectionData);
                           // setLadderData(newSectionData);
                        }}
                    />
                </div>
            </div>
        </MainContainer>)
      }


      const RightComponent = ()=>{
        const stages = data["stages"].map((st)=>st.name);

        return (   
            <UpdatesStyle>
            <UpdatesSection
                updates={data["updates"]}
                stages={stages}
                user={ctrctx.user}
                projectId={projectId}
                sectionId={sectionId}
                selectorOpen={selectorOpen}
                updateUpdates={(newUpdates)=>{
                    const newSectionData = {...data,  "updates":newUpdates}
                   // ctx.updateSection(newSectionData);
                    //setLadderData(newSectionData);
                }}
                setSelectorOpen={(id)=>{
                    if(selectorOpen!=id)setSelectorOpen(id);
                    else setSelectorOpen(null);
                }}
            >
            </UpdatesSection>
      </UpdatesStyle>)
      }

    if (!data) return (null)
    return (
        <ResponsiveSplitScreen
            currentPage={"projects"}
            LeftComponent={LeftComponent}
            RightComponent={RightComponent}
        />
    );

};




fuzzyTextFilterFn.autoRemove = (value) => !value;


function LadderModule({projectData, openLadderModal, contributors}) {
   const data = projectData["sections"];
   // let contributors = {};
    let statuses = {}
    const history = useHistory();

   
    data.forEach((section)=>{
        let stat = section["stages"].find((stage)=> stage.name===section["status"])["status"];
        statuses[section["id"]]=stat;
    });

    

    const columns = useMemo(() => [
        {
           
            Header: 'Name',
            accessor: 'name',
            Cell: ({ cell }) => (
                <styles.RegularBodyText value={cell.value} 
                 onClick={()=>history.push(`/${cell.row.original["id"]}`)
                   // openLadderModal(cell.row.original)
                }
                >
                  {cell.value}
                </styles.RegularBodyText>
              ),
              width:200
        },
        {
            width: 300,
            Header: 'Team',
            accessor: 'id',
            Cell: ({ cell }) => (
                <div >
                    <AvatarGroup max={3}>
                        {contributors[cell.value].map((c)=>{
                            return ("photoUrl" in c) ?
                               <Avatar alt="Remy Sharp" src={c.photoUrl}/>
                                 :
                                 <Avatar alt="Remy Sharp" >{c.name[0]}</Avatar>
                        })}
                                 </AvatarGroup>
                </div>
              )
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ cell }) => (
                <div>
                <styles.RegularBodyText>
                  {cell.value} 
                  <br/>({statuses[cell.row.original.id]})
                </styles.RegularBodyText>
                </div>
            )
        },
        {
            Header: 'Updates',
            accessor: 'updates',
            Cell: ({ cell }) => (
                <div >
                    <styles.RegularBodyText>
                  {cell.value ? cell.value.length : 0} Updates
                  <br/> 
                  {cell.value ? cell.value.filter(update=>update["type"] == "request help").length : 0} Help Requests
                    </styles.RegularBodyText>
                </div>
              )
        },
    ], []);

    const filterTypes = useMemo(() => ({
        fuzzyText: fuzzyTextFilterFn,
        text(rows, id, filterValue) {
            return rows.filter((row) => {
                const rowValue = row.values[id];
                return rowValue !== undefined ? (
                    String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                ) : true;
            });
        },
    }), [])

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
   
        <TableSection >
            <TitleBar> 
                <div>
                    <span>Sections Overview</span>
                </div> 
                <button>edit sections</button>
            </TitleBar>
         
            <table  {...getTableProps()} >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    {column.render('Header')}
                                    {column.isSorted ? column.isSortedDesc ? (
                                        <span>
                                            &darr;
                                        </span>
                                    ) : (
                                        <span>
                                            &uarr;
                                        </span>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody  {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}  onClick={()=>history.push(`/projects/${projectData["id"]}/${row.original["id"]}`)}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </TableRow>
                        );
                    })}
                </tbody>
            </table>
        </TableSection >
        </TaskOverviewBox>
    );
}
//getTrGroupProps={(state, rowInfo, column, instance) => { return { onMouseEnter: (e, handleOriginal) =>{}}}

const TitleBar = styled(styles.GreyTitleBar)`
    display:flex;
    justify-content: space-between;
    padding-right:10px;
    font-family: 'Baloo 2';
    font-weight: 800;
    font-size: 14px;
`

const TaskOverviewBox = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  height:calc( 50% - 20px );
  margin-top:20px; 
`

const TableSection = styled.section`
    table {
        width:100%;
    }
    thead {
        background-color: var(--brand-regular);
        border-radius: 0.4rem;
    }
    th,td {
        grid-column: span 2;
        padding: 1rem;
        text-align: left;
    }
    th {
        font-size: 18px;
        font-weight:bold;
        font-family: 'Baloo 2';
    }
    td {
        font-size: 14px;
    }
    span {
        margin-left: 1rem;
    }
`;

const TableRow = styled.tr`
background-color: #FBFBFB;
cursor: pointer;
 &:hover {
     background-color: #CFFCF0;
 }
`;




const UpdatesStyle= styled.div`
 
`;



const MainContainer = styled.div`

margin:30px;

.header{
    height:20%;
    display:flex;
    padding-top:15px;
    justify-content:space-between;
    .date{
        color:green;
    }
}

.descriptionText{
    font-size:16px;
    padding: 10px 0px 60px 0px;
}

.tasks{
}
.buttons{
    height:100px;
    width:100%;

    display:flex;
    justify-content: flex-end;
    align-items:center;
}
`

export default ProjectSectionPage;


// const CloseBox = styled.div`
//     cursor:pointer;
// `;
// const GreenTitleBar = styled(styles.GreenTitleBar)`
//     display:flex;
//     justify-content: space-between;
//     padding-right:20px;
//     >div{
//         display:flex;
//     }
//     border-radius: 10px 10px 0px 0px;
// `

// const ProjectSectionPage = () =>{

//     const ctrctx = useContext(ControlContext);
//     const urlParts = window.location.href.split("/");
//     const projectId = urlParts[urlParts.length - 2];
//     const sectionId = urlParts[urlParts.length - 1];
//     console.log(projectId);
//     const [projectData, setProjectData] = useState(
//       ctrctx.getProjectData(projectId)
//     );
//     const [selectorOpen, setSelectorOpen] = useState(null);
    

//     const data = projectData["sections"]?.filter((s)=>s.id==sectionId)[0];

//     const InnerComponent = () =>{

//         if (!ctrctx.user) return null;
//         const userName = ctrctx.user["displayName"];
       
//         const stages = data["stages"].map((st)=>st.name);
//         //const projectId = ctx.projectId;

//        // const sectionId = data.id;
//         // TODO connect to users    
//         return (
//             <WidgetContainer>
//                 <MainContainer>
//                     <div>
//                        <div>
//                         <div className="header">
//                             <div className="description">
//                             <styles.PageSubtitleText>Description</styles.PageSubtitleText>
                             
//                             </div>
//                             <styles.RegularBodyText >
//                                 ---
//                             </styles.RegularBodyText>

//                         </div>
//                          <div>
//                              <styles.RegularBodyText style={{padding:"20px 20px 20px 0px"}}>  {data["description"]}</styles.RegularBodyText>
//                         </div>
//                         </div>
//                         <div className="tasks">
//                             <StagesComponent data={data["stages"].map((dd)=>{ return {...dd, "contributors": [...data["contributors"].filter((c)=>c.projects[projectId].roles.filter((r)=>r.stageId===dd.id).length)]} })} /> 
//                         </div>
//                         <div className="buttons" >
                            
//                             <AddUpdateComponent
//                                 type={"request help"}
//                                 style={{color: "#0595A5"}}
//                                 stages={stages}
//                                 user={ctrctx.user}
//                                 onSave={(newUpdate) => {
//                                     const _newUpdate = {...newUpdate, "projectId":projectId, "committeeId":null, "sectionId":sectionId};
//                                     // todo add new update to DB
//                                     fb.createUpdate(_newUpdate);
//                                     const newSectionData = {...data, "updates":[...data["updates"], _newUpdate]}
//                                    // ctx.updateSection(newSectionData);
//                                    // setLadderData(newSectionData);
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </MainContainer>
//                 <UpdatesStyle>
//                         <UpdatesSection
//                             updates={data["updates"]}
//                             stages={stages}
//                             user={ctrctx.user}
//                             projectId={projectId}
//                             sectionId={sectionId}
//                             selectorOpen={selectorOpen}
//                             updateUpdates={(newUpdates)=>{
//                                 const newSectionData = {...data,  "updates":newUpdates}
//                                // ctx.updateSection(newSectionData);
//                                 //setLadderData(newSectionData);
//                             }}
//                             setSelectorOpen={(id)=>{
//                                 if(selectorOpen!=id)setSelectorOpen(id);
//                                 else setSelectorOpen(null);
                               
//                             }}
//                         >
//                         </UpdatesSection>
//                   </UpdatesStyle>

//                 {/* </UpdatesContainer> */}
//             </WidgetContainer>
//         );
//         return null;
//     }
//     if (!data) return (null)
//     return (
//         <ProjectContext.Provider
//         value={{
//           projectId: projectId,
//           data: projectData,
//           updateSection: (sectionData) => {
//             let sections = [...projectData["sections"]];
//             let s = sections.findIndex((sec) => sec.id == sectionData.id);
//             sections[s] = sectionData;
//             const newData = { ...projectData, sections: sections };
//             fb.updateProject(newData.id, newData);
//             setProjectData(newData);
//           },
//         }}
//       >
//         <Row>
//           <LeftPanel />
//           <Con>
//           <styles.Breadcrumbs>
//           <NavLink to='/'><styles.BreadcrumbText>CMU AGAINST ICE</styles.BreadcrumbText></NavLink>
//           <styles.Arrow> &gt; </styles.Arrow>
//           <NavLink to='/projects'><styles.BreadcrumbText>Projects</styles.BreadcrumbText></NavLink>
//           <styles.Arrow> &gt; </styles.Arrow>
//           <NavLink to={`/projects/${projectData.id}`}><styles.BreadcrumbText>{projectData.name}</styles.BreadcrumbText></NavLink>
//           <styles.Arrow> &gt; </styles.Arrow>
//           <NavLink to={`/projects/${projectData.id}/${sectionId}`}><styles.BreadcrumbText>{data.name}</styles.BreadcrumbText></NavLink>
     
//       </styles.Breadcrumbs>
          
//                 <div>{data && data["name"]}</div>
                
//             <InnerComponent />
//     </Con>
//         </Row>
//       </ProjectContext.Provider>
//     );

// };
