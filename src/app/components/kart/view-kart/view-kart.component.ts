import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-view-kart',
  templateUrl: './view-kart.component.html',
  styleUrls: ['./view-kart.component.css']
})
export class ViewKartComponent implements OnInit {

  isCartEmpty: boolean = true
  restaurantFromCart: any = {}
  cartItems: any[] = []
  totalBalance: number = 0

  constructor(
    private router: Router, 
    private location: Location,
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    this.initChecks()
  }

  initChecks = () => {
    LoginCheck.loginCheck()
    this.isCartEmpty = localStorage.getItem(LocalStorageKeys.cartForRestaurant) === null
    if (!this.isCartEmpty) { this.loadCartData() }
  }

  loadCartData = () => {
    this.restaurantFromCart = JSON.parse(localStorage.getItem(LocalStorageKeys.cartForRestaurant) + '')
    let cartObject: any = JSON.parse(localStorage.getItem(LocalStorageKeys.cartItems) + '')
    this.foodService.getByRestaurant(this.restaurantFromCart.id).subscribe(
      success => {
        for (let food of success.data) {
          if (cartObject[food.id] && cartObject[food.id] > 0) {
            this.cartItems.push({
              item: food,
              count: cartObject[food.id]
            })
            this.totalBalance += food.price * cartObject[food.id]
          }
        }
      },
      error => {}
    )
  }

  emptyCart = () => {
    localStorage.removeItem(LocalStorageKeys.cartForRestaurant)
    localStorage.removeItem(LocalStorageKeys.cartItems)
    this.ngOnInit()
  }


  goHome = () => {
    this.router.navigate([''])
  }

  goToRestaurant = () => {
    this.router.navigate(['restaurant/' + this.restaurantFromCart.id])
  }

  goback = () => {
    this.location.back()
  }
}
