import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})

export class ConfigService {
    private apiUrl = 'https://api.worldbank.org/v2/country/us?format=json'
    constructor(private http: HttpClient) {}

    getPosts() {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(response => response[1] || [])
        );
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