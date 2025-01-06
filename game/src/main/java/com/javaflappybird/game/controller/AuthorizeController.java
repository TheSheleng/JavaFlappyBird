package com.javaflappybird.game.controller;

import com.javaflappybird.game.component.CookieUtil;
import com.javaflappybird.game.component.JwtUtil;
import com.javaflappybird.game.dto.AuthRequest;
import com.javaflappybird.game.dto.RegisterRequest;
import com.javaflappybird.game.exception.InvalidDataException;
import com.javaflappybird.game.exception.UserAlreadyExistsException;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.UserRepository;
import com.javaflappybird.game.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/auth")
public class AuthorizeController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(
            @ModelAttribute AuthRequest authRequest,
            HttpServletResponse response,
            Model model) {
        User user = userRepository.findByUsername(authRequest.getUsername());

        if (user == null) {
            model.addAttribute("errorMessage", "Invalid username or password");
            return "login";
        }

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            model.addAttribute("errorMessage", "Invalid username or password");
            return "login";
        }

        String token = jwtUtil.generateToken(authRequest.getUsername());
        CookieUtil.setJwtCookie(token, response);

        return "redirect:/menu";
    }

    @PostMapping("/register")
    public String register(
            @ModelAttribute RegisterRequest registerRequest,
            HttpServletResponse response,
            Model model) {
        try {
            userService.registerUser(registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());

            String token = jwtUtil.generateToken(registerRequest.getUsername());
            CookieUtil.setJwtCookie(token, response);

            return "redirect:/menu";
        } catch (UserAlreadyExistsException e) {
            model.addAttribute("errorMessage", "User already exists");
            return "registration";
        } catch (InvalidDataException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "registration";
        }
    }

    @PostMapping("/logout")
    public String logout(HttpServletResponse response) {
        CookieUtil.deleteJwtCookie(response);

        return "redirect:/auth/login";
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
