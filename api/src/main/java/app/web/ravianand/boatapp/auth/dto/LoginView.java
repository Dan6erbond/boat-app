package app.web.ravianand.boatapp.auth.dto;

import app.web.ravianand.boatapp.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginView {

  private String accessToken;
  private UserDTO user;

}
