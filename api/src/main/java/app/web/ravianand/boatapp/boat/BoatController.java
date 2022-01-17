package app.web.ravianand.boatapp.boat;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.web.ravianand.boatapp.boat.assembler.BoatModelAssembler;
import app.web.ravianand.boatapp.boat.dto.BoatDTO;
import app.web.ravianand.boatapp.boat.dto.CreateBoatRequest;
import app.web.ravianand.boatapp.boat.dto.UpdateBoatRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/boats")
@RequiredArgsConstructor
public class BoatController {

  private final BoatService boatService;
  private final BoatModelAssembler boatModelAssembler;

  @PostMapping
  public EntityModel<BoatDTO> create(@RequestBody @Valid CreateBoatRequest request) {
    return boatModelAssembler.toModel(boatService.create(request));
  }

  @GetMapping
  public CollectionModel<EntityModel<BoatDTO>> all() {
    List<EntityModel<BoatDTO>> boats = boatService.all().stream().map(boatModelAssembler::toModel)
        .collect(Collectors.toList());

    return CollectionModel.of(boats, linkTo(methodOn(BoatController.class).all()).withSelfRel());
  }

  @GetMapping("/{id}")
  public EntityModel<BoatDTO> one(@PathVariable Long id) {
    return boatModelAssembler.toModel(boatService.one(id));
  }

  @PutMapping("/{id}")
  public EntityModel<BoatDTO> update(@PathVariable Long id, @RequestBody @Valid UpdateBoatRequest request) {
    return boatModelAssembler.toModel(boatService.update(id, request));
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    boatService.delete(id);
  }

}
