import ProjectContext from '../../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../../../../styles/sharedStyles';
import docIcon from 'assets/Landing/google-docs.png';
import sheetsIcon from 'assets/Landing/google-sheets.png';

export default function AtAGlanceModule() {


  
   return ( <AtAGlanceBox>
        <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
        <DivContainer >
          <InternalDiv>
            <LargeText>5</LargeText>
            <img src={docIcon}/>
            <SmallText>Google Docs</SmallText>
          </InternalDiv>
          <InternalDiv>
            <LargeText>3</LargeText>
            <img src={sheetsIcon}/>
            <SmallText>Google Sheets</SmallText>
          </InternalDiv>
          <InternalDiv>
            <LargeText>3/21/21</LargeText>
            <SmallText>Last Updated</SmallText>
          </InternalDiv>
          <InternalDiv>
            <LargeText>3\71</LargeText>
            <SmallText>Edits This Week</SmallText>
          </InternalDiv>
        </DivContainer>
    </AtAGlanceBox>);
}

const AtAGlanceBox = styled.div`
  display: grid;
  grid-area: 1 / 3 / span 1 / span 2;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`
const DivContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`
const InternalDiv = styled.div`
  max-width: 150px;
  margin: 10px;
  padding: 5px;
  border-right: dashed 1px lightgrey;
  text-align: center;
`

//Shared Style: same as DateTitle from project detail
const LargeText = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 70px;
    display: inline-block;
    align-items: center;
    letter-spacing: -0.02em;
    color: black;
`;
const SmallText = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;

    color: #000000;
`;
