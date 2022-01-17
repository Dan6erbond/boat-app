package app.web.ravianand.boatapp.boat;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import app.web.ravianand.boatapp.ErrorResponseBuilder;
import app.web.ravianand.boatapp.boat.exceptions.BoatNotFoundException;

@ControllerAdvice
public class BoatControllerAdvice {

  @Autowired
  private ErrorResponseBuilder errorResponseBuilder;

  @ResponseBody
  @ExceptionHandler(BoatNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public Map<String, Object> handleBoatNotFoundException(BoatNotFoundException ex) {
    Map<String, String> errors = new HashMap<>();
    errors.put("id", ex.getMessage());
    return errorResponseBuilder.buildErrorResponse(errors);
  }

}
