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



function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter);

    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <th>
            Search:{' '}
            <Input
                value={value || ''}
                placeholder={`${count} sections...`}
                onChange={handleChange}
            />
        </th>
    );
}

function Search({ state, preGlobalFilteredRows, setGlobalFilter }) {
    return (
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
       
    );
}




function LadderModule({projectData, openLadderModal}) {
   // const ctx = useContext(ProjectContext);
    const data = projectData["sections"];

    const columns = useMemo(() => [
        {
            width: 300,
            Header: 'Section',
            accessor: 'name',
            Cell: ({ cell }) => (
                <span value={cell.value} 
                 onClick={()=>openLadderModal(cell)}
                >
                  {cell.value}
                </span>
              )
        },
        {
            Header: 'Contributors',
            accessor: 'contributors',
            Cell: ({ cell }) => (
                <span  
                 onClick={()=>openLadderModal(cell)}
                >
                  {cell.value}
                </span>
              )
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        // {
        //     Header: 'Ways To Help',
        //     accessor: 'help_requests',
        //     Cell: ({ cell }) => {
        //         const helpRequests = cell.value;
        //         console.log(helpRequests);
        //        return ( <span  onClick={()=>openModal(cell, "helpRequests")}>
        //           {helpRequests.length}
        //         </span>
        //         )
        //     }
        // },
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
                    <span>Project Ladder</span>
                </div> 
                <Search
                        state={state}
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        setGlobalFilter={setGlobalFilter}
                    /> 
                <div>
                    <button>Edit</button>
                    <button>Add Section</button>
                </div>
            </TitleBar>
         
            <table  {...getTableProps()}>
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
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </TableSection >
        </TaskOverviewBox>
    );
}


const TitleBar = styled(styles.GreyTitleBar)`
    display:flex;
    justify-content: space-between;
    padding-right:20px;
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


/* <LadderModal
data={modalData}
isOpen={modalIsOpen}
modalType={modalType}
onRequestClose={closeModal}
>
</LadderModal> */
//     const [modalIsOpen,setIsOpen] =useState(false);
//     const [modalData,setModalData] =useState(null);
//     const [modalType,setModalType] =useState(null);
    
//     function openModal(cell, type) {
//         setModalType(type);
//         console.log(cell)
//         setModalData(cell.row.original);
        
//         setIsOpen(true);
//     }

//   function closeModal(){
//     //window.location = window.location.toString().split("#")[0]; // add it as a hash to the URL.
//     var uri = window.location.toString();
//     if (uri.indexOf("#") > 0) {
//         var clean_uri = uri.substring(0, uri.indexOf("#"));
//         window.history.replaceState({}, document.title, clean_uri);
//     }
//     setIsOpen(false);
//   }