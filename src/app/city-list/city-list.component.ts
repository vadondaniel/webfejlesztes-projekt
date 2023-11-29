import { Component } from '@angular/core';
import { City } from '../models'; // Adjusted path

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  cities: City[];

  constructor() {
    // Initialize countries here or fetch them from a service
    this.cities = [];
  }
}