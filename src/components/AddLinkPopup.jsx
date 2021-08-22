import styled from "styled-components";
import * as styles from "styles/sharedStyles";


const AddLinkPopup = ({
    setModalOpen,
    onAddLink,
})=> {
  return ( <div>
    <X onClick={() => setModalOpen(false)}>X</X>
    <Title>Add a New File</Title>
    <Label>
      <SectionTitle>Name:</SectionTitle>
      <Input
        id="fileName"
        type="text"
        name="Name"
        placeholder="New File Name"
      />
    </Label>
    <div>
      <SectionTitle>URL:</SectionTitle>
      <Label>
        <Input
          id="urlName"
          type="text"
          placeholder="Website URL"
          name="URL"
        />
      </Label>
    </div>
    <BtnRow>
      <CancelBtn onClick={() => setModalOpen(false)}>
        Cancel
      </CancelBtn>
      <SubmitBtn  value="Create" onClick={()=>{
        const _url= document.getElementById("urlName").value;
        const _name= document.getElementById("fileName").value;
        onAddLink( _name, _url);
      }}/>
    </BtnRow>
</div> );
}

export default AddLinkPopup;



const CancelBtn = styled.button`
  border: 1px solid black;
  background white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 20px;
  width: 35%;
  color: #0CC998;
  border: 1px solid #0CC998;
`;

const SubmitBtn = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  background: #0cc998;
  color: white;
  width: 60%;
  border: none;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const X = styled.p`
  float: right;
  font-weight: bold;
  margin-left: 40px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #5c677d;
  padding: 10px 10px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: #9b9b9b;
`;

const Label = styled.label`
  width: 100%;
`;