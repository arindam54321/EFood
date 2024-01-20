import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Backend } from 'src/shared/backend';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  
  urlPrefix: string = `${Backend.hostname}/customer`
  
  constructor(private http: HttpClient) { }

  signIn = (data: any): Observable<any> => {
    let url = `${this.urlPrefix}/add`
    return this.http.post(url, data).pipe(catchError(Backend.handleError))
  }

  doesExist = (email: any): Observable<any> => {
    let url = `${this.urlPrefix}/exists?email=${email}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }

  getCustomer = (email: any): Observable<any> => {
    let url = `${this.urlPrefix}/get?email=${email}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }

  updateCustomer = (data: any): Observable<any> => {
    let url = `${this.urlPrefix}/update`
    return this.http.patch(url, data).pipe(catchError(Backend.handleError))
  }
}
