package app.web.ravianand.boatapp.boat.assembler;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.modelmapper.ModelMapper;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import app.web.ravianand.boatapp.boat.Boat;
import app.web.ravianand.boatapp.boat.BoatController;
import app.web.ravianand.boatapp.boat.dto.BoatDTO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BoatModelAssembler implements RepresentationModelAssembler<Boat, EntityModel<BoatDTO>> {

  private final ModelMapper modelMapper;

  @Override
  public EntityModel<BoatDTO> toModel(Boat boat) {
    BoatDTO boatDTO = modelMapper.map(boat, BoatDTO.class);
    return EntityModel.of(
        boatDTO,
        linkTo(methodOn(BoatController.class).one(boat.getId())).withSelfRel(),
        linkTo(methodOn(BoatController.class).all()).withRel("boats"));
  }

}
