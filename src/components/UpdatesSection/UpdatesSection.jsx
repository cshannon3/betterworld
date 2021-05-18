import styled from "styled-components";
import UpdateBox from "components/UpdatesSection/UpdateBox";
import AddUpdateComponent from 'components/UpdatesSection/AddUpdateComponent';


const UpdatesSection = ({
    updates=[],
    selectorOpen,
    user=null,
    stages=null,
    updateUpdates=(newUpdates)=>{},
    setSelectorOpen=(updateId)=>{},
}) =>{
return (
    <UpdatesContainer>
    <UpdatesMenu>
        <div><h3>Updates</h3></div>
        <div>
            {/* <button>Filter</button> */}
            <AddUpdateComponent
                type={"default"}
                stages={stages}
                user={user}
                onSave={(newUpdate) => {
                    if(updates) updateUpdates([...updates, newUpdate]);
                    else updateUpdates([newUpdate]);
                }}
            />
        </div>
    </UpdatesMenu>
    <UpdatesList>
                        {updates &&updates.sort((a,b)=>b.date-a.date).map((updateData) => {
                            return <UpdateBox
                                id={updateData.id}
                                updateData={updateData}
                                isSelector={selectorOpen==updateData.id}
                                updateUpdate={(newUpdateData)=>{
                                    let newUpdates = updates;
                                    let u = newUpdates.findIndex((up)=>up.id==newUpdateData.id);
                                    newUpdates[u]=newUpdateData;
                                    updateUpdates(newUpdates);
                           
                                }}
                                setSelectorOpen={(updateData)=>setSelectorOpen(updateData.id)}
                                deleteUpdate={(updateData)=>{
                                    if (window.confirm("Are you sure? This action cannot be reversed")) {
                                            let newUpdates = updates.filter(u=>u.id!=updateData.id);
                                            updateUpdates(newUpdates);
                                    }else{
                                        return;
                                    }
                                }}
                            />

                        })}
                    </UpdatesList>
                    </UpdatesContainer>
)
}

export default UpdatesSection;

const UpdatesList = styled.div`
overflow:scroll;
height:87%;
`  
const UpdatesMenu = styled.div`
    display:flex;
    justify-content: space-between;
    padding:20px 0px;
    >div{
        display:flex;
    }
    h3{
        font-family: Baloo 2;
        font-style: normal;
        font-weight: 800;
        font-size: 21px;
        line-height: 33px;
        display: flex;
        align-items: center;
    }
`    
const UpdatesContainer = styled.div`
background-color:#F8F8F8;
margin: 15px;
width:350px;
`                      
// console.log(newSectionData);
// ctx.updateSection(newSectionData);
// setSectionData(newSectionData);

// let newSectionData = {...sectionData,  "updates":newUpdates}
// ctx.updateSection(newSectionData);
// setSectionData(newSectionData);
//ctx.updateUpdate(newUpdateData, sectionData.id)