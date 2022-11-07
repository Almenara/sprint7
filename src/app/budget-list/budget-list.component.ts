import { Component, OnInit } from '@angular/core';
import LocaleEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';

import { Budget } from './../budget.interface';
import { CartService } from './../services/cart.service';

registerLocaleData(LocaleEs, 'es');

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {
  
  public budgetList:Budget[] = [];
  constructor(private cartservice: CartService) {}

  ngOnInit(): void {
      this.budgetList = this.cartservice.getBugetList();
  }

  sortById(){
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if((a.id && b.id) && a.id < b.id) return -1;
      return 1;
    })
  }
  sortByDate(){
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if((a.budgetDate && b.budgetDate) && a.budgetDate > b.budgetDate) return 1;
      if((a.budgetDate && b.budgetDate) && a.budgetDate < b.budgetDate) return -1;
      return 0;
    })
  }
  sortByClient(){
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if(a.client > b.client) return 1;
      if(a.client < b.client) return -1;
      return 0;
    })
  }

}
