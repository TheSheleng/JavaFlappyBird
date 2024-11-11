package com.javaflappybird.game.service;

import com.javaflappybird.game.exception.UserNotFoundException;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;  // Мок репозитория

    @InjectMocks
    private UserService userService;  // Сервис, который тестируем

    private User user;

    @BeforeEach
    void setUp() {
        // Подготовка данных для тестов
        user = User.builder()
                .userId(1)
                .username("testUser")
                .email("test@example.com")
                .build();
    }

    @Test
    void testGetUserByUsername() {
        // Настройка поведения мок-объекта
        when(userRepository.findByUsername("testUser")).thenReturn(user);

        // Вызов метода сервиса
        Optional<User> foundUser = userService.getUserByUsername("testUser");

        // Проверки
        foundUser.ifPresent(user -> {
            assertNotNull(user);
            assertEquals("testUser", user.getUsername());
            verify(userRepository).findByUsername("testUser");  // Проверка вызова метода репозитория
        });
    }

    @Test
    void testGetUserByEmail() {
        // Настройка поведения мок-объекта
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);

        // Вызов метода сервиса
        Optional<User> foundUser = userService.getUserByEmail("test@example.com");

        // Проверки
        foundUser.ifPresent(user -> {
            assertNotNull(user);
            assertEquals("test@example.com", user.getEmail());
            verify(userRepository).findByEmail("test@example.com");  // Проверка вызова метода репозитория
        });
    }

    @Test
    void testGetUserByUsernameNotFound() {
        // Настройка поведения мок-объекта для случая, когда пользователь не найден
        when(userRepository.findByUsername("nonexistentUser")).thenReturn(null);

        Optional<User> foundUser = userService.getUserByUsername("nonexistentUser");

        // Проверки
        assertTrue(foundUser.isEmpty(), "Expected Optional to be empty");
        Exception exception = assertThrows(UserNotFoundException.class, () -> {
            foundUser.orElseThrow(() -> new UserNotFoundException("User with username nonexistentUser not found"));
        });
        assertEquals("User with username nonexistentUser not found", exception.getMessage());
    }
}

