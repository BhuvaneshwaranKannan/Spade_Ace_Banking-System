package com.spring.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.backend.models.User;
import com.spring.backend.repository.UserRepository;
import com.spring.backend.services.UserService;
import com.spring.backend.utils.JwtUtils;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> body) {
        Long userId;
        try {
            userId = Long.valueOf(body.get("userId"));
        } catch (NumberFormatException | NullPointerException exception) {
            return ResponseEntity.badRequest().body("User ID must be a number");
        }
        String password = body.get("password");
        String phoneValue = body.get("phone");

        if (password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        if (phoneValue == null || !phoneValue.matches("\\d{10}")) {
            return ResponseEntity.badRequest().body("Phone number must contain exactly 10 digits");
        }

        Long phone = Long.valueOf(phoneValue);

        password = passwordEncoder.encode(password);

        if (userRepository.findById(userId).isPresent()) {
            return new ResponseEntity<>("UserId already Existing", HttpStatus.CONFLICT);
        }

        userService.createUser(
                User.builder()
                        .id(userId)
                        .password(password)
                        .phone(phone)
                        .build());

        return new ResponseEntity<>("User Registered Successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> body) {

        System.out.println("Login api hit");

        String identifier = body.get("id");
        if (identifier != null) {
            identifier = identifier.trim().replaceAll("[\\s-]", "");
            if (identifier.startsWith("+91")) {
                identifier = identifier.substring(3);
            } else if (identifier.startsWith("91") && identifier.length() == 12) {
                identifier = identifier.substring(2);
            }
        }
        Long identifierNumber;
        try {
            identifierNumber = Long.valueOf(identifier);
        } catch (NumberFormatException | NullPointerException exception) {
            return ResponseEntity.badRequest().body("User ID or phone number must be a number");
        }
        String password = body.get("password");

        if (password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        var userOptional = userRepository.findById(identifierNumber)
                .or(() -> userRepository.findByPhone(identifierNumber));

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User Not Registered", HttpStatus.UNAUTHORIZED);
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>("Invalid User", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtils.generateToken(user.getId());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
