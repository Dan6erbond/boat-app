package app.web.ravianand.boatapp.user.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.modelmapper.ModelMapper;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import app.web.ravianand.boatapp.user.User;
import app.web.ravianand.boatapp.user.UserController;
import app.web.ravianand.boatapp.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserModelAssembler implements RepresentationModelAssembler<User, EntityModel<UserDTO>> {

  private final ModelMapper modelMapper;

  @Override
  public EntityModel<UserDTO> toModel(User user) {
    UserDTO userDTO = modelMapper.map(user, UserDTO.class);
    return EntityModel.of(
        userDTO,
        linkTo(methodOn(UserController.class).one(user.getId())).withSelfRel(),
        linkTo(methodOn(UserController.class).all()).withRel("users"));
  }

}
