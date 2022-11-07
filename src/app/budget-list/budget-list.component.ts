
import { Component, Input, OnInit } from '@angular/core';

import { Budget } from './../budget.interface';
import { CartService } from './../services/cart.service';

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

}
