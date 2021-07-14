import { v4 as uuidv4 } from 'uuid';


export const cleanUpdateModel = (updateData) => {
    let d = updateData!== null && updateData!== undefined ? updateData : {};
    
    const blank =  {
        "id":uuidv4(),
        "committeeName":"",
        "committeeId":"",
        "sectionName":"",
        "sectionId":"",
        "projectName":"",
        "projectId":"",
        "stage":"",
        "type": "default", //  default / request help / offer to help
        "isOnOverview":false,
        "isPinned":false,
        "status": "not started", // not started / done
        "author":"", // name
        "authorId":"", //
        "date":Date.now(),
        "content":"",
        "reactions":[ ],
        "replies":[],
        "notifications":[],
        "isLink":false,
        "url":null,

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