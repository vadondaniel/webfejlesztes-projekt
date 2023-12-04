import { TestBed } from '@angular/core/testing';
import { ReloadListService } from './reload-list.service';
import { take } from 'rxjs/operators';

describe('ReloadListService', () => {
  let service: ReloadListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReloadListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger loadCountries', (done) => {
    service.triggerLoadCountries$.pipe(take(1)).subscribe(() => {
      expect(true).toBe(true);
      done();
    });
    service.loadCountries();
  });

  it('should trigger loadCities', (done) => {
    service.triggerLoadCities$.pipe(take(1)).subscribe(() => {
      expect(true).toBe(true);
      done();
    });
    service.loadCities();
  });

  it('should trigger loadCountryDetails', (done) => {
    service.triggerLoadCountryDetails$.pipe(take(1)).subscribe(() => {
      expect(true).toBe(true);
      done();
    });
    service.loadCountryDetails();
  });

  it('should trigger loadCityDetails', (done) => {
    service.triggerLoadCityDetails$.pipe(take(1)).subscribe(() => {
      expect(true).toBe(true);
      done();
    });
    service.loadCityDetails();
  });
});