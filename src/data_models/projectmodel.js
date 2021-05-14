
import { v4 as uuidv4 } from 'uuid';


export const cleanProjectModel = (projectData) => {
    let d = projectData !== null && projectData !== undefined ? projectData : {};
    const blank = {
        id: uuidv4(),
        name: "",
        authorId: "",
        start_date:"3/7/2021",
        expected_end_date:"6/15/2021",
        target_date: "June 15th",
        description: "",
        sections:[],
    };
    let cleanModel = {...blank, ...d};
    if("sections" in cleanModel){
        let sections = cleanModel["sections"].map((sec)=>{
            return cleanSectionModel(sec)
        });
        cleanModel={...cleanModel, "sections":sections}
    }
    return cleanModel;
}

export const cleanSectionModel = (sectionData) => {
    let d = sectionData!== null && sectionData!== undefined ? sectionData : {};
    
    const blank =  {
        "id":uuidv4(),
        "name":"",
        "contributors":[],
        "status":"Undefined",
        "resources":[],
        "stages":[],
        "updates":[]
    }
    let cleanModel = {...blank, ...d};
    if(cleanModel["stages"] != []){
        let stages = cleanModel["stages"].map((stage)=>{
            return cleanStageModel(stage)
        });
        cleanModel={...cleanModel, "stages":stages}
    }
    if(cleanModel["updates"] != []){
        let updates= cleanModel["updates"].map((update)=>{
            return cleanUpdateModel(update)
        });
        cleanModel={...cleanModel, "updates":updates}
    }

    return cleanModel;
}

export const cleanStageModel = (stageData) => {
    let d = stageData!== null && stageData!== undefined ? stageData : {};
    
    const blank =  {
        "id":uuidv4(),
        "sectionId":"",
        "name": "",
        "type":"",
        "status":"",
        "contributors":[],
        "active_doc":{},
        "resources":[],
    }
    let cleanModel = {...blank, ...d};
    return cleanModel;
}

export const cleanUpdateModel = (updateData) => {
    let d = updateData!== null && updateData!== undefined ? updateData : {};
    
    const blank =  {
        "id":uuidv4(),
        "taskid":"",
        "sectionId":"",
        "stage":"",
        "type":"",
        "status":"",
        "author":"",
        "authorId":"",
        "date":"",
        "content":"",
        "reactions":[ ],
        "replies":[]
    }
    let cleanModel = {...blank, ...d};
    if(cleanModel["replies"] != []){
        let replies= cleanModel["replies"].map((reply)=>{
            return cleanReplyModel(reply)
        });
        cleanModel={...cleanModel, "replies":replies}
    }
    return cleanModel;
}


export const cleanReplyModel = (replyData) => {
    let d = replyData!== null && replyData!== undefined ? replyData : {};
    const blank =  {
        "id":uuidv4(),
        "type":"",
        "status":"",
        "author":"",
        "authorId":"",
        "date":"",
        "content":"",
        "reactions":[]
    }
    let cleanModel = {...blank, ...d};
    return cleanModel;
}