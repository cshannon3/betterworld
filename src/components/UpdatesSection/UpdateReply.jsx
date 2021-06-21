import styled from "styled-components";
import _ from 'lodash';
import { formatTimestamp } from "shared/utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";

const UpdateReply = ({
    reply,
    userName,
    isEditing=false,
    setIsEditing=()=>{},
    deleteReply=()=>{},
}) => {
    
    const isCurrentUser = reply.author == userName;
    const [isHovering, setIsHovering] = useState(false);

    const HeaderRow = () => {
        return (<div className={"topbar"}>
            <div className={"author"}>{reply["author"]}
                 </div>
          
            { isHovering && isCurrentUser &&
                <div className={"icons"}>
                    <AiOutlineEdit
                     size={18}
                    className={"icon"}
                        onClick={() => {setIsEditing(reply) }}
                    />
                    <AiOutlineDelete
                     size={18}
                        className={"icon"}
                        onClick={() => { deleteReply(reply); }}
                    />
                </div>
            }
        </div>);
    }
    const ContentRow = () => {
        return (
        <p className={"content"}>
        {reply["content"]}
        </p>)
    }
  
    return isEditing? null:
    (
                <ReplyBoxCSS key={reply["id"]}
                    onMouseEnter={()=> {
                        setIsHovering(true);
                    }}
                    onMouseLeave={()=> {
                        setIsHovering(false);
                    }}
                >
                    <HeaderRow/>
                    <div className={"date"}>{formatTimestamp(reply["date"])}</div>
                   <ContentRow/>
                </ReplyBoxCSS>
            );
}



const ReplyBoxCSS = styled.div`
background-color: #FFFFFF;
border: 1px solid #EEEEEE;
box-sizing: border-box;
margin:1px;
margin-bottom: 20px;
.topbar{
    display:flex;
    justify-content: space-between;
}
.author{
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 25px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #0CC998;
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
  .icons{
    max-height:18px;
    height:18px;
    display: flex;
}
.icon{
  cursor:pointer;
}
.arrow-icon{
    padding-top:5px;
    width:25px;
}
.content {
    padding-top:5px;
  font-size: 14px;
  font-family: Inter;
}

.flex-row {
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  border-radius: 5px;



`




export default UpdateReply;

