import { product } from '../product.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() product : product;
  @Output() addToCart = new EventEmitter<object>();
  
  public state : boolean;
  
  constructor() {
  }

  ngOnInit(): void {
  }
  
  sendToCart(e: Event, featureId: number | null = null): void{
    this.addToCart.emit({productId:this.product.id, featureId:featureId, quantity: featureId == null ? Number(this.state) : Number((e.target as HTMLInputElement).value)});
  }
}
