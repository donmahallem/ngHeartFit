import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NotFoundComponent
    ],
    exports: [
        CommonModule,
        NotFoundComponent
    ]
})
export class NotFoundModule { }