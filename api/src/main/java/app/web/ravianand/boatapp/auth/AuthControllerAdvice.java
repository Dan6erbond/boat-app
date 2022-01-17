package app.web.ravianand.boatapp.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import app.web.ravianand.boatapp.ErrorResponseBuilder;

@ControllerAdvice
public class AuthControllerAdvice {

  @Autowired
  private ErrorResponseBuilder errorResponseBuilder;

  @ResponseBody
  @ExceptionHandler(AuthenticationException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public Map<String, Object> handleAuthenticationException(AuthenticationException ex) {
    Map<String, String> errors = new HashMap<>();
    errors.put("password", ex.getMessage());
    return errorResponseBuilder.buildErrorResponse(errors);
  }

}
