import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Constants } from 'src/shared/contants';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-restaurant-landing-page',
  templateUrl: './restaurant-landing-page.component.html',
  styleUrls: ['./restaurant-landing-page.component.css']
})
export class RestaurantLandingPageComponent implements OnInit {

  restaurantData: any
  restaurantId: any
  restaurantExists: boolean = true
  foods: any[] = []
  categoryImageLocation!:string

  constructor(private route: ActivatedRoute, private foodService: FoodService, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.initialChecks()
    this.loadRestaurant()
    this.loadFoods()
  }

  initialChecks = () => {
    LoginCheck.loginCheck()
    this.categoryImageLocation = '../../../' + Constants.foodCategoryImageLocation
  }

  loadRestaurant = () => {
    this.restaurantId = this.route.snapshot.paramMap.get('id')
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
        console.log(this.foods)
      },
      error => {
        // Not able to fetch foods
      }
    )
  }
}
