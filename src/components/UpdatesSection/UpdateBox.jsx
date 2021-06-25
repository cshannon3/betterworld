import styled from "styled-components";
import { useMemo, useState, useEffect, useContext } from "react";
import { SlackSelector, SlackCounter } from "@charkour/react-reactions";
import _ from "lodash";
import { formatTimestamp } from "shared/utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MyEditor } from "../MyEditor/MyEditor";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsReply } from "react-icons/bs";
import { cleanReplyModel } from "data_models/updatemodel";
import ControlContext from "shared/control-context";
import UpdateReply from "./UpdateReply";
//https://github.com/charkour/react-reactions/blob/main/src/components/slack/SlackCounter.tsx

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
  const isRequestHelp =  updateData["type"] && (updateData["type"] == "request help" );
  const hasOfferedHelp = updateData["replies"]&&updateData["replies"].filter((rep)=>(rep.type==="offer to help" && rep.author == userName)).length>0;
  const isRequestHelpDone = updateData["status"] && updateData["status"] != "done";




  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReply, setIsReplyEditing] = useState(false);
  const [isShowingReplies, setIsShowingReplies] = useState(false);
  const [activeReply, setActiveReply] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [editContent, setEditContent] = useState("");



  let content = updateData["content"];
 
  const hasOfferedHelp = updateData["replies"]&&updateData["replies"].filter((rep)=>(rep.type==="offer to help" && rep.author == userName)).length>0;

  useEffect(() => {
    // Update the document title using the browser API
  });

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
        <div className={"author"}>
          {updateData["author"]}
          <span className={"stage"}> {`  •  ${updateData["stage"]}`}</span>
        </div>

        {
        isHovering &&
          (isCurrentUser ? (
            <div className={"icons"}>
            { isRequestHelp&&isRequestHelpDone &&<ButtonOne
            onClick={() => {
              // setActiveReply(
              //   cleanReplyModel({
              //     author: userName,
              //     authorId: userId,
              //     date: Date.now(),
              //     type: "offer to help"
              //   })
              // );
              // setEditContent("");
              // content = "";
              // setIsReplyEditing(true);
            }}
          >
            Done?
          </ButtonOne> }
              <AiOutlineEdit
                className="icon"
                size={18}
                onClick={() => {
                  setIsEditing(!isEditing);
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
          ) : isRequestHelp &&isRequestHelpDone  &&
            !hasOfferedHelp ? (
            <div className={"icons"}>
              <ButtonOne
                onClick={() => {
                  setActiveReply(
                    cleanReplyModel({
                      author: userName,
                      authorId: userId,
                      date: Date.now(),
                      type: "offer to help"
                    })
                  );
                  setEditContent("");
                  content = "";
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
          ) : 
          (
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
          ))}
      </div>
    );
  };

  function ContentRowEdit() {
    return (
      <div className={"content"}>
        <MyEditor
          content={content}
          onSave={(val) => {
            const newUpdateData = { ...updateData, content: val };
            updateUpdate(newUpdateData);
            setIsEditing(false);
          }}
          onCancel={() => {
            setIsEditing(false);
          }}
        />
      </div>
    );
  }
  const HelpResponseRow = () => {
    return (
      <div></div>
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
      <div>
        {updateData["replies"].filter((rep)=>rep.type!=="offer to help").map((reply) => (
          <UpdateReply
            id={reply.id}
            reply={reply}
            userName={userName}
            isEditing={activeReply && reply.id == activeReply.id}
            setIsEditing={(r) => {
              setActiveReply(r);
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
      </div>
    );
  };

  const ReplyEditRow = () => {
    return (
      <div className={"content content_edit"}>
        <FlexRow>
        <div class="dropdown">
              <select name="stages" id="stages" value={activeReply.type} onChange={() => {
                var x = document.getElementById("stages").value;
                //setSelectedStage(x);
              }
              }>
                {["", "offer to help"].map((m) => (
                  <option value={m}
                  >{m}</option>))}
              </select>
            </div>
        </FlexRow>
        <MyEditor
          content={editContent}
          onChange={(val) => {
            content = val;
          }}
          onSave={(val) => {
            //  console.log(val);
            //setActiveReply({...activeReply, "content":val});
            let newUpdateData;
            if (
              updateData.replies &&
              updateData.replies.find((v) => v.id == activeReply.id)
            ) {
              let newReplies = updateData["replies"];
              let u = newReplies.findIndex((v) => v.id == activeReply.id);
              newReplies[u] = { ...activeReply, content: val };
              newUpdateData = { ...updateData, replies: newReplies };
              //updateUpdate(newUpdateData);
            } else if (updateData.replies) {
              newUpdateData = {
                ...updateData,
                replies: [
                  ...updateData["replies"],
                  { ...activeReply, content: val },
                ],
              };
            } else {
              newUpdateData = {
                ...updateData,
                replies: [{ ...activeReply, content: val }],
              };
            }
            updateUpdate(newUpdateData);
            setActiveReply(null);
            setIsReplyEditing(false);
          }}
          onCancel={() => {
            setActiveReply(null);
            setIsReplyEditing(false);
          }}
        />
      </div>
    );
  };


  const PinnedHelpReplyRow = () => {
    
    if(!updateData["replies"] || updateData["replies"].filter((rep)=>rep.type==="offer to help").length == 0){
      return null;
    }

    const reply = updateData["replies"].filter((rep)=>rep.type==="offer to help")[0];
    return  ( 
    <div style={{paddingTop:"10px"}}>
    <UpdateReply
     id={reply.id}
     reply={reply}
     userName={userName}
     isEditing={activeReply && reply.id == activeReply.id}
     setIsEditing={(r) => {
       setActiveReply(r);
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
   </div>
   
   )
  }

  return (
    <div
      key={updateData["id"]}
      onMouseEnter={() => {
        setEditContent(content);
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        //   console.log(content);
        setEditContent(content);
        setIsHovering(false);
      }}
    >
      {isOfferHelp? (
        <OfferHelp>
          <div className="flag">Help Offered</div>
        </OfferHelp>
      ) : isRequestHelp ? (
        <HelpReq>
          <div className="flag">Help Requested</div>
        </HelpReq>
      ) : null}
      <UpdateBoxCSS type={updateData["type"]} status={updateData["status"]}>
        <HeaderRow />
        <div className={"date"}>{formatTimestamp(updateData["date"])}</div>
        {isEditing ? (
          <ContentRowEdit />
        ) : (
          <p className={"content"}>{updateData["content"]}</p>
        )}
       
        
       <PinnedHelpReplyRow/>
        <ReactionsRepliesRow />
        {(isEditingReply || isShowingReplies) && (
          <DividerSection>
            <hr className={"line1"} /> <p className={"text"}>Replies</p>{" "}
            <hr className={"line2"} />
          </DividerSection>
        )}
        {isShowingReplies && <RepliesListRow />}
        {isEditingReply && <ReplyEditRow />}
      
      </UpdateBoxCSS>

      {isSelector && <SlackSelector onSelect={handleSelect} />}
    </div>
  );
};

const FlexRow = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const UpdateBoxCSS = styled.div`
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 15px 10px 10px 10px;

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
  .num_replies {
    font-size: 12px;
    font-family: Inter;
  }

  .flex-row {
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  border-radius: 5px;

  ${({ type, status }) =>
    type === "offer to help"
      ? `
  background-color: #fff7ec;
  border-radius: 5px 0px 5px 5px ;
`
      : type === "request help" && status !== "done"
      ? `
  background-color: #fff4f4;
  border: 2px solid #cb0101;
  border-radius: 5px 0px 5px 5px ;
`
      : type === "request help" && status === "done"
      ? `
  background-color: #EAA828;
  border: 2px solid #cb0101;
  border-radius: 5px 0px 5px 5px ;
`
      : `border-left:10px solid #0CC998;`}
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

const HelpReq = styled.div`
  height: 18px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  .flag {
    width: 120px;
    background-color: #cb0101;
    color: white;
    border-radius: 5px 5px 0px 0px;
    padding-left: 10px;
    padding-top: 3px;
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
  }
`;

const OfferHelp = styled.div`
  height: 18px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  .flag {
    width: 120px;
    background-color: #eaa828;
    color: white;
    border-radius: 5px 5px 0px 0px;
    padding-left: 10px;
    padding-top: 3px;
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
  }
`;

const ButtonOne = styled.button`
  background: #0cc998;
  border-radius: 2px;
  font-family: Baloo 2;
  font-weight: bold;
  color: white;
  width: 100px;
  height: 18px;
  margin: 0px 5px 0px 0px;
  padding: 0px;
  cursor: pointer;
  font-size: 12px;
  outline: none;
  border: none;
`;
export default UpdateBox;

// Offer help

//   const RepliesInfoRow = () => {
//     if (!updateData["replies"]) return null;
//     return (
//       <div>
//         {isShowingReplies ? (
//           <FiChevronUp onClick={() => setIsShowingReplies(false)} />
//         ) : (
//           <FiChevronDown onClick={() => setIsShowingReplies(true)} />
//         )}
//         {`${updateData["replies"].length} Replies`}
//       </div>
//     );
//   };
//OFFER TO HELP PENDING
/*
  
  updateData["type"] == "offer to help" ? (
    <div key={updateData["id"]}>
      <HelpOfferFlagRow />

      <OfferHelpBox>
        <HeaderRow />
        {isEditing ? <ContentRowEdit /> : <ContentRow />}
        <ReactionRow />
        <RepliesInfoRow />
        {isShowingReplies && <RepliesListRow />}
        {isSelector && <SlackSelector onSelect={handleSelect} />}
        {isEditingReply && <ReplyEditRow />}
      </OfferHelpBox>
    </div>
  ) : updateData["type"] == "request help" ? (
    <div key={updateData["id"]}>
      <HelpReqFlagRow />

      <RequestBox>
        <HeaderRow />
        {isEditing ? <ContentRowEdit /> : <ContentRow />}
        <ReactionRow />
        <RepliesInfoRow />
        {isShowingReplies && <RepliesListRow />}
        {isSelector && <SlackSelector onSelect={handleSelect} />}
        {isEditingReply && <ReplyEditRow />}
      </RequestBox>
    </div>
  ) :
*/
// const HelpOfferFlagRow = styled.div`
//   background-color: ;
//   width: 149px;
//   height: 18px;
// `;
// const RequestBox = styled(UpdateBoxCSS)`
//   background-color: #fff4f4;
//   border: 2px solid #cb0101;
//   border-radius: 5px;
// `;

// const OfferHelpBox = styled(UpdateBoxCSS)`
//   background-color: #fff7ec;
//   border-radius: 5px;
// `;
// <RequestBox key={updateData["id"]}>
//   <HelpOfferFlagRow />
//   <HeaderRow />
//   {isEditing ? <ContentRowEdit /> : <ContentRow />}
//   <ReactionRow />
//   <RepliesInfoRow />
//   {isShowingReplies && <RepliesListRow />}
//   {isSelector && <SlackSelector onSelect={handleSelect} />}
//   {isEditingReply && <ReplyEditRow />}
// </RequestBox>
