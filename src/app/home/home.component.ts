
import { Component, OnInit } from '@angular/core';
import { product } from '../product.interface'
import { product_cart } from '../cart.interface'
import { json_products } from '../../assets/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  products: product[] = json_products;
  cart: product_cart[] = [];
  total: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setCart(productToCart:{productId : number, featureId : number | null, quantity : number}){
    
    let productExist = this.cart.filter(product => product.id == productToCart.productId)[0];
    if(!productExist && productToCart.featureId == null){
      this.cart.push({id : productToCart.productId, quantity : productToCart.quantity, features : []} as unknown as product_cart);
    }
    else if(productToCart.featureId != null){
      if(productToCart.featureId != null){
        
        let featureExist = productExist.features.filter( feature => feature.id == productToCart.featureId)[0];
        
        if(!featureExist && productToCart.quantity != 0){
          this.cart.filter((product, index) => { 
            if(product.id === productToCart.productId){
              this.cart[index].features.push({id : productToCart.featureId, quantity : productToCart.quantity} as unknown as any)
            }
          })
        }
        
        else{
          this.cart.filter((product, index) => { 
            if(product.id === productToCart.productId){
              this.cart[index].features.map((feature, indexFeature) => {
                if(feature.id == productToCart.featureId)
                  productToCart.quantity == 0 ? this.cart[index].features.splice(indexFeature,1) : this.cart[index].features[indexFeature].quantity = productToCart.quantity;
              })
            }
          })
        }

      }
    }
    else if(productToCart.quantity == 0){
      this.cart.filter((product, index) => {
        if(productToCart.productId == product.id)
          this.cart.splice(index,1)
      });
    }

    this.setTotal();

  }
  setTotal(){
    this.total = 0;
    this.cart.map(cartProduct => {
      this.total += this.products.filter( product => product.id == cartProduct.id)[0].price * cartProduct.quantity;
      if(cartProduct.features.length > 0)
        this.total += this.getTotalFeatures(cartProduct.id, cartProduct.features);
    })
    console.log(this.cart)
  }
  getTotalFeatures(cartProductId:number, cartFeatures:any){
    let total = 0;
    let productFeatures = this.products.filter( product => product.id == cartProductId )[0].features
    cartFeatures.map((cartFeature: { id: number; quantity: number; }) => {
      total += productFeatures.filter( feature => feature.id == cartFeature.id)[0].price * cartFeature.quantity;
    });
    return total;
  }
}
