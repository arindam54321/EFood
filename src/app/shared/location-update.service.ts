import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Constants } from 'src/shared/contants';

@Injectable({
  providedIn: 'root'
})
export class LocationUpdateService {
  private selectedLocationSubject = new BehaviorSubject<string>(Constants.selectedLocationNotSelected)
  selectedLocation$ = this.selectedLocationSubject.asObservable()

  updateLocation(location: string): void {
    this.selectedLocationSubject.next(location)
  }
}
