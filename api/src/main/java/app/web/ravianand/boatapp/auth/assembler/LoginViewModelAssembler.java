package app.web.ravianand.boatapp.auth.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;

import app.web.ravianand.boatapp.auth.dto.LoginView;
import app.web.ravianand.boatapp.user.UserController;

public class LoginViewModelAssembler implements RepresentationModelAssembler<LoginView, EntityModel<LoginView>> {

  @Override
  public EntityModel<LoginView> toModel(LoginView loginView) {
    return EntityModel.of(
        loginView,
        linkTo(methodOn(UserController.class).one(loginView.getUserId())).withSelfRel());
  }

}
