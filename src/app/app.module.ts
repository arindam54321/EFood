import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/customer/profile/profile.component';
import { InvalidRouteComponent } from './components/utils/invalid-route/invalid-route.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomerNoDataComponent } from './components/customer/customer-no-data/customer-no-data.component';
import { CustomerLoginComponent } from './components/customer/customer-login/customer-login.component';
import { CustomerSigninComponent } from './components/customer/customer-signin/customer-signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RestaurantLandingPageComponent } from './components/restaurants/restaurant-landing-page/restaurant-landing-page.component';
import { ViewKartComponent } from './components/customer/view-kart/view-kart.component';
import { FoodPageComponent } from './components/foods/food-page/food-page.component';
import { SearchPageComponent } from './components/search/search-page/search-page.component';
import { OrderPageComponent } from './components/customer/order-page/order-page.component';
import { LoadingBarComponent } from './components/utils/loading-bar/loading-bar.component';
import { LayoutComponent } from './components/utils/layout/layout.component';
import { LoginSignupComponent } from './components/customer/login-signup/login-signup.component';
import { LocationMissingComponent } from './components/utils/location-missing/location-missing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    InvalidRouteComponent,
    HeaderComponent,
    CustomerNoDataComponent,
    // CustomerLoginComponent,
    // CustomerSigninComponent,
    RestaurantLandingPageComponent,
    ViewKartComponent,
    FoodPageComponent,
    SearchPageComponent,
    OrderPageComponent,
    LoadingBarComponent,
    LayoutComponent,
    LoginSignupComponent,
    LocationMissingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
