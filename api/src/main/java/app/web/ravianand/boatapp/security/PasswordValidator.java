package app.web.ravianand.boatapp.security;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<PasswordConstraint, String> {

  // digit + lowercase char + uppercase char + punctuation + symbol
  private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";

  private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

  @Override
  public void initialize(PasswordConstraint passwordConstraint) {
  }

  @Override
  public boolean isValid(final String password, final ConstraintValidatorContext ctx) {
    Matcher matcher = pattern.matcher(password);
    return matcher.matches();
  }

}
