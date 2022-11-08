export interface cart{
    products: product_cart[]
}
export interface product_cart {
    id: number,
    name?: string,
    quantity: number,
    features: product_cart_feature[]
}
export interface product_cart_feature {
    id: number,
    name?: string,
    quantity:number
}