import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components';

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatButtonModule
    ],
    providers: []
})
export class ProfileModule { }
