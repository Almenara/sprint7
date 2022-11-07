import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { CartService } from './../services/cart.service';
import { product } from '../product.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() product : product;
  @Input() mainForm : FormGroup;
  @Output() addToTotal = new EventEmitter();
  
  //panelForm: FormGroup = this.fb.group({})

  constructor( private cartService: CartService, private fb: FormBuilder ) {
  }

  ngOnInit(): void {
    this.product.features.map(feature => {
      this.mainForm.addControl('feature' + feature.id ,new FormControl(1, [Validators.required, Validators.min(1)]));
      this.cartService.setFeaturesCart( this.product.id, {id: feature.id, name: feature.name, quantity: 1})
      this.total()
    })
  }
  
  sendToCart(e: Event, featureName: string,  featureId: number): void{
    this.cartService.setFeaturesCart( this.product.id, { id: featureId, name: featureName , quantity: Number((e.target as HTMLInputElement).value) });
  }

  up(featureId: number){
    let field = document.getElementById('feature' + featureId) as HTMLInputElement
    let value:number = Number(field.value) +1;
    field.value = String(value);
    field.dispatchEvent(new Event('input'))  
  }

  down(featureId: number){
    let field = document.getElementById('feature' + featureId) as HTMLInputElement
    let value:number = Number(field.value) -1;
    if(value > 0){
      field.value = String(value);
      field.dispatchEvent(new Event('input'))  
    }    
  }
  
  total(){
    this.addToTotal.emit();
  }

}
