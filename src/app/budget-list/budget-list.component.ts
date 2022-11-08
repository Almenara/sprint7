import { Component, OnInit, ViewChild } from '@angular/core';
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

  public searchText: string = "";
  public budgetList:Budget[] = [];
  public budgetListBackUp:Budget[] = [];
  public currentOrder = this.sortByDate;


  constructor(private cartservice: CartService) {}

  ngOnInit(): void {
    this.budgetListBackUp = this.cartservice.getBugetList();
    this.budgetList = this.budgetListBackUp;
  }

  sortById(){
    this.currentOrder = this.sortById;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      return a.id - b.id 
    })
  }
  sortByDate(){
    this.currentOrder = this.sortByDate;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if((a.budgetDate && b.budgetDate) && a.budgetDate > b.budgetDate) return 1;
      if((a.budgetDate && b.budgetDate) && a.budgetDate < b.budgetDate) return -1;
      return 0;
    })
  }
  sortByClient(){
    this.currentOrder = this.sortByClient;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if(a.client > b.client) return 1;
      if(a.client < b.client) return -1;
      return 0;
    })
  }
  searchByBudgetName(){
    this.rollback();
    this.budgetList = this.budgetList.filter((bg) => {
      return bg.budgetName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
    })
    this.currentOrder();
  }
  deleteSearch(){
    this.searchText = "";
    this.rollback();
    this.currentOrder();
  }
  rollback(){
    this.budgetList = this.budgetListBackUp;
  }

}
