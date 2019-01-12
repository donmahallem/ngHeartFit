import { Component, OnInit, NgZone } from '@angular/core';
import { GapiService } from './service/gapi.service';
/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus(isSignedIn) {
    console.log("sigin", isSignedIn);
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _title: string = "app title";

    public get title(): string {
        return this._title;
    }
    constructor(private gapiService: GapiService) { }
    public ngOnInit(): void {
        this.gapiService.getSigninStatus()
            .subscribe((res) => {
                console.log(res);
            }, (err) => console.error);
    }
    public test() {
        this.gapiService.signIn().subscribe((val) => {
            console.log("yes", val);
        }, (err) => {
            console.log(err);
        })
    }
    public test2() {
        this.gapiService.getDataSources().subscribe(console.log, console.error);
    }
    public createDatasource() {
        this.gapiService.createNutritionDatasource().subscribe(console.log, console.error);
    }
    public insertData() {
        this.gapiService.storeNutrition().subscribe(console.log, console.error);
    }
    public getData() {
        this.gapiService.getAggregateWeights().subscribe((data) => {
            console.log("Data retrieved");
            for (let bucket of data.bucket) {
                for (let dat of bucket.dataset) {
                    if (dat.point) {
                        if (dat.point.length > 0) {
                            console.log(dat);
                        }
                    }
                }
            }
        }, console.error);
    }
}
