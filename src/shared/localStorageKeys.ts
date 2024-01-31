export class LocalStorageKeys {
    static loggedInCustomer: string = 'loggedInCustomer'
    static jwt: string = 'jwt'
    static nextOtpCooldown: string = 'nextOtpCooldown'
    static chosenLocation: string = 'chosenLocation'
    static chosenLocationObject: string = 'chosenLocationObject'
    static cartForRestaurant: string = 'cartForRestaurant'
    static cartItems: string = 'cartItems'

    static allKeys: string[] = [
        LocalStorageKeys.loggedInCustomer,
        LocalStorageKeys.nextOtpCooldown,
        LocalStorageKeys.jwt,
        LocalStorageKeys.chosenLocation,
        LocalStorageKeys.chosenLocationObject,
        LocalStorageKeys.cartForRestaurant,
        LocalStorageKeys.cartItems
    ]

    static customerDetailKeys: string[] = [
        LocalStorageKeys.loggedInCustomer,
        LocalStorageKeys.nextOtpCooldown,
        LocalStorageKeys.jwt,
        LocalStorageKeys.chosenLocation,
        LocalStorageKeys.chosenLocationObject,
        LocalStorageKeys.cartForRestaurant,
        LocalStorageKeys.cartItems
    ]

    static deleteCustomerDetails = (): void => {
        for (let i of LocalStorageKeys.customerDetailKeys) {
            localStorage.removeItem(i)
        }
    }
}