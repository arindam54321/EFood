import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Backend } from 'src/shared/backend';

@Injectable({
  providedIn: 'root'
})
export class OtpServiceService {

  urlPrefix: string = `${Backend.hostname}/otp`

  constructor(private http: HttpClient) { }

  sendOtp = (email: any): Observable<any> => {
    let url = `${this.urlPrefix}/generate?email=${email}`
    return this.http.post(url, {}).pipe(catchError(Backend.handleError))
  }

  validateOtp = (email: any, otp: any): Observable<any> => {
    let url = `${this.urlPrefix}/validate?email=${email}&otp=${otp}`
    return this.http.get(url).pipe(catchError(Backend.handleError))
  }
}
