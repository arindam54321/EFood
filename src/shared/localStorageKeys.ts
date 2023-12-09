export class LocalStorageKeys {
    static loggedInCustomer: string = 'loggedInCustomer'
    static jwt: string = 'jwt'
    static nextOtpCooldown: string = 'nextOtpCooldown'
    static chosenLocation: string = 'chosenLocation'

    static allKeys: string[] = [
        LocalStorageKeys.loggedInCustomer,
        LocalStorageKeys.nextOtpCooldown,
        LocalStorageKeys.jwt,
        LocalStorageKeys.chosenLocation
    ]

    static customerDetailKeys: string[] = [
        LocalStorageKeys.loggedInCustomer,
        LocalStorageKeys.nextOtpCooldown,
        LocalStorageKeys.jwt
    ]

    static deleteCustomerDetails = (): void => {
        for (let i of LocalStorageKeys.customerDetailKeys) {
            localStorage.removeItem(i)
        }
    }
}