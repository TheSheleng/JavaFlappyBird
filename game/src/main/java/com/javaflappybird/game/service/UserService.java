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

    // Регистрация пользователя
    public void registerUser(String username, String email, String rawPassword) {
        // Проверка существующего пользователя
        if (userRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException("Username already taken");
        }

        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        // Пример простой проверки некорректных данных
        if (username == null || username.trim().isEmpty()) {
            throw new InvalidDataException("Username cannot be empty");
        }

        if (rawPassword.length() < 8) {
            throw new InvalidDataException("Password must be at least 8 characters");
        }

        // Создание пользователя с хэшированным паролем
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setCreatedAt(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(rawPassword));

        userRepository.save(user);
    }

    // Получение пользователя по имени
    public Optional<User> getUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    // Получение пользователя по email
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    // Получение пользователя по ID
    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    // Удаление пользователя
    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}
