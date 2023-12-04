package hu.unideb.inf.controller;

import hu.unideb.inf.entity.Country;
import hu.unideb.inf.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Long id) {
        Optional<Country> country = countryService.getCountryById(id);
        return country.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Country> addCountry(@RequestBody Country country) {
        Country savedCountry = countryService.addCountry(country);
        return ResponseEntity.ok(savedCountry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Country> deleteCountry(@PathVariable Long id) {
        Optional<Country> country = countryService.getCountryById(id);
        if (country.isPresent()) {
            countryService.deleteCountry(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Country> updateCountry(@PathVariable Long id, @RequestBody Country country) {
        Optional<Country> countryOptional = countryService.getCountryById(id);
        if (countryOptional.isPresent()) {
            Country countryToUpdate = countryOptional.get();
            countryToUpdate.setName(country.getName());
            countryToUpdate.setPopulation(country.getPopulation());
            countryToUpdate.setContinent(country.getContinent());
            Country updatedCountry = countryService.addCountry(countryToUpdate);
            return ResponseEntity.ok(updatedCountry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}