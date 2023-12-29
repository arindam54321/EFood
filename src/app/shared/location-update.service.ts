import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationUpdateService {
  private selectedLocationSubject = new BehaviorSubject<string>('No Location Selected');
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  updateLocation(location: string): void {
    this.selectedLocationSubject.next(location);
  }
}
