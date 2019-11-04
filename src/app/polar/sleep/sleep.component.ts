/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ISleepReport } from '@donmahallem/flow-api-types';
import { filter } from 'rxjs/operators';
import { FileLoadEventType, FileUtil, IFileLoadResultEvent } from 'src/app/util';
import { SleepService } from './sleep.service';

@Component({
    providers: [
        SleepService,
    ],
    selector: 'app-sleep',
    styleUrls: ['./sleep.component.scss'],
    templateUrl: './sleep.component.pug',
})
export class SleepComponent implements OnInit, OnDestroy {
    public sleeps: ISleepReport[];
    constructor() {
    }
    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

    public onFileUpload(files: FileList): void {
        FileUtil.readFileAsJson(files.item(0), 'any')
            .pipe(filter((val) =>
                val.type === FileLoadEventType.RESULT))
            .subscribe((data: IFileLoadResultEvent<any>) => {
                this.sleeps = data.result;
            });
    }
}
