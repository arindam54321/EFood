export class LoginCheck {
    static loginCheck = () => {
        if (!this.isAnyoneLoggedIn()) {
            window.location.href = 'init'
        }
    }

    static isAnyoneLoggedIn = (): boolean => {
        return localStorage.getItem("loggedInCustomer") !== null
    }
}