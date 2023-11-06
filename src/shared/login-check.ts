import { LocalStorageKeys } from "./localStorageKeys"

export class LoginCheck {
    static loginCheck = () => {
        if (!this.isAnyoneLoggedIn()) {
            window.location.href = '#/new-user'
        }
    }

    static isAnyoneLoggedIn = (): boolean => {
        return localStorage.getItem(LocalStorageKeys.loggedInCustomer) !== null
    }
}