import styled from "styled-components";
import { useMemo, useState, useEffect, useContext } from "react";
import { SlackSelector, SlackCounter } from "@charkour/react-reactions";
import _ from "lodash";
import { formatTimestamp } from "shared/utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import RichEditor, { MyEditor } from "../RichTextEditor/RichTextEditor";
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
  updateUpdates = () => {},
  deleteUpdate = () => {},
}) => {
  const ctrctx = useContext(ControlContext);
  const userId = ctrctx.user && ctrctx.user.id;
  const userName = ctrctx.user && ctrctx.user.displayName;
  const isCurrentUser = updateData.author == userName;
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingReply, setIsReplyEditing] = useState(false);
  const [isShowingReplies, setIsShowingReplies] = useState(false);
  const [activeReply, setActiveReply] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const [content, setContent] = useState(updateData["content"]);

  useEffect(() => {
    // Update the document title using the browser API
  });

  function handleSelect(emoji) {
    const index = _.findIndex(updateData["reactions"], { emoji, by: userName });
    console.log(index);
    if (index > -1) {
      const newReactions = [
        ...updateData["reactions"].slice(0, index),
        ...updateData["reactions"].slice(index + 1),
      ];
      const newUpdateData = { ...updateData, reactions: newReactions };
      console.log(newReactions);
      updateUpdates(newUpdateData);
      setSelectorOpen(newUpdateData);
    } else {
      const newReactions = [...updateData.reactions, { emoji, by: userName }];
      const newUpdateData = { ...updateData, reactions: newReactions };
      updateUpdates(newUpdateData);
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

        {isHovering &&  (isCurrentUser ? (
          <div className={"icons"}>
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
            setIsReplyEditing(true);
          }}
        />
        </div>
         ) : ((updateData["type"] == "request help") && updateData["status"] && updateData["status"]!="done")?
         <div>
             <ButtonOne>Offer Help</ButtonOne>
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
              setIsReplyEditing(true);
            }}
          />
         </div>

         :( <BsReply
            size={18}
            onClick={() => {
              setActiveReply(
                cleanReplyModel({
                  author: userName,
                  authorId: userId,
                  date: Date.now(),
                })
              );
              setIsReplyEditing(true);
            }}
          />))
        }
       
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
            updateUpdates(newUpdateData);
            setIsEditing(false);
          }}
          onCancel={() => {
            setIsEditing(false);
          }}
        />
      </div>
    );
  }

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
          {updateData["replies"] && updateData["replies"].length>0 && (isShowingReplies ? (
            <FiChevronUp className="arrow-icon" size={18}/>) : (<FiChevronDown className="arrow-icon" size={18}/>
          ))}
          {updateData["replies"]? `${updateData["replies"].length} Replies`: "0 Replies"}
        </div>
      </div>
    );
  };


  const RepliesListRow = () => {
    return (
      <div>
        {updateData["replies"].map((reply) => (
          <UpdateReply
            id={reply.id}
            reply={reply}
            userName={userName}
            isEditing={activeReply && reply.id == activeReply.id}
            setIsEditing={(r) => {
              setActiveReply(r);
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
                updateUpdates(newUpdateData);
                setActiveReply(null);
                setIsReplyEditing(false);
                //updateUpdates(newUpdateData);
              }
            }}
          />
        ))}
      </div>
    );
  };

  const ReplyEditRow = () => {
    return (
      <div className={"content"}>
        <MyEditor
          content={activeReply.content}
          onSave={(val) => {
            console.log(val);
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
              //updateUpdates(newUpdateData);
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
            updateUpdates(newUpdateData);
            console.log(newUpdateData);
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

  return (
    <div key={updateData["id"]}
    onMouseEnter={()=> setIsHovering(true)}
    onMouseLeave={()=> setIsHovering(false)}
    >

      {updateData["type"] == "offer to help" ? (
        <OfferHelp>
          <div className="flag">Help Offered</div>
        </OfferHelp>
      ) : updateData["type"] == "request help" ? (
        <HelpReq>
          <div className="flag">Help Requested</div>
        </HelpReq>
      ) : null}
      <UpdateBoxCSS type={updateData["type"]}>
        <HeaderRow />
        <div className={"date"}>{formatTimestamp(updateData["date"])}</div>
        {isEditing ? (
          <ContentRowEdit />
        ) : (
          <p className={"content"}>{updateData["content"]}</p>
        )}
        <div></div>

        <ReactionsRepliesRow />
        {(isEditingReply||isShowingReplies) && 
        <DividerSection>
           <hr className ={"line1"}/> <p className ={"text"}>Replies</p> <hr className ={"line2"}/>
    </DividerSection>
        }
        {isShowingReplies && <RepliesListRow />}
        {isEditingReply && <ReplyEditRow />}
      </UpdateBoxCSS>

      {isSelector && <SlackSelector onSelect={handleSelect} />}
    </div>
  );
};

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
  .icons{
      height:18px;
  }
  .icon{
    cursor:pointer;
  }
  .arrow-icon{
      padding-top:5px;
      width:25px;
  }
  .content {
    font-size: 14px;
    font-family: Inter;
    
  }
  .num_replies{
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

  ${({ type }) =>
    type === "offer to help"
      ? `
  background-color: #fff7ec;
  border-radius: 5px 0px 5px 5px ;
`
      : type === "request help"
      ? `
  background-color: #fff4f4;
  border: 2px solid #cb0101;
  border-radius: 5px 0px 5px 5px ;
`
      : `border-left:10px solid #0CC998;`}
`;


const DividerSection = styled.div`
    display:flex;
    align-items:center;
    margin: 5px 0px;
    color:grey;
    .line1{
        width:10%;
    }
    .line2{
        width:80%;
    }
    .text{
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
    background: #0CC998;
    border-radius: 2px;
    font-family: Baloo 2;
    font-weight: bold;
    color: white;
    width:100px;
    margin-right:10px;
    cursor: pointer;
    font-size: 12px;
    outline: none; 
    border:none;
`;
export default UpdateBox;


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
