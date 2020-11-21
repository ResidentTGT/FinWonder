import { EMPTY, Observable } from 'rxjs';
import backendService, {
    BackendApiService,
} from './backend/backend-api.service';
import { catchError } from 'rxjs/operators';
import { Balance } from '../models/balance.model';

export class BalancesService {
    constructor(private _backendApiService: BackendApiService) {}

    public get(): Observable<Balance[]> {
        return this._backendApiService.Balances.get().pipe(
            catchError((resp) => {
                console.log(resp);

                return EMPTY;
            })
        );
    }
}

const balancesService = new BalancesService(backendService);
export default balancesService;
