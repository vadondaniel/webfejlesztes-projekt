package hu.unideb.inf.repository;

import hu.unideb.inf.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}

