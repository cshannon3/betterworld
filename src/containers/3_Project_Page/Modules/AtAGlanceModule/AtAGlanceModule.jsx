import ProjectContext from '../../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../../../../styles/sharedStyles';
import docIcon from 'assets/Landing/google-docs.png';
import sheetsIcon from 'assets/Landing/google-sheets.png';

//goal of at a glance: people photos, resource # and repsonisbilities

export default function AtAGlanceModule({ projectData }) {
  const formatDate = (d) =>{
    return d.substring(0, d.length-13)
  }
  
  return (
    <AtAGlanceBox>
      <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
      <Column>
        <Row>
          <Box>
            <SubtitleBold>{`Contributors (${projectData["contributors"] && projectData["contributors"].length})`}</SubtitleBold>
            <ul>
              {projectData["contributors"] &&
                projectData["contributors"].map((data) => (
                  <li>{data.name}</li>
                ))}
            </ul>
          </Box>
          <Box>
          <SubtitleBold>Target Date</SubtitleBold>
          <TargetDateText>{formatDate(projectData["end_date"])}</TargetDateText>
          </Box>
        </Row>

        <Row>
          <Box>
           <SubtitleBold> Useful Links</SubtitleBold>
            <ResourceBox>
              {projectData["resources"] &&
                projectData["resources"].map((data) => (
                  <ArtifactLink>
                    <a href={data.url} target="_blank">
                      {data.name}
                    </a>
                  </ArtifactLink>
                ))}
            </ResourceBox>
          </Box>
          <Box>
         <SubtitleBold> Schedule</SubtitleBold>
          <ul>
              {projectData["schedule"] &&
                projectData["schedule"].map((data) => (
                  <li>{data}</li>
                ))}
            </ul>

          </Box>
        </Row>
      </Column>
    </AtAGlanceBox>
  );
}

const AtAGlanceBox = styled.div`
  height:100%;
  width:50%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

  .col {
    display: flex;
    justify-content: space-evenly;
  }
  li {
    margin-left: 20px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 38px);
  width: 100%;
`;
const Box = styled.div`
  width: 50%;
  height: 100%;
  padding: 10px;
`;

const ResourceBox = styled.div`
  padding-left: 20px;
`;

const ArtifactLink = styled.p`
  font-size: 16px;
  line-height: 18px;
  align-items: center;
`;

const SubtitleBold= styled.h2`
  font-weight: bold;
  font-size: 16px;
`;

const TargetDateText = styled.h2`
  font-weight: bold;
  font-size: 30px;
  padding: 10px 0px;
`;

