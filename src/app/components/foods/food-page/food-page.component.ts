import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { LocationUpdateService } from 'src/app/shared/location-update.service';
import { Constants } from 'src/shared/contants';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  isFoodLoaded: boolean = true

  foodType: any
  isFoodTypeValid: boolean = false
  
  foodCategories: any[] = []
  
  foods: any[] = []
  foodsSorted: any[] = []
  foodsFiltered: any[] = []
  
  isLocationChosen: boolean = false
  chosenLocation: any = {}
  restaurants: any[] = []
  cartForRestaurant: any = {}

  foodSortBy: string = 'NONE'

  foodPriceRange: any[] = []
  foodPriceRangeSelected: number = 0
  foodPriceRangeApplied: number = 0
  numberOfFiltersApplied: number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private foodService: FoodService,
    private restaurantService: RestaurantService,
    private locationUpdateService: LocationUpdateService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.foodType = params['type']
        this.initializeVariables()
        this.initialChecks()
        this.loadFoodDetails()
      }
    )
    this.locationUpdateService.selectedLocation$.subscribe(
      location => {
        this.initializeVariables()
        this.initialChecks()
        this.loadFoodDetails()
      }
    )
  }

  initialChecks = () => {
    LoginCheck.loginCheck(this.router)
    this.foodCategories = Constants.foodCategories
    this.isLocationChosen = localStorage.getItem(LocalStorageKeys.chosenLocation) !== null
    this.chosenLocation = JSON.parse(localStorage.getItem(LocalStorageKeys.chosenLocation) + '')
    if (localStorage.getItem(LocalStorageKeys.cartForRestaurant)) {
      this.cartForRestaurant = JSON.parse(localStorage.getItem(LocalStorageKeys.cartForRestaurant) + '')
    }
    this.foodPriceRange = Constants.foodPriceRange
  }

  loadFoodDetails = () => {
    this.isFoodLoaded = false
    this.isFoodTypeValid = this.foodCategories.some(i => i.type === this.foodType)
    if (this.isLocationChosen && this.isFoodTypeValid) {
      this.restaurantService.getByLocation(this.chosenLocation.pin).subscribe(
        restaurantsuccess => {
          this.restaurants = restaurantsuccess.data
          this.foodService.getByTypeAndLocation(this.foodType, this.chosenLocation.pin).subscribe(
            foodsuccess => {
              this.foods = []
              for (let item of foodsuccess.data) {
                let temp = item
                temp.restaurantObject = this.restaurants.find(i => i.id === item.restaurant)
                this.foods.push(temp)
              }
              this.sortFoods('NONE')
              this.isFoodLoaded = true
            },
            fooderror => {
              // DO NOTHING
            }
          )
        },
        restauranterror => {
          // DO NOTHING
        }
      )
    }
  }

  sortFoods = (sortBy: string) => {
    this.foodsSorted = [...this.foods]
    if (sortBy === 'NONE') {
      // Do Nothing
    } else if (sortBy === 'PASC') {
      this.foodsSorted.sort((a, b) => a.price < b.price ? -1 : 1)
    } else if (sortBy === 'PDES') {
      this.foodsSorted.sort((a, b) => a.price > b.price ? -1 : 1)
    } else if (sortBy === 'RASC') {
      this.foodsSorted.sort((a, b) => a.restaurant < b.restaurant ? -1 : 1)
    } else if (sortBy === 'RDES') {
      this.foodsSorted.sort((a, b) => a.restaurant > b.restaurant ? -1 : 1)
    }

    this.updateFoodListAfterAddingFilters()
  }

  clearfilter = () => {
    this.foodPriceRangeSelected = 0
  }

  applyfilter = () => {
    this.foodPriceRangeApplied = this.foodPriceRangeSelected
    this.updateFoodListAfterAddingFilters()
  }

  updateFoodListAfterAddingFilters = () => {
    this.numberOfFiltersApplied = 0
    this.foodsFiltered = [...this.foodsSorted]
    this.numberOfFiltersApplied += this.foodPriceRangeApplied === 0 ? 0 : 1

    // FILTER BY PRICE RANGE
    if (this.foodPriceRangeApplied !== 0) {
      for (let i = this.foodsFiltered.length - 1; i >= 0; i--) {
        let food = this.foodsFiltered[i]
        if (food.price < this.foodPriceRange[this.foodPriceRangeApplied].from
          || food.price >= this.foodPriceRange[this.foodPriceRangeApplied].to) {
          this.foodsFiltered.splice(i, 1)
        }
      }
    }
  }

  changeFoodType = (foodType: string) => {
    this.router.navigate(['food/' + foodType]);
  }

  goToRestaurant = (restaurant: string) => {
    this.router.navigate(['restaurant/' + restaurant])
  }

  goToCart = () => {
    this.router.navigate(['cart'])
  }

  initializeVariables = () => {
    this.isFoodTypeValid = false
    this.foodCategories = []
    this.foods = []
    this.foodsSorted = []
    this.foodsFiltered = []
    this.isLocationChosen = false
    this.chosenLocation = {}
    this.restaurants = []
    this.cartForRestaurant = {}
    this.foodSortBy = 'NONE'
    this.foodPriceRange = []
    this.foodPriceRangeSelected = 0
    this.foodPriceRangeApplied = 0
    this.numberOfFiltersApplied = 0
  }
}
