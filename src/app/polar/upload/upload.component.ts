import {
    Component,
    OnInit,
    NgZone
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer, of, OperatorFunction, Subscriber } from 'rxjs';
import { filter, flatMap, map, catchError, startWith, debounce, debounceTime } from 'rxjs/operators';
import { UploadFile, UploadFileType, TypedFiles, UploadFileStatus, UploadFileError, UploadFiles, UploadFileResult } from '../services';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { Router } from '@angular/router';
import { FlowApiValidator, IDaySummary, IDayData } from '@donmahallem/flow-api-types';
import { ValidatorResult } from 'jsonschema';
import { FileUtil, FileLoadEvent, FileLoadEvents, FileLoadEventType } from 'src/app/util';
import { FileUploadObserver } from './file-upload.observer';


@Component({
    selector: 'app-polar-upload',
    templateUrl: './upload.component.pug',
    styleUrls: ['./upload.component.scss'],
    providers: [
        UploadDataService
    ]
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
                        },
                        filesize: data.filesize
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
        this.validateFiles(target);
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
        return null;
        /*
        return this.analyzeDataService.clear()
            .pipe(flatMap((result) => {
                return from(this.uploadFiles);
            }), filter((upload: UploadFile) => {
                return upload.valid && (upload.selected || upload.selected === undefined);
            }), map((upload: UploadFile): TypedFiles => {
                return upload.data;
            }), flatMap((summary: TypedFiles) => {
                const summaries: IDayData[] = [];
                for (const key of Object.keys(summary)) {
                    summaries.push(summary[key]);
                }
                return from(summaries);
            }), flatMap((data: IDayData) => {
                return this.analyzeDataService.insert(data.activityGraphData);
            }));*/
    }

    public validateFiles(e: HTMLInputElement): void {
        this.uploadDataService.clear();
        for (let i = 0; i < e.files.length; i++) {
            const file: File = e.files[i];
            if (file) {
                this.validateFile(file)
                    .subscribe(new FileUploadObserver(this.uploadDataService, file));
            }
        }
    }
    public validateFile(file: File): Observable<FileLoadEvents<TypedFiles>> {
        return FileUtil.readFileAsJson(file, file.name)
            .pipe(debounceTime(10),
                this.createConvertUploadFileAndCheckValidity());
    }

}
