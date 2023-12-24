import { Component, OnInit } from '@angular/core';
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

  constructor(private restaurantService: RestaurantService) { }

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
    this.categories = [
      { name: 'PIZZA', src: 'PIZZA.webp' },
      { name: 'BURGER', src: 'BURGER.webp' },
      { name: 'BIRYANI', src: 'BIRYANI.webp' },
      { name: 'CHINESE', src: 'CHINESE.webp' },
      { name: 'MOMOS', src: 'MOMOS.webp' }
    ]
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
}
