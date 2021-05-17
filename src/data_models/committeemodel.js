
import { v4 as uuidv4 } from 'uuid';
import {cleanUpdateModel} from "./updatemodel";


export const cleanCommitteeModel = (committeeData) => {
    let d = committeeData !== null && committeeData !== undefined ? committeeData : {};
    const blank = {
        id: uuidv4(),
        name: "",
        authorId: "",
        start_date:"3/7/2021",
        description: "",
        updates:[],
        contributors:[],
        events:[],
        pointPerson:{},
        responsibilities:[]
    };
    let cleanModel = {...blank, ...d};
    if("updates" in cleanModel){
        let updates = cleanModel["updates"].map((sec)=>{
            return cleanUpdateModel(sec)
        });
        cleanModel={...cleanModel, "updates":updates}
    }
    return cleanModel;
}
