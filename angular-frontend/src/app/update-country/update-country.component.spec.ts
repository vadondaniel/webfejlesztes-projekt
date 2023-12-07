import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { UpdateCountryComponent } from './update-country.component';
import { Continent } from '../continent';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

describe('UpdateCountryComponent', () => {
  let component: UpdateCountryComponent;
  let fixture: ComponentFixture<UpdateCountryComponent>;
  let countryService: jasmine.SpyObj<CountryService>;
  let reloadListService: jasmine.SpyObj<ReloadListService>;

  beforeEach(async () => {
    const countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountryById', 'updateCountry']);
    const reloadListServiceSpy = jasmine.createSpyObj('ReloadListService', ['loadCountryDetails']);

    await TestBed.configureTestingModule({
      declarations: [UpdateCountryComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ReloadListService, useValue: reloadListServiceSpy }
      ]
    })
      .compileComponents();

    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;
    reloadListService = TestBed.inject(ReloadListService) as jasmine.SpyObj<ReloadListService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCountryComponent);
    component = fixture.componentInstance;
    component.countryId = 1;

    countryService.getCountryById.and.returnValue(of({
      id: 1,
      name: 'Country 1',
      population: 1000,
      continent: Continent.Africa,
      cities: []
    }));

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load countries and country on init', () => {
    expect(countryService.getCountryById).toHaveBeenCalledWith(1);
  });

  it('should validate form', () => {
    if (component.countryForm) {
      component.countryForm.controls['name'].setValue('');
      component.countryForm.controls['population'].setValue('');
      component.countryForm.controls['continent'].setValue(null);

      expect(component.countryForm.valid).toBeFalsy();

      component.countryForm.controls['name'].setValue('Country 1');
      component.countryForm.controls['population'].setValue(1000);
      component.countryForm.controls['continent'].setValue(Continent.Africa);

      expect(component.countryForm.valid).toBeTruthy();
    }
  });

  it('should submit form', () => {
    if (component.countryForm) {
      countryService.updateCountry.and.returnValue(of({
        id: 1,
        name: 'Country 1',
        population: 1000,
        continent: Continent.Africa,
        cities: []
      }));

      component.countryForm.controls['name'].setValue('Country 1');
      component.countryForm.controls['population'].setValue(1000);
      component.countryForm.controls['continent'].setValue(Continent.Africa);

      component.onSubmit();

      expect(countryService.updateCountry).toHaveBeenCalled();
    }
  });
});