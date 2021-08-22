import React, {  useState } from "react";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import * as styles from 'styles/sharedStyles';
import { getIconType } from "shared/utils";
import AddLinkPopup from "components/AddLinkPopup";

import { AvatarGroup } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


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
      {title&& <styles.PageSubtitleText>{title}</styles.PageSubtitleText>}
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


const AddMemberPopUp = styled.div`
  height: 250px;
  overflow: scroll;
`;

const AddMemberTile = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
