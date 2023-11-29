import { Component } from '@angular/core';
import { City } from '../models'; // Import City class

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent {
  city: City; // Declare city property

  constructor() {
    // Initialize city here or fetch it from a service
    this.city = new City();
  }
}