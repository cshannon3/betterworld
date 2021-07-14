
import ProjectContext from "../old/ProjectPage/ProjectContext";
import { useContext } from "react";
import styled from "styled-components";
import * as styles from "styles/sharedStyles";
import docIcon from "assets/Landing/google-docs.png";
import sheetsIcon from "assets/Landing/google-sheets.png";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";

export default function AtAGlanceModule({ projectData }) {
  // const formatDate = (d) => {
  //   return d.substring(0, d.length - 18);
  // };

  //let contributorsText = projectData["contributors"].map((data) => (data.name)).join(", ");

  return (
    <AtAGlanceBox>
      <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
      <Column>
        <Row>
          <Box>
            <SubtitleBold>Target Date</SubtitleBold>
            <TargetDateText>
             Date
            </TargetDateText>
          </Box>
          <Box>
            <SubtitleBold> Schedule</SubtitleBold>
            
          </Box>
        </Row>

        <Row>
          <Box>
            <SubtitleBold> Useful Links</SubtitleBold>
            <ResourceBox>
            </ResourceBox>
          </Box>
          <Box>
            <SubtitleBold>Contributors</SubtitleBold>
            <ContributorsStyle>
              <AvatarGroup max={5}>
                <Avatar alt="Remy Sharp">C</Avatar>
                <Avatar alt="Remy Sharp">B</Avatar>
                <Avatar alt="Remy Sharp">A</Avatar>
              </AvatarGroup>
            </ContributorsStyle>
          </Box>
        </Row>
      </Column>
    </AtAGlanceBox>
  );
}

const AtAGlanceBox = styled.div`
  height: 250px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-bottom:20px;
  .col {
    display: flex;
    justify-content: space-evenly;
  }
  li {
    margin-left: 20px;
  }
`;
const ContributorsStyle = styled.div`
  padding-top: 10px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 10px;
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
  max-width: 50%;
`;

const ResourceBox = styled.div`
  padding-left: 10px;
  padding-top: 10px;
  font-size: 12px;
`;

const ArtifactLink = styled.p`
  font-size: 12px;
  line-height: 18px;
  align-items: center;
`;

const SubtitleBold = styled.p`
  font-weight: 500;
  font-size: 16px;
`;

const TargetDateText = styled.h2`
  font-weight: bold;
  font-size: 24px;
  padding: 10px 0px;
`;

const UserText = styled.p`
  padding-top: 10px;
  padding-left: 10px;
  font-size: 12px;
  width: 75%;
`;


// import ProjectContext from "../old/ProjectPage/ProjectContext";
// import { useContext } from "react";
// import styled from "styled-components";
// import * as styles from "styles/sharedStyles";
// import docIcon from "assets/Landing/google-docs.png";
// import sheetsIcon from "assets/Landing/google-sheets.png";
// import { AvatarGroup } from "@material-ui/lab";
// import { Avatar } from "@material-ui/core";

// export default function AtAGlanceModule({ projectData }) {
//   const formatDate = (d) => {
//     return d.substring(0, d.length - 18);
//   };

//   //let contributorsText = projectData["contributors"].map((data) => (data.name)).join(", ");

//   return (
//     <AtAGlanceBox>
//       <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
//       <Column>
//         <Row>
//           <Box>
//             <SubtitleBold>Target Date</SubtitleBold>
//             <TargetDateText>
//               {formatDate(projectData["end_date"])}
//             </TargetDateText>
//           </Box>
//           <Box>
//             <SubtitleBold> Schedule</SubtitleBold>
//             <ul>
//               {projectData["schedule"] &&
//                 projectData["schedule"].map((data) => <li>{data}</li>)}
//             </ul>
//           </Box>
//         </Row>

//         <Row>
//           <Box>
//             <SubtitleBold> Useful Links</SubtitleBold>
//             <ResourceBox>
//               {projectData["resources"] &&
//                 projectData["resources"].map((data) => (
//                   <ArtifactLink>
//                     <a href={data.url} target="_blank">
//                       {data.name}
//                     </a>
//                   </ArtifactLink>
//                 ))}
//             </ResourceBox>
//           </Box>
//           <Box>
//             <SubtitleBold>{`Contributors (${
//               projectData["contributors"] && projectData["contributors"].length
//             })`}</SubtitleBold>
//             <ContributorsStyle>
//               <AvatarGroup max={5}>
//                 {projectData["contributors"] &&
//                   projectData["contributors"].map((c) => {
//                     return "photoUrl" in c ? (
//                       <Avatar alt="Remy Sharp" src={c.photoUrl} />
//                     ) : (
//                       <Avatar alt="Remy Sharp">{c.name[0]}</Avatar>
//                     );
//                   })}
//               </AvatarGroup>
//             </ContributorsStyle>
//           </Box>
//         </Row>
//       </Column>
//     </AtAGlanceBox>
//   );
// }

// const AtAGlanceBox = styled.div`
//   height: 95%;
//   width: 50%;
//   background: #ffffff;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 3px;

//   .col {
//     display: flex;
//     justify-content: space-evenly;
//   }
//   li {
//     margin-left: 20px;
//   }
// `;
// const ContributorsStyle = styled.div`
//   padding-top: 10px;
// `;

// const Row = styled.div`
//   display: flex;
//   width: 100%;
//   height: 50%;
//   padding: 10px;
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: calc(100% - 38px);
//   width: 100%;
// `;
// const Box = styled.div`
//   width: 50%;
//   height: 100%;
//   padding: 10px;
//   max-width: 50%;
// `;

// const ResourceBox = styled.div`
//   padding-left: 10px;
//   padding-top: 10px;
//   font-size: 12px;
// `;

// const ArtifactLink = styled.p`
//   font-size: 12px;
//   line-height: 18px;
//   align-items: center;
// `;

// const SubtitleBold = styled.p`
//   font-weight: 500;
//   font-size: 16px;
// `;

// const TargetDateText = styled.h2`
//   font-weight: bold;
//   font-size: 24px;
//   padding: 10px 0px;
// `;

// const UserText = styled.p`
//   padding-top: 10px;
//   padding-left: 10px;
//   font-size: 12px;
//   width: 75%;
// `;

