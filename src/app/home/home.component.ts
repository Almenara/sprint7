import { Budget } from './../budget.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CartService } from './../services/cart.service';
import { ProductsService } from './../services/products.service';
import { BudgetListComponent } from '../budget-list/budget-list.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @ViewChild(BudgetListComponent) budgetListCmp:BudgetListComponent;

  public mainForm: FormGroup = this.fb.group({
    client: ["", [Validators.required, Validators.minLength(3)]],
    budgetName: ["", [Validators.required, Validators.minLength(3)]],
    budgetDate: ['2017-06-01', [Validators.required]],
    product: [false]
  })

  public budget: Budget = {
    id: 0,
    client: "",
    budgetName: "",
    budgetDate: null
  };
  public budgetList: Budget[];

  public total = 0;

  get products(){
    return this.productsService.products; 
  }

  constructor(
    private productsService: ProductsService, 
    private cartService: CartService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.budget.client = params['client'];
        this.budget.budgetName = params['budgetName'];
        //let date = params['budgetDate'].split("/")
        //if(date.length == 3){
        //  this.budget.budgetDate = new Date(Number(date[2]), Number(date[1]), Number(date[0]));
        //}
      }
    );
    
    
    //console.log(this.router.)
  }

  sendToCart(productId:number, productName:string, e:Event){
    let checked = (e.target as HTMLInputElement).checked;
    
    this.cartService.setCart({productId, productName, featureId : null, quantity : Number(checked)});

    if(checked){
      let inputs = (e.target as HTMLInputElement).parentElement?.nextElementSibling?.querySelectorAll('input') ;
      inputs?.forEach(input =>{
        input.value = "1";
        input.dispatchEvent(new Event('input'));
      });
      this.products.filter(product => { 
        if(product.id == productId){
          if(product.features.length){
            product.features.map(feature => {
              this.cartService.setFeaturesCart( product.id, {id: feature.id, name: feature.name, quantity: 1})
            })
          }
        }
      })
    }
    this.setTotal();
    
  }

  setTotal(){
    this.total = this.cartService.getTotal();
  }

  saveBudget(){
    this.budget.total = this.total;
    this.cartService.saveBudget(this.budget);
    this.budgetListCmp.deleteSearch();
    this.mainForm.reset();
    document.querySelectorAll('.collapse').forEach(e =>{
      (e as HTMLElement).classList.remove('show')
    });
    document.querySelectorAll('input[type="number"]').forEach(e =>{
      (e as HTMLInputElement).value = "1"  ;
      (e as HTMLInputElement).dispatchEvent(new Event('input'))  ;
    });
    this.total = 0;
  }
  reset(){
    this.mainForm.reset();
    this.total = 0;
    this.cartService.reset();
  }
}
