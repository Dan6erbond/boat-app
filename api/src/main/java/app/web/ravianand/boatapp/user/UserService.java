package app.web.ravianand.boatapp.user;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.web.ravianand.boatapp.user.dto.CreateUserRequest;
import app.web.ravianand.boatapp.user.exceptions.UserNotFoundException;
import app.web.ravianand.boatapp.user.exceptions.UsernameAlreadyExistsException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public User create(CreateUserRequest request) {
    if (userRepository.findByUsername(request.getUsername()).isPresent()) {
      throw new UsernameAlreadyExistsException(request.getUsername());
    }
    User user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()),
        request.getFirstName(), request.getLastName());
    return userRepository.save(user);
  }

  public User one(Long id) {
    return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username not found " + username));
  }

  public List<User> all() {
    return userRepository.findAll();
  }

}
