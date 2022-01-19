package app.web.ravianand.boatapp;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import app.web.ravianand.boatapp.boat.BoatService;
import app.web.ravianand.boatapp.boat.dto.CreateBoatRequest;
import app.web.ravianand.boatapp.user.UserService;
import app.web.ravianand.boatapp.user.dto.CreateUserRequest;

@Configuration
public class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(UserService userService, BoatService boatService) {
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

      if (boatService.all().size() == 0) {
        List<CreateBoatRequest> boats = List.of(
            new CreateBoatRequest("Aviara AV36",
                "Hosting power takes horsepower and the AV36 has plenty to go around, featuring Aviara’s signature modern layout expanded to create more space for incredible shared experiences. Below deck, the refined cabin creates a comfortable private retreat. Confidence comes with the boat’s smooth, stable ride—delivered by your choice of sterndrive, twin or triple-engine outboard configurations. Excellence extends to every detail on the AV36, from premium components and unrivaled ergonomics to a unique helm design fine tuned for effortless control."),
            new CreateBoatRequest("Beneteau Flyer",
                "Our Flyer range was conceived to be the day-boat of your dreams. Equipped with our AirStep® Hull, these powerboats boast faster acceleration and more responsive maneuvering, as well as the ability to lift up and cut through waves – perfect for cruising, water skiing, and wakeboarding. The Flyer also features two different deck plans, our SUNdeck or our SPACEdeck, to maximize either your sunbathing or entertaining needs!"),
            new CreateBoatRequest("Bertram 28XC",
                "Featuring our timeless deep vee hull, this craft is composed and ready to cut through the water on the way to your next adventure."),
            new CreateBoatRequest("Four Winns HD3",
                "Take a cruise, lounge around, or shred the surf with the HD3. With more room than you could ask for, top of the line hand-stitched upholstery, and a functional head you’ll find that the competition doesn’t stand a chance."),
            new CreateBoatRequest("Jupiter 32",
                "Introducing the new Jupiter 32 – the model that proudly embodies the legacy of the iconic Jupiter 31. Crafted with the impeccable fit and finish for which our brand is renowned, the 32 also features the legendary ride and run synonymous with Jupiter models of the past. Now, freshly launched and packed with modern-day features, this boat builder’s dreamboat is ready to head offshore and make a bold statement wherever she runs."),
            new CreateBoatRequest("Sabre Yachts SALON EXPRESS 38",
                "The Sabre 38 Salon Express: Elegant, Strong, Reliable, Seaworthy.\n\nHer classic profile, energetic performance, precise controls, and low sound levels make the Sabre 38 Salon Express an icon of nautically sensible design. Pod drives and joystick controls provide masterful control, secure handholds wherever they are needed lend security and comfort, and 360-degree sightlines at the helm allow for optimal awareness while underway. All of these features wrapped up in classic Downeast lines make the Sabre 38 Salon Express “a boat that boaters recognize.”\n\nThe interior of the Sabre 38 Salon Express is an open design which suits a day’s outing with friends as easily as it does a longer cruise. Below, her galley, lower lounge, and master berth benefit from abundant daylight while providing a luxurious oasis for owners and guests. The roomy and versatile cockpit is the perfect outdoor space to compliment her equally clever salon."));
        boats.stream().forEach(boat -> {
          boatService.create(boat);
        });
      }
    };
  }

}
