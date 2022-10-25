import { product } from '../product.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() product:product;
  @Output() addToCart = new EventEmitter<number>();
  @Output() removeToCart = new EventEmitter<number>();
  
  public state:boolean;
  public isChecked = false;
  
  constructor() {
  }

  ngOnInit(): void {
  }
  
  sendToCart(e:Event, id:number):void{
    this.state ? this.addToCart.emit(id) : this.removeToCart.emit(id);
  }
}
