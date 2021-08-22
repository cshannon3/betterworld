import styled from "styled-components";
import * as styles from "styles/sharedStyles";

export default function AtAGlanceModule({ TopComponent, BottomComponent}) {

  return (
    <AtAGlanceBox>
      <styles.GreenTitleBar>At A Glance Box</styles.GreenTitleBar>
      <Column>
        <Row>
        { TopComponent}
        </Row>
        <Row>
        { BottomComponent}
      </Row>
      </Column>
    </AtAGlanceBox>
  );
}

const AtAGlanceBox = styled.div`
  height: 250px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-bottom:20px;
  .col {
    display: flex;
    justify-content: space-evenly;
  }
  li {
    margin-left: 20px;
  }
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 38px);
  width: 100%;
`;