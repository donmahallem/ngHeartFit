/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    NgZone,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FlowApiValidator, IDayData, IDaySummary } from '@donmahallem/flow-api-types';
import { ValidatorResult } from 'jsonschema';
import { from, Observable, OperatorFunction } from 'rxjs';
import { debounceTime, filter, flatMap, map } from 'rxjs/operators';
import { FileLoadEvents, FileLoadEventType, FileUtil } from 'src/app/util';
import { IUploadFile, IUploadFileDaySummaryResult, TypedFiles, UploadFileResults, UploadFileStatus, UploadFileType } from '../services';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { UploadDataService } from '../services/upload-data.service';
import { FileUploadObserver } from './file-upload.observer';

@Component({
    selector: 'app-polar-upload',
    templateUrl: './upload.component.pug',
    styleUrls: ['./upload.component.scss'],
    providers: [
        UploadDataService,
    ],
})
export class UploadComponent implements OnInit {
    constructor(private uploadDataService: UploadDataService,
        private zone: NgZone,
        private analyzeDataService: AnalyzeDataService,
        private router: Router) { }
    public ngOnInit(): void {
    }

    public get uploadFiles(): IUploadFile[] {
        return this.uploadDataService.uploadedFiles;
    }

    public get hasSelectedFiles(): boolean {
        return this.uploadDataService.hasSelectedFiles;
    }

    public createConvertUploadFileAndCheckValidity(): OperatorFunction<FileLoadEvents<any>, FileLoadEvents<TypedFiles>> {
        return map((data: FileLoadEvents<any>): FileLoadEvents<TypedFiles> => {
            if (data.type === FileLoadEventType.RESULT) {
                const validatorResult: ValidatorResult = FlowApiValidator.validateTimelineSummary(data.result);
                if (validatorResult.valid) {
                    return {
                        filesize: data.filesize,
                        key: data.key,
                        result: {
                            data: data.result,
                            type: UploadFileType.DAY_SUMMARY,
                        },
                        type: FileLoadEventType.RESULT,
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
        const target: HTMLInputElement = e.target as HTMLInputElement;
        this.validateFiles(target);
    }

    public clickImport(event: MouseEvent): void {
        this.importFiles().subscribe((result) => {
        }, (err: Error) => {
            console.error(err);
        }, () => {
            this.router.navigate(['polar', 'view']);
        });

    }

    public importFiles(): Observable<number> {
        return this.analyzeDataService.clear()
            .pipe(flatMap((result) =>
                from(this.uploadFiles)), filter((upload: IUploadFile): boolean =>
                    upload.status === UploadFileStatus.LOADED), filter((upload: UploadFileResults): boolean =>
                        upload.type === UploadFileType.DAY_SUMMARY && upload.selected), map((upload: IUploadFileDaySummaryResult): IDaySummary =>
                            upload.data), flatMap((summary: IDaySummary): Observable<IDayData> => {
                                const summaries: IDayData[] = [];
                                for (const key of Object.keys(summary)) {
                                    summaries.push(summary[key]);
                                }
                                return from(summaries);
                            }), flatMap((data: IDayData) =>
                                this.analyzeDataService.insertActivityGraphData(data.activityGraphData)));
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
