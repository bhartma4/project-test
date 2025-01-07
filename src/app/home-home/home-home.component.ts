import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../services/country.service'; // Adjust the path as needed

@Component({
  selector: 'app-home-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-home.component.html',
  styleUrls: ['./home-home.component.css']
})
export class HomeHomeComponent implements AfterViewInit {
  @ViewChild('worldMap', { static: true }) worldMap!: ElementRef<SVGElement>;
  hoveredCountryName: string | null = null;
  countryInfo: any = null;
  countryData: any[] = [];

  constructor(private countryService: CountryService) {}

  ngAfterViewInit(): void {
    this.addEventListenersToPaths();
  }

  addEventListenersToPaths(): void {
    const svgElement = this.worldMap.nativeElement;
    const pathElements = svgElement.querySelectorAll('path');

    pathElements.forEach((path) => {
      const pathId = path.getAttribute('id');

      if (!pathId || pathId === 'null') {
        return;
      }

      // Add event listeners for mouseover, mouseout, and click events
      path.addEventListener('mouseover', (event) => this.onMouseOver(event));
      path.addEventListener('mouseout', (event) => this.onMouseOut());
      path.addEventListener('click', (event) => this.onClick(event));
    });
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    const pathId = target.getAttribute('id');

    if (!pathId) return;

    this.countryService.getCountryData(pathId).subscribe(
      (response) => {
        if (response.length > 1) {
          this.hoveredCountryName = response[1][0].name;
          this.countryData = response[1];
        } else {
          this.hoveredCountryName = null;
          this.countryData = [];
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.hoveredCountryName = null;
        this.countryData = [];
      }
    );
  }

  onMouseOut(): void {
    this.hoveredCountryName = null;
  }

  onClick(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    const pathId = target.getAttribute('id');

    if (!pathId || pathId === 'null') {
      console.log('Path ID is null, skipping API call.');
      return;
    }

    console.log(`${pathId} clicked`);

    this.countryService.getCountryData(pathId).subscribe(
      (response) => {
        if (response.length > 1) {
          this.countryInfo = response[1][0];
        } else {
          this.countryInfo = null;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.countryInfo = null;
      }
    );
  }
}