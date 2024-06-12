export interface IncomeDTO {
    id: number,
    account: {
        id: number
    }
    amount: number,
    tag: string,
    comment: string,
    date: Date,
    category: string,
    recurring: boolean
}