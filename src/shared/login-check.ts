import Swal from "sweetalert2"
import { LocalStorageKeys } from "./localStorageKeys"
import { Router } from "@angular/router"
import * as jwt from 'jsonwebtoken'

export class LoginCheck {
    static loginCheck = (router: Router) => {
        if (!this.isAnyoneLoggedIn()) {
            router.navigate(['intro'])
        } else if (this.isTokenExpired()) {
            Swal.fire({
                title: 'Your Login expired!',
                icon: 'warning'
            })
        }
    }

    static isAnyoneLoggedIn = (): boolean => {
        return localStorage.getItem(LocalStorageKeys.loggedInCustomer) !== null
    }

    static isTokenExpired = (): boolean => {
        // let token = localStorage.getItem(LocalStorageKeys.jwt) + ''
        // try {
        //     const { exp } = jwt.decode(token) as {
        //         exp: number
        //     }
        //     const expirationDatetimeInSeconds = exp * 1000

        //     return Date.now() >= expirationDatetimeInSeconds
        // } catch {
        //     return true
        // }
        return false
    }
}