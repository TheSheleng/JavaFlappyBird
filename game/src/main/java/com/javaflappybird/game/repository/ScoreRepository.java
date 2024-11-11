package com.javaflappybird.game.repository;

import com.javaflappybird.game.model.Score;
import com.javaflappybird.game.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Integer> {
    List<Score> findByUser(User user);
    List<Score> findByPlayDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}