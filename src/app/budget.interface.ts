
export interface Budget{
    id?: number,
    client: string,
    budgetName: string,
    budgetDate?: Date | null,
    total?: number,
    products?: Product_budget[]
}
export interface Product_budget {
    id: number,
    name?: string,
    quantity: number,
    features: Product_budget_feature[]
}
export interface Product_budget_feature {
    id: number,
    name?: string,
    quantity: number
}