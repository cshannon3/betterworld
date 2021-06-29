import ProjectContext from '../ProjectContext';
import {useContext} from 'react';
import styled from "styled-components";
import * as styles from '../../../styles/sharedStyles';
import docIcon from 'assets/Landing/google-docs.png';
import sheetsIcon from 'assets/Landing/google-sheets.png';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
// import Badge from '@material-ui/core/Badge';
// import { makeStyles, withStyles } from '@material-ui/core/styles';



export default function AtAGlanceModule({ projectData }) {
  const formatDate = (d) =>{
    return d.substring(0, d.length-18)
  }


  //let contributorsText = projectData["contributors"].map((data) => (data.name)).join(", ");

  return (
    <AtAGlanceBox>
      <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
      <Column>
        <Row>

          <Box>
          <SubtitleBold>Target Date</SubtitleBold>
          <TargetDateText>{formatDate(projectData["end_date"])}</TargetDateText>
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
            <SubtitleBold>{`Contributors (${projectData["contributors"] && projectData["contributors"].length})`}</SubtitleBold>
<ContributorsStyle>
          <AvatarGroup max={5}>
            {projectData["contributors"] && projectData["contributors"].map((c)=>{
             return ("photoUrl" in c) ?

            <Avatar alt="Remy Sharp" src={c.photoUrl}/>
              :
              <Avatar alt="Remy Sharp" >{c.name[0]}</Avatar>

            })
          }
          </AvatarGroup>
          </ContributorsStyle>
              {/* {projectData["contributors"] &&  <UserText>{contributorsText}</UserText>

                // projectData["contributors"].map((data) => (
                //   <UserText>{data.name},</UserText>
                // ))

                } */}
          </Box>

        </Row>
      </Column>
    </AtAGlanceBox>
  );
}

const AtAGlanceBox = styled.div`
  height:95%;
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
const ContributorsStyle = styled.div`
padding-top:10px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding:10px;
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
  max-width:50%;

`;

const ResourceBox = styled.div`
  padding-left: 10px;
  padding-top: 10px;
  font-size:12px;
`;

const ArtifactLink = styled.p`
  font-size: 12px;
  line-height: 18px;
  align-items: center;
`;

const SubtitleBold= styled.p`
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
  padding-left:10px;
  font-size: 12px;
  width:75%;
`;



// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       //animation: '$ripple 1.2s infinite ease-in-out',
//       content: '""',
//     },
//   },
//   // '@keyframes ripple': {
//   //   '0%': {
//   //     transform: 'scale(.8)',
//   //     opacity: 1,
//   //   },
//   //   '100%': {
//   //     transform: 'scale(2.4)',
//   //     opacity: 0,
//   //   },
//   // },
// }))(Badge);

// <ul>
//               {projectData["contributors"] &&
//                 projectData["contributors"].map((data) => (
//                   <li>{data.name}</li>
//                 ))}
//             </ul>


// <StyledBadge
//              overlap="circle"
//              anchorOrigin={{
//                vertical: 'bottom',
//                horizontal: 'right',
//              }}
//              variant="dot"
//            >

//            </StyledBadge>

// const SmallAvatar = withStyles((theme) => ({
//   root: {
//     width: 22,
//     height: 22,
//     border: `2px solid ${theme.palette.background.paper}`,
//   },
// }))(Avatar);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));
// function BadgeAvatars() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <StyledBadge
//         overlap="circle"
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         variant="dot"
//       >
//         <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//       </StyledBadge>
//       <Badge
//         overlap="circle"
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         badgeContent={<SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />}
//       >
//         <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//       </Badge>
//     </div>
//   );
// }

//goal of at a glance: people photos, resource # and repsonisbilities
