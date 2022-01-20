# Boat App

Boat CRUD application featuring a Spring Boot RESTful API and React frontend.

## Setup

### Prerequisites
 - Docker w/ Docker Compose CLI

### Dev Setup

#### PostgreSQL Database

This project comes with a [`docker-compose.dev.yml`](docker-compose.dev.yml) file, which starts a Postgres container for development and exposes port 5432 for database connections.

Launch it with the following command:

```sh
$ docker compose -f docker-compose.dev.yml up --build
```

#### React App

You must install all the dependencies for the frontend with the following command:

```sh
$ yarn install
```

The React app can then be launched with React-Scripts `start` command:

```sh
$ yarn start
```

#### Spring Boot Web API

The Spring Boot can be started API with `mvnw spring-boot:run` (`mvnw.cmd` on Windows):

```sh
$ mvnw spring-boot:run
```

### Running the App

To run all the services with Docker Compose, use the [`docker-compose.yml`](./docker-compose.yml) file to start the services and expose the API on port 8080 as well as the frontend on port 3000:

```sh
$ docker compose up --build
```

Launch the app at http://localhost:3000/.

## Architecture

There are two main services:

 - Frontend: React app using [ChakraUI](https://chakra-ui.com/), [Redux Toolkit](https://redux-toolkit.js.org/) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview). Scaffolded with the [Create React App](https://create-react-app.dev/) boilerplate.
 - API: Spring Boot RESTful API with authentication using [Spring Security](https://spring.io/projects/spring-security), [JPA](https://spring.io/projects/spring-data-jpa) and [HATEOAS](https://spring.io/projects/spring-hateoas). Boilerplate and constructors are generated at runtime using [Project Lombok](https://projectlombok.org/).

## Expansions

This section lists possible expansions to improve the application which have not yet been implemented.

 - Improved error handling: Various errors can be handled by the application through guards and custom exceptions.
 - Tests: This application does not implement any tests yet.

## License

This project is licensed under [GNU GPL v3.0](./LICENSE).
