import { Component, OnInit } from '@angular/core';
import { LoginCheck } from 'src/shared/login-check';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.initialChecks()
    this.loadData()
  }

  initialChecks = () => {
    LoginCheck.loginCheck()
  }

  loadData = () => {
    this.categories = [
      { name: 'Pizza', src: 'Pizza.webp' },
      { name: 'Burger', src: 'Burger.webp' },
      { name: 'Biryani', src: 'Biryani.webp' },
      { name: 'Chinese', src: 'Chinese.webp' },
      { name: 'Momos', src: 'Momos.webp' }
    ]
  }
}
