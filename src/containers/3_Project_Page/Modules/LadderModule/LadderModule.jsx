import { useMemo, useState, useContext } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
//import cn from 'classnames';

import LadderModal from './LadderModal/LadderModal';
import Search from './Search';
import styled from "styled-components"
import * as styles from '../../../../styles/sharedStyles';
import {fuzzyTextFilterFn} from "shared/utils";
import ProjectContext from '../../ProjectContext';


// Let the table remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = (value) => !value;

function LadderModule() {
    const ctx = useContext(ProjectContext);
    const data = ctx.data["sections"];
    const [modalIsOpen,setIsOpen] =useState(false);
    const [modalData,setModalData] =useState(null);
    const [modalType,setModalType] =useState(null);
    
    function openModal(cell, type) {
        setModalType(type);
        console.log(cell)
        setModalData(cell.row.original);
        
        setIsOpen(true);
    }

  function closeModal(){
    //window.location = window.location.toString().split("#")[0]; // add it as a hash to the URL.
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
    }
    setIsOpen(false);
  }
    const columns = useMemo(() => [
        {
            width: 300,
            Header: 'Section',
            accessor: 'name',
            Cell: ({ cell }) => (
                <span value={cell.value} onClick={()=>openModal(cell, "overview")}>
                  {cell.value}
                </span>
              )
        },
        {
            Header: 'Contributors',
            accessor: 'contributors',
            Cell: ({ cell }) => (
                <span  onClick={()=>openModal(cell,"contributors")}>
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
        <LadderModal
          data={modalData}
          isOpen={modalIsOpen}
          modalType={modalType}
          onRequestClose={closeModal}
        >
        </LadderModal>
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
  display: grid;
  grid-area: 3 / 1 / span 2 / span 4;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
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

export default LadderModule;