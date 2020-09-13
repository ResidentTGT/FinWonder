import { injectable } from "tsyringe";
import * as argon2 from 'argon2';
import { User } from "./../models/user.model";
import * as jwt from 'jsonwebtoken'
import { environment } from "./../environments/environment";

@injectable()
export class AuthService {

    public async SignUp(email: string, password: string, name: string): Promise<any> {
        const passwordHashed = await argon2.hash(password);

        const user = await User.create({
            password: passwordHashed,
            email,
            name,
        });
        return Object.assign(new User(), user.toObject(), { password: null });
    }

    public async Login(email: string, password: string): Promise<any> {
        const userRecord = await User.findOne({ email });
        if (!userRecord) {
            throw new Error('User not found')
        } else {
            const user = userRecord.toObject();
            const correctPassword = await argon2.verify(user.password, password);
            if (!correctPassword) {
                throw new Error('Incorrect password')
            }

            return {
                user: {
                    email: user.email,
                    name: user.name,
                },
                token: this.generateToken(user),
            }

        }
    }

    private generateToken(user: any) {

        const data = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        return jwt.sign({ data }, environment.jwt.signature, { expiresIn: environment.jwt.expiration });
    }

}
