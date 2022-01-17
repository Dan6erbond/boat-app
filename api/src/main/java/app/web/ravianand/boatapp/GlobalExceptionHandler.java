package app.web.ravianand.boatapp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import app.web.ravianand.boatapp.user.exceptions.UsernameAlreadyExistsException;

@ControllerAdvice
public class GlobalExceptionHandler {

  @Autowired
  private ErrorResponseBuilder errorResponseBuilder;

  @ResponseBody
  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors().forEach((error) -> {
      errors.put(error.getField(), error.getDefaultMessage());
    });
    return errorResponseBuilder.buildErrorResponse(errors);
  }

  @ResponseBody
  @ExceptionHandler(UsernameAlreadyExistsException.class)
  public Map<String, Object> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex) {
    Map<String, String> errors = new HashMap<>();
    errors.put("username", ex.getMessage());
    return errorResponseBuilder.buildErrorResponse(errors);
  }

}
