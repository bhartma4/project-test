import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // For form handling
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-home-info',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-info.component.html',
  styleUrl: './home-info.component.css'
})
export class HomeInfoComponent {
  title = 'project-test';
  countryForm: FormGroup;
  countryData: any = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    // Initialize the reactive form
    this.countryForm = this.fb.group({
      countryCode: [''], // Form control for the country code input
    });
  }

  onSubmit(): void {
    const countryCode = this.countryForm.get('countryCode')?.value?.toUpperCase();
  
    if (!/^[A-Z]{2}$/.test(countryCode)) {
      this.errorMessage = 'Invalid country code format. Please enter exactly two letters.';
      this.countryData = null;
      return;
    }
  
    this.countryService.getCountryData(countryCode).subscribe({
      next: (data) => {
        console.log('API Response:', data);
  
        // Extract the relevant country data
        if (data.length > 1 && Array.isArray(data[1])) {
          this.countryData = data[1][0]; // Extract the first country object
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Country data not found.';
          this.countryData = null;
        }
      },
      error: (error: any) => {
        console.error('HTTP Error:', error);
        this.errorMessage = 'An unexpected error occurred while fetching data.';
        this.countryData = null;
      },
    });
  }
}
