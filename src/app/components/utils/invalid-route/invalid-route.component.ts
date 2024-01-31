import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invalid-route',
  templateUrl: './invalid-route.component.html',
  styleUrls: ['./invalid-route.component.css']
})
export class InvalidRouteComponent implements OnInit {

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  goback = () => {
    this.location.back()
  }

  gohome = () => {
    this.router.navigate([''])
  }
}
