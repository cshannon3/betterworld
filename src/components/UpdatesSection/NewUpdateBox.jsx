import styled from "styled-components";
import { useMemo, useState, useEffect, useContext } from "react";
import _ from "lodash";
import { formatTimestamp } from "shared/utils";
import ControlContext from "shared/control-context";

import { swapTags, getUsersFromTags } from "components/MyEditor/tags";
import defaultStyle from "components/MyEditor/defaultStyle";
import { MentionsInput, Mention } from "react-mentions";

//https://github.com/charkour/react-reactions/blob/main/src/components/slack/SlackCounter.tsx

//TODO get in the current data of where they are --- project section etc
const NewUpdateBox = ({
  onSave = () => {},
  onCancel = () => {},
  updateType,
}) => {
  const ctrctx = useContext(ControlContext);

  const userName = ctrctx.user && ctrctx.user.displayName;
  const [stage, setStage] = useState("none");
  const [type, setType] = useState(updateType);
  const [_content, setContent] = useState("");



  const handleCommentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    //onChange(newContent);
  };
  const userMentionData = Object.entries(ctrctx.membersData).map(
    ([k, myUser]) => ({
      id: k,
      display: myUser.name,
    })
  );

  const HeaderRow = () => {
    return (
      <div className={"topbar"}>
        <div className={"author"}>{userName}</div>
      </div>
    );
  };

  return (
    <UpdateBoxWrapper>
      <UpdateBoxCSS type={type}>
        <HeaderRow />
        <RootStyles>
          <MentionsInput
            key="inputkey"
            value={_content}
            onChange={handleCommentChange}
            style={defaultStyle}
          >
            <Mention
              trigger="@"
              markup="@{{__type__||__id__||__display__}}"
              data={userMentionData}
              type="user"
            />
          </MentionsInput>
        </RootStyles>
        <OptionsBar>
          <div>
            <label for="type">Type</label><br/>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value={"default"}>Default</option>
              <option value={"request help"}>Help Request</option>
            </select>
          </div>
          <div>
          <label for="stage">Stage</label><br/>
            <select
              name="stage"
              id="stage1"
              value={stage}
              onChange={(event) => {
                console.log(event.target.value);
                setStage(event.target.value);
              }}
            >
              <option value={"none"}> None</option>
              <option value={"Research"}>Research</option>
              <option value={"Writing"}>Writing</option>
              <option value={"Editing"}>Editing</option>
              <option value={"Design"}>Design</option>
            </select>
          </div>
        </OptionsBar>
        <div>
          <SaveButton
            className={"button"}
            onClick={() => {
              const displayText = swapTags(_content);

              onSave({
                content: displayText,
                contentRaw: _content,
                stage: stage,
                type: type,
              });
            }}
          >
            save
          </SaveButton>
          <CancelButton className={"button grey"} onClick={() => onCancel()}>
            cancel
          </CancelButton>
        </div>
      </UpdateBoxCSS>
    </UpdateBoxWrapper>
  );
};

const RootStyles = styled.div`
  background: #dad9d926;
  border: 1px solid #9f9e9e;
  font-family: sans-serif;
  font-size: 14px;
  // padding: 10px 15px 15px 15px;
  height: 100px;
  margin-bottom: 10px;

  &::focused {
    border-color: darkslategray;
  }
`;

const OptionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  div {
    width: 50%;
  }
`;

const SaveButton = styled.button`
  background: #0cc998;
  border-radius: 5px;
  font-family: Baloo 2;
  font-style: normal;
  font-weight: bold;
  color: white;
  height: 30px;
  width: 144px;
  margin: 10px;
  cursor: pointer;
`;
const CancelButton = styled(SaveButton)`
  background-color: grey;
`;

const UpdateBoxWrapper = styled.div`
  margin-bottom: 20px;
  background-color: #ffffff;
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

  ${({ type }) =>
    type === "request help"
      ? `
  background-color: #fff4f4;
  border: 2px solid #cb0101;
  border-radius: 5px 0px 5px 5px ;
`
      : `border-top:3px solid grey;
      border-radius:5px;
      `}
`;




export default NewUpdateBox;
