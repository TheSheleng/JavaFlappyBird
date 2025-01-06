package com.javaflappybird.game.service;

import com.javaflappybird.game.exception.InvalidDataException;
import com.javaflappybird.game.exception.UserAlreadyExistsException;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Для хэширования паролей

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // User registration
    public void registerUser(String username, String email, String rawPassword) {
        // Checking an existing user
        if (userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException("Username already taken");
        }

        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        // Example of a simple check for incorrect data
        if (username == null || username.trim().isEmpty()) {
            throw new InvalidDataException("Username cannot be empty");
        }

        if (rawPassword.length() < 8) {
            throw new InvalidDataException("Password must be at least 8 characters");
        }

        // Create a user with an encrypted password
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setCreatedAt(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(rawPassword));

        userRepository.save(user);
    }

    // Getting a user by name
    public Optional<User> getUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    // Getting user by email
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    // Getting user by ID
    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    // Deleting a user
    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}
