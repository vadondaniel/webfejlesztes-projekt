package hu.unideb.ik.countries.repository;

import hu.unideb.ik.countries.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
