import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './country.service';
import { ConfigService } from './config.service';
import { Country } from '../models';
import { Continent } from '../continent';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService, ConfigService]
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch countries', () => {
    const mockCountries: Country[] = [
      { id: 1, name: 'Country 1', continent: Continent.Africa, population: 1000000, cities: [] },
      { id: 2, name: 'Country 2', continent: Continent.Asia, population: 2000000, cities: [] }
    ];

    service.getCountries().subscribe(countries => {
      expect(countries.length).toBe(2);
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne(`${configService.basePath}/countries`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should fetch country by id', () => {
    const mockCountry: Country = { id: 1, name: 'Country 1', continent: Continent.Africa, population: 1000000, cities: [] };

    service.getCountryById(1).subscribe(country => {
      expect(country).toEqual(mockCountry);
    });

    const req = httpMock.expectOne(`${configService.basePath}/countries/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountry);
  });

  it('should add a country', () => {
    const newCountry: Country = { id: 3, name: 'Country 3', continent: Continent.Europe, population: 3000000, cities: [] };

    service.addCountry(newCountry).subscribe(country => {
      expect(country).toEqual(newCountry);
    });

    const req = httpMock.expectOne(`${configService.basePath}/countries`);
    expect(req.request.method).toBe('POST');
    req.flush(newCountry);
  });

  it('should update a country', () => {
    const updatedCountry: Country = { id: 1, name: 'Updated Country', continent: Continent.Africa, population: 1500000, cities: [] };

    service.updateCountry(updatedCountry).subscribe(country => {
      expect(country).toEqual(updatedCountry);
    });

    const req = httpMock.expectOne(`${configService.basePath}/countries/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCountry);
  });

  it('should delete a country', () => {
    service.deleteCountry(1).subscribe();

    const req = httpMock.expectOne(`${configService.basePath}/countries/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});