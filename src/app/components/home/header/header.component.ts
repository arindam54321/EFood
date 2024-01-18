import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { HomeComponent } from '../home.component';
import { LocationUpdateService } from 'src/app/shared/location-update.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser!: any
  chosenLocation: any = null
  locations: any[] = []
  constructor(
    private router: Router, 
    private locationService: LocationService, 
    private locationUpdateService: LocationUpdateService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem(LocalStorageKeys.loggedInCustomer) + '')
    this.initChecks()
  }

  logout = () => {
    LocalStorageKeys.deleteCustomerDetails()
    this.router.navigate(['new-user'])
  }

  initChecks = () => {
    this.chosenLocation = localStorage.getItem(LocalStorageKeys.chosenLocation) !== null
                        ? JSON.parse(localStorage.getItem(LocalStorageKeys.chosenLocation) + '').pin 
                        : null
    this.locationService.getLocations().subscribe(
      success => {
        this.locations = success.data
      }
    )
  }

  selectLocation = () => {
    if (this.chosenLocation == null || this.chosenLocation == 'null') {
      localStorage.removeItem(LocalStorageKeys.chosenLocation)
    } else {
      let chosenLocationObject = this.locations.filter(i => i.pin === this.chosenLocation)[0]
      localStorage.setItem(LocalStorageKeys.chosenLocation, JSON.stringify(chosenLocationObject))
    }
    this.locationUpdateService.updateLocation(this.chosenLocation)
  }

  gohome = () => {
    this.router.navigate([''])
  }

  gotocart = () => {
    this.router.navigate(['cart'])
  }

  gotoorders = () => {
    this.router.navigate(['orders'])
  }
}
