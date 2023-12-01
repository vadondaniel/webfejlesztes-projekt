import { Continent } from './continent';

export class Country {
    id: number;
    name: string;
    population: number;
    continent: Continent;
    cities: City[];

    constructor(id: number, name: string, population: number, continent: Continent, cities: City[]) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.continent = continent;
        this.cities = cities;
    }
}

export class City {
    id: number;
    name: string;
    population: number;
    countryId: number;

    constructor(id: number, name: string, population: number, countryId: number) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.countryId = countryId;
    }
}