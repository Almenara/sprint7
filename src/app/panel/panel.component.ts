import { feature } from './../product.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from './../services/cart.service';
import { product } from '../product.interface';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() product : product;
  @Output() addToTotal = new EventEmitter();
  
  panelForm: FormGroup = this.fb.group({})

  constructor( private cartService: CartService, private fb: FormBuilder ) {
  }

  ngOnInit(): void {
    this.product.features.map(feature => {
      this.panelForm.addControl('feature' + feature.id ,new FormControl(1, [Validators.required, Validators.min(1)]));
      this.cartService.setFeaturesCart( this.product.id, {id: feature.id, quantity: 1})
      this.total()
    })
  }
  
  sendToCart(e: Event, featureId: number): void{
    this.cartService.setFeaturesCart( this.product.id, { id: featureId , quantity: Number((e.target as HTMLInputElement).value) });
  }

  up(featureId: number){
    let field = document.getElementById('feature' + featureId) as HTMLInputElement
    let value:number = Number(field.value) +1;
    field.value = String(value);
    this.cartService.setFeaturesCart( this.product.id, {id: featureId, quantity: value})
  }

  down(featureId: number){
    let field = document.getElementById('feature' + featureId) as HTMLInputElement
    let value:number = Number(field.value) -1;
    if(value > 0){
      field.value = String(value);
      this.cartService.setFeaturesCart( this.product.id, {id: featureId, quantity: value})
    }    
  }
  
  total(){
    this.addToTotal.emit();
  }

}