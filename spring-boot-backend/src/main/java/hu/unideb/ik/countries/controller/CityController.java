package hu.unideb.ik.countries.controller;

import hu.unideb.ik.countries.entity.City;
import hu.unideb.ik.countries.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
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

    @PostMapping("/{id}")
    public ResponseEntity<City> updateCity(@PathVariable Long id, @RequestBody City city) {
        Optional<City> cityOptional = cityService.getCityById(id);
        if (cityOptional.isPresent()) {
            City cityToUpdate = cityOptional.get();
            cityToUpdate.setName(city.getName());
            cityToUpdate.setPopulation(city.getPopulation());
            cityToUpdate.setCountry(city.getCountry());
            City updatedCity = cityService.addCity(cityToUpdate);
            return ResponseEntity.ok(updatedCity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
