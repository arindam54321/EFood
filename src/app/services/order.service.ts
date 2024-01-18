import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Backend } from 'src/shared/backend';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  urlPrefix: string = `${Backend.hostname}/order`

  constructor(private http: HttpClient) { }

  placeOrder = (data: any): Observable<any> => {
    let url = `${this.urlPrefix}/place`
    return this.http.post(url, data).pipe(catchError(Backend.handleError))
  }

  findbyemail = (email: string): Observable<any> => {
    let url = `${this.urlPrefix}/findbyemail?email=${email}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }
}
