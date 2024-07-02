export interface AccountDTO {
    id:number,
    name:string,
    description:string,
    creationDate:Date,
    user: {
        id:number,
        firstName:string,
        lastName:string,
        email:string
    }
}
