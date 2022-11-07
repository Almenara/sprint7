import { Budget } from './../budget.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CartService } from './../services/cart.service';
import { ProductsService } from './../services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public mainForm: FormGroup = this.fb.group({
    client: ["", [Validators.required, Validators.minLength(3)]],
    budgetName: ["", [Validators.required, Validators.minLength(3)]],
    product: [false]
  })

  public budget: Budget = {
    client: "",
    budgetName: ""
  };
  public budgetList: Budget[];

  public total = 0;

  get products(){
    return this.productsService.products; 
  }

  constructor(private productsService: ProductsService, private cartService: CartService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  sendToCart(productId:number, productName:string, e:Event){
    let checked = (e.target as HTMLInputElement).checked;
    
    this.cartService.setCart({productId, productName, featureId : null, quantity : Number(checked)});

    if(checked){
      let inputs = (e.target as HTMLInputElement).parentElement?.nextElementSibling?.querySelectorAll('input') ;
      inputs?.forEach(input =>{
        input.value = "1";
      });
      this.products.filter(product => { 
        if(product.features.length)
          product.features.map(feature => {
            this.cartService.setFeaturesCart( product.id, {id: feature.id, name: feature.name, quantity: 1})
          })
       })
    }
    
    this.setTotal();
    
  }

  setTotal(){
    this.total = this.cartService.getTotal();
  }

  saveBudget(){
    this.budget.total = this.total
    this.cartService.saveBudget(this.budget);
  }
}
