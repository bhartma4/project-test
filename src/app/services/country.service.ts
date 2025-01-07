import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://api.worldbank.org/v2/country/';

  constructor(private http: HttpClient) {}

  getCountryData(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryCode}?format=json`);
  }
}

export interface Country {
  id: string;
  iso2Code: string;
  name: string;
  region: { id: string; value: string };
  adminregion: { id: string; value: string };
  incomeLevel: { id: string; value: string };
  lendingType: { id: string; value: string };
  capitalCity: string;
  longitude: string;
  latitude: string;
}
