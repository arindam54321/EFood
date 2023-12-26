import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvalidRouteComponent } from './components/invalid-route/invalid-route.component';
import { CustomerNoDataComponent } from './components/customer/customer-no-data/customer-no-data.component';
import { CustomerLoginComponent } from './components/customer/customer-login/customer-login.component';
import { CustomerSigninComponent } from './components/customer/customer-signin/customer-signin.component';
import { RestaurantLandingPageComponent } from './components/restaurants/restaurant-landing-page/restaurant-landing-page.component';
import { ViewKartComponent } from './components/kart/view-kart/view-kart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-user', component: CustomerNoDataComponent },
  { path: 'login', component: CustomerLoginComponent },
  { path: 'signin', component: CustomerSigninComponent },
  { path: 'restaurant/:id', component: RestaurantLandingPageComponent },
  { path: 'cart', component: ViewKartComponent },
  { path: '**', component: InvalidRouteComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
