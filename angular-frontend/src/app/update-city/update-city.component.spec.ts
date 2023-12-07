import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { UpdateCityComponent } from './update-city.component';
import { Continent } from '../continent';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateCityComponent', () => {
  let component: UpdateCityComponent;
  let fixture: ComponentFixture<UpdateCityComponent>;
  let cityService: jasmine.SpyObj<CityService>;
  let countryService: jasmine.SpyObj<CountryService>;
  let reloadListService: jasmine.SpyObj<ReloadListService>;

  beforeEach(async () => {
    const cityServiceSpy = jasmine.createSpyObj('CityService', ['getCityById', 'updateCity']);
    const countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountries']);
    const reloadListServiceSpy = jasmine.createSpyObj('ReloadListService', ['loadCityDetails']);

    await TestBed.configureTestingModule({
      declarations: [ UpdateCityComponent ],
      imports: [ 
        ReactiveFormsModule, 
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CityService, useValue: cityServiceSpy },
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ReloadListService, useValue: reloadListServiceSpy }
      ]
    })
    .compileComponents();

    cityService = TestBed.inject(CityService) as jasmine.SpyObj<CityService>;
    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;
    reloadListService = TestBed.inject(ReloadListService) as jasmine.SpyObj<ReloadListService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCityComponent);
    component = fixture.componentInstance;
    component.cityId = 1;

    countryService.getCountries.and.returnValue(of([
      { id: 1, name: 'Country 1', population: 1000000, continent: Continent.Africa, cities: [] },
      { id: 2, name: 'Country 2', population: 2000000, continent: Continent.Africa, cities: [] }
    ]));

    cityService.getCityById.and.returnValue(of({
      id: 1,
      name: 'City 1',
      population: 1000,
      countryId: 1
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries and city on init', () => {
    expect(countryService.getCountries).toHaveBeenCalled();
    expect(cityService.getCityById).toHaveBeenCalledWith(1);
  });

  it('should validate form', () => {
    component.cityForm.controls['name'].setValue('');
    component.cityForm.controls['population'].setValue('');
    component.cityForm.controls['countryId'].setValue(null);

    expect(component.cityForm.valid).toBeFalsy();

    component.cityForm.controls['name'].setValue('City 1');
    component.cityForm.controls['population'].setValue(1000);
    component.cityForm.controls['countryId'].setValue({ id: 1, name: 'Country 1' });

    expect(component.cityForm.valid).toBeTruthy();
  });

  it('should submit form', () => {
    cityService.updateCity.and.returnValue(of({
      id: 1,
      name: 'City 1',
      population: 1000,
      countryId: 1
    }));

    component.cityForm.controls['name'].setValue('City 1');
    component.cityForm.controls['population'].setValue(1000);
    component.cityForm.controls['countryId'].setValue(1);

    component.onSubmit();

    expect(cityService.updateCity).toHaveBeenCalled();
  });
});