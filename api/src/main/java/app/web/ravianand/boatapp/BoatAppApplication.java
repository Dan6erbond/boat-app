package app.web.ravianand.boatapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import app.web.ravianand.boatapp.security.JwtProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class BoatAppApplication {

  public static void main(String[] args) {
    SpringApplication.run(BoatAppApplication.class, args);
  }

}
