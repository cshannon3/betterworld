import ProjectContext from '../../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../sharedStyles';
//goal of at a glance: people photos, resource # and repsonisbilities

export default function AtAGlanceModule() {
   return ( <AtAGlanceBox>
        <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
        <div>
          <div> People box</div>
          <div> 5 Google Docs</div>
          <div> 11 Google Sheets</div>
        </div>
        <div>
          <h2>Committee Responsibilities</h2>
          <ul>
            <li>Budgeting</li>
            <li>Fundraising Efforts</li>
            <li>Authorizing Spending</li>
            <li>other...</li>
          </ul>
        </div>
    </AtAGlanceBox>);
}

const AtAGlanceBox = styled.div`
  display: grid;
  grid-area: 1 / 3 / span 1 / span 2;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
