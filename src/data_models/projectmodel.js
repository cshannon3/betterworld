
import { v4 as uuidv4 } from 'uuid';
import {cleanUpdateModel} from "./updatemodel";

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
