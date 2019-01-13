import {
    Component,
    OnInit
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { DaySummary, DayData } from "@donmahallem/flowapi";
import { Router } from '@angular/router';
@Component({
    selector: 'upload-cmp',
    templateUrl: './upload.component.pug',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    public user: any;
    constructor(private uploadDataService: UploadDataService,
        private router: Router) { }
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
        this.upd(target).subscribe((data) => {

            this.router.navigate(["analyze", "upload", this.uploadDataService.insert(data)]);
        }, console.error);
    }

    public ads(file: File): Observable<string> {
        return Observable.create((pub: Observer<string>) => {
            const reader: FileReader = new FileReader();
            reader.onload = function (loadEvent: any) {
                pub.next(loadEvent.target.result);
                pub.complete();
            };
            reader.onerror = (er: ProgressEvent) => {
                pub.error(new Error("loading error"));
            };
            reader.readAsText(file);
        });
    }

    public upd(e: HTMLInputElement): Observable<DaySummary> {
        return from(e.files)
            .pipe(filter((file: File) => {
                if (file)
                    return true;
                else
                    return false;
            }), flatMap((file: File) => {
                return this.ads(file);
            }), map((data: string): DaySummary => {
                return JSON.parse(data);
            }));
    }

    public onClickMe(event: MouseEvent): void {
        console.log("yes");
    }
}
