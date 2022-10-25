
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
  cart: product_cart[];
  total: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getAddProduct(id:number){
    this.total += this.products.filter(product => product.id == id)[0].price;

  }
  getRemoveProduct(id:any){
    this.total -= this.products.filter(product => product.id == id)[0].price;
  }
}
