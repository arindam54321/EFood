import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval, timestamp } from 'rxjs';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { OtpServiceService } from 'src/app/services/otp-service.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';

@Component({
  selector: 'app-customer-signin',
  templateUrl: './customer-signin.component.html',
  styleUrls: ['./customer-signin.component.css']
})
export class CustomerSigninComponent implements OnInit {

  form!: FormGroup
  private subscription!: Subscription
  otpButtonDisabled = false
  cooldownSeconds = 0
  cooldownMinutes = 0
  otp: any = null
  otpErrorMessage:any = null
  otpValidated = false
  userExists = false

  constructor(private fb: FormBuilder, 
    private customerService: CustomerServiceService, 
    private otpService: OtpServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
    })
    this.subscription = interval(100).subscribe(() => {
      this.otpButtonDisabled = !this.otpCooldownOver()
      this.setCooldownTimer()
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  signIn = () => {
    this.otpErrorMessage = null
    this.otpValidated = false
    this.userExists = false

    if (this.otpCooldownOver()) {
      this.otpService.sendOtp(this.form.controls['email'].value).subscribe(
        success => {
          this.setNextOtpTime()
        }
      )
    }
  }

  validateOtp = () => {
    this.otpErrorMessage = null
    this.otpValidated = false
    this.userExists = false
    this.otpService.validateOtp(this.form.controls['email'].value, this.otp).subscribe(
      success => {
        this.customerService.signIn(this.form.value).subscribe(
          success => {
            this.otpValidated = true
            LocalStorageKeys.deleteCustomerDetails()
            localStorage.setItem(LocalStorageKeys.loggedInCustomer, JSON.stringify(success.data))
            localStorage.setItem(LocalStorageKeys.jwt, success.headers[0])
          },
          error => {
            this.otpValidated = true
            this.userExists = true
          }
        )
      },
      error => {
        this.otpErrorMessage = "OTP didn't match"
      }
    )
  }

  setCooldownTimer = (): void => {
    let seconds = this.getCooldownSeconds()
    this.cooldownMinutes = Math.floor(seconds / 60)
    this.cooldownSeconds = seconds % 60
  }

  getCooldownSeconds = (): number => {
    return Math.ceil(Math.max(0, Number(localStorage.getItem(LocalStorageKeys.nextOtpCooldown)) - Date.now()) / 1000);
  }

  setNextOtpTime = (): void => {
    let seconds = 60
    localStorage.setItem(LocalStorageKeys.nextOtpCooldown, (Date.now() + seconds * 1000).toString())
  }

  getNextOtpTime = (): number => {
    return Number(localStorage.getItem(LocalStorageKeys.nextOtpCooldown))
  }

  otpCooldownOver = (): boolean => {
    return this.getNextOtpTime() < Date.now()
  }
}
