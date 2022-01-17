package app.web.ravianand.boatapp.auth;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.hateoas.EntityModel;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.web.ravianand.boatapp.auth.assembler.LoginViewModelAssembler;
import app.web.ravianand.boatapp.auth.assembler.RegisterViewModelAssembler;
import app.web.ravianand.boatapp.auth.dto.LoginRequest;
import app.web.ravianand.boatapp.auth.dto.LoginView;
import app.web.ravianand.boatapp.auth.dto.RegisterView;
import app.web.ravianand.boatapp.security.JwtTokenUtil;
import app.web.ravianand.boatapp.user.User;
import app.web.ravianand.boatapp.user.UserService;
import app.web.ravianand.boatapp.user.dto.CreateUserRequest;
import app.web.ravianand.boatapp.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenUtil jwtTokenUtil;
  private final UserService userService;
  private final LoginViewModelAssembler loginViewAssembler;
  private final RegisterViewModelAssembler registerViewAssembler;
  private final ModelMapper modelMapper;

  @PostMapping("/login")
  public EntityModel<LoginView> login(@Valid @RequestBody LoginRequest loginRequest) {
    authenticationManager.authenticate(loginRequest.toAuthenticationToken());
    User user = (User) userService.loadUserByUsername(loginRequest.getUsername());
    return loginViewAssembler
        .toModel(new LoginView(jwtTokenUtil.generateAccessToken(user),
            modelMapper.map(user, UserDTO.class)));
  }

  @PostMapping("/register")
  EntityModel<RegisterView> create(@Valid @RequestBody CreateUserRequest request) {
    User user = userService.create(request);
    return registerViewAssembler.toModel(new RegisterView(
        jwtTokenUtil.generateAccessToken(user), modelMapper.map(user, UserDTO.class)));
  }

}
