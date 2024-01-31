import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

export class Backend {
  static localport: number = 10000
  static localhost: string = `http://localhost:${Backend.localport}`

  static customport: number = 10000
  static customhost: string = `http://0.0.0.0:${Backend.customport}`

  static cloudhost: string = `https://hungry-hub-arindam.onrender.com`

  static hostname: string = environment.production 
                          ? this.cloudhost
                          : this.localhost

  public static handleError(error: HttpErrorResponse) {
    let proccessedError: any = ''
    
    if (error.error instanceof Error) {
      proccessedError = error.error.message
      console.log(proccessedError)
    } else if (typeof error.error === 'string') {
      proccessedError = JSON.parse(error.error).errorMessage
    } else {
      if (error.status == 0) {
        proccessedError = {
          message: 'A connection to backend can not be established',
          status: 0
        }
      } else {
        proccessedError = error.error.errorMessage || error.error.text
      }
    }
    return throwError(proccessedError)
  }
}
