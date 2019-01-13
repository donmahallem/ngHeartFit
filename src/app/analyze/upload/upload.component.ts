import {
    Component,
    OnInit
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
@Component({
    selector: 'upload-cmp',
    templateUrl: './upload.component.pug',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    public user: any;
    constructor(private uploadDataService: UploadDataService) { }
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

    public onClickMe(event: MouseEvent): void {
        console.log("yes");
        this.uploadDataService.setData("asdf", "asdfasdfas");
    }
}
