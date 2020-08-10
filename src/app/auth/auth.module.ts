import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        AuthComponent,
        ReactiveFormsModule
    ]
})
export class AuthModule {}
