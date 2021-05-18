import { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
//import Modal from 'react-modal';

import * as styles from '../../../../../styles/sharedStyles';
import { fuzzyTextFilterFn } from "shared/utils";
import docIcon from 'assets/Landing/google-docs.png';
import styled from "styled-components"

const StagesComponent = ({data={}}) => {

    const columns = useMemo(() => [
        { width: 300, Header: 'Stage', accessor: 'name',
            Cell: ({ cell }) => (  <StageTitle> {cell.value} </StageTitle> ) },
        { Header: 'Status',accessor: 'status',
            Cell: ({ cell }) => (
                <StageStatus>
                      {cell.value}
                      </StageStatus>
            // <select name="stages" id="stages" onChange={()=>
            //   {
            //     var x = document.getElementById("stages").value;
            //     console.log(x);
            //     setSelectedStage(x);
            //   }
            //   }>
            //   {["In Progress"].map((m)=>(
            //   <option value={m}
            //   >{m}</option>))}
            // </select>
            //    </StageStatus>
                 )
            },
        {Header: 'Link',accessor: 'active_doc',
             Cell: ({ cell }) => (  <LinkBox  > <img src={docIcon}/> </LinkBox> ) },
        { Header: 'People', accessor: 'contributors', },
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
        <TitleBar>
            <div>
                <span>Stages</span>
            </div>
        </TitleBar>

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
export default StagesComponent;



const TitleBar = styled(styles.GreyTitleBar)`
    display:flex;
    justify-content: space-between;
    padding-right:20px;
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
    //    padding: 1rem;
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


const StageTitle = styled.div`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    border-left:5px solid;
    padding:30px 5px;
`;

const NotStartedStageTitle = styled.div`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    border-left:5px solid #ffcc81;
    padding:30px 5px;
`;
const InProgStageTitle = styled.div`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    border-left:5px solid #EFF265;
    padding:30px 5px;
`;
const DoneStageTitle = styled.div`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    border-left:5px solid #0CC998;
    padding:30px 5px;
`;


const StageStatus =styled.div`
font-family: Helvetica;
font-style: normal;
font-weight: bold;
font-size: 10px;
line-height: 11px;
display: flex;
align-items: center;
text-transform: uppercase;
`

  /* <Search
            state={state}
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
        />  */
