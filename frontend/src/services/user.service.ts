import { BehaviorSubject, EMPTY, Observable, Subject } from "rxjs";
import { User } from "../models/user.model";
import backendService, {
    BackendApiService,
} from "./backend/backend-api.service";
import * as jwt from "jsonwebtoken";
import { catchError, tap } from "rxjs/operators";

export class UserService {
    private _user: BehaviorSubject<User> = new BehaviorSubject(new User());

    constructor(private _backendApiService: BackendApiService) {
        const user = JSON.parse(localStorage.getItem("user") as string) as User;

        //const  exp  = jwt.decode(<string>user.token);
        // if(user && user.token &&)
    }

    public getUserObservable = () => this._user.asObservable();

    public login(name: string, password: string): Observable<any> {
        if (!name || !password) {
            return EMPTY;
        }

        return this._backendApiService.Users.login(name, password).pipe(
            tap((resp) => {
                this._user.next(resp);
                localStorage.setItem("user", JSON.stringify(resp));
            }),
            catchError((resp) => {
                console.log(resp);

                return EMPTY;
            })
        );
    }

    public register(
        name: string,
        password: string,
        email: string
    ): Observable<User> {
        if (!name || !password|| !email) {
            return EMPTY;
        }
        return this._backendApiService.Users.register(
            name,
            password,
            email
        ).pipe(
            catchError((resp) => {
                debugger;
                console.log(resp);

                return EMPTY;
            })
        );
    }
}

const userService = new UserService(backendService);
export default userService;
