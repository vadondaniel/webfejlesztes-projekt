package hu.unideb.inf.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Long population;

    @Column(name = "country_id") // Map the countryId to a column in the database
    private Long countryId;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPopulation() {
        return population;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    // Many-to-One relationship with Country entity
    @ManyToOne
    @JoinColumn(name = "country_id", insertable = false, updatable = false)
    @JsonIgnore
    private Country country;

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
        this.countryId = country != null ? country.getId() : null;
    }
}
