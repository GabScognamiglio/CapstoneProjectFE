export interface Income {
    id: number,
        accountId: number,
        amount: number,
        tag: string,
        comment: string,
        date: Date,
        category: string,
        recurring: boolean
}
