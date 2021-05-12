import styled from "styled-components";
import { useMemo, useState, useEffect } from 'react';
import { SlackSelector, SlackCounter } from '@charkour/react-reactions';
import _ from 'lodash';

const UpdateBox = ({updateData, userName, isSelector, setSelectorOpen=()=>{}, updateUpdate=()=>{}}) => {
    useEffect(() => {
        // Update the document title using the browser API
      });
    
    function handleSelect(emoji){
        console.log(emoji, "HI");
        const index = _.findIndex(updateData["reactions"], { emoji, by: userName })
        console.log(index);
        if (index > -1) {
            const newReactions = [...updateData["reactions"].slice(0, index), ...updateData["reactions"].slice(index + 1)]
            const newUpdateData = {...updateData, "reactions": newReactions}
            console.log(newReactions);
            updateUpdate(newUpdateData);
            setSelectorOpen(newUpdateData);
          
        } else {
            const newReactions = [...updateData.reactions, { emoji, by: userName }]
            const newUpdateData = {...updateData, "reactions": newReactions}
            updateUpdate(newUpdateData);
            console.log(newUpdateData);
            setSelectorOpen(newUpdateData);
        }
      }

    
    function inner() {
        return (
            <div>
                <div className={"topbar"}>
                    <div className={"author"}>{updateData["author"]}
                        <span className={"stage"}> &#8226; {updateData["stage"]}</span>
                    </div>
                    <div className={"date"}>
                        {updateData["date"]}
                    </div>
                </div>
                <p className={"content"}>
                    {updateData["content"]}
                </p>
                <SlackCounter
                    user={userName}
                    counters={updateData["reactions"]}
                    onAdd={ ()=>setSelectorOpen(updateData) }
                    onSelect={ emoji=>handleSelect(emoji) }
                />
                {isSelector?<SlackSelector 
                onSelect={ handleSelect }
                />  :null}
                
            </div>
        );
    }

 

    return updateData["type"] == "offer to help" ?
        (
            <OfferHelpBox key={updateData["id"]}>
                {inner()}
            </OfferHelpBox>
            ) : updateData["type"] == "request help" ?
            (<RequestBox key={updateData["id"]}>
                {inner()}
            </RequestBox>
            ) : (
            <UpdateBoxCSS key={updateData["id"]}>
                {inner()}
            </UpdateBoxCSS>
            );
}




const UpdateBoxCSS = styled.div`
background-color: #FFFFFF;
border: 1px solid #EEEEEE;
box-sizing: border-box;
height:120px;
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

const OfferHelpBox = styled(UpdateBoxCSS)`
    background-color: #FFF4F4;
    border: 2px solid #CB0101;
    border-radius: 5px;
`


const RequestBox = styled(UpdateBoxCSS)`
    background-color: #FFF7EC;
    border-radius: 5px;
`

export default UpdateBox;