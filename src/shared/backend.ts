export class Backend {
    static localport: number = 10000
    static localhost: string = `http://localhost:${Backend.localport}/`

    static customport: number = 10000
    static customhost: string = `http://192.168.29.253:${Backend.customport}/`

    static cloudhost: string = ''

    static hostname: string = Backend.localhost
}
