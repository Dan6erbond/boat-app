package app.web.ravianand.boatapp.boat.exceptions;

public class BoatNotFoundException extends RuntimeException {
  public BoatNotFoundException(Long id) {
    super("Could not find boat " + id);
  }
}
