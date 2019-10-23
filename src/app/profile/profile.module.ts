import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

import { ProfileComponent } from './components';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatButtonModule,
    ],
    providers: [],
})
export class ProfileModule { }
