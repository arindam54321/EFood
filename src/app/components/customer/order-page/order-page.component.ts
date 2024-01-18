import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Constants } from 'src/shared/contants';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';
import { Utils } from 'src/shared/utils';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  isOrderLoaded: boolean = true

  customerData: any = {}
  orders: any[] = []

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.initialChecks()
    this.customerData = JSON.parse(localStorage.getItem(LocalStorageKeys.loggedInCustomer) + '')
    this.loadOrders()
  }

  initialChecks = () => {
    LoginCheck.isAnyoneLoggedIn()
    Utils.reloadCheck(this.route, this.router)
  }

  loadOrders = () => {
    this.isOrderLoaded = false
    this.orderService.findbyemail(this.customerData.email).subscribe(
      success => {
        this.orders = []
        let successData = success.data
        for (let item of successData) {
          let itemCopy = item
          itemCopy.data = JSON.parse(item.data)
          itemCopy.status = item.status === 'ORDERED' ? 'Ordered' 
                          : item.status === 'DELIVERED' ? 'Delivered' 
                          : 'Picked Up'
          let date = new Date(item.epochTime)
          itemCopy.date = Utils.formatDate(date)
          itemCopy.time = Utils.formatTime(date)
          this.orders.push(itemCopy)
        }
        this.orders.sort((a, b) => b.epochTime - a.epochTime)
        this.isOrderLoaded = true
      },
      error => {

      }
    )
  }

  goback = () => {
    this.location.back()
  }
}
