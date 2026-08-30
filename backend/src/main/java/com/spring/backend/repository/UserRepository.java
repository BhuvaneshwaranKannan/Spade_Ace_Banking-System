package com.spring.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.spring.backend.models.User;

@Component
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(Long phone);
}
