import styled from "styled-components";
import { useMemo, useState, useEffect, useContext } from "react";
import { SlackSelector, SlackCounter } from "@charkour/react-reactions";
import _ from "lodash";
import { formatTimestamp, formatTimeAgo } from "shared/utils";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePushpin,
  AiFillPushpin,
} from "react-icons/ai";
import { MyEditor2 } from "../MyEditor/MyEditor";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsReply } from "react-icons/bs";
import { cleanReplyModel } from "data_models/updatemodel";
import ControlContext from "shared/control-context";
import UpdateReply from "./UpdateReply";
//https://github.com/charkour/react-reactions/blob/main/src/components/slack/SlackCounter.tsx
import _clone from "lodash/clone";
import _escapeRegExp from "lodash/escapeRegExp";
import _uniqBy from "lodash/uniqBy";
import { Link } from "react-router-dom";

const UpdateBox = ({
  updateData,
  isSelector,
  setSelectorOpen = () => {},
  updateUpdate = () => {},
  deleteUpdate = () => {},
}) => {
  const ctrctx = useContext(ControlContext);
  const userId = ctrctx.user && ctrctx.user.id;
  const userName = ctrctx.user && ctrctx.user.displayName;
  const isCurrentUser = updateData.author == userName;
  const isOfferHelp = updateData["type"] == "offer to help";
  const isRequestHelp =
    updateData["type"] && updateData["type"] == "request help";
  const hasOfferedHelp =
    updateData["replies"] &&
    updateData["replies"].filter(
      (rep) => rep.type === "offer to help" //&& rep.author == userName
    ).length > 0;

  const isRequestHelpDone =
    updateData["status"] && updateData["status"] === "done";

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReply, setIsReplyEditing] = useState(false);
  const [isShowingReplies, setIsShowingReplies] = useState(false);
  const [activeReply, setActiveReply] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [editContent, setEditContent] = useState("");

  const [replyType, setReplyType] = useState("reply");

  let content = "";

  function handleSelect(emoji) {
    const index = _.findIndex(updateData["reactions"], { emoji, by: userName });
    // console.log(index);
    if (index > -1) {
      const newReactions = [
        ...updateData["reactions"].slice(0, index),
        ...updateData["reactions"].slice(index + 1),
      ];
      const newUpdateData = { ...updateData, reactions: newReactions };
      console.log(newReactions);
      updateUpdate(newUpdateData);
      setSelectorOpen(newUpdateData);
    } else {
      const newReactions = [...updateData.reactions, { emoji, by: userName }];
      const newUpdateData = { ...updateData, reactions: newReactions };
      updateUpdate(newUpdateData);
      console.log(newUpdateData);
      setSelectorOpen(newUpdateData);
    }
  }
  const TypeRow = () => {
    return <TypeRowDiv>Update Type</TypeRowDiv>;
  };

  const HeaderRow = () => {
    return (
      <div className={"topbar"}>
        <div className={"author"}>{updateData["author"]}</div>
        {!isHovering ? (
          <div className={"date"}>{formatTimeAgo(updateData["date"])}</div>
        ) : isCurrentUser ? (
          <div className={"icons"}>
            {isRequestHelp && !isRequestHelpDone && (
              <ButtonOne
                onClick={() => {
                  const newUpdateData = { ...updateData, status: "done" };
                  updateUpdate(newUpdateData);
                }}
              >
                Done?
              </ButtonOne>
            )}
            {updateData["isPinned"] ? (
              <AiFillPushpin
                className="icon"
                size={18}
                onClick={() => {
                  const newUpdateData = { ...updateData, isPinned: false };
                  updateUpdate(newUpdateData);
                }}
              />
            ) : (
              <AiOutlinePushpin
                className="icon"
                size={18}
                onClick={() => {
                  const newUpdateData = { ...updateData, isPinned: true };
                  updateUpdate(newUpdateData);
                }}
              />
            )}
            <AiOutlineEdit
              className="icon"
              size={18}
              onClick={() => {
                window.localStorage.setItem("editContent", updateData.content);
                setIsEditing(true);
                setEditContent(updateData.content);
                content = updateData.content;
              }}
            />
            <AiOutlineDelete
              className="icon"
              size={18}
              onClick={() => {
                deleteUpdate(updateData);
              }}
            />
            <BsReply
              className="icon"
              size={18}
              onClick={() => {
                setActiveReply(
                  cleanReplyModel({
                    author: userName,
                    authorId: userId,
                    date: Date.now(),
                  })
                );
                setEditContent("");
                content = "";
                setIsReplyEditing(true);
              }}
            />
          </div>
        ) : isRequestHelp && !isRequestHelpDone ? ( //&& !hasOfferedHelp
          <div className={"icons"}>
            <ButtonOne
              onClick={() => {
                setActiveReply(
                  cleanReplyModel({
                    author: userName,
                    authorId: userId,
                    date: Date.now(),
                    type: "offer to help",
                  })
                );
                setEditContent("");
                content = "";
                setReplyType("offer to help");
                setIsReplyEditing(true);
              }}
            >
              Offer Help
            </ButtonOne>
            <BsReply
              size={18}
              onClick={() => {
                setActiveReply(
                  cleanReplyModel({
                    author: userName,
                    authorId: userId,
                    date: Date.now(),
                  })
                );
                setEditContent("");
                content = "";
                setIsReplyEditing(true);
              }}
            />
          </div>
        ) : (
          <BsReply
            size={18}
            onClick={() => {
              setActiveReply(
                cleanReplyModel({
                  author: userName,
                  authorId: userId,
                  date: Date.now(),
                })
              );
              setEditContent("");
              content = "";
              setIsReplyEditing(true);
            }}
          />
        )}
      </div>
    );
  };

  function ContentRowEdit() {
    return (
      <div className={"content"}>
        <MyEditor2
          content={window.localStorage.getItem("editContent")}
          onSave={(content, rawContent) => {
            const newUpdateData = {
              ...updateData,
              content: content,
              contentRaw: rawContent,
            };
            updateUpdate(newUpdateData);
            setIsEditing(false);
          }}
          onCancel={() => {
            setIsEditing(false);
          }}
          onChange={(val) => {
            content = val;
            window.localStorage.setItem("editContent", val);
          }}
        />
      </div>
    );
  }

  const ContentRow = () => {
    if ("contentRaw" in updateData) {
      let displayText = _clone(updateData["contentRaw"]);
      //console.log(displayText);
      const tags = updateData["contentRaw"].match(/@\{\{[^\}]+\}\}/gi) || [];
      tags.map((myTag) => {
        const tagData = myTag.slice(3, -2);
        const tagDataArray = tagData.split("||");
        const tagDisplayValue = tagDataArray[2];
        displayText = displayText.replace(
          new RegExp(_escapeRegExp(myTag), "gi"),
          `<span  style="background-color:#e8f5fa;">@${tagDisplayValue}</span>`
        );
      });
      return (
        <p
          className={"content"}
          dangerouslySetInnerHTML={{ __html: displayText }}
        ></p>
      );
    }
    return <p className={"content"}>{updateData["content"]}</p>;
  };
  const HelpResponseRow = () => {
    if (!hasOfferedHelp) return null;

    const helpReply = updateData["replies"].filter(
      (rep) => rep.type === "offer to help" //&& rep.author == userName
    )[0];
    return (
      <HelpResponseStyle>{`${helpReply.author} offered help:${helpReply.status}`}</HelpResponseStyle>
    );
  };

  const ReactionsRepliesRow = () => {
    return (
      <div className="flex-row">
        <div>
          <SlackCounter
            user={userName}
            counters={updateData["reactions"]}
            onAdd={() => setSelectorOpen(updateData)}
            onSelect={(emoji) => handleSelect(emoji)}
          />
        </div>
        <div
          className={"num_replies"}
          onClick={() => setIsShowingReplies(!isShowingReplies)}
        >
          {updateData["replies"] &&
            updateData["replies"].length > 0 &&
            (isShowingReplies ? (
              <FiChevronUp className="arrow-icon" size={18} />
            ) : (
              <FiChevronDown className="arrow-icon" size={18} />
            ))}
          {updateData["replies"]
            ? `${updateData["replies"].length} Replies`
            : "0 Replies"}
        </div>
      </div>
    );
  };

  const RepliesListRow = () => {
    return (
      <RepliesListStyle>
        {updateData["replies"]
          // .filter((rep) => rep.type !== "offer to help")
          .map((reply) => (
            <UpdateReply
              id={reply.id}
              reply={reply}
              userName={userName}
              updateReplyStatus={(id, newStatus) => {
                let newUpdateData;
                if (
                  updateData.replies &&
                  updateData.replies.find((v) => v.id == id)
                ) {
                  // TODO notifications
                  let newReplies = updateData["replies"];
                  let u = newReplies.findIndex((v) => v.id == id);
                  let newNotificaton = {
                    userId: updateData.authorId,
                    isRead: false,
                    type: "reply",
                  };
                  let notifs = [...updateData["notifications"], newNotificaton];

                  newReplies[u] = { ...newReplies[u], status: newStatus };
                  newUpdateData = {
                    ...updateData,
                    replies: newReplies,
                    notificatons: notifs,
                  };
                }
                updateUpdate(newUpdateData);
              }}
              isEditing={activeReply && reply.id == activeReply.id}
              setIsEditing={(r) => {
                setActiveReply(r);
                console.log(r);
                setReplyType(r.type);
                setEditContent(r.content);
                content = editContent;
                setIsReplyEditing(true);
              }}
              deleteReply={(r) => {
                if (
                  updateData.replies &&
                  updateData.replies.find((v) => v.id == r.id)
                ) {
                  const newUpdateData = {
                    ...updateData,
                    replies: updateData["replies"].filter((u) => u.id != r.id),
                  };
                  updateUpdate(newUpdateData);
                  setActiveReply(null);
                  setIsReplyEditing(false);
                  //updateUpdate(newUpdateData);
                }
              }}
            />
          ))}
      </RepliesListStyle>
    );
  };

  const ReplyEditRow = () => {
    return (
      <div className={"content content_edit"}>
        <FlexRow>
          <div class="dropdown">
            <select
              name="stages-reply"
              id="stages-reply"
              value={replyType??"reply"} //{activeReply.type}
              onChange={(event) => {
                const x = event.target.value;
                setReplyType(x);
                //setSelectedStage(x);
              }}
            >
              {["reply", "offer to help"].map((m) => (
                <option value={m}>{m}</option>
              ))}
            </select>
          </div>
        </FlexRow>
        <MyEditor2
          content={editContent}
          onChange={(val) => {
            content = val;
          }}
          onSave={(val) => {

            console.log(replyType);
            let newUpdateData;
            if (
              updateData.replies &&
              updateData.replies.find((v) => v.id == activeReply.id)
            ) {
              let newReplies = updateData["replies"];
              let u = newReplies.findIndex((v) => v.id == activeReply.id);
              newReplies[u] = { ...activeReply, content: val, type: replyType };
              newUpdateData = { ...updateData, replies: newReplies };

              //updateUpdate(newUpdateData);
            } else if (updateData.replies) {
              let newNotificaton = {
                userId: updateData.authorId,
                isRead: false,
                type: replyType??"reply",
              };
              let notifs = [...updateData["notifications"], newNotificaton];

              newUpdateData = {
                ...updateData,
                notifications: notifs,
                replies: [
                  ...updateData["replies"],
                  { ...activeReply, content: val, type: replyType },
                ],
              };
            } else {
              newUpdateData = {
                ...updateData,
                replies: [{ ...activeReply, content: val, type: replyType }],
              };
            }
            updateUpdate(newUpdateData);
            setActiveReply(null);
            setIsReplyEditing(false);
            setReplyType("update");
            setIsShowingReplies(true);
            console.log("HHHH");
          }}
          onCancel={() => {
            setActiveReply(null);
            setIsReplyEditing(false);
          }}
        />
      </div>
    );
  };

  return (
    <div key={updateData["id"]}>
      <TopFlagRowStyle>
        <div className={"tagrow"}>
          {updateData["projectName"] && (
            <TopTag><StyledLink to={`/projects/${updateData.projectId}`} style={{ textDecoration: 'none' }}>{updateData["projectName"]}</StyledLink></TopTag>
          )}
          {updateData["sectionName"] && (
            <TopTag><StyledLink to={`/projects/${updateData.projectId}/${updateData.sectionId}`} style={{ textDecoration: 'none' }}>{updateData["sectionName"]}</StyledLink></TopTag>
          )}
          {updateData["stage"] && <TopTag>{updateData["stage"]}</TopTag>}
        </div>
        {(isOfferHelp || isRequestHelp) && (
          <TopFlag
            type={updateData["type"]}
            status={updateData["status"]}
            state={hasOfferedHelp}
          >
            {isOfferHelp
              ? "Help Offered"
              : isRequestHelpDone
              ? "Request Done"
              : "Help Requested"}
          </TopFlag>
        )}
      </TopFlagRowStyle>
      <UpdateBoxWrapper>
        <UpdateBoxCSS
          type={updateData["type"]}
          status={updateData["status"]}
          state={hasOfferedHelp}
          onMouseEnter={() => {
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        >
          <HeaderRow />

          {isEditing ? <ContentRowEdit /> : <ContentRow />}
          <HelpResponseRow />
          <ReactionsRepliesRow />
        </UpdateBoxCSS>
        {(isEditingReply || isShowingReplies) && (
          <DividerSection>
            <hr className={"line1"} /> <p className={"text"}>Replies</p>{" "}
            <hr className={"line2"} />
          </DividerSection>
        )}
        {isShowingReplies && <RepliesListRow />}
        {isEditingReply && <ReplyEditRow />}

        {isSelector && <SlackSelector onSelect={handleSelect} />}
      </UpdateBoxWrapper>
    </div>
  );
};


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    color: white;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UpdateBoxWrapper = styled.div`
  margin-bottom: 20px;
  background-color: #ffffff;
`;

const HelpResponseStyle = styled.div`
  width: 100%;
  text-align: end;
  padding-top: 10px;
`;

const UpdateBoxCSS = styled.div`
  box-sizing: border-box;
  padding: 15px 10px 10px 10px;
  //border: 1px solid #eeeeee;
  .topbar {
    display: flex;
    justify-content: space-between;
  }
  .author {
    font-family: "Baloo 2";
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    line-height: 18px;
    align-items: center;
    letter-spacing: -0.02em;
    color: #0cc998;
  }
  .stage {
    font-family: "Baloo 2";
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    white-space: pre-wrap;

    display: flex;
    align-items: center;
    color: #5b5b5b;
  }

  .date {
    font-family: "Baloo 2";
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: black;
  }
  .icons {
    max-height: 18px;
    height: 18px;
    display: flex;
  }
  .icon {
    cursor: pointer;
  }
  .arrow-icon {
    padding-top: 5px;
    width: 25px;
  }
  .content {
    font-size: 14px;
    font-family: Inter;
  }
  .mention {
    background-color: blue;
  }
  .num_replies {
    font-size: 12px;
    font-family: Inter;
  }

  .flex-row {
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    height: 30px;
  }

  ${({ type, status, state }) =>
    type === "request help" && status !== "done" && state
      ? `
      border-top:3px solid #EAA828;
      background-color: #fff7ec;
`
      : type === "request help" && status !== "done"
      ? `
  background-color: #fff4f4;
  border: 2px solid #cb0101;
  border-radius: 5px 0px 5px 5px ;
`
      : type === "request help" && status === "done"
      ? `
  background-color: #E6FAF5;
  border: 2px solid #0CC998;
  border-radius: 5px 0px 5px 5px ;
`
      : `border-top:3px solid grey;
      border-radius:5px;
      `}
`;

const RepliesListStyle = styled.div`
  background-color: #ffffff;
  padding: 0px 10px 10px 10px;
`;

const DividerSection = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  color: grey;
  .line1 {
    width: 10%;
  }
  .line2 {
    width: 80%;
  }
  .text {
    padding: 0px 2px 3px 3px;
  }
`;
const TypeRowDiv = styled.div`
  height: 40px;
  background-color: grey;
  width: 100%;
`;

const TopFlagRowStyle = styled.div`
  height: 18px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  //flex-end;
  .tagrow {
    display: flex;
  }
`;

const TopFlag = styled.div`
  width: 120px;
  color: white;
  border-radius: 5px 5px 0px 0px;
  padding-left: 10px;
  padding-top: 3px;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  ${({ type, status, state }) =>
    type === "request help" && status !== "done" && state
      ? `
      background-color: #eaa828;
`
      : type === "request help" && status !== "done"
      ? `
  background-color: #CB0101;
`
      : type === "request help" && status === "done"
      ? `
  background-color: #0CC998;
`
      : `background-color: grey;`}
`;

const TopTag = styled.div`
  max-width: 120px;
  color: white;
  border-radius: 5px 5px 0px 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  background-color: #0cc998;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ButtonOne = styled.button`
  background: #e6faf5;
  border-radius: 60px;
  margin: 0px 5px 0px 0px;
  font-family: "Baloo 2";
  font-style: normal;
  font-weight: normal;
  color: #757575;
  height: 18px;
  width: 100px;
  cursor: pointer;
  border: none;
  padding: 0px;
  font-size: 12px;
  border: 1px solid #0cc998;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: 0.25s;
  &:hover {
    color: white;
    box-shadow: inset 0 0 0 2em #0cc998;
    transform: translateY(-0.25em);
  }
`;

export default UpdateBox;
