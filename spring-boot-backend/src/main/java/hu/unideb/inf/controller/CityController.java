package hu.unideb.inf.controller;

import hu.unideb.inf.entity.City;
import hu.unideb.inf.entity.Country;
import hu.unideb.inf.service.CityService;
import hu.unideb.inf.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    private final CityService cityService;
    private final CountryService countryService;

    @Autowired
    public CityController(CityService cityService, CountryService countryService) {
        this.cityService = cityService;
        this.countryService = countryService;
    }

    @GetMapping
    public List<City> getAllCountries() {
        return cityService.getAllCountries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Long id) {
        Optional<City> city = cityService.getCityById(id);
        return city.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<City> addCity(@RequestBody City city) {
        City savedCity = cityService.addCity(city);
        return ResponseEntity.ok(savedCity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id) {
        Optional<City> city = cityService.getCityById(id);
        if (city.isPresent()) {
            cityService.deleteCity(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCity(@PathVariable Long id, @RequestBody City city) {
        Optional<City> cityOptional = cityService.getCityById(id);
        if (cityOptional.isPresent()) {
            City cityToUpdate = cityOptional.get();
            cityToUpdate.setName(city.getName());
            cityToUpdate.setPopulation(city.getPopulation());

            // Fetch the Country object associated with the given countryId
            Optional<Country> countryOptional = countryService.getCountryById(city.getCountryId());
            if (countryOptional.isPresent()) {
                cityToUpdate.setCountry(countryOptional.get());
            } else {
                return ResponseEntity.badRequest().body("Invalid countryId");
            }

            City updatedCity = cityService.addCity(cityToUpdate);
            return ResponseEntity.ok(updatedCity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
