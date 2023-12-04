import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { City, Country } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {
  city!: City;
  country!: Country;
  loaded = false;

  constructor(
    private cityService: CityService,
    private countryService: CountryService,
    private reloadService: ReloadListService,
    private route: ActivatedRoute) {
    this.reloadService.triggerLoadCityDetails$.subscribe(() => {
      this.loadCityDetails(this.city.id);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cityId = +params['id'];
      this.loadCityDetails(cityId);
    });
  }

  loadCityDetails(cityId: number) {
    this.cityService.getCityById(cityId).subscribe({
      next: (data) => {
        this.city = data;
        this.loadCountryDetails(this.city.countryId);
        this.loaded = true;
      },
      error: () => {
        this.loaded = true;
      }
    });
  }

  loadCountryDetails(countryId: number) {
    if (this.countryService.getCountryById(countryId)) {
      this.countryService.getCountryById(countryId).subscribe(data => {
        this.country = data;
      });
    }
  }
}