package com.javaflappybird.game.repository;

import com.javaflappybird.game.model.PasswordResetToken;
import com.javaflappybird.game.model.Score;
import com.javaflappybird.game.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    PasswordResetToken findByToken(String token);
}
