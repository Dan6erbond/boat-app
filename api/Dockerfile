FROM adoptopenjdk/openjdk11:jdk-11.0.11_9 AS builder
WORKDIR /usr/src/app
COPY . .
RUN ./mvnw clean install -DskipTests

FROM adoptopenjdk/openjdk11:jdk-11.0.11_9-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
CMD ["java", "-jar", "target/boat-app-0.0.1-SNAPSHOT.jar"]
