import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvalidRouteComponent } from './components/invalid-route/invalid-route.component';
import { CustomerNoDataComponent } from './components/customer/customer-no-data/customer-no-data.component';
import { CustomerLoginComponent } from './components/customer/customer-login/customer-login.component';
import { CustomerSigninComponent } from './components/customer/customer-signin/customer-signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'init', component: CustomerNoDataComponent },
  { path: 'login', component: CustomerLoginComponent },
  { path: 'signin', component: CustomerSigninComponent },
  { path: '**', component: InvalidRouteComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
