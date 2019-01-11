import {
    Component,
    OnInit
} from '@angular/core';
@Component({
    selector: 'upload-cmp',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    public user: any;
    constructor() { }
    public ngOnInit(): void {
    }

    public onUpload(e: Event): void {
        const target: HTMLInputElement = <HTMLInputElement>e.target;
        const file: File = target.files[0];
        if (!file) {
            return;
        }
        const reader: FileReader = new FileReader();
        reader.onload = function (loadEvent: any) {
            var contents = e.returnValue;
            console.log(loadEvent.target.result, e);
        };
        reader.readAsText(file);
    }
}
