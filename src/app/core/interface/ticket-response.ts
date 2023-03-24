import { Category } from "./category"

export interface TicketResponce {
    id: number,
    name: string,
    createdOn: string,
    status: string,
    category: Category,
    urgency: string, 
    desired_date: string,
    owner: string;
    approver: string,
    assignee: string,
    description: string  
}
