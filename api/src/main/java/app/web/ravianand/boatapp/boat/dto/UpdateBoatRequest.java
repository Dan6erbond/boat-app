package app.web.ravianand.boatapp.boat.dto;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBoatRequest {

  private String name;

  @Size(min = 10, message = "Description must be at least 10 characters long")
  private String description;

}
