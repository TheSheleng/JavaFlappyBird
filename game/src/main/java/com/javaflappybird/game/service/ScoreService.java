package com.javaflappybird.game.service;

import com.javaflappybird.game.model.Score;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    // Create a new score
    public Score createScore(Score score) {
        System.out.println("Saving score: " + score);
        return scoreRepository.save(score);
    }

    // Get all user points
    public List<Score> getScoresByUser(User user) {
        return scoreRepository.findByUser(user);
    }

    // Getting all the points in a certain time interval
    public List<Score> getScoresByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return scoreRepository.findByPlayDateBetween(startDate, endDate);
    }

    // Getting a score by ID
    public Optional<Score> getScoreById(Integer scoreId) {
        return scoreRepository.findById(scoreId);
    }

    // Deleting a point
    public void deleteScore(Integer scoreId) {
        scoreRepository.deleteById(scoreId);
    }
}
