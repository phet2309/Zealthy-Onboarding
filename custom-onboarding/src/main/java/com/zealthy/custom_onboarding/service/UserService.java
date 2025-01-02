package com.zealthy.custom_onboarding.service;

import com.zealthy.custom_onboarding.exception.ResourceNotFoundException;
import com.zealthy.custom_onboarding.model.Users;
import com.zealthy.custom_onboarding.postprocessor.PostprocessingStrategyFactory;
import com.zealthy.custom_onboarding.repository.CrudRepository;
import com.zealthy.custom_onboarding.repository.UserRepository;
import com.zealthy.custom_onboarding.validation.ValidationStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

// Performs business logic for users table
@Service
@Log4j2
public class UserService extends CrudService<Users> implements UserDetailsService {
    private final UserRepository userRepository;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public UserService(CrudRepository<Users> crudRepository, ValidationStrategyFactory validationStrategyFactory,
                       PostprocessingStrategyFactory postprocessingStrategyFactory, UserRepository userRepository) {
        super(crudRepository, validationStrategyFactory, postprocessingStrategyFactory);
        this.userRepository = userRepository;

    }

    @Transactional
    public Optional<Users> findUserByEmail(String email) {
        log.info("Fetching user with email: {}", email);
        var user = userRepository.findUserByEmail(email);
        if (user.isEmpty()) {
            log.error("User with email: {} not found", email);
            throw new ResourceNotFoundException("User with the email not found.");
        }
        return user;
    }

    @Transactional
    @Override
    public Users save(Users entity) {
        log.info("Saving entity: {}", entity);
        validationStrategyFactory.getValidationStrategy(entity).validate(entity);
        entity.setPassword(encoder.encode(entity.getPassword()));
        Users savedEntity = userRepository.save(entity);
        postprocessingStrategyFactory.getPostprocessingStrategy(entity).postProcess(savedEntity);
        log.info("Entity saved: {}", savedEntity);
        return savedEntity;
    }

    public boolean authenticateUser(String email, String password) {
        Optional<Users> usersOptional = findUserByEmail(email);
        if(usersOptional.isPresent()) {
            Users user = usersOptional.get();
            return BCrypt.checkpw(password, user.getPassword());
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> userOptional = userRepository.findUserByEmail(email);
        Users user = userOptional.orElseThrow(() -> {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("User not found");
        });
        return user;
    }
}
