package hu.unideb.ik.countries.repository;

import hu.unideb.ik.countries.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}