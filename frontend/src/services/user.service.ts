import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { User } from '../models/user.model';
import backendService, { BackendApiService } from './backend/backend-api.service';
import { catchError, tap } from 'rxjs/operators';
import localStorageService, { LocalStorageEntities } from './local-storage.service';

export class UserService {
    private _user: BehaviorSubject<User> = new BehaviorSubject(new User());

    constructor(private _backendApiService: BackendApiService) {
        //const  exp  = jwt.decode(<string>user.token);
        // if(user && user.token &&)
    }

    public getUserObservable = (): Observable<User> => this._user.asObservable();

    public setUser(user: User): void {
        if (user && user.token) {
            localStorageService.setSettings(LocalStorageEntities.Token, user.token);
        }

        this._user.next(user);
    }

    public login(email: string, password: string): Observable<User> {
        if (!email || !password) {
            return EMPTY;
        }

        return this._backendApiService.Users.login(email, password).pipe(
            tap((resp) => {
                localStorage.setItem(LocalStorageEntities.Token, JSON.stringify(resp.token));
                this._user.next(resp);
            })
        );
    }

    public register(name: string, password: string, email: string): Observable<User> {
        if (!name || !password || !email) {
            return EMPTY;
        }
        return this._backendApiService.Users.register(name, password, email);
    }

    public getUser(): Observable<User> {
        return this._backendApiService.Users.getUser().pipe(
            catchError((resp) => {
                console.log(resp);

                return EMPTY;
            })
        );
    }
}

const userService = new UserService(backendService);
export default userService;
