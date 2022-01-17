package app.web.ravianand.boatapp.auth.dto;

import javax.validation.constraints.NotBlank;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.Data;

@Data
public class LoginRequest {

  @NotBlank(message = "Username is mandatory")
  private String username;

  @NotBlank(message = "Password is mandatory")
  private String password;

  public UsernamePasswordAuthenticationToken toAuthenticationToken() {
    return new UsernamePasswordAuthenticationToken(username, password);
  }

}
