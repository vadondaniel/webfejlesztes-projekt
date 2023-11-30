import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models';
import { map } from 'rxjs/operators';
import { Continent } from '../continent';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = 'http://localhost:8080/api/countries';

  constructor(private http: HttpClient) { }

  // Fetch all countries
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl).pipe(
      map(countries => countries.map(country => ({
        ...country,
        continent: Continent[country.continent.replace(" ", "") as keyof typeof Continent]
      })))
    );
  }

  // Fetch a country by ID
  getCountryById(id: number): Observable<Country> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Country>(url).pipe(
      map(country => ({
        ...country,
        continent: Continent[country.continent.replace(" ", "") as keyof typeof Continent]
      }))
    );
  }

  // Add a new country
  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.baseUrl, country);
  }
}
