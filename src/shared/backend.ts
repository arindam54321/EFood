import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class Backend {
  static localport: number = 10000
  static localhost: string = `http://localhost:${Backend.localport}`

  static customport: number = 10000
  static customhost: string = `http://192.168.1.4:${Backend.customport}`

  static cloudhost: string = `https://hungry-hub-arindam.onrender.com`

  static hostname: string = Backend.customhost

  public static handleError(error: HttpErrorResponse) {
    console.log(error)
    let errorMessage: string = ''
    if (error.error instanceof Error) {
      errorMessage = error.error.message
      console.log(errorMessage)
    } else if (typeof error.error === 'string') {
      errorMessage = JSON.parse(error.error).errorMessage
    } else {
      if (error.status == 0) {
        errorMessage = 'A connection to backend can not be established.'
      } else {
        errorMessage = error.error.errorMessage || error.error.text
      }
    }
    return throwError(errorMessage)
  }
}
