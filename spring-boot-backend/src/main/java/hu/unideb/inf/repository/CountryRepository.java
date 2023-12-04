package hu.unideb.inf.repository;

import hu.unideb.inf.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}