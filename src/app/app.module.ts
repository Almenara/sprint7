import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { TotalService } from './services/total.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PanelComponent } from './panel/panel.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ModalComponent } from './modal/modal.component';
import { BudgetListComponent } from './budget-list/budget-list.component';

const appRoutes:Routes = [
  {path: "", component:HomeComponent},
  {path: "home", component:HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelComponent,
    ErrorPageComponent,
    WelcomePageComponent,
    ModalComponent,
    BudgetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TotalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
