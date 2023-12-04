import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.baseUrl = `${this.configService.basePath}/cities`;
   }

  // Fetch all cities
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl);
  }

  // Fetch a city by ID
  getCityById(id: number): Observable<City> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<City>(url);
  }

  // Add a new city
  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.baseUrl, city);
  }

  // Update an existing city
  updateCity(city: City): Observable<City> {
    const url = `${this.baseUrl}/${city.id}`;
    return this.http.put<City>(url, city);
  }

  // Delete a city by ID
  deleteCity(id: number): Observable<City> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<City>(url);
  }
}
