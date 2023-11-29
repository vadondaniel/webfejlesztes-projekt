import { Component } from '@angular/core';
import { Country } from '../models'; // Import Country class

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent {
  country: Country; // Declare country property

  constructor() {
    // Initialize country here or fetch it from a service
    this.country = new Country();
  }
}