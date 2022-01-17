package app.web.ravianand.boatapp.security;

import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import lombok.Data;

@Component
@ConfigurationProperties("jwt")
@Validated
@Data
public class JwtProperties {

  @NotNull
  private String secret;

}
