import {
    Component,
    OnInit,
    NgZone
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer, of, OperatorFunction, Subscriber } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { UploadFile, UploadFileType } from '../services';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { Router } from '@angular/router';
import { FlowApiValidator, IDaySummary, IDayData } from '@donmahallem/flow-api-types';
import { ValidatorResult } from 'jsonschema';


@Component({
    selector: 'app-polar-upload',
    templateUrl: './upload.component.pug',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    constructor(private uploadDataService: UploadDataService,
        private zone: NgZone,
        private analyzeDataService: AnalyzeDataService,
        private router: Router) { }
    public ngOnInit(): void {
    }

    public get uploadFiles(): UploadFile[] {
        return this.uploadDataService.uploadedFiles;
    }

    public get validFiles(): boolean {
        if (this.uploadFiles.length > 0) {
            for (const upFile of this.uploadFiles) {
                if (upFile.valid && (upFile.selected === true || upFile.selected === undefined)) {
                    return true;
                }
            }
        }
        return false;
    }

    public createConvertUploadFileAndCheckValidity(): OperatorFunction<UploadFile, UploadFile> {
        return map((data: UploadFile): UploadFile => {
            try {
                const parsedData: any = JSON.parse(data.data);
                const validatorResult: ValidatorResult = FlowApiValidator.validateTimelineSummary(parsedData);
                data.valid = validatorResult.valid;
                if (!validatorResult.valid) {
                    data.errors = validatorResult.errors;
                } else {
                    data.type = UploadFileType.DAY_SUMMARY;
                }
            } catch (err) {
                data.valid = false;
                data.errors = [
                    err
                ];
            }
            return data;
        });
    }

    public onUpload(e: Event): void {
        const target: HTMLInputElement = <HTMLInputElement>e.target;
        this.validateFiles(target).subscribe((res: UploadFile) => {
            this.zone.run(() => {
                this.uploadDataService.addUploadFile(res);
            });
        }, (err: any) => {
        });
    }

    public readFile(file: File): Observable<UploadFile> {
        return new Observable((subscriber: Subscriber<UploadFile>) => {
            const reader: FileReader = new FileReader();
            reader.onload = function (loadEvent: any) {
                subscriber.next({
                    data: loadEvent.target.result,
                    filename: file.name,
                    valid: false,
                    type: UploadFileType.UNKNOWN
                });
                subscriber.complete();
            };
            reader.onerror = (er: ProgressEvent) => {
                subscriber.error(new Error('loading error'));
            };
            reader.readAsText(file);
        });
    }

    public clickImport(event: MouseEvent): void {
        this.importFiles().subscribe((result) => {
            console.log('res', result);
        }, (err: Error) => {
        }, () => {
            console.log('Complete');
            this.router.navigate(['analyze', 'view']);
        });

    }

    public importFiles(): Observable<number> {
        return this.analyzeDataService.clear()
            .pipe(flatMap((result) => {
                return from(this.uploadFiles);
            }), filter((upload: UploadFile) => {
                return upload.valid && (upload.selected || upload.selected === undefined);
            }), map((upload: UploadFile): IDaySummary => {
                return JSON.parse(upload.data);
            }), flatMap((summary: IDaySummary) => {
                const summaries: IDayData[] = [];
                for (const key of Object.keys(summary)) {
                    summaries.push(summary[key]);
                }
                return from(summaries);
            }), flatMap((data: IDayData) => {
                return this.analyzeDataService.insert(data.activityGraphData);
            }));
    }

    public validateFiles(e: HTMLInputElement): Observable<UploadFile> {
        this.uploadDataService.clear();
        return from(e.files)
            .pipe(filter((file: File) => {
                if (file) {
                    return true;
                } else {
                    return false;
                }
            }), flatMap((file: File) => {
                return this.readFile(file);
            }), this.createConvertUploadFileAndCheckValidity());
    }

}
