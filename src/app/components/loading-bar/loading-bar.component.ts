import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

  @Input() alertType: any = 'secondary'
  validAlertTypes: string[] = ['primary', 'secondary', 'warning', 'success', 'danger', 'info', 'light', 'dark']
  containerClass: string = ''

  constructor() { }

  ngOnInit(): void {
    if (this.validAlertTypes.includes(this.alertType)) {
      this.containerClass = 'container loader-container alert alert-' + this.alertType
    } else {
      this.containerClass = 'container loader-container alert'
    }
  }
}
