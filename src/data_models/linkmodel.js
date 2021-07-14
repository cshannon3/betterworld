
export const cleanLinkModel = (linkData) => {
    let d = updateData!== null && updateData!== undefined ? updateData : {};
    
    const blank =  {
        "id":uuidv4(),
        "committeeId":"",
        "sectionId":"",
        "projectId":"",
        "stage":"",
        "type": "default",
        "status": "not started",
        "author":"",
        "authorId":"",
        "date":Date.now(),
        "content":"",
        "reactions":[ ],
        "replies":[],
        "notifications":[],
        "url":[],
    }
    let cleanModel = {...blank, ...d};
    return cleanModel;
}

