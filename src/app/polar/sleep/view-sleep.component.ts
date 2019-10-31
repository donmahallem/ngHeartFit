/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISleepReport } from '@donmahallem/flow-api-types';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-view-sleep',
    styleUrls: ['./sleep.component.scss'],
    templateUrl: './sleep.component.pug',
})
export class ViewSleepComponent implements OnInit, OnDestroy {
    public sleeps: ISleepReport[];
    private sub: Subscription;
    constructor(
        private snape: ActivatedRoute) {
    }
    public ngOnInit(): void {

        this.sub = this.snape.data.pipe(map((data) =>
            data.sleepReports))
            .subscribe((val) => {
                // tslint:disable-next-line:no-console
                console.log(val);
            });
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
