import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CityService } from './city.service';
import { ConfigService } from './config.service';
import { City } from '../models';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CityService, ConfigService]
    });

    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all cities', () => {
    const dummyCities: City[] = [
      { id: 1, name: 'City1', countryId: 1, population: 1000000 },
      { id: 2, name: 'City2', countryId: 2, population: 2000000 }
    ];

    service.getCities().subscribe(cities => {
      expect(cities.length).toBe(2);
      expect(cities).toEqual(dummyCities);
    });

    const request = httpMock.expectOne(`${configService.basePath}/cities`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCities);
  });

  it('should fetch city by id', () => {
    const dummyCity: City = { id: 1, name: 'City1', countryId: 1, population: 1000000 };

    service.getCityById(1).subscribe(city => {
      expect(city).toEqual(dummyCity);
    });

    const request = httpMock.expectOne(`${configService.basePath}/cities/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCity);
  });

  it('should add a city', () => {
    const dummyCity: City = { id: 1, name: 'City1', countryId: 1, population: 1000000 };

    service.addCity(dummyCity).subscribe(city => {
      expect(city).toEqual(dummyCity);
    });

    const request = httpMock.expectOne(`${configService.basePath}/cities`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyCity);
  });

  it('should update a city', () => {
    const dummyCity: City = { id: 1, name: 'City1', countryId: 1, population: 1000000 };

    service.updateCity(dummyCity).subscribe(city => {
      expect(city).toEqual(dummyCity);
    });

    const request = httpMock.expectOne(`${configService.basePath}/cities/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyCity);
  });

  it('should delete a city', () => {
    service.deleteCity(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${configService.basePath}/cities/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null); // flush with null to emit null
  });
});