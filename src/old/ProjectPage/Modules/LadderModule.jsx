import { useMemo, useState, useContext } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { useAsyncDebounce } from 'react-table';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
//import styles from './search.module.css';
import styled from "styled-components"

import LadderModal from '../Modals/LadderModal/LadderModal';
import * as styles from 'styles/sharedStyles';
import {fuzzyTextFilterFn} from "shared/utils";
import { useHistory } from "react-router-dom";


// Let the table remove the filter if the string is empty.
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


// const SectionTitle = styled.div`
// font-family: 'Baloo 2';
// font-size: 18px;
// font-weight: 500;
// width:300px;
// `;


const TableRow = styled.tr`
background-color: #FBFBFB;
cursor: pointer;
 &:hover {
     background-color: #CFFCF0;
 }
`;




// const Input = styled.input`
//     margin-left: 1rem;
//     font-size: 2rem;
//     background-color: white;
//     color: black;
//     border: none;
//     outline: none;
//     &::placeholder {
//         color: black;
//         opacity: 0.2;   
//     }
// `;

export default LadderModule;




/* <Search
                        state={state}
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        setGlobalFilter={setGlobalFilter}
                    /> 
                <div>
                    <button>Edit</button>
                    <button>Add Section</button>
                </div> */
// function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
//     const count = preGlobalFilteredRows.length
//     const [value, setValue] = useState(globalFilter);

//     const onChange = useAsyncDebounce((value) => {
//         setGlobalFilter(value || undefined);
//     }, 200);

//     const handleChange = (event) => {
//         setValue(event.target.value);
//         onChange(event.target.value);
//     };

//     return (
//         <th>
//             Search:{' '}
//             <Input
//                 value={value || ''}
//                 placeholder={`${count} sections...`}
//                 onChange={handleChange}
//             />
//         </th>
//     );
// }

// function Search({ state, preGlobalFilteredRows, setGlobalFilter }) {
//     return (
//             <GlobalFilter
//                 preGlobalFilteredRows={preGlobalFilteredRows}
//                 globalFilter={state.globalFilter}
//                 setGlobalFilter={setGlobalFilter}
//             />
       
//     );
// }

