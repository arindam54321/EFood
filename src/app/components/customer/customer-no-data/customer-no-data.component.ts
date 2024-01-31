import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { Constants } from 'src/shared/contants';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-no-data',
  templateUrl: './customer-no-data.component.html',
  styleUrls: ['./customer-no-data.component.css']
})
export class CustomerNoDataComponent implements OnInit {

  guestEmail: string = Constants.guestEmail

  constructor(
    private router: Router,
    private customerService: CustomerServiceService
  ) { }

  ngOnInit(): void {
  }

  loginasguestconfirmation = () => {
    Swal.fire({
      title: 'Guest Login',
      icon: 'question',
      text: `Are you sure you want to Login as a guest user? 
            You might miss the OTP verification feature that was implemented in the website`,
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.loginasguest()
      } else {
        // Do Nothing
      }
    })
  }

  loginasguest = () => {
    this.customerService.getCustomer(this.guestEmail).subscribe(
      success => {
        let guest = success.data
        let jwt = success.headers[0]
        LocalStorageKeys.deleteCustomerDetails()
        localStorage.setItem(LocalStorageKeys.loggedInCustomer, JSON.stringify(guest))
        localStorage.setItem(LocalStorageKeys.jwt, jwt)
        this.router.navigate([''])
      }
    )
  }

  login = () => {
    this.router.navigate(['login'])
  }

  signin = () => {
    this.router.navigate(['signin'])
  }

  gotoregister = () => {
    this.router.navigate(['register'])
  }
}
