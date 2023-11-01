import { Component, OnInit } from '@angular/core';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initialChecks()
  }

  initialChecks = () => {
    // LoginCheck.loginCheck()
  }
}
