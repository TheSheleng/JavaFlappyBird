package com.javaflappybird.game.service;

import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Создание нового пользователя
    public User createUser(User user) {
        return userRepository.save(user);
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
