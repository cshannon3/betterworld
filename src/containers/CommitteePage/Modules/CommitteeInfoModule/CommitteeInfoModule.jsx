// import CommitteeContext from '../../CommitteeContext';

// import {useContext} from 'react';
import styled from "styled-components"
import AddUpdateComponent from "components/UpdatesSection/AddUpdateComponent";

export default function CommitteeInfoModule({committeeData, user, onSave}) {

    return (<CommitteeTitleBox>
        <div>
            <div>
                <CommitteesSubtitle>CMU AGAINST ICE</CommitteesSubtitle>
                <CommitteesTitle>Committees</CommitteesTitle>
            </div>
         
        </div>
        <CommitteeName>{committeeData.name}</CommitteeName>
        <DescriptionText>{committeeData.description}</DescriptionText>
        <div className="bottomBar">
        <div>
            <CommitteesSubtitle>
                Point Person: {committeeData.pointPerson.displayName}
            </CommitteesSubtitle>
            </div>
            <div>
            <CommitteesSubtitle>
                Interested in this Committee?
                </CommitteesSubtitle>
                <AddUpdateComponent
                                type={"offer to help"}
                                user={user}
                                onSave={(newUpdate) => {
                                    onSave(newUpdate);
                                    // const newSectionData = {...sectionData, "updates":[...sectionData["updates"], newUpdate]}
                                    // ctx.updateSection(newSectionData);
                                    // setSectionData(newSectionData)
                                }}
                            />
            
            </div>
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
  .bottomBar{
    display:flex;
    justify-content: space-between;
    height:90px;
  }


 `

 //   &:nth-child(1) > div{
//       display:flex;
//       justify-content: space-between;
//   }