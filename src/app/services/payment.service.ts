import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Backend } from 'src/shared/backend';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  urlPrefix: string = `${Backend.hostname}/payment`

  constructor(private http: HttpClient) { }

  createOrder = (request: any): Observable<any> => {
    let url = `${this.urlPrefix}/createorder`
    return this.http.post(url, request).pipe(catchError(Backend.handleError))
  }
}
