import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeInfoComponent } from "./home-info/home-info.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-test';
}
