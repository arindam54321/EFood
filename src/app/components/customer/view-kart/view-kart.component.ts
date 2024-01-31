import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';
import Swal from 'sweetalert2';

declare var Razorpay: any
@Component({
  selector: 'app-view-kart',
  templateUrl: './view-kart.component.html',
  styleUrls: ['./view-kart.component.css']
})
export class ViewKartComponent implements OnInit {

  isFoodLoaded: boolean = true

  isCartEmpty: boolean = true
  restaurantFromCart: any = {}
  cartItems: any[] = []
  totalBalance: number = 0
  customerData: any = {}
  orderPlaced: boolean = false

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private location: Location,
    private foodService: FoodService,
    private orderService: OrderService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.initChecks()
  }

  initChecks = () => {
    LoginCheck.loginCheck(this.router)
    this.customerData = JSON.parse(localStorage.getItem(LocalStorageKeys.loggedInCustomer) + '')
    this.isCartEmpty = localStorage.getItem(LocalStorageKeys.cartForRestaurant) === null
    if (!this.isCartEmpty) { this.loadCartData() }
  }

  loadCartData = () => {
    this.restaurantFromCart = JSON.parse(localStorage.getItem(LocalStorageKeys.cartForRestaurant) + '')
    let cartObject: any = JSON.parse(localStorage.getItem(LocalStorageKeys.cartItems) + '')
    this.isFoodLoaded = false
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
        this.isFoodLoaded = true
      },
      error => { }
    )
  }

  paymentOrder = (amount: number) => {
    let request = {
      amount: amount * 100,
      customerEmail: this.customerData.email
    }
    this.paymentService.createOrder(request).subscribe(
      success => {
        let data = success.data
        const options = {
          key: data.razorpay_key,
          amount: data.order.amount, // amount in paisa (e.g., 100 represents ₹1)
          currency: 'INR',
          order_id: data.order.id,
          name: 'Hungry Hub',
          description: 'Payment for your order',
          image: 'https://static.thenounproject.com/png/17562-200.png',
          handler: (response: any) => {
            this.placeOrder(response)
          },
          prefill: {
            name: `${data.customer.firstName} ${data.customer.lastName}`,
            email: data.customer.email,
            contact: data.customer.mobile
          },
          notes: {
            address: 'Razorpay Corporate Office'
          },
          theme: {
            color: '#4D19F7'
          }
        }

        const razorpay = new Razorpay(options)
        razorpay.open()
      },
      error => {

      }
    )
  }

  placeOrder = (response: any) => {
    let data = {
      email: this.customerData.email,
      restaurantName: this.restaurantFromCart.name,
      data: JSON.stringify(this.cartItems),
      totalPayment: this.totalBalance,
      status: "ORDERED"
    }
    this.orderPlaced = true
    this.emptyCart()
    this.orderService.placeOrder(data).subscribe(
      success => {
        Swal.fire({
          title: 'Order Confirmed',
          text: 'Your order has been confirmed. Go to Orders tab to check you orders',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Your Orders',
          cancelButtonText: 'Close',
        }).then((result) => {
          if (result.isConfirmed) {
            this.ngZone.run(() => this.goToOrders())
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.reloadPage()
          }
        })
      },
      error => {

      }
    )
  }

  emptyCartConfirmation = () => {
    Swal.fire({
      title: 'Empty Cart',
      text: 'Are you sure you want to delete the cart items?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        this.emptyCart()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do Nothing
      }
    })
  }

  payConfirmation = () => {
    Swal.fire({
      title: '<span class="text-danger">This is a Test Application</span>',
      html: `This Page is made for testing the payment functionality. No orderes will be created after you pay. If any money is debited it will directly go to the Authors account.<hr>For testing purpose the payment amount will be <span class="text-success">₹${1}</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Pay ₹${1}`,
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentOrder(1)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do Noting
      }
    })
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

  goToOrders = () => {
    this.router.navigate(['orders'], { queryParams: { reload: true }})
  }

  reloadPage = () => {
    window.location.reload()
  }
}
