import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser!: any
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem(LocalStorageKeys.loggedInCustomer) + '')
  }

  logout = () => {
    LocalStorageKeys.deleteCustomerDetails()
    this.router.navigate(['new-user'])
  }
}
