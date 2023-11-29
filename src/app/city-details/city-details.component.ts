import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit{
  city!: City;

  constructor(private cityService: CityService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cityId = +params['id'];
      this.loadCityDetails(cityId);
    });
  }

  loadCityDetails(cityId: number) {
    this.cityService.getCityById(cityId).subscribe(data => {
      this.city = data;
      console.log(data);
    });
  }
}