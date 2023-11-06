import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { OtpServiceService } from 'src/app/services/otp-service.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  customerEmail!: string
  otp!: number
  private subscription!: Subscription
  otpButtonDisabled = false
  cooldownSeconds = 0
  cooldownMinutes = 0
  otpErrorMessage: any = null
  otpValidated = false
  userExists = false
  doesCustomerExists = true
  customerErrorMessage!: any
  otpSent = false
  customerData!: any
  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServiceService, 
    private otpService: OtpServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.min(100001), Validators.max(999999)]]
    })
    this.subscription = interval(100).subscribe(() => {
      this.otpButtonDisabled = !this.otpCooldownOver()
      this.setCooldownTimer()
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  login = () => {
    this.doesCustomerExists = true
    this.customerErrorMessage = null
    this.customerData = null
    this.userExists = false
    this.customerService.getCustomer(this.form.controls['email'].value).subscribe(
      success => {
        this.userExists = true
        this.customerData = success.data
        if (this.otpCooldownOver()) {
          this.otpSent = false
          this.otpService.sendOtp(this.form.controls['email'].value).subscribe(
            success => {
              this.otpSent = true
              this.setNextOtpTime()
            }
          )
        }
      },
      error => {
        this.doesCustomerExists = false
        this.customerErrorMessage = "*This email is not registered"
      }
    )
  }

  validateOtp = () => {
    this.otpErrorMessage = null
    this.otpValidated = false
    this.otpService.validateOtp(this.form.controls['email'].value, this.form.controls['otp'].value).subscribe(
      success => {
        LocalStorageKeys.deleteCustomerDetails()
        localStorage.setItem(LocalStorageKeys.loggedInCustomer, JSON.stringify(this.customerData))
        this.router.navigate([''])
      },
      error => {
        this.otpErrorMessage = "OTP didn't match"
      }
    )
  }
}
