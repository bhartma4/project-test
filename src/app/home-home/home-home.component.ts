import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home-home.component.html',
  styleUrls: ['./home-home.component.css']
})
export class HomeHomeComponent implements AfterViewInit {
  @ViewChild('worldMap', { static: true }) worldMap!: ElementRef<SVGElement>;
  hoveredCountryName: string | null = null;
  countryInfo: any = null;
  countryData: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.addEventListenersToPaths();
  }

  addEventListenersToPaths(): void {
    const svgElement = this.worldMap.nativeElement; // Ensures it's of type SVGElement
    const pathElements = svgElement.querySelectorAll('path'); // Query all <path> elements in the SVG

    pathElements.forEach((path) => {
      const pathId = path.getAttribute('id');

      if (!pathId || pathId === 'null') {
        return; // Skip paths without valid IDs
      }

      // Add event listeners for mouseover, mouseout, and click events
      path.addEventListener('mouseover', (event) => this.onMouseOver(event));
      path.addEventListener('mouseout', (event) => this.onMouseOut(event));
      path.addEventListener('click', (event) => this.onClick(event));
    });
  }

  onMouseOver(event: MouseEvent): void {
    const target = event.target as SVGPathElement;
    const pathId = target.getAttribute('id');
  
    if (!pathId) return;
  
    this.http.get<any[]>(`https://api.worldbank.org/V2/country/${pathId}?format=json`).subscribe(
      (response) => {
        if (response.length > 1) {
          this.hoveredCountryName = response[1][0].name;
          this.countryData = response[1]; // Store the array in countryData
        } else {
          this.hoveredCountryName = null;
          this.countryData = []; // Clear data if no valid response
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.countryData = []; // Clear data on error
      }
    );
  }

  onMouseOut(event: MouseEvent): void {
    this.hoveredCountryName = null; // Clear hovered country name on mouse out
  }

  onClick(event: MouseEvent): void {
    const target = event.target as SVGPathElement; // Cast event target as an SVGPathElement
    const pathId = target.getAttribute('id');

    if (!pathId || pathId === 'null') {
      console.log('Path ID is null, skipping API call.');
      return;
    }

    console.log(`${pathId} clicked`);

    this.http.get<any[]>(`https://api.worldbank.org/V2/country/${pathId}?format=json`).subscribe(
      (response) => {
        if (response.length > 1) {
          this.countryInfo = response[1][0];
        } else {
          this.countryInfo = null;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}