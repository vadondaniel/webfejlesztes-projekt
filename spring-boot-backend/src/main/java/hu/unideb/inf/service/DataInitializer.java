package hu.unideb.inf.service;

import hu.unideb.inf.entity.City;
import hu.unideb.inf.entity.Continent;
import hu.unideb.inf.entity.Country;
import hu.unideb.inf.repository.CityRepository;
import hu.unideb.inf.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private CityRepository cityRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        Country country1 = createAndSaveCountry("Japan", 126_000_000L, Continent.Asia);
        Country country2 = createAndSaveCountry("Hungary", 9_000_000L, Continent.Europe);
        Country country3 = createAndSaveCountry("USA", 328_000_000L, Continent.NorthAmerica);
        Country country4 = createAndSaveCountry("Australia", 25_000_000L, Continent.Australia);
        Country country5 = createAndSaveCountry("Brazil", 209_000_000L, Continent.SouthAmerica);
        Country country6 = createAndSaveCountry("Russia", 144_000_000L, Continent.Europe);
        Country country7 = createAndSaveCountry("China", 1_400_000_000L, Continent.Asia);
        Country country8 = createAndSaveCountry("India", 1_300_000_000L, Continent.Asia);
        Country country9 = createAndSaveCountry("South Africa", 57_000_000L, Continent.Africa);
        Country country10 = createAndSaveCountry("Egypt", 97_000_000L, Continent.Africa);
        Country country11 = createAndSaveCountry("Germany", 82_000_000L, Continent.Europe);
        Country country12 = createAndSaveCountry("France", 67_000_000L, Continent.Europe);
        Country country13 = createAndSaveCountry("Spain", 47_000_000L, Continent.Europe);
        Country country14 = createAndSaveCountry("Italy", 60_000_000L, Continent.Europe);
        Country country15 = createAndSaveCountry("United Kingdom", 66_000_000L, Continent.Europe);
        Country country16 = createAndSaveCountry("Canada", 37_000_000L, Continent.NorthAmerica);
        Country country17 = createAndSaveCountry("Mexico", 129_000_000L, Continent.NorthAmerica);
        Country country18 = createAndSaveCountry("Argentina", 44_000_000L, Continent.SouthAmerica);
        Country country19 = createAndSaveCountry("Chile", 18_000_000L, Continent.SouthAmerica);
        Country country20 = createAndSaveCountry("Peru", 32_000_000L, Continent.SouthAmerica);
        Country country21 = createAndSaveCountry("Serbia", 7_000_000L, Continent.Europe);
        Country country22 = createAndSaveCountry("Croatia", 4_000_000L, Continent.Europe);
        Country country23 = createAndSaveCountry("Slovakia", 5_000_000L, Continent.Europe);
        Country country24 = createAndSaveCountry("Slovenia", 2_000_000L, Continent.Europe);
        Country country25 = createAndSaveCountry("Austria", 8_000_000L, Continent.Europe);
        Country country26 = createAndSaveCountry("Switzerland", 8_000_000L, Continent.Europe);

        createAndSaveCity("Tokyo", 9_000_000L, country1);
        createAndSaveCity("Budapest", 1_700_000L, country2);
        createAndSaveCity("New York", 8_500_000L, country3);
        createAndSaveCity("Sydney", 5_000_000L, country4);
        createAndSaveCity("Sao Paulo", 12_000_000L, country5);
        createAndSaveCity("Moscow", 12_000_000L, country6);
        createAndSaveCity("Beijing", 21_000_000L, country7);
        createAndSaveCity("New Delhi", 16_000_000L, country8);
        createAndSaveCity("Cape Town", 4_000_000L, country9);
        createAndSaveCity("Cairo", 20_000_000L, country10);
        createAndSaveCity("Berlin", 3_500_000L, country11);
        createAndSaveCity("Paris", 2_500_000L, country12);
        createAndSaveCity("Madrid", 3_000_000L, country13);
        createAndSaveCity("Rome", 2_500_000L, country14);
        createAndSaveCity("London", 8_000_000L, country15);
        createAndSaveCity("Toronto", 3_000_000L, country16);
        createAndSaveCity("Mexico City", 8_000_000L, country17);
        createAndSaveCity("Buenos Aires", 3_000_000L, country18);
        createAndSaveCity("Santiago", 5_000_000L, country19);
        createAndSaveCity("Lima", 3_000_000L, country20);
        createAndSaveCity("Osaka", 2_500_000L, country1);
        createAndSaveCity("Kyoto", 1_500_000L, country1);
        createAndSaveCity("Nagoya", 2_500_000L, country1);
        createAndSaveCity("Fukuoka", 1_500_000L, country1);
        createAndSaveCity("Hiroshima", 1_100_000L, country1);
        createAndSaveCity("Nara", 300_000L, country1);
        createAndSaveCity("Kobe", 1_500_000L, country1);
        createAndSaveCity("Sapporo", 1_900_000L, country1);
        createAndSaveCity("Nagasaki", 400_000L, country1);
        createAndSaveCity("Yokohama", 3_700_000L, country1);
        createAndSaveCity("Debrecen", 200_000L, country2);
        createAndSaveCity("Szeged", 160_000L, country2);
        createAndSaveCity("Miskolc", 150_000L, country2);
        createAndSaveCity("Pecs", 150_000L, country2);
        createAndSaveCity("Gyor", 130_000L, country2);
        createAndSaveCity("Eger", 50_000L, country2);
        createAndSaveCity("Sopron", 50_000L, country2);
        createAndSaveCity("Szombathely", 80_000L, country2);
        createAndSaveCity("Kecskemet", 100_000L, country2);
        createAndSaveCity("Nyiregyhaza", 100_000L, country2);
        createAndSaveCity("Los Angeles", 4_000_000L, country3);
        createAndSaveCity("Chicago", 2_500_000L, country3);
        createAndSaveCity("Houston", 2_500_000L, country3);
        createAndSaveCity("Philadelphia", 1_500_000L, country3);
        createAndSaveCity("Phoenix", 1_500_000L, country3);

    }

    private Country createAndSaveCountry(String name, Long population, Continent continent) {
        Country country = new Country();
        country.setName(name);
        country.setPopulation(population);
        country.setContinent(continent);
        countryRepository.save(country);
        return country;
    }

    private City createAndSaveCity(String name, Long population, Country country) {
        City city = new City();
        city.setName(name);
        city.setPopulation(population);
        city.setCountryId(country.getId());
        cityRepository.save(city);
        return city;
    }
}
