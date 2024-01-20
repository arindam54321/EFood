import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-no-data',
  templateUrl: './customer-no-data.component.html',
  styleUrls: ['./customer-no-data.component.css']
})
export class CustomerNoDataComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
