import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CountryService } from '../services/country.service';
import { ReloadListService } from '../services/reload-list.service';
import { CountryDetailsComponent } from './country-details.component';
import { AddCityToCountryComponent } from '../add-city-to-country/add-city-to-country.component';
import { UpdateCountryComponent } from '../update-country/update-country.component';
import { DeleteCountryComponent } from '../delete-country/delete-country.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let countryService: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    const countryServiceSpy = jasmine.createSpyObj('CountryService', ['getCountryById']);

    await TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
        MatCardModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [
        CountryDetailsComponent,
        AddCityToCountryComponent,
        UpdateCountryComponent,
        DeleteCountryComponent
      ],
      providers: [
        { provide: CountryService, useValue: countryServiceSpy },
        { provide: ReloadListService, useValue: { triggerLoadCountryDetails$: of({}) } },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    }).compileComponents();

    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when country is not found', () => {
    component.loaded = true;
    component.country = null;
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('mat-card'));
    expect(message).toBeTruthy();
  });
});