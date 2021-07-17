import { useMemo,useState, useContext, useEffect } from 'react';
import styled from "styled-components"
import Modal from 'styled-react-modal'
import * as styles from 'styles/sharedStyles';
import ControlContext from 'shared/control-context';
import { cleanUpdateModel } from 'data_models/updatemodel';
import UpdatesSection from 'components/UpdatesSection/UpdatesSection';
import AddUpdateComponent from 'components/UpdatesSection/AddUpdateComponent';
import * as fb from 'shared/firebase';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

import {fuzzyTextFilterFn} from "shared/utils";
//import { useHistory } from "react-router-dom";

import ResponsiveSplitScreen from "components/ResponsiveSplitScreen";
import docIcon from "assets/Landing/google-docs.png";
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const ProjectSectionPage = () =>{

    const ctrctx = useContext(ControlContext);
    const urlParts = window.location.href.split("/");
    const projectId = urlParts[urlParts.length - 2];
    const sectionId = urlParts[urlParts.length - 1];
    const userMentionData = Object.entries(ctrctx.membersData).map(([k, myUser])=> ({
        id:k,
        ...myUser
      }))

   // console.log(projectId);
    //TODO refresh when things change
    const [projectData, setProjectData] = useState(
      ctrctx.getProjectData(projectId)
    );

    const data = projectData["sections"]?.filter((s)=>s.id==sectionId)[0];
    const LeftComponent = ()=>{
        const stages = data["stages"].map((st)=>st.name);
        const getContributors = (stageData)=>{
            let _contributors = [];
            if(!("contributors" in data))return [];
            data["contributors"].forEach((s)=>{
                if(projectId in s.projects){
                    let _roles = s.projects[projectId].roles;
                    if(_roles && _roles.filter((r)=>r.stageId===stageData.id).length){
                        _contributors.push(s);
                    }
                }
            })
            return _contributors;
        }
        
        return (  
        <MainContainer>
            <div>
               <div>
               <h2>{data["name"]}</h2>
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
                    <StagesComponent 
                    data={data["stages"].map((dd)=>{ return {...dd, "contributors": getContributors(dd)}})}
                    membersData={userMentionData}
                    /> 
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

const StagesComponent = ({data=[], membersData=[]}) => {
    const columns = useMemo(() => [
        { width: 300, Header: 'Stage', accessor: 'name',
            Cell: ({ cell }) => 
            (  <StageTitle status={cell.row.values["status"]}> {cell.value} </StageTitle> ) 
        },
        { Header: 'People',accessor: 'contributors',
        Cell: ({ cell }) => (
            <Popup trigger={
                <AvatarGroup max={3}>
                        {cell.value.slice(0, cell.value.length<2?cell.value.length:2).map((c)=>{
                            return ("photoUrl" in c) ?
                               <Avatar alt="Remy Sharp" src={c.photoUrl}/>
                                 :
                                 <Avatar alt="Remy Sharp" >{c.name[0]}</Avatar>
                        })}
                         <Avatar alt="Remy Sharp" 
                         >+</Avatar>
                 </AvatarGroup>
                } position="left center">
                    <div>
                        { membersData.map((m)=>{
                           return( <p>{m.name}</p>);
                        })}
                    </div>
                 </Popup>
             )
        },
        { Header: 'Status',accessor: 'status',
            Cell: ({ cell }) => (
                <StageStatus>
                      {cell.value}
                      </StageStatus>
                 )
            },
       
        {Header: 'Link',accessor: 'active_doc',
             Cell: ({ cell }) => (  <LinkBox  > <img src={docIcon}/> </LinkBox> ) },
        // { Header: 'People', accessor: 'contributors', },
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
    }), []);
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

    return (<TableSection >
        <table  {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {column.isSorted ? column.isSortedDesc ? (
                                    <span> &darr;</span>) : ( <span> &uarr;</span>) : null}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody  {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} > {cell.render('Cell')} </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </TableSection >);
}
export default ProjectSectionPage;

//getTrGroupProps={(state, rowInfo, column, instance) => { return { onMouseEnter: (e, handleOriginal) =>{}}}




const UpdatesStyle= styled.div`
 
`;



const MainContainer = styled.div`

//margin:30px;
padding-top:50px;
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



const LinkBox = styled.div`
    height:40px;
    min-width:40px;
    img{
      height:34px;
      width:40px;
      margin:3px;
    }
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
        text-align: left;
        
    }
    th {
        padding-bottom:10px;
        font-family: 'Baloo 2';
        font-style: normal;
        font-weight: bold;
        font-size: 21px;
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
    font-family: 'Baloo 2';
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    border-left:5px solid;
    padding:30px 5px;
    ${({ status }) => 
    (status==="in progress") ? `border-left:10px solid #EFF265;`:
    (status==="not started")?`border-left:10px solid #ffcc81;`
    :`border-left:10px solid #0CC998;`
}
`;



const StageStatus =styled.div`
font-family: 'Helvetica';
font-style: normal;
font-weight: bold;
font-size: 10px;
line-height: 11px;
display: flex;
align-items: center;
text-transform: uppercase;
`


