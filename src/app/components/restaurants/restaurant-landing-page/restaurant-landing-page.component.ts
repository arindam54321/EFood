import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Constants } from 'src/shared/contants';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-restaurant-landing-page',
  templateUrl: './restaurant-landing-page.component.html',
  styleUrls: ['./restaurant-landing-page.component.css']
})
export class RestaurantLandingPageComponent implements OnInit {

  restaurantId: any
  restaurantExists: boolean = true
  restaurantData: any = {}
  restaurantSameAsCart: boolean = false
  restaurantFromCart: any = {}
  
  categoryImageLocation!: string
  foodCategories: any[] = []
  foodPriceRange: any[] = []

  foods: any[] = []
  foodsSorted: any[] = []
  foodSortBy: string = 'NONE'

  foodsFiltered: any[] = []
  foodTypeFiltersSelected: boolean[] = []
  foodTypeFiltersApplied: boolean[] = []
  foodTypeFiltersDisabled: boolean[] = []
  foodPriceRangeSelected: number = 0
  foodPriceRangeApplied: number = 0
  numberOfFiltersApplied: number = 0
  
  cartItems: any = {}

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService, 
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.initialChecks()
        this.initializeVariables()
        this.restaurantId = params['id']
        this.loadRestaurant()
        this.loadFoods()
      }
    )
  }

  initialChecks = () => {
    LoginCheck.loginCheck()
    this.categoryImageLocation = '../../../' + Constants.foodCategoryImageLocation
    this.foodCategories = Constants.foodCategories
    this.foodCategories.forEach(i => { 
      this.foodTypeFiltersSelected.push(false)
      this.foodTypeFiltersDisabled.push(true)
      this.foodTypeFiltersApplied.push(false)
    })
    this.foodPriceRange = Constants.foodPriceRange
  }

  loadRestaurant = () => {
    this.isRestaurantSameAsCart()
    this.restaurantService.getById(this.restaurantId).subscribe(
      success => {
        this.restaurantExists = true
        this.restaurantData = success.data
      },
      error => {
        this.restaurantExists = false
      }
    )
  }

  loadFoods = () => {
    this.foodService.getByRestaurant(this.restaurantId).subscribe(
      success => {
        this.foods = success.data

        for (let food of this.foods) {
          let idx = this.foodCategories.findIndex(i => i.type === food.type)
          this.foodTypeFiltersDisabled[idx] = false
        }

        this.sortFoods('NONE')
        this.isRestaurantSameAsCart()
      },
      error => {
        // Not able to fetch foods
      }
    )
  }

  sortFoods = (sortBy: string) => {
    this.foodsSorted = [...this.foods]
    if (sortBy === 'NONE') {
      // Do Nothing
    } else if (sortBy === 'PASC') {
      this.foodsSorted.sort((a, b) => a.price < b.price ? -1:1)
    } else if (sortBy === 'PDES') {
      this.foodsSorted.sort((a, b) => a.price > b.price ? -1 : 1)
    } else if (sortBy === 'TASC') {
      this.foodsSorted.sort((a, b) => a.type < b.type ? -1 : 1)
    } else if (sortBy === 'TDES') {
      this.foodsSorted.sort((a, b) => a.type > b.type ? -1 : 1)
    } else if (sortBy === 'CASC') {
      this.foodsSorted.sort((a, b) => this.cartItems[a.id] < this.cartItems[b.id] ? -1 : 1)
    } else if (sortBy === 'CDES') {
      this.foodsSorted.sort((a, b) => this.cartItems[a.id] > this.cartItems[b.id] ? -1 : 1)
    }

    this.updateFoodListAfterAddingFilters()
  }

  clearfilter = () => {
    this.foodTypeFiltersSelected.fill(false)
    this.foodPriceRangeSelected = 0
  }

  applyfilter = () => {
    this.foodTypeFiltersApplied = [...this.foodTypeFiltersSelected]
    this.foodPriceRangeApplied = this.foodPriceRangeSelected
    this.updateFoodListAfterAddingFilters()
  }

  updateFoodListAfterAddingFilters = () => {
    this.foodsFiltered = [...this.foodsSorted]
    this.numberOfFiltersApplied = 0
    this.foodTypeFiltersApplied.forEach(i => {this.numberOfFiltersApplied += i ? 1 : 0})
    this.numberOfFiltersApplied += this.foodPriceRangeApplied === 0 ? 0 : 1

    // FILTER BY TYPE
    if (this.foodTypeFiltersApplied.includes(true)) {
      for (let i = this.foodsFiltered.length - 1; i >= 0; i--) {
        let type: string = this.foodsFiltered[i].type
        let idx = this.foodCategories.findIndex(i => i.type === type)
        if (this.foodTypeFiltersApplied[idx] === false) {
          this.foodsFiltered.splice(i, 1)
        }
      }
    }

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

  reduceFromCart = (id: any) => {
    this.cartItems[id] -= 1
    this.updateCartItems()
    this.checkIfCartEmpty()
  }

  increaseFromCart = (id: any) => {
    this.cartItems[id] += 1
    this.updateCartItems()
  }

  deleteFromCart = (id: any) => {
    this.cartItems[id] = 0
    this.updateCartItems()
    this.checkIfCartEmpty()
  }

  updateCartItems = () => {
    localStorage.setItem(LocalStorageKeys.cartForRestaurant, JSON.stringify(this.restaurantData))
    localStorage.setItem(LocalStorageKeys.cartItems, JSON.stringify(this.cartItems))
  }

  deleteCart = () => {
    localStorage.removeItem(LocalStorageKeys.cartForRestaurant)
    localStorage.removeItem(LocalStorageKeys.cartItems)
    this.isRestaurantSameAsCart()
  }

  isRestaurantSameAsCart = () => {
    this.restaurantSameAsCart = localStorage.getItem(LocalStorageKeys.cartForRestaurant) 
                              ? this.restaurantId === JSON.parse(localStorage.getItem(LocalStorageKeys.cartForRestaurant) + '').id
                              : true
    this.restaurantFromCart = JSON.parse(localStorage.getItem(LocalStorageKeys.cartForRestaurant) + '')

    if (this.restaurantSameAsCart 
      && localStorage.getItem(LocalStorageKeys.cartItems) !== null) {
      this.cartItems = JSON.parse(localStorage.getItem(LocalStorageKeys.cartItems) + '')
    } else {
      for (let food of this.foods) {
        this.cartItems[food.id] = 0
      }
    }
  }

  checkIfCartEmpty = () => {
    let hasItems: boolean = false
    this.foods.forEach(food => { if (this.cartItems[food.id] > 0) hasItems = true })
    if (!hasItems) { this.deleteCart() }
  }

  viewCart = () => {
    this.router.navigate(['cart'])
  }

  goback = () => {
    this.location.back()
  }

  gohome = () => {
    this.router.navigate([''])
  }

  initializeVariables = () => {
    this.foodTypeFiltersSelected = []
    this.foodTypeFiltersApplied = []
    this.foodTypeFiltersDisabled = []
  }
}
