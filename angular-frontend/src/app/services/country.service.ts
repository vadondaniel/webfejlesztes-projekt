import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models';
import { map } from 'rxjs/operators';
import { Continent } from '../continent';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = `${this.configService.basePath}/countries`;
   }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl).pipe(
      map(countries => countries.map(country => ({
        ...country,
        continent: Continent[country.continent.replace(" ", "") as keyof typeof Continent] as Continent
      })))
    );
  }

  getCountryById(id: number): Observable<Country> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Country>(url).pipe(
      map(country => ({
        ...country,
        continent: Continent[country.continent.replace(" ", "") as keyof typeof Continent] as Continent
      }))
    );
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.baseUrl, country);
  }

  updateCountry(country: Country): Observable<Country> {
    const url = `${this.baseUrl}/${country.id}`;
    return this.http.put<Country>(url, country);
  }

  deleteCountry(id: number): Observable<Country> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Country>(url);
  }
}
