package com.javaflappybird.game.service;

import com.javaflappybird.game.model.PasswordResetToken;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.PasswordResetTokenRepository;
import com.javaflappybird.game.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Async
    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Генерация токена
            String token = UUID.randomUUID().toString();

            // Создание и сохранение токена
            PasswordResetToken passwordResetToken = new PasswordResetToken();
            passwordResetToken.setToken(token);
            passwordResetToken.setCreatedAt(LocalDateTime.now());
            passwordResetToken.setUser(user);
            passwordResetTokenRepository.save(passwordResetToken);

            // Контекст для шаблона
            Context context = new Context();
            context.setVariable("token", token);

            // Генерация HTML из шаблона
            String htmlContent = templateEngine.process("password-reset-email", context);

            // Отправка письма
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
                helper.setTo(user.getEmail());
                helper.setSubject("Password Reset Request");
                helper.setText(htmlContent, true);
                mailSender.send(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}