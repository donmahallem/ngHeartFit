import {
    Component,
    OnInit
} from '@angular/core';
@Component({
    selector: 'profile-page',
    templateUrl: './profile.component.pug',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
        };
        reader.readAsText(file);
    }

    public onClickMe(event: MouseEvent): void {
    }
}
