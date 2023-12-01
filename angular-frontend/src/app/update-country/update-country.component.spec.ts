import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCountryComponent } from './update-country.component';

describe('UpdateCountryComponent', () => {
  let component: UpdateCountryComponent;
  let fixture: ComponentFixture<UpdateCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
