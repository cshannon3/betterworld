import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import * as styles from "styles/sharedStyles";
import * as fb from "shared/firebase";
import Tooltip from "@material-ui/core/Tooltip";
import { PageSubtitleText, ToolTipText } from "styles/sharedStyles";
import { getIconType } from "shared/utils";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import AddLinkPopup from "components/AddLinkPopup";


const QuickLinksSection = ({
  items = [],
  clickLink = ()=>{},
  maxLength = 3,
  membersData = [],
  onAddLink = (name, url) => {},
  onAddMember = (name) => {},
  type = "link",
  position = "left center",
  spacing='medium',
  variant="square",
  title,
}) => {
  if (!items) {
    items = [];
  }

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <QuickPadding>
      {title&& <PageSubtitleText>{title}</PageSubtitleText>}
      <Popup
        trigger={
          <AvatarGroup max={maxLength} spacing={spacing} variant={variant}>
            
            {items &&
              items
                .slice(0, items.length < maxLength ? items.length : maxLength)
                .map((c) => {
                  return (
                    <Tooltip
                      title={<styles.ToolTipText>{c.name}</styles.ToolTipText>}
                    >
                      <Avatar
                        onClick={(e) => clickLink(c.url)}
                        alt={c.name}
                        src={
                          type == "link"
                            ? getIconType(c.url)
                            : "photoUrl" in c
                            ? c.photoUrl
                            : c.name[0]
                        }
                      />
                    </Tooltip>
                  );
                })}
            <Avatar alt="Add" onClick={(e) => setModalOpen(true)}>
              +
            </Avatar>
          </AvatarGroup>
        }
        position={position}
      >
        {type == "link" ? (
          <AddLinkPopup
            onAddLink={(name, url) => onAddLink(name, url)}
            setModalOpen={setModalOpen}
          />
        ) : (
          <AddMemberPopUp>
            {membersData?.map((m) => {
              return (
                <AddMemberTile>
                  <div>{m.name}</div>
                  {items.filter((v) => v.name == m.name).length > 0 ? (
                    <button onClick={() => {}}>Remove</button>
                  ) : (
                    <button
                      onClick={() => {
                        onAddMember(m);
                      }}
                    >
                      Add
                    </button>
                  )}
                </AddMemberTile>
              );
            })}
          </AddMemberPopUp>
        )}
      </Popup>
    </QuickPadding>
  );
};
export default QuickLinksSection;

const QuickPadding = styled.div`
  padding: 20px 0px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// const LinkBox = styled.div`
//   height: 50px;
//   min-width: 50px;
//   img {
//     height: 44px;
//     width: 50px;
//     margin: 3px;
//   }
// `;

// const AddCard = styled.div`
//   width: 50px;
//   height: 50px;
//   border: 2px solid #0cc998;
//   border-radius: 15px;
//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
//   justify-content: center;
//   cursor: pointer;
// `;

const AddMemberPopUp = styled.div`
  height: 250px;
  overflow: scroll;
`;

const AddMemberTile = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

/*
<Row>
        <AddCard onClick={() => setFileModalOpen(true)}>
          <AddText style={{ fontSize: "40px" }}>+</AddText>
        </AddCard>
        {items.map((data) => (
          <Tooltip title={<ToolTipText>{data.name}</ToolTipText>}>
            {clickLink == null ? (
              <a href={data.url} target="_blank">
                <LinkBox onClick={() => clickLink(data.url)}>
                  <img src={getIconType(data.url)} alt={data.name} />
                </LinkBox>
              </a>
            ) : (
              <LinkBox onClick={() => clickLink(data.url)}>
                <img src={getIconType(data.url)} alt={data.name} />
              </LinkBox>
            )}
          </Tooltip>
        ))}
      </Row>
  */

// const QuickLinksSection = ({
//   items = [],
//   clickLink = null,
//   addLink = (url, name) => {},
// }) => {
//   if (!items) {
//     items = [];
//   }
//   const [fileModalOpen, setFileModalOpen] = useState(false);

//   return (
//     <QuickPadding>
//       <PageSubtitleText>Quick Links</PageSubtitleText>
//       <Row>
//         <AddCard onClick={() => setFileModalOpen(true)}>
//           <AddText style={{ fontSize: "40px" }}>+</AddText>
//         </AddCard>
//         {items.map((data) => (
//           <Tooltip title={<ToolTipText>{data.name}</ToolTipText>}>
//             {clickLink == null ? (
//               <a href={data.url} target="_blank">
//                 <LinkBox onClick={() => clickLink(data.url)}>
//                   <img src={getIconType(data.url)} alt={data.name} />
//                 </LinkBox>
//               </a>
//             ) : (
//               <LinkBox onClick={() => clickLink(data.url)}>
//                 <img src={getIconType(data.url)} alt={data.name} />
//               </LinkBox>
//             )}
//           </Tooltip>
//         ))}
//       </Row>
//       <ReactModal isOpen={fileModalOpen} className="Modal">
//         <AddFileModal setModalOpen={setFileModalOpen} addLink={addLink} />
//       </ReactModal>
//     </QuickPadding>
//   );
// };
