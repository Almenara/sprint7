import { product } from './../product.interface';
import { Injectable } from '@angular/core';
import { product_cart, product_cart_feature } from '../cart.interface'

@Injectable({
  providedIn: 'root'
})
export class TotalService {
  total:number = 0;

  constructor() {
    console.log('llamando a servicio "total"')
   }
   
  getTotal(cart:product_cart[], products:product[]){
    this.total = 0;
    cart.map(cartProduct => {
      this.total += products.filter( product => product.id == cartProduct.id)[0].price * cartProduct.quantity;
      if(cartProduct.features.length > 0)
        this.total += this.getTotalFeatures(cartProduct.id, cartProduct.features, products);
    })
    return this.total;
  }
  
  getTotalFeatures(cartProductId:number, cartFeatures:product_cart_feature[], products:product[]){
    let total = 0;
    let productFeatures = products.filter( product => product.id == cartProductId )[0].features
    cartFeatures.map((cartFeature: { id: number; quantity: number; }) => {
      total += productFeatures.filter( feature => feature.id == cartFeature.id)[0].price * cartFeature.quantity;
    });
    return total;
  }
}
