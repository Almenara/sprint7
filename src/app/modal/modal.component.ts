import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public title: string;
  public content: string;

  constructor() { }

  ngOnInit(): void {
  }

  changeTitle(text:string):void {
    this.title = text
  }

  changeContent(text:string):void {
    this.content = text
  }

}
