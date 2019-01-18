import {
    Component,
    OnInit,
    Input,
    HostBinding
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer, PartialObserver } from 'rxjs';
import { filter, flatMap, map, toArray } from 'rxjs/operators';
import { DaySummary, DayData, SummaryMerger } from "@donmahallem/flowapi";
import { Router } from '@angular/router';
import { UploadFile } from '../services';

@Component({
    selector: 'file-preview-cmp',
    templateUrl: './file-preview.component.pug',
    styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent {
    public user: any;
    constructor(private uploadDataService: UploadDataService,
        private router: Router) { }

    private mUploadFile: UploadFile;

    @HostBinding('class.validFile')
    public get isValidFile(): boolean {
        if (this.mUploadFile)
            return this.mUploadFile.valid;
        return false;
    }

    public get filename(): string {
        if (this.mUploadFile)
            return this.mUploadFile.filename;
        return "Unknown";
    }
    public get filesize(): number {
        if (this.mUploadFile)
            return this.mUploadFile.data.length;
        return 0;
    }
    @Input("uploadFile")
    public set uploadFile(upload: UploadFile) {
        this.mUploadFile = upload;
    }
}
