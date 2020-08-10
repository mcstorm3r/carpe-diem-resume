import { DragDropItemTemplateComponent } from './resumes/resume-builder/drag-drop-template/drag-drop-item-template/drag-drop-item-template.component';
import { DragDropTemplateComponent } from './resumes/resume-builder/drag-drop-template/drag-drop-template.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ResumeComponent } from './resumes/resume.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { ResumeViewerComponent } from './resumes/resume-viewer/resume-viewer.component';
import { ResumeBuilderComponent } from './resumes/resume-builder/resume-builder.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import * as fromApp from './store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    ResumeBuilderComponent,
    ResumeViewerComponent,
    DragDropTemplateComponent,
    DragDropItemTemplateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
