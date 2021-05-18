import styled from "styled-components";
import { useMemo, useState, useEffect, useContext} from 'react';
import { SlackSelector, SlackCounter } from '@charkour/react-reactions';
import _ from 'lodash';
import { formatTimestamp } from "shared/utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import RichEditor, {MyEditor} from "../RichTextEditor/RichTextEditor";
import {FiChevronDown, FiChevronUp } from "react-icons/fi";
import {BsReply} from "react-icons/bs";
import {cleanReplyModel } from "data_models/updatemodel";
import ControlContext from 'shared/control-context';
import UpdateReply from './UpdateReply';
//https://github.com/charkour/react-reactions/blob/main/src/components/slack/SlackCounter.tsx
const UpdateBox = ({
    updateData,
    userName,
    isSelector,
    setSelectorOpen = () => { },
    updateUpdate = () => { },
    deleteUpdate = () => { }
}) => {

    const ctrctx = useContext(ControlContext);
    const userId = ctrctx.user["id"];
    const isCurrentUser = updateData.author == userName;
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingReply, setIsReplyEditing] = useState(false);
    const [isShowingReplies, setIsShowingReplies] = useState(false);
    const [activeReply, setActiveReply]= useState(null);

    const [content, setContent] = useState(updateData["content"]);




    useEffect(() => {
        // Update the document title using the browser API
    });

    function handleSelect(emoji) {
        const index = _.findIndex(updateData["reactions"], { emoji, by: userName })
        console.log(index);
        if (index > -1) {
            const newReactions = [...updateData["reactions"].slice(0, index), ...updateData["reactions"].slice(index + 1)]
            const newUpdateData = { ...updateData, "reactions": newReactions }
            console.log(newReactions);
            updateUpdate(newUpdateData);
            setSelectorOpen(newUpdateData);

        } else {
            const newReactions = [...updateData.reactions, { emoji, by: userName }]
            const newUpdateData = { ...updateData, "reactions": newReactions }
            updateUpdate(newUpdateData);
            console.log(newUpdateData);
            setSelectorOpen(newUpdateData);
        }
    }
    const TypeRow = () => {
        return (
            <TypeRowDiv >Update Type</TypeRowDiv>
        )
    }
    const HeaderRow = () => {
        return (<div className={"topbar"}>
            <div className={"author"}>{updateData["author"]}
                <span className={"stage"}> &#8226; {updateData["stage"]}</span>
            </div>
            <div className={"date"}>
                {formatTimestamp(updateData["date"])}

            </div>
            {isCurrentUser &&
                <div>
                    <AiOutlineEdit
                        onClick={() => {setIsEditing(!isEditing) }}
                    />
                    <AiOutlineDelete
                        onClick={() => { deleteUpdate(updateData); }}
                    />
                </div>
            }
            <BsReply
                onClick={() => {
                    setActiveReply(cleanReplyModel({
                        "author": userName,
                        "authorId": userId,
                        "date": Date.now(),
                    }));
                    setIsReplyEditing(true);
                }}
            />
        </div>);
    }
    const ContentRow = () => {
        return (
        <p className={"content"}>
        {updateData["content"]}
        </p>)
    }
    function ContentRowEdit() {
        return (
            <div className={"content"}>
             <MyEditor
                content={content}
                onSave={(val)=>{
                    const newUpdateData = { ...updateData, "content": val }
                    updateUpdate(newUpdateData);
                    setIsEditing(false);
                }}
                onCancel={()=>{
                    setIsEditing(false);
                }}
                //changeHandler={(value) => setContent(value)}
        />
         </div>
        )
    }

    const FlagRow = () => {
        return (<div>
            Base Flag
          </div>)
    }

    const HelpReqFlagRow = () => {
        return (<div>
          <div> ! </div>
          <div>Help Requested</div>
        </div>)
    }

    const HelpOfferFlagRow = () => {
        return (<div>
          <div>Offer to Help Pending</div>
        </div>)
    }

    const ReactionRow = () => {
        return (
        <SlackCounter
            user={userName}
            counters={updateData["reactions"]}
            onAdd={() => setSelectorOpen(updateData)}
            onSelect={emoji => handleSelect(emoji)}
        />);
    }

    const RepliesInfoRow = () => {
        if(!updateData["replies"]) return null;
        return (
        <div>
        {isShowingReplies?
            <FiChevronUp onClick={()=>setIsShowingReplies(false)}/> :
             <FiChevronDown onClick={()=>setIsShowingReplies(true)}/>
        }
        {`${updateData["replies"].length} Replies`}
        </div>)
    }
    const RepliesListRow = () => {

        return (<div>
            {updateData["replies"].map((reply)=>(
                <UpdateReply
                    id={reply.id}
                    reply={reply}
                    userName={userName}
                    isEditing={activeReply&&(reply.id==activeReply.id)}
                    setIsEditing={(r)=>{setActiveReply(r); setIsReplyEditing(true);}}
                    deleteReply={(r)=>{
                        if(updateData.replies&& updateData.replies.find((v)=>v.id==r.id)){
                            const newUpdateData = { ...updateData, "replies": updateData["replies"].filter(u=>u.id!=r.id)}
                            updateUpdate(newUpdateData);
                            setActiveReply(null);
                            setIsReplyEditing(false);
                        //updateUpdate(newUpdateData);
                        }
                    }}
                />
            ))}
        </div>)
    }

    const ReplyEditRow = () => {
        return (
            <div className={"content"}>
             <MyEditor
                content={activeReply.content}
                onSave={(val)=>{
                   console.log(val);
                    //setActiveReply({...activeReply, "content":val});
                    let newUpdateData;
                    if(updateData.replies&& updateData.replies.find((v)=>v.id==activeReply.id)){
                        let newReplies = updateData["replies"];
                        let u = newReplies.findIndex((v)=>v.id==activeReply.id);
                        newReplies[u]={...activeReply, "content":val};
                        newUpdateData = { ...updateData, "replies": newReplies }
                    //updateUpdate(newUpdateData);
                    }else if (updateData.replies){
                        newUpdateData = { ...updateData, "replies": [...updateData["replies"],{...activeReply, "content":val} ] }
                    }else{
                        newUpdateData = { ...updateData, "replies": [{...activeReply, "content":val} ] }
                    }
                    updateUpdate(newUpdateData);
                    console.log(newUpdateData);
                    setActiveReply(null);
                    setIsReplyEditing(false);
                }}
                onCancel={()=>{
                    setActiveReply(null);
                    setIsReplyEditing(false);
                }}
                //changeHandler={(value) => setContent(value)}
        />
         </div>
        )
    }



    return updateData["type"] == "offer to help" ?
        (
            <OfferHelpBox key={updateData["id"]}>
                <HeaderRow/>
                {isEditing? <ContentRowEdit/> : <ContentRow/>}
                <HelpOfferFlagRow/>
                <ReactionRow/>
                <RepliesInfoRow/>
                {isShowingReplies&& <RepliesListRow/>}
                {isSelector &&<SlackSelector onSelect={handleSelect} /> }
                {isEditingReply&&<ReplyEditRow/>}
            </OfferHelpBox>
        ) : updateData["type"] == "request help" ?
            (<RequestBox key={updateData["id"]}>
                <HeaderRow/>
                {isEditing? <ContentRowEdit/> : <ContentRow/>}
                <HelpReqFlagRow/>
                <ReactionRow/>
                 <RepliesInfoRow/>
                {isShowingReplies&& <RepliesListRow/>}
                {isSelector &&<SlackSelector onSelect={handleSelect} /> }
                {isEditingReply&&<ReplyEditRow/>}
            </RequestBox>
            ) : (
                <UpdateBoxCSS key={updateData["id"]}>
                    <HeaderRow/>
                    {isEditing? <ContentRowEdit/> : <ContentRow/>}
                    <FlagRow/>
                    <ReactionRow/>
                    <RepliesInfoRow/>
                    {isShowingReplies&& <RepliesListRow/>}
                    {isSelector &&<SlackSelector onSelect={handleSelect} /> }
                    {isEditingReply&&<ReplyEditRow/>}
                </UpdateBoxCSS>
            );
}



const UpdateBoxCSS = styled.div`
background-color: #FFFFFF;
border: 1px solid #EEEEEE;
box-sizing: border-box;
margin:5%;

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
const TypeRowDiv = styled.div`
    height:40px;
    background-color:grey;
    width:100%
`

const OfferHelpBox = styled(UpdateBoxCSS)`
    background-color: #FFF4F4;
    border: 2px solid #CB0101;
    border-radius: 5px;
`


const RequestBox = styled(UpdateBoxCSS)`
    background-color: #FFF7EC;
    border-radius: 5px;
`
const HelpReqFlagRow = styled.div`
    background-color: #CB0101;
    width: 127px;
    height: 18px;
`

const HelpOfferFlagRow = styled.div`
    background-color: #EAA828;
    width: 149px;
    height: 18px;
`
//Maybe float right? Need to align to the right of teh update box

export default UpdateBox;
