import ProjectContext from '../../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../../../../styles/sharedStyles';

export default function AtAGlanceModule() {
   return ( <AtAGlanceBox>
        <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
        <div></div>
    </AtAGlanceBox>);
}

const AtAGlanceBox = styled.div`
  display: grid;
  grid-area: 1 / 3 / span 1 / span 2;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
