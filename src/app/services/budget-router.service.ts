import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BudgetRouterService {
  

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  changeRoute(obj:{}){
    this.router.navigate(
      [] , 
      {
        relativeTo: this.activatedRoute,
        queryParams: obj,
        queryParamsHandling: 'merge'
      }
    )
  }
}

