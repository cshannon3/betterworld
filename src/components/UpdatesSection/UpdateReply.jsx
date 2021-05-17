import styled from "styled-components";
import _ from 'lodash';
import { formatTimestamp } from "shared/utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";


const UpdateReply = ({
    reply,
    userName,
    isEditing=false,
    setIsEditing=()=>{},
    deleteReply=()=>{},
}) => {
    
    const isCurrentUser = reply.author == userName;
  
    const HeaderRow = () => {
        return (<div className={"topbar"}>
            <div className={"author"}>{reply["author"]}
                 </div>
            <div className={"date"}>
                {formatTimestamp(reply["date"])}
            </div>
            {isCurrentUser &&
                <div>
                    <AiOutlineEdit
                        onClick={() => {setIsEditing(reply) }}
                    />
                    <AiOutlineDelete
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
                <ReplyBoxCSS key={reply["id"]}>
                    <HeaderRow/>
                   <ContentRow/>
                </ReplyBoxCSS>
            );
}



const ReplyBoxCSS = styled.div`
background-color: #FFFFFF;
border: 1px solid #EEEEEE;
box-sizing: border-box;
margin:2%;

.topbar{
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:5px;
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
.stage{
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #5B5B5B;
}
.content {
    padding-left:5px;
    padding-right:5px;
}
.date{
    font-family: Baloo 2;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 19px;
    text-align: right;
    letter-spacing: -0.02em;

    color: #0CC998;
}

`


export default UpdateReply;

