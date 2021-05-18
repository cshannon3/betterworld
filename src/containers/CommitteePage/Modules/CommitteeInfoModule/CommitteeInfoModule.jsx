import CommitteeContext from '../../CommitteeContext';

import {useContext} from 'react';
import styled from "styled-components"

export default function CommitteeInfoModule() {
    const ctx = useContext(CommitteeContext);

    return (<CommitteeTitleBox>
        <div>
            <div>
                <CommitteesSubtitle>CMU AGAINST ICE</CommitteesSubtitle>
                <CommitteesTitle>Committees</CommitteesTitle>
            </div>
            <div>
                <CommitteesSubtitle>Target Date</CommitteesSubtitle>
                <DateTitle>May 15th</DateTitle>
            </div>
        </div>
        <CommitteeName>Money</CommitteeName>
        <DescriptionText>Moneyyyyyyyyyyyys</DescriptionText>
        <div>
            <CommitteesSubtitle>
                Point Person: Jess Jones
            </CommitteesSubtitle>
            <CommitteesSubtitle>
                Interested in this Committee?
            </CommitteesSubtitle>
            <div>offer Help button</div>
        </div>
    </CommitteeTitleBox>)
}


const CommitteesSubtitle = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;

    color: #000000;
`;
const DescriptionText = styled.p`
font-family: Helvetica;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 24px;
`;
const CommitteeName = styled.p`
font-family: Baloo 2;
font-style: normal;
font-weight: 800;
font-size: 26px;
line-height: 41px;
display: flex;
align-items: center;
letter-spacing: -0.02em;
`;

const DateTitle = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 70px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: black;
`;
const CommitteesTitle = styled.h2`
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 70px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #0CC998;
    
`;

const CommitteeTitleBox = styled.div`
  display: grid;
  grid-area: 1 / 1 / span 2 / span 2;
  padding: 0px 50px 0px 0px;
  &:nth-child(1) > div{
      display:flex;
      justify-content: space-between;
  }

 `
