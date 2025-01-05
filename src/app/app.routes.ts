import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'home', title: 'App Home Page', component: AppComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];
