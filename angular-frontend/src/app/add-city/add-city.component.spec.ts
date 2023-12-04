import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCityComponent } from './add-city.component';
import { CityService } from '../services/city.service';
import { CountryService } from '../services/country.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

describe('AddCityComponent', () => {
  let component: AddCityComponent;
  let fixture: ComponentFixture<AddCityComponent>;
  let cityService: CityService;
  let countryService: CountryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCityComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule, HttpClientTestingModule, BrowserAnimationsModule, MatCardModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule],
      providers: [CityService, CountryService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityComponent);
    component = fixture.componentInstance;
    cityService = TestBed.inject(CityService);
    countryService = TestBed.inject(CountryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addCity on submit', () => {
    spyOn(cityService, 'addCity').and.returnValue(of());
    component.cityForm.setValue({ name: 'City1', population: 1000000, countryId: { id: 1, name: 'Country1' } });
    component.onSubmit();
    expect(cityService.addCity).toHaveBeenCalled();
  });

  it('should validate form', () => {
    component.cityForm.setValue({ name: 'City1', population: 1000000, countryId: { id: 1, name: 'Country1' } });
    expect(component.cityForm.valid).toBeTruthy();

    component.cityForm.setValue({ name: '', population: '', countryId: null });
    expect(component.cityForm.valid).toBeFalsy();
  });
});