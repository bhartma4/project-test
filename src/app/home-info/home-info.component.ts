import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfigService } from '../services/config-services';

@Component({
  selector: 'app-home-info',
  imports: [CommonModule],
  templateUrl: './home-info.component.html',
  styleUrl: './home-info.component.css'
})
export class HomeInfoComponent {
  private configService = inject(ConfigService);

  posts$ = this.configService.getPosts();
}
