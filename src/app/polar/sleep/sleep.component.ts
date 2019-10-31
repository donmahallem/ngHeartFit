/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-sleep',
    styleUrls: ['./sleep.component.scss'],
    templateUrl: './sleep.component.pug',
})
export class SleepComponent implements OnInit, OnDestroy {
    constructor() {
    }
    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

    public onFileUpload(files: FileList): void {
    }
}
