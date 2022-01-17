package app.web.ravianand.boatapp;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import app.web.ravianand.boatapp.user.UserService;
import app.web.ravianand.boatapp.user.dto.CreateUserRequest;

@Configuration
public class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(UserService userService) {
    return args -> {
      List<CreateUserRequest> users = List.of(
          new CreateUserRequest("admin", "admin123", "Admin", "Admin"),
          new CreateUserRequest("test", "test123", "Test", "Test"));

      users.stream().forEach(user -> {
        try {
          userService.loadUserByUsername(user.getUsername());
        } catch (UsernameNotFoundException ex) {
          userService.create(user);
        }
      });

      List<String> usernames = users.stream().map(CreateUserRequest::getUsername).collect(
          Collectors.toList());

      log.info("Preloaded users:" + String.join(", ", usernames));
    };
  }

}
