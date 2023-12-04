# Webfejlesztés Projekt

Webfejlesztés (INBPM0522) 2023. ősz SzM

## Spring Boot Database Server with Authentication and Angular Frontend

This is a Spring Boot application that uses Maven as a build tool, H2 as an in-memory database, and Spring Security for authentication. It also includes an Angular frontend for user interaction.

### Prerequisites

- Java 8 or higher
- Maven
- Node.js and npm

### Getting Started

To get the application running locally:

- Clone this repository
- Navigate into the directory of the project
- Run `mvn clean install` to build the application
- Run `mvn spring-boot:run` to start the server
- Navigate into the Angular application directory
- Run `npm install` to install the necessary npm packages
- Run `ng serve` to start the Angular application

The backend application will be running at `http://localhost:8080`.
The frontend application will be running at `http://localhost:4200`.

### Features

- **H2 Database**: An in-memory database for storing data. It's lightweight and great for development and testing.
- **Spring Security**: Handles authentication and access control. It's highly customizable and robust.
- **Angular Frontend**: A frontend application built with Angular. It includes a navigation component that dynamically updates the page title based on the current route.

### API Endpoints

- `/api/v1/basicauth`: Endpoint for basic authentication.
- `/api/countries`: GET request to retrieve all countries.
- `/api/countries`: POST request to add a new country.
- `/api/countries/{id}`: GET request to retrieve a country by its ID.
- `/api/countries/{id}`: PUT request to update a country by its ID.
- `/api/countries/{id}`: DELETE request to delete a country by its ID.
- `/api/cities`: GET request to retrieve all cities.
- `/api/cities`: POST request to add a new city.
- `/api/cities/{id}`: GET request to retrieve a city by its ID.
- `/api/cities/{id}`: PUT request to update a city by its ID.
- `/api/cities/{id}`: DELETE request to delete a city by its ID.

### Testing

Run `mvn test` to execute the test cases.

### Built With

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Maven](https://maven.apache.org/)
- [H2 Database](https://www.h2database.com/)
- [Spring Security](https://spring.io/projects/spring-security)
- [Angular](https://angular.io/)
