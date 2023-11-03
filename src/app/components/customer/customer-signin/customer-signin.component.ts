import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-signin',
  templateUrl: './customer-signin.component.html',
  styleUrls: ['./customer-signin.component.css']
})
export class CustomerSigninComponent implements OnInit {

  form!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]]
    })
  }

  signIn = () => {
    
  }
}
