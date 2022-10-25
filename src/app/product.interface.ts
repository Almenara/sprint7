export interface product {
    id: number,
    name: string,
    text: string,
    price: number,
    maxQuantity: number | null
    feature: feature[]
}
interface feature {
    id: number,
    name: string,
    text: string,
    price: number
    maxQuantity: number | null
}