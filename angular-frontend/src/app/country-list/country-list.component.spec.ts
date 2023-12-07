import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountryListComponent } from './country-list.component';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { of } from 'rxjs';
import { Country } from '../models';
import { Sort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Continent } from '../continent';


describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countryService: CountryService;
  let reloadListService: ReloadListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryListComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],
      providers: [CountryService, ReloadListService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    countryService = TestBed.inject(CountryService);
    reloadListService = TestBed.inject(ReloadListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries on init', () => {
    const dummyCountries: Country[] = [
      { id: 1, name: 'Country1', continent: Continent.Africa, population: 1000000, cities: [] },
      { id: 2, name: 'Country2', continent: Continent.Africa, population: 2000000, cities: [] }
    ];
    spyOn(countryService, 'getCountries').and.returnValue(of(dummyCountries));
    component.ngOnInit();
    expect(countryService.getCountries).toHaveBeenCalled();
    expect(component.countries).toEqual(dummyCountries);
  });

  it('should sort countries', () => {
    const dummyCountries: Country[] = [
      { id: 2, name: 'Country2', continent: Continent.Africa, population: 2000000, cities: [] },
      { id: 1, name: 'Country1', continent: Continent.Africa, population: 1000000, cities: [] }
    ];
    const sort: Sort = { active: 'id', direction: 'asc' };
    component.countries = dummyCountries;
    component.sortData(sort);
    expect(component.sortedCountries).toEqual(dummyCountries.reverse());
  });
});