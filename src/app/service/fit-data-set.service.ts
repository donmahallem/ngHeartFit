
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { FitApiBaseService } from './fit-api-base.service';
import { map, flatMap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class FitApiDataSetService {
    constructor(private fitApiBaseService: FitApiBaseService) {

    }
    public getDataSetData(dataSource: string, from: moment.Moment, to: moment.Moment): Observable<any> {
        const url = FitApiBaseService.ENDPOINT + '/users/me/dataSources/' + dataSource + '/datasets/' + from.valueOf() + '000000-' + to.valueOf() + '000000';
        return this.fitApiBaseService.getRequest(url);
    }
}
