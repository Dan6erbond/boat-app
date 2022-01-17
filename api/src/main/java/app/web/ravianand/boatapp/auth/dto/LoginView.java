package app.web.ravianand.boatapp.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginView {

  private Long userId;
  private String username;
  private String accessToken;

}
