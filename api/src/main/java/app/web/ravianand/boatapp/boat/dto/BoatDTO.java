package app.web.ravianand.boatapp.boat.dto;

import org.springframework.hateoas.server.core.Relation;

import lombok.Data;

@Relation(itemRelation = "boat", collectionRelation = "boats")
@Data
public class BoatDTO {

  private Long id;
  private String name;
  private String description;

}
