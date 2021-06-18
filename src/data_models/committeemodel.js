
import { v4 as uuidv4 } from 'uuid';
import {cleanUpdateModel} from "./updatemodel";


export const cleanCommitteeModel = (committeeData) => {
    let d = committeeData !== null && committeeData !== undefined ? committeeData : {};
    if(!("id"  in committeeData)) return null;
    const blank = {
        name: "",
        description: "",
        updates:[],
        contributors:[],
        events:[],
        pointPerson:{},
        responsibilities:[],
        resources:[]
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
