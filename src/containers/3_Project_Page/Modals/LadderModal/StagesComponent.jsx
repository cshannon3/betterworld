import { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
//import Modal from 'react-modal';

import * as styles from '../../../../styles/sharedStyles';
import { fuzzyTextFilterFn } from "shared/utils";
import docIcon from 'assets/Landing/google-docs.png';
import styled from "styled-components"

//TODO: Collect stage status before rendering the StageTitle and switch on
//in progress, not started, blocked, or Done
//Has to be done before actual status getting because div has left borer for indicator

const StagesComponent = ({data=[]}) => {
    const columns = useMemo(() => [
        { width: 300, Header: 'Stage', accessor: 'name',
            Cell: ({ cell }) => 
            (  <StageTitle status={cell.row.values["status"]}> {cell.value} </StageTitle> ) 
        },
        { Header: 'People',accessor: 'contributors',
        Cell: ({ cell }) => (
            <div>
               
                   {cell.value && cell.value.map((c)=>(
                      <p>{c.name}</p>
                      ))} 
                  </div>
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
export default StagesComponent;





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


// const TitleBar = styled(styles.GreyTitleBar)`
//     display:flex;
//     justify-content: space-between;
//     padding-right:20px;
// `
  /* <Search
            state={state}
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
        />  */
