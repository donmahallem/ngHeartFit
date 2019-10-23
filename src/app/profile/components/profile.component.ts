/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    OnInit,
} from '@angular/core';
@Component({
    selector: 'profile-page',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.pug',
})
export class ProfileComponent implements OnInit {
    public user: any;
    constructor() { }
    public ngOnInit(): void {
    }

    public onUpload(e: Event): void {
        const target: HTMLInputElement = e.target as HTMLInputElement;
        const file: File = target.files[0];
        if (!file) {
            return;
        }
        const reader: FileReader = new FileReader();
        reader.onload = (loadEvent: any) => {

        };
        reader.readAsText(file);
    }

    public onClickMe(event: MouseEvent): void {
    }
}
