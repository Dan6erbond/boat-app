FROM maven:3.6.0-jdk-11-slim AS builder
WORKDIR /usr/src/app
COPY . .
# RUN dos2unix mvnw
# RUN chmod +x mvnw
RUN mvn clean install -DskipTests

FROM openjdk:11-jre-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
CMD ["java", "-jar", "target/boat-app-0.0.1-SNAPSHOT.jar"]
