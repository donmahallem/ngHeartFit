import {
    Component, OnInit, NgZone
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'select-date-time-dialog-cmp',
    templateUrl: './select-date-time-dialog.component.pug',
    styleUrls: ['./select-date-time-dialog.component.scss']
})
export class SelectDateTimeDialogComponent implements OnInit {

    public dateTimeForm: FormGroup;
    constructor(public dialogRef: MatDialogRef<SelectDateTimeDialogComponent>,
        private fb: FormBuilder,
        private zone: NgZone) {
    }
    public ngOnInit(): void {
        const timestamp: moment.Moment = moment().local();
        this.dateTimeForm = this.fb
            .group({
                date: [timestamp],
                time: [timestamp.format('HH:mm')]
            });
    }

    public onClose(event: MouseEvent): void {
        this.dialogRef.close();
    }
    public onSubmit(): void {
        if (this.dateTimeForm.valid) {
            const date: moment.Moment = this.dateTimeForm.get('date').value;
            const time: string = this.dateTimeForm.get('time').value;
            const timeSplit: string[] = time.split(':');
            date.hours(parseInt(timeSplit[0]));
            date.minutes(parseInt(timeSplit[1]));
            this.zone.run(() => {
                this.dialogRef.close(date);
            });
        }
    }
}
