import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Backend } from 'src/shared/backend';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  urlPrefix: string = `${Backend.hostname}/location`

  constructor(private http: HttpClient) { }

  getLocations = (): Observable<any> => {
    let url = `${this.urlPrefix}/getall`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }
}
