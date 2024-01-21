import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { HomeComponent } from '../../home/home.component';
import { LocationUpdateService } from 'src/app/shared/location-update.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInUser: any = {}
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

  logoutConfirmation = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do Nothing
      }
    })
  }

  logout = () => {
    LocalStorageKeys.deleteCustomerDetails()
    this.router.navigate(['intro'])
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

  gotoprofile = () => {
    this.router.navigate(['you'])
  }
}
