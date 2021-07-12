import styled from "styled-components";
import _ from "lodash";
import { formatTimestamp } from "shared/utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";

const UpdateReply = ({
  reply,
  userName,
  isEditing = false,
  updateReplyStatus = (id, newStatus) => {},
  setIsEditing = () => {},
  deleteReply = () => {},
}) => {
  const isCurrentUser = reply.author == userName;
  const [isHovering, setIsHovering] = useState(false);

  const HeaderRow = () => {
    return (
      <div className={"topbar"}>
        <div className={"author"}>{reply["author"]}</div>
        
        
        {isHovering && isCurrentUser ? (
          <div className={"icons"}>
            <AiOutlineEdit
              size={18}
              className={"icon"}
              onClick={() => {
                setIsEditing(reply);
              }}
            />
            <AiOutlineDelete
              size={18}
              className={"icon"}
              onClick={() => {
                deleteReply(reply);
              }}
            />
           { reply["type"] ==="offer to help" && reply["status"]!=="done" &&<ButtonOne
            onClick={() => {
              updateReplyStatus(reply.id, "done");
            }}
          >
            Done?
          </ButtonOne>}
          </div>
        ) :
         reply["type"] ==="offer to help" && reply["status"]!=="done" ?
         <OfferHelp status={reply["status"]} type={reply["type"]}>
          <div className="flag">Help Offered</div>
        </OfferHelp>
        : reply["type"] ==="offer to help" && reply["status"]==="done"?
        <OfferHelp status={reply["status"]} type={reply["type"]}>
        <div className="flag">Done</div>
      </OfferHelp>
    :<div/>
      }
      </div>
    );
  };
  const ContentRow = () => {
    return <p className={"content"}>{reply["content"]}</p>;
  };

  return isEditing ? null : (
    <div style={{paddingTop:'10px'}}>
      

      <ReplyBoxCSS
        key={reply["id"]}
        status={reply["status"]}
        type={reply["type"]}
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      >
        

        <HeaderRow />
        <div className={"date"}>{formatTimestamp(reply["date"])}</div>
        <ContentRow />
      
      
      </ReplyBoxCSS>
    </div>
  );
};

  /* <FlexRow>
         {reply["type"] ==="offer to help" && reply["status"]!=="done" &&<ButtonOne
            onClick={() => {
              updateReplyStatus(reply.id, "done");
            }}
          >
            Done?
          </ButtonOne>
          }
        </FlexRow>
        {reply["type"] === "offer to help" && (
        <OfferHelp status={reply["status"]} type={reply["type"]}>
          <div className="flag">Help Offered</div>
        </OfferHelp> */
const ReplyBoxCSS = styled.div`
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  margin: 1px;
  margin-left: -10px;
  padding-left: 10px;
  padding-bottom: 15px;
  width: calc(100% + 20px);
  .topbar {
    display: flex;
    justify-content: space-between;
  }
  .author {
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #0cc998;
  }

  .content {
    font-size: 14px;
    font-family: Inter;
  }
  .date {
    font-family: "Baloo 2";
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
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
    padding-top: 5px;
    font-size: 14px;
    font-family: Inter;
  }

  .flex-row {
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  border-left:1px solid #0CC998;
 
`;


// ${({ type, status }) =>
// type === "offer to help" && status !== "done"
//   ? `
// background-color: white;//#fff7ec;
// border-radius: 5px 0px 5px 5px ;
// `
//   : type === "offer to help" && status === "done"
//   ? `
//   background-color: #E6FAF5;
// border-radius: 5px 0px 5px 5px ;
// `
//   : `border-left:1px solid #0CC998;`}
const OfferHelp = styled.div`
  height: 18px;
  .flag {
    width: 100px;
    color: white;
    border-radius: 5px; 
    font-family: Baloo 2;
    text-align:center;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    ${({ type, status }) =>
      type === "offer to help" && status === "done"
        ? `
  background-color: #0CC998;
`
        : `background-color: #eaa828;`}
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

const FlexRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default UpdateReply;

//   setActiveReply(
//     cleanReplyModel({
//       author: userName,
//       authorId: userId,
//       date: Date.now(),
//       type: "offer to help"
//     })
//   );
//   setEditContent("");
//   content = "";
//   setIsReplyEditing(true);
