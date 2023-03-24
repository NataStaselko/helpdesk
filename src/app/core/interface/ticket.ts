import { Category } from "src/app/core/interface/category"


export interface Ticket{
    name: string,
    description: string,
    desired_date: string
    state: string,
    category: Category,
    urgency: string    

}
