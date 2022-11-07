import { Budget } from './../budget.interface';
import { cart } from './../cart.interface';
import { ProductsService } from './products.service';
import { TotalService } from './total.service';
import { Injectable } from '@angular/core';

import { product_cart, product_cart_feature } from '../cart.interface'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartProducts:product_cart[] = [];
  private _cartList:cart[] = [];
  private _budgetList:Budget[] = [];

  get cart(): product_cart[] {
    return [...this._cartProducts];
  }
  get cartList(): cart[] {
    return [...this._cartList];
  }

  constructor(private totalSevice: TotalService, private productsService:ProductsService) { }

  setCart(productToCart:{productId: number, productName: string, featureId?: null, quantity: number}): void{
    let productExist = this.cart.filter(product => product.id == productToCart.productId)[0];
    if(!productExist && productToCart.quantity != 0)
        this.addProductToCart({id : productToCart.productId, name : productToCart.productName, quantity : productToCart.quantity, features : []} as unknown as product_cart);
    else
        this.removeProductToCart({id : productToCart.productId, quantity : productToCart.quantity, features : []} as unknown as product_cart);
  }

  addProductToCart(product:product_cart){
    this._cartProducts.push({id: product.id, name: product.name, quantity : product.quantity, features : []} as unknown as product_cart)
  }

  removeProductToCart(product:product_cart){
    this._cartProducts.filter((productCart, index) => {
      if(productCart.id == product.id)
        this._cartProducts.splice(index,1)
    });
  }

  setFeaturesCart(productId:number, feature:product_cart_feature){
    let productExist = this.cart.filter(product => product.id == productId)[0];
    if(productExist){
      let featureExist = productExist.features.filter(featureCart => featureCart.id == feature.id)[0];
      if(featureExist){
        if(feature.quantity == 0)
          this.removeFeatureToCart(productId, feature);
        else
          this.setFeatureToCart(productId, feature);
      }
      else
        this.addFeatureToCart(productId, feature);
      
    }
  }

  addFeatureToCart(productId:number, feature:product_cart_feature){
    if(feature.quantity > 0) this._cartProducts.filter(product => product.id == productId)[0].features.push(feature)
  }

  removeFeatureToCart(productId:number, feature:product_cart_feature){
    this._cartProducts.filter((productCart,indexP) => {
      if(productCart.id == productId)
        productCart.features.filter( (featureCart, indexF) => {
          if(featureCart.id == feature.id)
            this._cartProducts[indexP].features.splice(indexF,1)
        })
    })
  }

  setFeatureToCart(productId:number, feature:product_cart_feature){
    this._cartProducts.filter((productCart,indexP) => {
      if(productCart.id == productId)
        productCart.features.map( (featureCart, indexF) => {
          if(featureCart.id == feature.id)
            featureCart.quantity = feature.quantity;
        })
    })
  }
  getTotal():number{
    return this.totalSevice.getTotal(this.cart, this.productsService.products)
  }

  saveBudget(budget:Budget){
    budget.products = this._cartProducts.slice();
    this._budgetList.push(Object.assign({},budget))
  }
  getBugetList(){
    return this._budgetList;
  }
}
