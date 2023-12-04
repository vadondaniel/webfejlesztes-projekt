import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AddCountryComponent } from './add-country.component';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { Country } from '../models';
import { Continent } from '../continent';

describe('AddCountryComponent', () => {
  let component: AddCountryComponent;
  let fixture: ComponentFixture<AddCountryComponent>;
  let countryService: jasmine.SpyObj<CountryService>;
  let reloadListService: jasmine.SpyObj<ReloadListService>;

  beforeEach(async () => {
    const countryServiceSpy = jasmine.createSpyObj('CountryService', ['addCountry']);
    const reloadListServiceSpy = jasmine.createSpyObj('ReloadListService', ['loadCountries']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      declarations: [AddCountryComponent],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ReloadListService, useValue: reloadListServiceSpy }
      ]
    }).compileComponents();

    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;
    reloadListService = TestBed.inject(ReloadListService) as jasmine.SpyObj<ReloadListService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.countryForm).toBeDefined();
    expect(component.countryForm.get('name')).toBeDefined();
    expect(component.countryForm.get('population')).toBeDefined();
    expect(component.countryForm.get('continent')).toBeDefined();
  });

  it('should submit form', () => {
    const mockCountry: Country = { id: 1, name: 'Test Country', population: 1000000, continent: Continent.Africa, cities: [] };
    countryService.addCountry.and.returnValue(of(mockCountry));
    component.countryForm.setValue({ name: 'Test Country', population: 1000000, continent: 'Africa' });
    component.onSubmit();
    expect(countryService.addCountry).toHaveBeenCalled();
    expect(reloadListService.loadCountries).toHaveBeenCalled();
  });
});