import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { Country } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Continent } from '../continent';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country!: Country;

  Continent: any = Continent;

  constructor(private countryService: CountryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const countryId = +params['id'];
      this.loadCountryDetails(countryId);
    });
  }

  loadCountryDetails(countryId: number) {
    this.countryService.getCountryById(countryId).subscribe(data => {
      this.country = data;
    });
  }
}
