import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { Country } from '../models';
import { Continent } from '../continent';
import { Sort, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  sort: Sort = { active: 'id', direction: 'asc' };
  countries: Country[] | undefined;
  sortedCountries: Country[] = [];

  Continent = Continent;

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
      this.sortData(this.sort);
      console.log(data);
    });
  }

  sortData(sort: Sort) {
    this.sort.active = sort.active;
    this.sort.direction = sort.direction;

    if (!this.countries) {
      return;
    }

    const data = this.countries.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCountries = data;
      return;
    }

    this.sortedCountries = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'population': return compare(a.population, b.population, isAsc);
        case 'continent': return compare(a.continent, b.continent, isAsc);
        case 'cities': return compare(a.cities.length, b.cities.length, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  if (typeof a === 'number' && typeof b === 'number') {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b) * (isAsc ? 1 : -1);
  } else {
    return 0;
  }
}