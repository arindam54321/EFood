import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { OtpServiceService } from 'src/app/services/otp-service.service';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  static loginButtonActive: string = 'btn btn-outline-primary active'
  static loginButtonInactive: string = 'btn btn-outline-primary'
  static signupButtonActive: string = 'btn btn-outline-success active'
  static signupButtonInctive: string = 'btn btn-outline-success'
  
  loginButtonClass: string = LoginSignupComponent.loginButtonActive
  signupButtonClass: string = LoginSignupComponent.signupButtonInctive
  inLoginMode: boolean = true

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
  jwt!: any
  form!: FormGroup
  formSignUp!: FormGroup

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerServiceService,
    private otpService: OtpServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.min(100001), Validators.max(999999)]]
    })
    this.subscription = interval(100).subscribe(() => {
      this.otpButtonDisabled = !this.otpCooldownOver()
      this.setCooldownTimer()
    })

    this.formSignUp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
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
        this.jwt = success.headers[0]
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
        this.customerErrorMessage = "*This email is not registered. If you are new here, Sign Up first!"
      }
    )
  }

  signIn = () => {
    this.otpErrorMessage = null
    this.otpValidated = false
    this.userExists = false

    if (this.otpCooldownOver()) {
      this.otpService.sendOtp(this.formSignUp.controls['email'].value).subscribe(
        success => {
          this.setNextOtpTime()
        }
      )
    }
  }

  validateOtp = () => {
    this.otpErrorMessage = null
    this.otpValidated = false
    this.otpService.validateOtp(this.form.controls['email'].value, this.form.controls['otp'].value).subscribe(
      success => {
        LocalStorageKeys.deleteCustomerDetails()
        localStorage.setItem(LocalStorageKeys.loggedInCustomer, JSON.stringify(this.customerData))
        localStorage.setItem(LocalStorageKeys.jwt, this.jwt)
        this.router.navigate([''])
      },
      error => {
        this.otpErrorMessage = "OTP didn't match"
      }
    )
  }

  validateOtpForSignUp = () => {
    this.otpErrorMessage = null
    this.otpValidated = false
    this.userExists = false
    this.otpService.validateOtp(this.formSignUp.controls['email'].value, this.otp).subscribe(
      success => {
        this.customerService.signIn(this.formSignUp.value).subscribe(
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

  loginbuttonselected = () => {
    this.loginButtonClass = LoginSignupComponent.loginButtonActive
    this.signupButtonClass = LoginSignupComponent.signupButtonInctive
    this.inLoginMode = true
    this.form.reset()
  }

  signupbuttonselected = () => {
    this.loginButtonClass = LoginSignupComponent.loginButtonInactive
    this.signupButtonClass = LoginSignupComponent.signupButtonActive
    this.inLoginMode = false
    this.formSignUp.reset()
  }

  reloadpage = () => {
    this.router.navigate(['register'])
  }
}
