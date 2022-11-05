import { Injectable } from '@angular/core';
import { product } from './../product.interface';

import { product_cart, product_cart_feature } from '../cart.interface'
import { json_products } from '../../assets/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private _products: product[] = json_products;

  get products(): product[]{
    return [...this._products];
  }

  constructor() { }
}
