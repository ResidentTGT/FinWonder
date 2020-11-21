import { ajax } from "rxjs/ajax";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import backendApiService from "./backend-api.service";
import { Balance } from "../../models/balance.model";

export class BalancesApi {
    constructor(private _apiUrl: string) {}

    public get(): Observable<Balance[]> {
        return ajax
            .get(
                `${this._apiUrl}/balances`,
                backendApiService.getDefaultHeaders()
            )
            .pipe(map((r) => r.response.map((b: any) => Balance.fromJSON(b))));
    }
}
