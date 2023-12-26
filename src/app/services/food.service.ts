import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Backend } from 'src/shared/backend';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  urlPrefix: string = `${Backend.hostname}/food`

  constructor(private http: HttpClient) { }

  getFoods = (): Observable<any> => {
    let url = `${this.urlPrefix}/getall`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }

  getById = (id: String): Observable<any> => {
    let url = `${this.urlPrefix}/findbyid?id=${id}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }

  getByRestaurant = (restaurant: String): Observable<any> => {
    let url = `${this.urlPrefix}/findbyrestaurant?restaurant=${restaurant}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }
}
