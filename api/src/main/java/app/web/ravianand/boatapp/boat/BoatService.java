package app.web.ravianand.boatapp.boat;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import app.web.ravianand.boatapp.boat.dto.CreateBoatRequest;
import app.web.ravianand.boatapp.boat.dto.UpdateBoatRequest;
import app.web.ravianand.boatapp.boat.exceptions.BoatNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoatService {

  private final BoatRepository boatRepository;
  private final ModelMapper modelMapper;

  public Boat create(CreateBoatRequest request) {
    Boat boat = modelMapper.map(request, Boat.class);
    return boatRepository.save(boat);
  }

  public Boat one(Long id) {
    return boatRepository.findById(id).orElseThrow(() -> new BoatNotFoundException(id));
  }

  public List<Boat> all() {
    return boatRepository.findAll();
  }

  public Boat update(Long id, UpdateBoatRequest request) {
    Boat boat = one(id);

    modelMapper.map(request, boat);

    return boatRepository.save(boat);
  }

  public void delete(Long id) {
    try {
      boatRepository.deleteById(id);
    } catch (EmptyResultDataAccessException ex) {
      throw new BoatNotFoundException(id);
    }
  }

}
