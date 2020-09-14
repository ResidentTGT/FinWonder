export class UserDto {
    public email: string;
    public password?: string;
    public name?: string;
    public age?: number;
    public token?: string;

    static createFrom(obj: any): UserDto {
        const user = new UserDto();
        user.name = obj.name;
        user.email = obj.email;
        user.age = obj.age;
        user.token = obj.token;
        return user;
    }
}
