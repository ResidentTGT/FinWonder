import localStorageService, {
    LocalStorageEntities,
} from "../local-storage.service";
import { UsersApi } from "./users-api";

export class BackendApiService {
    public Users: UsersApi;

    constructor(private _apiUrl: string) {
        this.Users = new UsersApi(this._apiUrl);
    }

    public getDefaultHeaders(): any {
        const headers = {
            "content-type": "application/json",
        };
        const token = localStorageService.getSettings(
            LocalStorageEntities.Token
        );
        if (token) {
            Object.assign(headers, {
                Authorization: `Bearer ${JSON.parse(token)}`,
            });
        }
        return headers;
    }
}
const backendApiService = new BackendApiService(
    process.env.REACT_APP_API_URL as string
);
export default backendApiService;
