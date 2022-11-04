import { PanelComponent } from './../panel/panel.component';

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CartService } from './../services/cart.service';
import { ProductsService } from './../services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  mainForm: FormGroup = this.fb.group({
    product: [false]
  })
  
  public total = 0;

  get products(){
    return this.productsService.products; 
  }
  constructor(private productsService: ProductsService, private cartService: CartService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  sendToCart(productId:number, e:Event){
    let checked = (e.target as HTMLInputElement).checked;
    let inputs = (e.target as HTMLInputElement).parentElement?.nextElementSibling?.querySelectorAll('input') ;
    inputs?.forEach(input =>{
      input.value = "0";
    });
    this.cartService.setCart({productId, featureId : null, quantity : Number(checked)});
    this.setTotal();
    
  }

  setTotal(){
    this.total = this.cartService.getTotal();
  }
}
