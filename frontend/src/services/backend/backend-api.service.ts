import { UsersApi } from "./users-api";

export class BackendApiService {
    public Users: UsersApi;

    constructor(private _apiUrl: string) {
        this.Users = new UsersApi(this._apiUrl);
    }
}
const service = new BackendApiService(process.env.REACT_APP_API_URL as string);
export default service;
