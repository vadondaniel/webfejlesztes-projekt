import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityToCountryComponent } from './add-city-to-country.component';

describe('AddCityToCountryComponent', () => {
  let component: AddCityToCountryComponent;
  let fixture: ComponentFixture<AddCityToCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCityToCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCityToCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
