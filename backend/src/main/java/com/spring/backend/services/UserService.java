package com.spring.backend.services;

import com.spring.backend.models.User;
import com.spring.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()->new RuntimeException("User not found"));
    }

    public User getUserByPhone(Long phone) {
        return userRepository.findById(phone).orElseThrow(()->new RuntimeException("User not found"));
    }
}
