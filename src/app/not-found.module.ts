/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    declarations: [
        NotFoundComponent,
    ],
    exports: [
        CommonModule,
        NotFoundComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class NotFoundModule { }
