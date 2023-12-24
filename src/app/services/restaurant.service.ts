import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Backend } from 'src/shared/backend';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  urlPrefix: string = `${Backend.hostname}/restaurant`

  constructor(private http: HttpClient) { }

  getRestaurants = (): Observable<any> => {
    let url = `${this.urlPrefix}/getall`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }

  getById = (id: String): Observable<any> => {
    let url = `${this.urlPrefix}/findbyid?id=${id}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }

  getByLocation = (pin: String): Observable<any> => {
    let url = `${this.urlPrefix}/findbylocation?location=${pin}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }
}
