package com.javaflappybird.game.controller;

import com.javaflappybird.game.component.JwtUtil;
import com.javaflappybird.game.dto.AuthRequest;
import com.javaflappybird.game.dto.RegisterRequest;
import com.javaflappybird.game.exception.InvalidDataException;
import com.javaflappybird.game.exception.UserAlreadyExistsException;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.UserRepository;
import com.javaflappybird.game.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/auth")
public class AuthorizeController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Пример репозитория пользователей
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest) {
        User user = userRepository.findByUsername(authRequest.getUsername());
        if (user != null && passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            return jwtUtil.generateToken(user.getUsername());
        } else {
            throw new RuntimeException("Неверные учетные данные");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(
            @RequestBody RegisterRequest registerRequest,
            Model model) {
        try {
            userService.registerUser(registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());

            String token = jwtUtil.generateToken(registerRequest.getUsername());

            return ResponseEntity
                    .ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("token", token));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity
                    .status(409)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", "User already exists"));
        } catch (InvalidDataException e) {
            return ResponseEntity
                    .status(400)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "registration";
    }
}
