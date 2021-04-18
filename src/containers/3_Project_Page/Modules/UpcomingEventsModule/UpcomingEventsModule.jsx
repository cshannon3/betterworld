import ProjectContext from '../../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../sharedStyles';


export default function UpcomingEventsModule() {
    return (
        <UpcomingEventsBox>
        <styles.GreyTitleBar> Upcoming Events</styles.GreyTitleBar>
        <div></div>
        </UpcomingEventsBox>
    );
}

const UpcomingEventsBox = styled.div`
  display: grid;
  grid-area: 3 / 1 / span 1 / span 1;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`