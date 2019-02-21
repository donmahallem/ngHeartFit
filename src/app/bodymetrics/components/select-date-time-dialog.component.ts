import {
    Component
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as moment from 'moment';

@Component({
    selector: 'select-date-time-dialog-cmp',
    templateUrl: './select-date-time-dialog.component.pug',
    styleUrls: ['./select-date-time-dialog.component.scss']
})
export class SelectDateTimeDialogComponent {

    private timestamp: moment.Moment = moment();

    constructor(public dialogRef: MatDialogRef<SelectDateTimeDialogComponent>) {
    }

}
