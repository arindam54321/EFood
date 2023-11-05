import { Constants } from "./Constants"

export class LoginCheck {
    static loginCheck = () => {
        if (!this.isAnyoneLoggedIn()) {
            window.location.href = '#/new-user'
        }
    }

    static isAnyoneLoggedIn = (): boolean => {
        return localStorage.getItem(Constants.loggedInCustomer) !== null
    }
}