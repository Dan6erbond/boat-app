package app.web.ravianand.boatapp;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class ErrorResponseBuilder {

  public Map<String, Object> buildErrorResponse(Map<String, String> errors) {
    Map<String, Object> response = new HashMap<>();
    response.put("errors", errors);
    return response;
  }

}
