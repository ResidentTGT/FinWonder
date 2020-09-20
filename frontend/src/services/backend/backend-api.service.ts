import { UsersApi } from './users-api';

export class BackendApiService {
    public Users: UsersApi;

    constructor(private _apiUrl: string) {
        debugger;
        this.Users = new UsersApi(this._apiUrl);
    }

}
