import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models'; // Adjusted path

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  cities: City[] | undefined;

  constructor(private http: HttpClient) {
    this.fetchCities();
  }

  fetchCities(): void {
    this.http.get<City[]>('http://localhost:8080/api/cities').subscribe(data => {
      this.cities = data;
    });
  }
}