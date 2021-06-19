import { useMemo, useState, useContext } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { useAsyncDebounce } from 'react-table';

//import styles from './search.module.css';
import styled from "styled-components"

import LadderModal from '../Modals/LadderModal/LadderModal';
import * as styles from '../../../styles/sharedStyles';
import {fuzzyTextFilterFn} from "shared/utils";
import ProjectContext from '../ProjectContext';


// Let the table remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = (value) => !value;




function LadderModule({projectData, openLadderModal}) {
   // const ctx = useContext(ProjectContext);
    const data = projectData["sections"];
    let contributors = {};
    let statuses = {}
    data.forEach((section)=>{
        let names = [];
        if(section["stages"]){
         section.stages.forEach((stage)=>{
            
            if(stage["contributors"]){
                stage["contributors"].forEach((contributor)=>{
                    if (contributor.name  && !names.includes(contributor.name)){
                        names.push(contributor.name)
                    }
                });
            }
        });
        contributors[section["id"]]=[...names]
        }
    });
    data.forEach((section)=>{
        let stat = section["stages"].find((stage)=> stage.name===section["status"])["status"];
        statuses[section["id"]]=stat;
    });

    

    const columns = useMemo(() => [
        {
           
            Header: 'Name',
            accessor: 'name',
            Cell: ({ cell }) => (
                <SectionTitle value={cell.value} 
                 onClick={()=>openLadderModal(cell.row.original)}
                >
                  {cell.value}
                </SectionTitle>
              ),
              width:200
        },
        {
            width: 300,
            Header: 'Team',
            accessor: 'id',
            Cell: ({ cell }) => (
                <span >
                  {contributors[cell.value].join()}
                </span>
              )
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ cell }) => (
                <div>
                  {cell.value} 
                  <br/>({statuses[cell.row.original.id]})
                </div>
            )
        },
        {
            Header: 'Updates',
            accessor: 'updates',
            Cell: ({ cell }) => (
                <div >
                  {cell.value ? cell.value.length : 0} Updates
                  <br/> 
                  {cell.value ? cell.value.filter(update=>update["type"] == "request help").length : 0} Help Requests
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
                            <TableRow {...row.getRowProps()}  onClick={()=>openLadderModal(row.original)}>
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
    padding-right:20px;
    font-family: Baloo 2;
    font-weight: 800;
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
        font-size: 1.5rem;
    }
    td {
        font-size: 1rem;
    }
    span {
        margin-left: 1rem;
    }
`;


const SectionTitle = styled.div`
font-family: Baloo 2;
font-size: 14px;
width:300px;
`;


const TableRow = styled.tr`
background-color: #FBFBFB;
cursor: pointer;
 &:hover {
     background-color: #CFFCF0;
 }
`;




const Input = styled.input`
    margin-left: 1rem;
    font-size: 2rem;
    background-color: white;
    color: black;
    border: none;
    outline: none;
    &::placeholder {
        color: black;
        opacity: 0.2;   
    }
`;

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


