import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { CityDetailsComponent } from './city-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Continent } from '../continent';

describe('CityDetailsComponent', () => {
  let component: CityDetailsComponent;
  let fixture: ComponentFixture<CityDetailsComponent>;
  let cityService: jasmine.SpyObj<CityService>;
  let countryService: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    const cityServiceSpy = jasmine.createSpyObj('CityService', ['getCityById']);
    const countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountryById']);

    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule, MatCardModule],
      declarations: [CityDetailsComponent],
      providers: [
        { provide: CityService, useValue: cityServiceSpy },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ReloadListService, useValue: { triggerLoadCityDetails$: of({}) } },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    }).compileComponents();

    cityService = TestBed.inject(CityService) as jasmine.SpyObj<CityService>;
    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load city details', async () => {
    const city = { id: 1, name: 'Test City', population: 1000000, countryId: 1 };
    cityService.getCityById.and.returnValue(of(city));
    await component.loadCityDetails(1);
    expect(cityService.getCityById).toHaveBeenCalledWith(1);
    expect(component.city).toEqual(city);
    fixture.detectChanges();
    expect(component.loaded).toBeTrue();
  });

  it('should load country details', async () => {
    const country = { id: 1, name: 'Test Country', population: 1000000, continent: Continent.Africa, cities: [] };
    countryService.getCountryById.and.returnValue(of(country));
    await component.loadCountryDetails(1);
    expect(countryService.getCountryById).toHaveBeenCalledWith(1);
    expect(component.country).toEqual(country);
  });
});