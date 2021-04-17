import { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import cn from 'classnames';
import { matchSorter } from 'match-sorter';
import LadderModal from './LadderModal';
import Search from './Search';
import styled from "styled-components"



function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
//Modal.setAppElement('#root')


// Let the table remove the filter if the string is empty.
fuzzyTextFilterFn.autoRemove = (value) => !value;

function LadderComponent({ data }) {
    const [modalIsOpen,setIsOpen] =useState(false);
    const [modalData,setModalData] =useState(null);
    
    function openModal(cell) {
        setModalData(cell.row.original);
        console.log(cell.row.original)
        setIsOpen(true);
    }


  function closeModal(){
    setIsOpen(false);
  }
    const columns = useMemo(() => [
        {
            width: 300,
            Header: 'Section',
            accessor: 'section',
            Cell: ({ cell }) => (
                <span value={cell.value} onClick={()=>openModal(cell)}>
                  {cell.value}
                </span>
              )
        },
        {
            Header: 'Researcher',
            accessor: 'researcher',
        },
        {
            Header: 'Author',
            accessor: 'author',
        },
        {
            Header: 'Artist',
            accessor: 'artist',
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
        <LadderModal
            data={"test string"}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
        </LadderModal>
        <TableSection >
            <GreyTitleBar> Project Ladder </GreyTitleBar>
            <Search
                        state={state}
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        setGlobalFilter={setGlobalFilter}
                    /> 
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
const GreyTitleBar = styled.div`
  height:38px;
  background: #E3E7EA;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: center;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: 800;
  font-size: 21px;
  line-height: 33px;
  letter-spacing: -0.02em;
  padding-left:5px;
  color: #757575;
`
const TaskOverviewBox = styled.div`
  display: grid;
  grid-area: 2 / 3 / span 2 / span 2;
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

export default LadderComponent;