export interface TicketDTO {
    id:number,
    object:string,
    description:string,
    date:Date,
    adminAnswer:string,
    status:string,
    user:{
        id:number
    }
}
