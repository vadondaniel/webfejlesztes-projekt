import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CityListComponent } from './city-list.component';
import { CityService } from '../services/city.service';
import { ReloadListService } from '../services/reload-list.service';
import { of } from 'rxjs';
import { City } from '../models';
import { Sort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;
  let cityService: CityService;
  let reloadListService: ReloadListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityListComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule], // add MatProgressSpinnerModule here
      providers: [CityService, ReloadListService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    cityService = TestBed.inject(CityService);
    reloadListService = TestBed.inject(ReloadListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cities on init', () => {
    const dummyCities: City[] = [
      { id: 1, name: 'City1', countryId: 1, population: 1000000 },
      { id: 2, name: 'City2', countryId: 2, population: 2000000 }
    ];
    spyOn(cityService, 'getCities').and.returnValue(of(dummyCities));
    component.ngOnInit();
    expect(cityService.getCities).toHaveBeenCalled();
    expect(component.cities).toEqual(dummyCities);
  });

  it('should sort cities', () => {
    const dummyCities: City[] = [
      { id: 2, name: 'City2', countryId: 2, population: 2000000 },
      { id: 1, name: 'City1', countryId: 1, population: 1000000 }
    ];
    const sort: Sort = { active: 'id', direction: 'asc' };
    component.cities = dummyCities;
    component.sortData(sort);
    expect(component.sortedCities).toEqual(dummyCities.reverse());
  });
});