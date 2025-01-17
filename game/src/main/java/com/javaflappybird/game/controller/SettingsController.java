package com.javaflappybird.game.controller;

import com.javaflappybird.game.CurrentUser;
import com.javaflappybird.game.component.CookieUtil;
import com.javaflappybird.game.component.JwtUtil;
import com.javaflappybird.game.dto.SettingsUpdateRequest;
import com.javaflappybird.game.model.PasswordResetToken;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.PasswordResetTokenRepository;
import com.javaflappybird.game.repository.UserRepository;
import com.javaflappybird.game.service.PasswordResetService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Controller
@RequestMapping("/settings")
public class SettingsController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordResetService passwordResetService;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SettingsController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public String settings(
            @CurrentUser User user,
            Model model
    ) {
        model.addAttribute("avatarUrl", user.getAvatarUrl());
        model.addAttribute("username", user.getUsername());
        model.addAttribute("description", user.getDescription());
        return "settings";
    }

    @PostMapping("/update")
    public String updateSettings(
            @CurrentUser User user,
            @ModelAttribute SettingsUpdateRequest updateRequest,
            HttpServletResponse response,
            Model model
    ) {
        String[] allowedExtensions = {"jpg", "jpeg", "png"};

        String originalFileName = updateRequest.getAvatar().getOriginalFilename();

        if (originalFileName != null && !originalFileName.isEmpty()) {
            String fileExtension = getFileExtension(originalFileName).toLowerCase();

            // Check if the file extension is allowed
            if (!isValidFileExtension(fileExtension, allowedExtensions)) {
                model.addAttribute("error", "Invalid file format. Supported formats: jpg, jpeg, png.");
                return "settings/";
            }
        }

        // Processing the uploaded file
        if (updateRequest.getAvatar() != null && !updateRequest.getAvatar().isEmpty()) {
            try {
                String uniqueFileName = generateUniqueFileName(originalFileName);

                Path path = Paths.get("uploads/avatars/" + uniqueFileName);

                Files.write(path, updateRequest.getAvatar().getBytes());

                // Save the file path in the model or database
                user.setAvatarUrl(path.toString());
            } catch (IOException e) {
                model.addAttribute("error", "Error loading file.");
                return "settings/";
            }
        }

        if (updateRequest.getUsername() != null && !updateRequest.getUsername().isEmpty()) {
            user.setUsername(updateRequest.getUsername());
        }
        if (updateRequest.getDescription() != null && !updateRequest.getDescription().isEmpty()) {
            user.setDescription(updateRequest.getDescription());
        }

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername());
        CookieUtil.setJwtCookie(token, response);

        return "redirect:/menu";
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        return dotIndex != -1 ? fileName.substring(dotIndex + 1) : "";
    }

    private boolean isValidFileExtension(String fileExtension, String[] allowedExtensions) {
        for (String allowed : allowedExtensions) {
            if (allowed.equals(fileExtension)) {
                return true;
            }
        }
        return false;
    }

    private String generateUniqueFileName(String originalFileName) {
        String extension = getFileExtension(originalFileName);
        String uniqueName = UUID.randomUUID().toString();
        return uniqueName + "." + extension;
    }

    @PostMapping("/newPasswordRequest")
    public String newPasswordRequest(
            @CurrentUser User user
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
