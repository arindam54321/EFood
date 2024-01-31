import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { EmailAvatar } from 'src/shared/emailAvatar';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';
import { LoginCheck } from 'src/shared/login-check';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: any = {}
  form!: FormGroup
  avatarUrl: string | null = null

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerServiceService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
    })
    this.initialChecks()
    this.initiateForm()
    this.loadCustomer()
  }

  initialChecks = () => {
    LoginCheck.loginCheck(this.router)
  }

  loadCustomer = () => {
    this.userDetails = JSON.parse(localStorage.getItem(LocalStorageKeys.loggedInCustomer) + '')
    this.customerService.getCustomer(this.userDetails.email).subscribe(
      success => {
        let customerData = success.data
        this.userDetails = customerData
        localStorage.setItem(LocalStorageKeys.loggedInCustomer, JSON.stringify(this.userDetails))
        localStorage.setItem(LocalStorageKeys.jwt, success.headers[0])
        this.initiateForm()
        this.avatarUrl = EmailAvatar.getGravatarUrl(customerData.email)
      }
    )
  }

  initiateForm = () => {
    this.form.controls['email'].setValue(this.userDetails.email)
    this.form.controls['firstName'].setValue(this.userDetails.firstName)
    this.form.controls['lastName'].setValue(this.userDetails.lastName)
    this.form.controls['mobile'].setValue(this.userDetails.mobile)
  }

  updateConfirmation = () => {
    Swal.fire({
      title: 'Update Profile',
      text: 'Are you sure you want to update your details?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Close',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateCustomer()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do Nothing
      }
    })
  }

  updateCustomer = () => {
    this.customerService.updateCustomer(this.form.value).subscribe(
      success => {
        localStorage.setItem(LocalStorageKeys.loggedInCustomer, JSON.stringify(success.data))
        localStorage.setItem(LocalStorageKeys.jwt, success.headers[0])
        this.detailsUpdatedPopup()
      },
      error => {

      }
    )
  }

  detailsUpdatedPopup = () => {
    Swal.fire({
      title: 'Congratulations',
      text: 'Your profile has been updated!',
      icon: 'success',
      confirmButtonText: 'Got it!',
    })
  }
}
