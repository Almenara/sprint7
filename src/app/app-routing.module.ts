import { ModalComponent } from './modal/modal.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'presupuesto',
    component: HomeComponent
  },
  {
    path: 'modal',
    component: ModalComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
