
import ProjectContext from '../../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../sharedStyles';


export default function HelpWantedModule() {
    return (
        <HelpWantedBox>
            <styles.GreenTitleBar> Help Wanted</styles.GreenTitleBar>
            <div></div>
        </HelpWantedBox>
    );
}


const HelpWantedBox = styled.div`
  display: grid;
  grid-area: 3 / 2 / span 1 / span 1;
  background: #E6FAF5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`