package app.web.ravianand.boatapp.auth;

import javax.validation.Valid;

import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.web.ravianand.boatapp.auth.assembler.LoginViewModelAssembler;
import app.web.ravianand.boatapp.auth.dto.LoginRequest;
import app.web.ravianand.boatapp.auth.dto.LoginView;
import app.web.ravianand.boatapp.security.JwtTokenUtil;
import app.web.ravianand.boatapp.user.User;
import app.web.ravianand.boatapp.user.UserService;
import app.web.ravianand.boatapp.user.assembler.UserModelAssembler;
import app.web.ravianand.boatapp.user.dto.CreateUserRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenUtil jwtTokenUtil;
  private final UserService userService;
  private final UserModelAssembler userModelAssembler;
  private final LoginViewModelAssembler loginViewAssembler;

  @PostMapping("/login")
  public ResponseEntity<EntityModel<LoginView>> login(@Valid @RequestBody LoginRequest loginRequest) {
    try {
      authenticationManager.authenticate(loginRequest.toAuthenticationToken());
      User user = (User) userService.loadUserByUsername(loginRequest.getUsername());
      return ResponseEntity.ok()
          .body(
              loginViewAssembler
                  .toModel(new LoginView(user.getId(), loginRequest.getUsername(), loginRequest.getPassword(),
                      jwtTokenUtil.generateAccessToken(user))));
    } catch (Exception e) {
      System.out.println("/--------------------WRONG PASSWORD-----------------");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }

  @PostMapping("/register")
  EntityModel<User> create(@Valid @RequestBody CreateUserRequest request) {
    return userModelAssembler.toModel(userService.create(request));
  }

}
