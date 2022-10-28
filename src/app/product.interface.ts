export interface product {
    id: number,
    name: string,
    text: string,
    price: number,
    maxQuantity: number | null,
    features: feature[]
}
interface feature {
    id: number,
    name: string,
    text: string,
    price: number,
    maxQuantity: number | null
}