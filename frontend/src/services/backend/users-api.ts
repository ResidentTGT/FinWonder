import { EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';

export class UsersApi {
    constructor(private _apiUrl: string) {
    }

    public register(name: string, password: string, email?: string): Observable<User> {
        if (!name || !password) {
            return EMPTY;
        }

        return ajax.post(`${this._apiUrl}register`, {
            name: name,
            password: password
        }).pipe(map(r => User.fromJSON(r.responseText)));
    }

    public login(name: string, password: string): Observable<User> {
        if (!name || !password) {
            return EMPTY;
        }

        return ajax.post(`${this._apiUrl}login`, {
            name: name,
            password: password
        }).pipe(map(r => User.fromJSON(r.responseText)));
    }
}
