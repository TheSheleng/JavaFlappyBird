package com.javaflappybird.game.controller;

import com.javaflappybird.game.CurrentUser;
import com.javaflappybird.game.dto.SettingsUpdateRequest;
import com.javaflappybird.game.model.PasswordResetToken;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.PasswordResetTokenRepository;
import com.javaflappybird.game.repository.UserRepository;
import com.javaflappybird.game.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping("/settings")
public class SettingsController {

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    private static final String UPLOAD_DIR = "uploads/";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SettingsController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/update")
    public String updateSettings(
            @ModelAttribute SettingsUpdateRequest updateRequest,
            Model model
    ) {

        return "redirect:/menu";
    }

    @PostMapping("/newPasswordRequest")
    public String newPasswordRequest(
            @CurrentUser User user,
            RedirectAttributes redirectAttributes
    ) {
        passwordResetService.sendPasswordResetEmail(user.getEmail());

        return "redirect:/info?message=Message sent. Check your mail. (" + user.getEmail() + ")";
    }

    @PostMapping("/resetPassword")
    public String resetPassword(
            @RequestParam("token") String token,
            @RequestParam("newPassword") String newPassword,
            Model model
    ) {
        // Check for empty parameters
        if (token == null || token.isEmpty()) {
            return "redirect:/info?message=Token cannot be empty";
        } else if (newPassword == null || newPassword.isEmpty()) {
            return "redirect:/info?message=Password cannot be empty";
        }

        // Searching for a token in the database
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);

        // Проверка на существование токена
        if (resetToken == null) {
            return "redirect:/info?message=Invalid or expired token";
        }

        // Check for token expiration
        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken); // Удаляем истёкший токен
            return "redirect:/info?message=Token has expired";
        }

        // Get the user associated with the token
        User user = resetToken.getUser();
        if (user == null) {
            return "redirect:/info?message=User not found for the provided token";
        }

        // Update user password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Remove used token
        passwordResetTokenRepository.delete(resetToken);

        // Return a successful response
        return "redirect:/menu";
    }
}
