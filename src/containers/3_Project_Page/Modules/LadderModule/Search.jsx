import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

//import styles from './search.module.css';
import styled from "styled-components"


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


const Container = styled.tr`
    width:100%;
    padding: 2rem 1rem;
    background-color: black;
    color:white;
`
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
// const SearchDiv = styled.th`
//     display: flex;
//     align-items: center;
//     font-size: 2rem;
//     padding: .5rem 1rem;
// `


// .search {
//     display: flex;
//     align-items: center;
//     grid-column: 1 / -1;
//     font-size: 2rem;
// }

// .input {
   
// }

// .input::placeholder {
//     color: var(--white);
//     opacity: 0.8;
// }

export default Search;


