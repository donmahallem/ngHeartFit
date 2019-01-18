import {
    Component,
    OnInit,
    NgZone
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer, PartialObserver } from 'rxjs';
import { filter, flatMap, map, toArray } from 'rxjs/operators';
import { DaySummary, DayData, SummaryMerger, FlowApiValidator } from "@donmahallem/flowapi";
import { Router } from '@angular/router';
import { UploadFile } from '../services';

class TestResult implements Observer<UploadFile>{
    private ids: string[] = [];
    constructor(private router: Router, private uploadDataService: UploadDataService) { }
    public next(value: UploadFile): void {
        this.ids.push(value.key);
    }
    public error(err: Error): void {
        console.error(err);
    }
    public complete(): void {
        this.router.navigate(["analyze", "upload", this.ids.join(",")]);
    }
}

@Component({
    selector: 'upload-cmp',
    templateUrl: './upload.component.pug',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    public uploadFiles: UploadFile[] = [];
    constructor(private uploadDataService: UploadDataService,
        private router: Router, private zone: NgZone) { }
    public ngOnInit(): void {
    }

    public onUpload(e: Event): void {
        const target: HTMLInputElement = <HTMLInputElement>e.target;
        const file: File = target.files[0];
        /*if (!file) {
            return;
        }
        const reader: FileReader = new FileReader();
        reader.onload = function (loadEvent: any) {
            var contents = e.returnValue;
            console.log(loadEvent.target.result, e);
        };
        reader.readAsText(file);*/
        //this.upd(target).subscribe(new TestResult(this.router, this.uploadDataService));
        this.upd(target).subscribe((res: UploadFile) => {
            this.zone.run(() => {
                this.uploadFiles.push(res);
            });
        }, (err: any) => {
            console.error(err);
        });
    }

    public ads(file: File): Observable<UploadFile> {
        return Observable.create((pub: Observer<UploadFile>) => {
            const reader: FileReader = new FileReader();
            reader.onload = function (loadEvent: any) {
                pub.next({
                    data: loadEvent.target.result,
                    filename: file.name,
                    valid: false,
                    key: null
                });
                pub.complete();
            };
            reader.onerror = (er: ProgressEvent) => {
                pub.error(new Error("loading error"));
            };
            reader.readAsText(file);
        });
    }

    public upd(e: HTMLInputElement): Observable<UploadFile> {
        return from(e.files)
            .pipe(filter((file: File) => {
                if (file)
                    return true;
                else
                    return false;
            }), flatMap((file: File) => {
                return this.ads(file);
            }), map((data: UploadFile): UploadFile => {
                try {
                    const parsedData: any = JSON.parse(data.data);
                    data.valid = FlowApiValidator.validateTimelineSummary(parsedData).valid;
                } catch (err) {
                    data.valid = false;
                }
                return data;
            }), map((data: UploadFile): UploadFile => {
                data.key = this.uploadDataService.insert(data);
                return data;
            }));
    }

    public onClickMe(event: MouseEvent): void {
        console.log("yes");
    }
}
