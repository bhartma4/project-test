import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeInfoComponent } from "./home-info/home-info.component";
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeInfoComponent, CommonModule, ReactiveFormsModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  title = 'project-test';
}