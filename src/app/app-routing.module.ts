import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvalidRouteComponent } from './components/utils/invalid-route/invalid-route.component';
import { CustomerNoDataComponent } from './components/customer/customer-no-data/customer-no-data.component';
import { RestaurantLandingPageComponent } from './components/restaurants/restaurant-landing-page/restaurant-landing-page.component';
import { ViewKartComponent } from './components/customer/view-kart/view-kart.component';
import { FoodPageComponent } from './components/foods/food-page/food-page.component';
import { SearchPageComponent } from './components/search/search-page/search-page.component';
import { OrderPageComponent } from './components/customer/order-page/order-page.component';
import { LoginSignupComponent } from './components/customer/login-signup/login-signup.component';
import { ProfileComponent } from './components/customer/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'intro', component: CustomerNoDataComponent },
  { path: 'register', component: LoginSignupComponent },
  { path: 'restaurant/:id', component: RestaurantLandingPageComponent },
  { path: 'cart', component: ViewKartComponent },
  { path: 'food/:type', component: FoodPageComponent },
  { path: 'search/:key', component: SearchPageComponent },
  { path: 'orders', component: OrderPageComponent },  
  { path: 'you', component: ProfileComponent },  
  { path: '**', component: InvalidRouteComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
