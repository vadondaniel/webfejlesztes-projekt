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
        continent: Continent[country.continent.replace(" ", "") as keyof typeof Continent] as Continent
      })))
    );
  }

  // Fetch a country by ID
  getCountryById(id: number): Observable<Country> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Country>(url).pipe(
      map(country => ({
        ...country,
        continent: Continent[country.continent.replace(" ", "") as keyof typeof Continent] as Continent
      }))
    );
  }

  // Add a new country
  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.baseUrl, country);
  }

  // Update an existing country
  updateCountry(country: Country): Observable<Country> {
    const url = `${this.baseUrl}/${country.id}`;
    return this.http.put<Country>(url, country);
  }

  // Delete a country by ID
  deleteCountry(id: number): Observable<Country> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Country>(url);
  }
}
