package com.zealthy.custom_onboarding.controller;

import com.zealthy.custom_onboarding.dto.LoginRequest;
import com.zealthy.custom_onboarding.dto.TokenResponse;
import com.zealthy.custom_onboarding.model.Users;
import com.zealthy.custom_onboarding.security.JwtTokenProvider;
import com.zealthy.custom_onboarding.service.CrudService;
import com.zealthy.custom_onboarding.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


// Users controller to intercept /v1/users request
@Slf4j
@RestController
@RequestMapping("/v1/users")
public class UserController extends CrudController<Users> {

    private JwtTokenProvider jwtTokenProvider;

    public UserController(CrudService<Users> crudService, JwtTokenProvider jwtTokenProvider) {
        super(crudService);
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/email")
    public ResponseEntity<?> getUser(@RequestParam String email) {
        log.info("Fetching user with email: {} ", email);
        return ResponseEntity.ok(((com.zealthy.custom_onboarding.service.UserService) crudService).findUserByEmail(email));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        log.info("Attempting login for user: {}", request.getEmail());

        UserService userService = (UserService) crudService;
        boolean isAuthenticated = userService.authenticateUser(request.getEmail(),
                        request.getPassword());
        if (!isAuthenticated) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(request.getEmail());

        return ResponseEntity.ok()
                .body(new TokenResponse(token, "Log in successful"));

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody(required = false) Object payload) {
        log.info("Logout endpoint called");
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok()
                .body("Logged out successfully!");
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return new ResponseEntity<>("Invalid token format", HttpStatus.BAD_REQUEST);
        }

        String jwtToken = token.substring(7);

        try {
            boolean isValid = jwtTokenProvider.validateToken(jwtToken);
            if (isValid) {
                return new ResponseEntity<>("Token is valid", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Token is invalid", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error validating token: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}




