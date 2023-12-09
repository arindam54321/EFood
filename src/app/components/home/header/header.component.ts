import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser!: any
  chosenLocation: any = null
  locations: any[] = []
  constructor(private router: Router, private locationService: LocationService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem(LocalStorageKeys.loggedInCustomer) + '')
    this.initChecks()
  }

  logout = () => {
    LocalStorageKeys.deleteCustomerDetails()
    this.router.navigate(['new-user'])
  }

  initChecks = () => {
    this.chosenLocation = localStorage.getItem(LocalStorageKeys.chosenLocation)
    this.locationService.getLocations().subscribe(
      success => {
        this.locations = success.data
      }
    )
  }

  selectLocation = () => {
    if (this.chosenLocation === null) {
      localStorage.removeItem(LocalStorageKeys.chosenLocation)
    } else {
      localStorage.setItem(LocalStorageKeys.chosenLocation, this.chosenLocation + '')
    }
  }
}
