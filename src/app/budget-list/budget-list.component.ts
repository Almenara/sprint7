import { Budget } from './../budget.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {
  @Input() budgetList: Budget[];
  constructor() { }

  ngOnInit(): void {
  }

}
