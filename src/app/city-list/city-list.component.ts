import { Component } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  cities: City[] | undefined;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }
}