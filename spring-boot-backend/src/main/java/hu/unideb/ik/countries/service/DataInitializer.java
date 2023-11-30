package hu.unideb.ik.countries.service;

import hu.unideb.ik.countries.entity.City;
import hu.unideb.ik.countries.entity.Continent;
import hu.unideb.ik.countries.entity.Country;
import hu.unideb.ik.countries.repository.CityRepository;
import hu.unideb.ik.countries.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private CityRepository cityRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize the database with some data
        Country country1 = new Country();
        country1.setName("Japan");
        country1.setPopulation(126_000_000L);
        country1.setContinent(Continent.Asia);
        countryRepository.save(country1);

        Country country2 = new Country();
        country2.setName("Hungary");
        country2.setPopulation(9_000_000L);
        country2.setContinent(Continent.Europe);
        countryRepository.save(country2);

        Country country3 = new Country();
        country3.setName("USA");
        country3.setPopulation(328_000_000L);
        country3.setContinent(Continent.NorthAmerica);
        countryRepository.save(country3);

        Country country4 = new Country();
        country4.setName("Australia");
        country4.setPopulation(25_000_000L);
        country4.setContinent(Continent.Australia);
        countryRepository.save(country4);

        Country country5 = new Country();
        country5.setName("Brazil");
        country5.setPopulation(209_000_000L);
        country5.setContinent(Continent.SouthAmerica);
        countryRepository.save(country5);

        Country country6 = new Country();
        country6.setName("Russia");
        country6.setPopulation(144_000_000L);
        country6.setContinent(Continent.Europe);
        countryRepository.save(country6);

        Country country7 = new Country();
        country7.setName("China");
        country7.setPopulation(1_400_000_000L);
        country7.setContinent(Continent.Asia);
        countryRepository.save(country7);

        Country country8 = new Country();
        country8.setName("India");
        country8.setPopulation(1_300_000_000L);
        country8.setContinent(Continent.Asia);
        countryRepository.save(country8);

        Country country9 = new Country();
        country9.setName("South Africa");
        country9.setPopulation(57_000_000L);
        country9.setContinent(Continent.Africa);
        countryRepository.save(country9);

        Country country10 = new Country();
        country10.setName("Egypt");
        country10.setPopulation(97_000_000L);
        country10.setContinent(Continent.Africa);
        countryRepository.save(country10);

        Country country11 = new Country();
        country11.setName("Germany");
        country11.setPopulation(82_000_000L);
        country11.setContinent(Continent.Europe);
        countryRepository.save(country11);

        Country country12 = new Country();
        country12.setName("France");
        country12.setPopulation(67_000_000L);
        country12.setContinent(Continent.Europe);
        countryRepository.save(country12);

        Country country13 = new Country();
        country13.setName("Spain");
        country13.setPopulation(47_000_000L);
        country13.setContinent(Continent.Europe);
        countryRepository.save(country13);

        Country country14 = new Country();
        country14.setName("Italy");
        country14.setPopulation(60_000_000L);
        country14.setContinent(Continent.Europe);
        countryRepository.save(country14);

        Country country15 = new Country();
        country15.setName("United Kingdom");
        country15.setPopulation(66_000_000L);
        country15.setContinent(Continent.Europe);
        countryRepository.save(country15);

        Country country16 = new Country();
        country16.setName("Canada");
        country16.setPopulation(37_000_000L);
        country16.setContinent(Continent.NorthAmerica);
        countryRepository.save(country16);

        Country country17 = new Country();
        country17.setName("Mexico");
        country17.setPopulation(129_000_000L);
        country17.setContinent(Continent.NorthAmerica);
        countryRepository.save(country17);

        Country country18 = new Country();
        country18.setName("Argentina");
        country18.setPopulation(44_000_000L);
        country18.setContinent(Continent.SouthAmerica);
        countryRepository.save(country18);

        Country country19 = new Country();
        country19.setName("Chile");
        country19.setPopulation(18_000_000L);
        country19.setContinent(Continent.SouthAmerica);
        countryRepository.save(country19);

        Country country20 = new Country();
        country20.setName("Peru");
        country20.setPopulation(32_000_000L);
        country20.setContinent(Continent.SouthAmerica);
        countryRepository.save(country20);

        Country country21 = new Country();
        country21.setName("Serbia");
        country21.setPopulation(7_000_000L);
        country21.setContinent(Continent.Europe);
        countryRepository.save(country21);

        Country country22 = new Country();
        country22.setName("Croatia");
        country22.setPopulation(4_000_000L);
        country22.setContinent(Continent.Europe);
        countryRepository.save(country22);

        Country country23 = new Country();
        country23.setName("Slovakia");
        country23.setPopulation(5_000_000L);
        country23.setContinent(Continent.Europe);
        countryRepository.save(country23);

        Country country24 = new Country();
        country24.setName("Slovenia");
        country24.setPopulation(2_000_000L);
        country24.setContinent(Continent.Europe);
        countryRepository.save(country24);

        Country country25 = new Country();
        country25.setName("Austria");
        country25.setPopulation(8_000_000L);
        country25.setContinent(Continent.Europe);
        countryRepository.save(country25);

        Country country26 = new Country();
        country26.setName("Switzerland");
        country26.setPopulation(8_000_000L);
        country26.setContinent(Continent.Europe);
        countryRepository.save(country26);





        City city1 = new City();
        city1.setName("Tokyo");
        city1.setPopulation(9_000_000L);
        city1.setCountryId(country1.getId());
        cityRepository.save(city1);

        City city2 = new City();
        city2.setName("Budapest");
        city2.setPopulation(1_700_000L);
        city2.setCountryId(country2.getId());
        cityRepository.save(city2);

        City city3 = new City();
        city3.setName("New York");
        city3.setPopulation(8_500_000L);
        city3.setCountryId(country3.getId());
        cityRepository.save(city3);

        City city4 = new City();
        city4.setName("Sydney");
        city4.setPopulation(5_000_000L);
        city4.setCountryId(country4.getId());
        cityRepository.save(city4);

        City city5 = new City();
        city5.setName("Sao Paulo");
        city5.setPopulation(12_000_000L);
        city5.setCountryId(country5.getId());
        cityRepository.save(city5);

        City city6 = new City();
        city6.setName("Moscow");
        city6.setPopulation(12_000_000L);
        city6.setCountryId(country6.getId());
        cityRepository.save(city6);

        City city7 = new City();
        city7.setName("Beijing");
        city7.setPopulation(21_000_000L);
        city7.setCountryId(country7.getId());
        cityRepository.save(city7);

        City city8 = new City();
        city8.setName("New Delhi");
        city8.setPopulation(16_000_000L);
        city8.setCountryId(country8.getId());
        cityRepository.save(city8);

        City city9 = new City();
        city9.setName("Cape Town");
        city9.setPopulation(4_000_000L);
        city9.setCountryId(country9.getId());
        cityRepository.save(city9);

        City city10 = new City();
        city10.setName("Cairo");
        city10.setPopulation(20_000_000L);
        city10.setCountryId(country10.getId());
        cityRepository.save(city10);

        City city11 = new City();
        city11.setName("Berlin");
        city11.setPopulation(3_500_000L);
        city11.setCountryId(country11.getId());
        cityRepository.save(city11);

        City city12 = new City();
        city12.setName("Paris");
        city12.setPopulation(2_500_000L);
        city12.setCountryId(country12.getId());
        cityRepository.save(city12);

        City city13 = new City();
        city13.setName("Madrid");
        city13.setPopulation(3_000_000L);
        city13.setCountryId(country13.getId());
        cityRepository.save(city13);

        City city14 = new City();
        city14.setName("Rome");
        city14.setPopulation(2_500_000L);
        city14.setCountryId(country14.getId());
        cityRepository.save(city14);

        City city15 = new City();
        city15.setName("London");
        city15.setPopulation(8_000_000L);
        city15.setCountryId(country15.getId());
        cityRepository.save(city15);

        City city16 = new City();
        city16.setName("Toronto");
        city16.setPopulation(3_000_000L);
        city16.setCountryId(country16.getId());
        cityRepository.save(city16);

        City city17 = new City();
        city17.setName("Mexico City");
        city17.setPopulation(8_000_000L);
        city17.setCountryId(country17.getId());
        cityRepository.save(city17);

        City city18 = new City();
        city18.setName("Buenos Aires");
        city18.setPopulation(3_000_000L);
        city18.setCountryId(country18.getId());
        cityRepository.save(city18);

        City city19 = new City();
        city19.setName("Santiago");
        city19.setPopulation(5_000_000L);
        city19.setCountryId(country19.getId());
        cityRepository.save(city19);

        City city20 = new City();
        city20.setName("Lima");
        city20.setPopulation(3_000_000L);
        city20.setCountryId(country20.getId());
        cityRepository.save(city20);

        City city21 = new City();
        city21.setName("Osaka");
        city21.setPopulation(2_500_000L);
        city21.setCountryId(country1.getId());
        cityRepository.save(city21);

        City city22 = new City();
        city22.setName("Kyoto");
        city22.setPopulation(1_500_000L);
        city22.setCountryId(country1.getId());
        cityRepository.save(city22);

        City city23 = new City();
        city23.setName("Nagoya");
        city23.setPopulation(2_500_000L);
        city23.setCountryId(country1.getId());
        cityRepository.save(city23);

        City city24 = new City();
        city24.setName("Fukuoka");
        city24.setPopulation(1_500_000L);
        city24.setCountryId(country1.getId());
        cityRepository.save(city24);

        City city25 = new City();
        city25.setName("Hiroshima");
        city25.setPopulation(1_100_000L);
        city25.setCountryId(country1.getId());
        cityRepository.save(city25);

        City city26 = new City();
        city26.setName("Nara");
        city26.setPopulation(300_000L);
        city26.setCountryId(country1.getId());
        cityRepository.save(city26);

        City city27 = new City();
        city27.setName("Kobe");
        city27.setPopulation(1_500_000L);
        city27.setCountryId(country1.getId());
        cityRepository.save(city27);

        City city28 = new City();
        city28.setName("Sapporo");
        city28.setPopulation(1_900_000L);
        city28.setCountryId(country1.getId());
        cityRepository.save(city28);

        City city29 = new City();
        city29.setName("Nagasaki");
        city29.setPopulation(400_000L);
        city29.setCountryId(country1.getId());
        cityRepository.save(city29);

        City city30 = new City();
        city30.setName("Yokohama");
        city30.setPopulation(3_700_000L);
        city30.setCountryId(country1.getId());
        cityRepository.save(city30);

        City city31 = new City();
        city31.setName("Debrecen");
        city31.setPopulation(200_000L);
        city31.setCountryId(country2.getId());
        cityRepository.save(city31);

        City city32 = new City();
        city32.setName("Szeged");
        city32.setPopulation(160_000L);
        city32.setCountryId(country2.getId());
        cityRepository.save(city32);

        City city33 = new City();
        city33.setName("Miskolc");
        city33.setPopulation(150_000L);
        city33.setCountryId(country2.getId());
        cityRepository.save(city33);

        City city34 = new City();
        city34.setName("Pecs");
        city34.setPopulation(150_000L);
        city34.setCountryId(country2.getId());
        cityRepository.save(city34);

        City city35 = new City();
        city35.setName("Gyor");
        city35.setPopulation(130_000L);
        city35.setCountryId(country2.getId());
        cityRepository.save(city35);

        City city36 = new City();
        city36.setName("Eger");
        city36.setPopulation(50_000L);
        city36.setCountryId(country2.getId());
        cityRepository.save(city36);

        City city37 = new City();
        city37.setName("Sopron");
        city37.setPopulation(50_000L);
        city37.setCountryId(country2.getId());
        cityRepository.save(city37);

        City city38 = new City();
        city38.setName("Szombathely");
        city38.setPopulation(80_000L);
        city38.setCountryId(country2.getId());
        cityRepository.save(city38);

        City city39 = new City();
        city39.setName("Kecskemet");
        city39.setPopulation(100_000L);
        city39.setCountryId(country2.getId());
        cityRepository.save(city39);

        City city40 = new City();
        city40.setName("Nyiregyhaza");
        city40.setPopulation(100_000L);
        city40.setCountryId(country2.getId());
        cityRepository.save(city40);

        City city41 = new City();
        city41.setName("Los Angeles");
        city41.setPopulation(4_000_000L);
        city41.setCountryId(country3.getId());
        cityRepository.save(city41);

        City city42 = new City();
        city42.setName("Chicago");
        city42.setPopulation(2_500_000L);
        city42.setCountryId(country3.getId());
        cityRepository.save(city42);

        City city43 = new City();
        city43.setName("Houston");
        city43.setPopulation(2_500_000L);
        city43.setCountryId(country3.getId());
        cityRepository.save(city43);

        City city44 = new City();
        city44.setName("Philadelphia");
        city44.setPopulation(1_500_000L);
        city44.setCountryId(country3.getId());
        cityRepository.save(city44);

        City city45 = new City();
        city45.setName("Phoenix");
        city45.setPopulation(1_500_000L);
        city45.setCountryId(country3.getId());
        cityRepository.save(city45);




        // Add more data as needed
    }
}
