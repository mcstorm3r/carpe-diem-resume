import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resumes/resume/resume.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'resumes', component: ResumeComponent},
    {path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}