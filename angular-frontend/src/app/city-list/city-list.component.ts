import { Component } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {
  sort: Sort = { active: 'id', direction: 'asc' };
  cities: City[] | undefined;
  sortedCities: City[] = [];

  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
      this.sortData(this.sort);
    });
  }

  sortData(sort: Sort) {
    if (!this.cities) {
      return;
    }

    const data = this.cities.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCities = data;
      return;
    }

    this.sortedCities = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'population': return compare(a.population, b.population, isAsc);
        case 'countryId': return compare(a.countryId, b.countryId, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}