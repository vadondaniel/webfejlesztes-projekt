import { Component } from '@angular/core';
import { Country } from '../models'; // Adjusted path

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent {
  countries: Country[];

  constructor() {
    // Initialize countries here or fetch them from a service
    this.countries = [];
  }
}