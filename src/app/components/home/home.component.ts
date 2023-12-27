import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Constants } from 'src/shared/contants';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any[] = []
  restaurants: any[] = []
  categoryImageLocation!: string

  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.initialChecks()
    this.loadData()
  }

  initialChecks = () => {
    LoginCheck.loginCheck()
  }

  loadData = () => {
    this.loadRestaurants()
    this.loadFoodCategories()
  }

  loadFoodCategories = () => {
    this.categoryImageLocation = '../../../' + Constants.foodCategoryImageLocation
    this.categories = Constants.foodCategories
  }

  loadRestaurants = () => {
    this.restaurants = []
    if (localStorage.getItem(LocalStorageKeys.chosenLocation)) {
      let chosenLocationObject = JSON.parse(localStorage.getItem(LocalStorageKeys.chosenLocation) + '')
      this.restaurantService.getByLocation(chosenLocationObject.pin).subscribe(
        success => {
          this.restaurants = success.data
        }
      )
    }
  }

  searchByFood = (type: string) => {
    this.router.navigate(['food/' + type])
  }
}
