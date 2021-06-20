
import styled from "styled-components";
import * as styles from "styles/sharedStyles";
//goal of at a glance: people photos, resource # and repsonisbilities

export default function AtAGlanceModule({ committeeData }) {
  
  const contributorsText = committeeData["contributors"].map((data) => (data.name)).join();
  console.log(contributorsText);
  return (
    <AtAGlanceBox>
      <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
      <Column>
        <Row>
          
          <Box>
            <SubtitleBold>Committee Responsibilities</SubtitleBold>
            <ul>
              {committeeData["responsibilities"] &&
                committeeData["responsibilities"].map((data) => (
                  <li>{data}</li>
                ))}
            </ul>
          </Box>
        </Row>

        <Row>
          <Box>
           <SubtitleBold> Useful Links</SubtitleBold>
            <ResourceBox>
              {committeeData["resources"] &&
                committeeData["resources"].map((data) => (
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
              {committeeData["schedule"] &&
                committeeData["schedule"].map((data) => (
                  <li>{data}</li>
                ))}
            </ul>

          </Box>
        </Row>
      </Column>
    </AtAGlanceBox>
  );
}

/* <Box>
            <SubtitleBold>Contributors</SubtitleBold>
            <UserText>{contributorsText}</UserText>
          </Box> */
const AtAGlanceBox = styled.div`
  height: 40%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

  .col {
    display: flex;
    justify-content: space-evenly;
  }
  li {
    margin-left: 20px;
    font-size: 16px;
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
  font-family: 'Helvetica';
  font-size: 16px;
  line-height: 18px;
  align-items: center;
`;
const ArtifactTitle = styled.h2`
  font-family: 'Helvetica';
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 10px;
`;
const SubtitleBold= styled.h2`
  font-family: 'Helvetica';
  font-weight: bold;
  font-size: 16px;
`;


const UserText = styled.div`
  padding-top: 10px;
  font-size: 16px;
`;