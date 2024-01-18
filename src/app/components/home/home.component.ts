import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { LocationUpdateService } from 'src/app/shared/location-update.service';
import { Constants } from 'src/shared/contants';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isRestautantLoaded: boolean = true

  categories: any[] = []
  restaurants: any[] = []
  searchKey: string = ''
  categoryImageLocation!: string

  constructor(
    private router: Router, 
    private restaurantService: RestaurantService,
    private locationUpdateService: LocationUpdateService
  ) { }

  ngOnInit(): void {
    this.initialChecks()
    this.locationUpdateService.selectedLocation$.subscribe(
      location => {
        this.loadData()
      }
    )
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
      this.isRestautantLoaded = false
      let chosenLocationObject = JSON.parse(localStorage.getItem(LocalStorageKeys.chosenLocation) + '')
      this.restaurantService.getByLocation(chosenLocationObject.pin).subscribe(
        success => {
          this.restaurants = success.data
          this.isRestautantLoaded = true
        },
        error => {
          this.isRestautantLoaded = true
        }
      )
    }
  }

  searchByFood = (type: string) => {
    this.router.navigate(['food/' + type])
  }

  search = () => {
    this.router.navigate(['search/' + this.searchKey])
  }

  gotorestaurant = (id: string) => {
    this.router.navigate(['restaurant/' + id])
  }
}
