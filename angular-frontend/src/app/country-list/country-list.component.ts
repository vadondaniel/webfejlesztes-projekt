import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { Country } from '../models';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[] | undefined;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }
}
