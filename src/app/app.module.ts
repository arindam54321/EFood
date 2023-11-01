import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InvalidRouteComponent } from './components/invalid-route/invalid-route.component';
import { HeaderComponent } from './components/home/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerNoDataComponent } from './components/customer/customer-no-data/customer-no-data.component';
import { CustomerLoginComponent } from './components/customer/customer-login/customer-login.component';
import { CustomerSigninComponent } from './components/customer/customer-signin/customer-signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    InvalidRouteComponent,
    HeaderComponent,
    CustomerNoDataComponent,
    CustomerLoginComponent,
    CustomerSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
