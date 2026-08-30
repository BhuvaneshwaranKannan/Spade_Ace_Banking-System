package com.spring.backend.controller;

import com.spring.backend.models.User;
import com.spring.backend.repository.UserRepository;
import com.spring.backend.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    private User getAuthenticatedUser(String tokenHeader) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = tokenHeader.substring(7);
        if (!jwtUtils.validateJwtToken(token)) {
            return null;
        }
        String userIdStr = jwtUtils.extractUserId(token);
        Long userId = Long.valueOf(userIdStr);
        return userRepository.findById(userId).orElse(null);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String tokenHeader) {
        try {
            User user = getAuthenticatedUser(tokenHeader);
            if (user == null) {
                return new ResponseEntity<>("Unauthorized or User not found", HttpStatus.UNAUTHORIZED);
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestHeader("Authorization") String tokenHeader, @RequestBody java.util.Map<String, Object> body) {
        try {
            User user = getAuthenticatedUser(tokenHeader);
            if (user == null) {
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
            Object amountObj = body.get("amount");
            if (amountObj == null) {
                return new ResponseEntity<>("Invalid amount", HttpStatus.BAD_REQUEST);
            }
            Long amount = ((Number) amountObj).longValue();
            if (amount <= 0) {
                return new ResponseEntity<>("Invalid amount", HttpStatus.BAD_REQUEST);
            }
            user.setBalance(user.getBalance() + amount);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestHeader("Authorization") String tokenHeader, @RequestBody java.util.Map<String, Object> body) {
        try {
            User user = getAuthenticatedUser(tokenHeader);
            if (user == null) {
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
            Object amountObj = body.get("amount");
            if (amountObj == null) {
                return new ResponseEntity<>("Invalid amount", HttpStatus.BAD_REQUEST);
            }
            Long amount = ((Number) amountObj).longValue();
            if (amount <= 0) {
                return new ResponseEntity<>("Invalid amount", HttpStatus.BAD_REQUEST);
            }
            if (user.getBalance() < amount) {
                return new ResponseEntity<>("Insufficient balance", HttpStatus.BAD_REQUEST);
            }
            user.setBalance(user.getBalance() - amount);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/phone")
    public ResponseEntity<?> phone(@RequestHeader("Authorization") String tokenHeader, @RequestBody java.util.Map<String, Object> body) {
        try {
            User user = getAuthenticatedUser(tokenHeader);
            if (user == null) {
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            }
            Object phoneObj = body.get("phone");
            if (phoneObj == null) {
                return new ResponseEntity<>("Invalid Phone Number", HttpStatus.BAD_REQUEST);
            }
            Long phone = ((Number) phoneObj).longValue();
            int count = (int) Math.log10(phone) + 1;
            if (count != 10) {
                return new ResponseEntity<>("Invalid Phone Number", HttpStatus.BAD_REQUEST);
            }
            user.setPhone(phone);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
