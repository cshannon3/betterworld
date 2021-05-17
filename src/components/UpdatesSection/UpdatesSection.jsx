import styled from "styled-components";
import UpdateBox from "components/UpdatesSection/UpdateBox";
const UpdatesSection = ({
    updates=[],
    selectorOpen,
    updateUpdates=(newUpdates)=>{},
    setSelectorOpen=(updateId)=>{},
}) =>{
return (
    <UpdatesList>
                        {updates.sort((a,b)=>b.date-a.date).map((updateData) => {
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
)
}

export default UpdatesSection;

const UpdatesList = styled.div`
overflow:scroll;
height:87%;
`                            
// console.log(newSectionData);
// ctx.updateSection(newSectionData);
// setSectionData(newSectionData);

// let newSectionData = {...sectionData,  "updates":newUpdates}
// ctx.updateSection(newSectionData);
// setSectionData(newSectionData);
//ctx.updateUpdate(newUpdateData, sectionData.id)