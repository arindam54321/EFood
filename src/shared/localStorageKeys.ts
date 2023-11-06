export class LocalStorageKeys {
    static loggedInCustomer: string = 'loggedInCustomer'
    static nextOtpCooldown: string = 'nextOtpCooldown'

    static allKeys: string[] = [
        LocalStorageKeys.loggedInCustomer,
        LocalStorageKeys.nextOtpCooldown
    ]

    static customerDetailKeys: string[] = [
        LocalStorageKeys.loggedInCustomer,
        LocalStorageKeys.nextOtpCooldown
    ]

    static deleteCustomerDetails = (): void => {
        for (let i of LocalStorageKeys.customerDetailKeys) {
            localStorage.removeItem(i)
        }
    }
}