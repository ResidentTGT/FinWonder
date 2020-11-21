import { EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import backendApiService from './backend-api.service';

export class UsersApi {
    constructor(private _apiUrl: string) {}

    public register(
        name: string,
        password: string,
        email: string
    ): Observable<User> {
        if (!name || !password || !email) {
            return EMPTY;
        }
        return ajax
            .post(
                `${this._apiUrl}/auth/register`,
                {
                    name: name,
                    password: password,
                    email: email,
                },
                backendApiService.getDefaultHeaders()
            )
            .pipe(map((r) => User.fromJSON(r.response)));
    }

    public login(email: string, password: string): Observable<User> {
        if (!email || !password) {
            return EMPTY;
        }

        return ajax
            .post(
                `${this._apiUrl}/auth/login`,
                {
                    email,
                    password,
                },
                backendApiService.getDefaultHeaders()
            )
            .pipe(map((r) => User.fromJSON(r.response)));
    }

    public getUser(): Observable<User> {
        return ajax
            .get(`${this._apiUrl}/user`, backendApiService.getDefaultHeaders())
            .pipe(map((r) => User.fromJSON(r.response)));
    }
}
