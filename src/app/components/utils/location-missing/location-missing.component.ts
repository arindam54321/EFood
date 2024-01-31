import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-missing',
  templateUrl: './location-missing.component.html',
  styleUrls: ['./location-missing.component.css']
})
export class LocationMissingComponent implements OnInit {

  @Input() bannerType: 'small' | 'big' = 'big'

  static imageCommonClass: string = ''
  static smallImageClass: string = 'small-image'
  static bigImageClass: string = 'big-image'

  imageClass: string = LocationMissingComponent.imageCommonClass + LocationMissingComponent.bigImageClass

  constructor() { }

  ngOnInit(): void {
    if (this.bannerType === 'big') {
      this.imageClass = LocationMissingComponent.imageCommonClass + LocationMissingComponent.bigImageClass
    } else {
      this.imageClass = LocationMissingComponent.imageCommonClass + LocationMissingComponent.smallImageClass
    }
  }

}
