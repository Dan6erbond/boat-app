# Boat App

Boat CRUD application featuring a Spring Boot RESTful API and React frontend.

## Setup

### Prerequisites

1. Docker w/ Docker Compose CLI

### Setting up a PostgreSQL Database

Run the `docker-compose.yml` file to create a Docker container with the PostgreSQL image:

```sh
$ docker compose up --build
```

Connect to the container shell:

```sh
$ docker exec -it boat-app-postgresql bash
```

Setup a new Postgres user for the application:

```sql
CREATE USER springuser WITH PASSWORD 'spring123';
GRANT ALL PRIVILEGES ON DATABASE boat_db TO springuser;
```

### Building the Spring Boot REST API

Change into the API directory:

```sh
$ cd ./api
```

### Building the React Frontend

Change into the client directory:

```sh
$ cd ./client
```

Install all the dependencies:

```sh
$ yarn
```

Build the React app:

```sh
$ yarn build
```

Run a Node server to serve the frontend:

```sh
$ yarn serve
```
