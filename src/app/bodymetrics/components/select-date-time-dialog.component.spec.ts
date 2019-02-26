import { async, TestBed, ComponentFixture, } from '@angular/core/testing';
import { SelectDateTimeDialogComponent } from './select-date-time-dialog.component';
import * as sinon from 'sinon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MAT_DATE_LOCALE,
    DateAdapter,
    MAT_DATE_FORMATS,
    MatDialogModule,
    MatDialogRef
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Injectable } from '@angular/core';


@Injectable()
class MatDialogRefStub {
    close(value: any) {

    }
}

let sandbox;
describe('bodymetrics/components/SelectDateTimeDialogComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatIconModule,
                MatDatepickerModule,
                NoopAnimationsModule,
                MatDialogModule
            ],
            declarations: [
                SelectDateTimeDialogComponent
            ],
            providers: [
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
                { provide: MatDialogRef, useValue: new MatDialogRefStub() }
            ]
        }).compileComponents();
    }));

    it('should create the component', () => {
        const fixture = TestBed.createComponent(SelectDateTimeDialogComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeEach(() => {
        // testUploadDataService.
    });
    beforeAll(() => { sandbox = sinon.sandbox.create(); });
    afterEach(() => { sandbox.restore(); });

    describe('onClose()', () => {
        let dialogRefCloseStub: sinon.SinonStub;
        let fixture: ComponentFixture<SelectDateTimeDialogComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(SelectDateTimeDialogComponent);
            const service: MatDialogRef<SelectDateTimeDialogComponent, any> = <any>fixture.debugElement.injector.get(MatDialogRef);
            dialogRefCloseStub = sinon.stub(service, 'close');
        });
        it('should be call on close on the DialogRef', () => {
            fixture.componentInstance.onClose(null);
            expect(dialogRefCloseStub.callCount).toEqual(1);
            expect(dialogRefCloseStub.getCall(0).args.length).toEqual(0);
        });
    });
});
