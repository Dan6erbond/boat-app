package app.web.ravianand.boatapp.auth.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import app.web.ravianand.boatapp.auth.dto.RegisterView;
import app.web.ravianand.boatapp.user.UserController;

@Component
public class RegisterViewModelAssembler
    implements RepresentationModelAssembler<RegisterView, EntityModel<RegisterView>> {

  @Override
  public EntityModel<RegisterView> toModel(RegisterView registerView) {
    return EntityModel.of(
        registerView,
        linkTo(methodOn(UserController.class).one(registerView.getUser().getId())).withSelfRel());
  }

}
