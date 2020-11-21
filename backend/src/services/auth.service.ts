import { injectable } from "tsyringe";
import * as argon2 from "argon2";
import users from "./../models/user.model";
import * as jwt from "jsonwebtoken";
import { environment } from "./../environments/environment";
import { UserDto } from "./../dto/user";

@injectable()
export class AuthService {
    public async SignUp(
        email: string,
        password: string,
        name: string
    ): Promise<UserDto> {
        let userRecord;
        try {
            userRecord = await (await users.findOne({ email }))?.toObject();
        } catch {}
        if (userRecord) {
            throw new Error("User with such email already exist.");
        }
        try {
            userRecord = await (await users.findOne({ name: name }))?.toObject();
        } catch {}
        if (userRecord) {
            throw new Error("User with such name already exist.");
        }

        const passwordHashed = await argon2.hash(password);

        const newUserRecord = (
            await users.create({
                password: passwordHashed,
                email,
                name,
            })
        ).toObject();

        return Object.assign(UserDto.createFrom(newUserRecord), {
            token: this.generateToken(newUserRecord),
        });
    }

    public async Login(email: string, password: string): Promise<UserDto> {
        const userRecord = await users.findOne({ email });

        if (!userRecord) {
            throw new Error("User not found");
        } else {
            const user = userRecord.toObject();

            const correctPassword = await argon2.verify(
                user.password,
                password
            );
            if (!correctPassword) {
                throw new Error("Incorrect password");
            }

            return Object.assign(UserDto.createFrom(user), {
                token: this.generateToken(user),
            });
        }
    }

    private generateToken(user: any) {
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };

        return jwt.sign({ data }, environment.jwt.signature, {
            expiresIn: environment.jwt.expiration,
        });
    }
}
