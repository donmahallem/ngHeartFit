import {
    Component,
    OnInit,
    NgZone
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer, of, OperatorFunction, Subscriber } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { UploadFile, UploadFileType, TypedFiles } from '../services';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { Router } from '@angular/router';
import { FlowApiValidator, IDaySummary, IDayData } from '@donmahallem/flow-api-types';
import { ValidatorResult } from 'jsonschema';
import { FileUtil, FileLoadEvent, FileLoadEvents, FileLoadEventType } from 'src/app/util';


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

    public createConvertUploadFileAndCheckValidity(): OperatorFunction<FileLoadEvents<any>, FileLoadEvents<TypedFiles>> {
        return map((data: FileLoadEvents<any>): FileLoadEvents<TypedFiles> => {
            if (data.type === FileLoadEventType.RESULT) {
                const validatorResult: ValidatorResult = FlowApiValidator.validateTimelineSummary(data.result);
                if (validatorResult.valid) {
                    return {
                        type: FileLoadEventType.RESULT,
                        key: data.key,
                        result: {
                            type: UploadFileType.DAY_SUMMARY,
                            data: data.result
                        }
                    };
                } else {
                    throw validatorResult.errors[0];
                }
            } else {
                return data;
            }
        });
    }

    public onUpload(e: Event): void {
        const target: HTMLInputElement = <HTMLInputElement>e.target;
        this.validateFiles(target).subscribe((res: FileLoadEvents<any>) => {
            this.uploadDataService.updateFile(res);
        }, (err: any) => {
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

    public validateFiles(e: HTMLInputElement): Observable<FileLoadEvents<TypedFiles>> {
        this.uploadDataService.clear();
        return from(e.files)
            .pipe(filter((file: File) => {
                if (file) {
                    return true;
                } else {
                    return false;
                }
            }), flatMap((file: File): Observable<FileLoadEvents<string>> => {
                return FileUtil.readFileAsJson(file, file.name);
            }), this.createConvertUploadFileAndCheckValidity());
    }

}
