import { MD5 } from "crypto-js";

export class EmailAvatar {
    public static getGravatarUrl(email: string): string {
        const hash = this.md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${hash}`;
    }

    private static md5(value: string): string {
        return MD5(value).toString();
    }
}