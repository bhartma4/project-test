import { Routes } from '@angular/router';
import { HomeHomeComponent } from './home-home/home-home.component';

export const routes: Routes = [
    { path: 'home', title: 'App Home Page', component: HomeHomeComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];
