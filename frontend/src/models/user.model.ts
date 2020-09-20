export class User {
    public email?: string;
    public password?: string;
    public name: string | undefined;
    public age?: number;
    public token?: string;

    static fromJSON(obj: any): User {
        return Object.assign(new User(), obj);
    }
}
