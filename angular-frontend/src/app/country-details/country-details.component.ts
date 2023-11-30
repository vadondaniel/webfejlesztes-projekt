import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { City, Country } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country!: Country;
  sort: Sort = { active: 'id', direction: 'asc' };
  sortedCities: City[] = [];

  constructor(private countryService: CountryService, private route: ActivatedRoute, private reloadListService: ReloadListService) {
    this.reloadListService.triggerLoadCountryDetails$.subscribe(() => {
      this.loadCountryDetails(this.country.id);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const countryId = +params['id'];
      this.loadCountryDetails(countryId);
    });
  }

  loadCountryDetails(countryId: number) {
    this.countryService.getCountryById(countryId).subscribe(data => {
      this.country = data;
      this.sortData(this.sort);
    });
  }

  sortData(sort: Sort) {
    if (!this.country.cities) {
      return;
    }

    const data = this.country.cities.slice();
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
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}