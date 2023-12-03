import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageKeys } from 'src/shared/localStorageKeys';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenHeader = request.clone({
      setHeaders: {
        jwt: localStorage.getItem(LocalStorageKeys.jwt) + ''
      }
    })
    return next.handle(tokenHeader)
  }
}
