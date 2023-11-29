import { Continent } from './continent';

export class Country {
    id: number;
    name: string;
    population: number;
    continent: Continent;
    cities: City[];

    constructor(id: number = 0, name: string = '', population: number = 0, continent: Continent = Continent.Europe, cities: City[] = []) {
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

    constructor(id: number = 0, name: string = '', population: number = 0, countryId: number = 0) {
        this.id = id;
        this.name = name;
        this.population = population;
        this.countryId = countryId;
    }
}