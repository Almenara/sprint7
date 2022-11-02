import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FieldComponent } from './field/field.component';

const appRoutes:Routes = [
  {path: "", component:HomeComponent},
  {path: "home", component:HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
