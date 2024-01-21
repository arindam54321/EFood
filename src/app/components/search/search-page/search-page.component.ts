import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { LocationUpdateService } from 'src/app/shared/location-update.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import * as fuzzy from 'fuzzy'
import { Constants } from 'src/shared/contants';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  isDataLoaded: boolean = true

  searchKey: any
  options: any = { pre: '<b>', post: '</b>' }
  categoryImageLocation: any

  isLocationChosen: boolean = false
  locationObject: any = {}
  cartForRestaurant: any = {}
  
  allFoodsByLocation: any[] = []
  matchingFoodsByLocation: any[] = []
  allRestaurantsByLocation: any[] = []
  matchingRestaurantsByLocation: any[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService,
    private restaurantService: RestaurantService,
    private locationUpdateService: LocationUpdateService
  ) { }

  ngOnInit(): void {
    this.initialChecks()
    this.categoryImageLocation = '../../../' + Constants.foodCategoryImageLocation
    this.locationUpdateService.selectedLocation$.subscribe(
      location => {
        this.isLocationChosen = localStorage.getItem(LocalStorageKeys.chosenLocation) !== null
        if (this.isLocationChosen) {
          this.locationObject = JSON.parse(localStorage.getItem(LocalStorageKeys.chosenLocation) + '')
          this.initializeVariables()
          this.loadRestaurants()
        } else {
          // Do Nothing
        }
      }
    )

    this.route.params.subscribe(
      params => {
        this.searchKey = params['key']
        this.filterFoods()
        this.filterRestaurants()
      }
    )
  }

  initialChecks = () => {
    LoginCheck.loginCheck(this.router)
  }

  loadFoods = () => {
    this.foodService.getByLocation(this.locationObject.pin).subscribe(
      success => {
        for (let item of success.data) {
          let temp = item
          temp.restaurantObject = this.allRestaurantsByLocation.find(i => i.id === item.restaurant)
          this.allFoodsByLocation.push(temp)
        }
        this.filterFoods()
        this.isDataLoaded = true
      }
    )
  }

  loadRestaurants = () => {
    this.isDataLoaded = false
    this.restaurantService.getByLocation(this.locationObject.pin).subscribe(
      success => {
        this.allRestaurantsByLocation = success.data
        this.filterRestaurants()
        this.loadFoods()
      }
    )
    if (localStorage.getItem(LocalStorageKeys.cartForRestaurant)) {
      this.cartForRestaurant = JSON.parse(localStorage.getItem(LocalStorageKeys.cartForRestaurant) + '')
    }
  }

  filterFoods = () => {
    let tempFoods = [...this.allFoodsByLocation]
    this.matchingFoodsByLocation = tempFoods.map(item => {      
      const titleScore = (fuzzy.match(this.searchKey.toLowerCase(), item.title.toLowerCase(), this.options) || {score: 0}).score
      // console.log("title =", titleScore)
      
      const descriptionScore = (fuzzy.match(this.searchKey.toLowerCase(), item.description.toLowerCase(), this.options) || { score: 0 }).score
      // console.log("desc =", descriptionScore)
      
      const typeScore = (fuzzy.match(this.searchKey.toLowerCase(), item.type.toLowerCase(), this.options) || { score: 0 }).score
      // console.log("type =", typeScore)

      const overallScore = (titleScore + descriptionScore + typeScore) / 3
      return { item, overallScore }
    })
    .filter(result => result.overallScore >= 0.1)
    .sort((a, b) => b.overallScore - a.overallScore)
    .map(result => result.item)
  }

  filterRestaurants = () => {
    let tempRestaurants = [...this.allRestaurantsByLocation]
    this.matchingRestaurantsByLocation = tempRestaurants.map(item => {
      const idScore = (fuzzy.match(this.searchKey.toLowerCase(), item.id.toLowerCase(), this.options) || { score: 0 }).score
      // console.log("id =", idScore)

      const nameScore = (fuzzy.match(this.searchKey.toLowerCase(), item.name.toLowerCase(), this.options) || { score: 0 }).score
      // console.log("name =", nameScore)

      const overallScore = (idScore + nameScore) / 2
      return { item, overallScore }
    })
    .filter(result => result.overallScore >= 0.1)
    .sort((a, b) => b.overallScore - a.overallScore)
    .map(result => result.item)
  }

  initializeVariables = () => {
    this.allFoodsByLocation = []
    this.allRestaurantsByLocation = []
  }

  search = () => {
    this.router.navigate(['search/' + this.searchKey])
  }

  gotorestaurant = (id: string) => {
    this.router.navigate(['restaurant/' + id])
  }

  gotocart = () => {
    this.router.navigate(['cart'])
  }
}
