package hu.unideb.ik.countries;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CountriesApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(CountriesApplication.class, args);
	}

}
