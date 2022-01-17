package app.web.ravianand.boatapp.user;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import app.web.ravianand.boatapp.user.assembler.UserModelAssembler;
import lombok.RequiredArgsConstructor;

@RestController("/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;
  private final UserModelAssembler userModelAssembler;

  @GetMapping
  public CollectionModel<EntityModel<User>> all() {
    List<EntityModel<User>> users = userService.all().stream().map(userModelAssembler::toModel)
        .collect(Collectors.toList());

    return CollectionModel.of(
        users,
        linkTo(methodOn(UserController.class).all()).withSelfRel());
  }

  @GetMapping("/{id}")
  public EntityModel<User> one(@PathVariable Long id) {
    return userModelAssembler.toModel(userService.one(id));
  }

}
