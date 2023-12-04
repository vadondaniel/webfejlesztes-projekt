import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AddCityToCountryComponent } from './add-city-to-country.component';
import { CityService } from '../services/city.service';
import { ReloadListService } from '../services/reload-list.service';
import { City } from '../models';

describe('AddCityToCountryComponent', () => {
  let component: AddCityToCountryComponent;
  let fixture: ComponentFixture<AddCityToCountryComponent>;
  let cityService: jasmine.SpyObj<CityService>;
  let reloadListService: jasmine.SpyObj<ReloadListService>;

  beforeEach(async () => {
    const cityServiceSpy = jasmine.createSpyObj('CityService', ['addCity']);
    const reloadListServiceSpy = jasmine.createSpyObj('ReloadListService', ['loadCountryDetails']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [AddCityToCountryComponent],
      providers: [
        { provide: CityService, useValue: cityServiceSpy },
        { provide: ReloadListService, useValue: reloadListServiceSpy }
      ]
    }).compileComponents();

    cityService = TestBed.inject(CityService) as jasmine.SpyObj<CityService>;
    reloadListService = TestBed.inject(ReloadListService) as jasmine.SpyObj<ReloadListService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityToCountryComponent);
    component = fixture.componentInstance;
    component.countryId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.cityForm).toBeDefined();
    expect(component.cityForm.get('name')).toBeDefined();
    expect(component.cityForm.get('population')).toBeDefined();
    expect(component.cityForm.get('countryId')).toBeDefined();
  });

  it('should submit form', () => {
    const mockCity: City = { id: 1, name: 'Test City', population: 1000000, countryId: 1 };
    cityService.addCity.and.returnValue(of(mockCity));
    component.cityForm.setValue({ name: 'Test City', population: 1000000, countryId: 1 });
    component.onSubmit();
    expect(cityService.addCity).toHaveBeenCalled();
    expect(reloadListService.loadCountryDetails).toHaveBeenCalled();
  });
});