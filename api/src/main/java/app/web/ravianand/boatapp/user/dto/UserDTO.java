package app.web.ravianand.boatapp.user.dto;

import org.springframework.hateoas.server.core.Relation;

import lombok.Data;

@Relation(itemRelation = "user", collectionRelation = "users")
@Data
public class UserDTO {

  private Long id;
  private String username;
  private String firstName;
  private String lastName;

}
