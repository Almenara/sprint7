
export interface Budget{
    client: string,
    budgetName: string,
    total?:number,
    products?: product_budget[]
}
export interface product_budget {
    id: number,
    name?: string,
    quantity: number,
    features: product_budget_feature[]
}
export interface product_budget_feature {
    id: number,
    name?: string,
    quantity:number
}