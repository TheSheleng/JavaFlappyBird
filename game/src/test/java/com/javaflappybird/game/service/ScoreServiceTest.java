package com.javaflappybird.game.service;

import com.javaflappybird.game.model.Score;
import com.javaflappybird.game.model.Session;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.ScoreRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ScoreServiceTest {

    @Mock
    private ScoreRepository scoreRepository;

    @InjectMocks
    private ScoreService scoreService;

    private User user;
    private Score score;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .userId(1)
                .username("testUser")
                .email("test@example.com")
                .passwordHash("hashedPassword")
                .salt("salt")
                .createdAt(LocalDateTime.now())
                .build();

        score = Score.builder()
                .scoreId(1)
                .user(user)
                .score(100)
                .playDate(LocalDateTime.now())
                .message("Great score!")
                .build();
    }


    @Test
    void testCreateScore() {
        when(scoreService.createScore(score)).thenReturn(score);

        Score createdScore = scoreService.createScore(score);

        assertNotNull(createdScore);
        assertEquals(score.getScore(), createdScore.getScore());
    }

    @Test
    void testGetScoresByUser() {
        when(scoreRepository.findByUser(user)).thenReturn(List.of(score));

        List<Score> sessions = scoreService.getScoresByUser(user);

        assertNotNull(sessions);
        assertFalse(sessions.isEmpty());
        assertEquals(1, sessions.size());
        verify(scoreRepository).findByUser(user);
    }

    @Test
    void testGetScoresByDateRange() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now();

        when(scoreRepository.findByPlayDateBetween(startDate, endDate)).thenReturn(List.of(score));

        List<Score> scores = scoreService.getScoresByDateRange(startDate, endDate);

        assertNotNull(scores);
        assertFalse(scores.isEmpty());
        verify(scoreRepository, times(1)).findByPlayDateBetween(startDate, endDate);
    }

    @Test
    void testGetScoreById() {
        when(scoreRepository.findById(1)).thenReturn(Optional.of(score));

        Optional<Score> foundScore = scoreService.getScoreById(1);

        assertTrue(foundScore.isPresent());
        assertEquals(score.getScoreId(), foundScore.get().getScoreId());
        verify(scoreRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteScore() {
        doNothing().when(scoreRepository).deleteById(1);

        scoreService.deleteScore(1);

        verify(scoreRepository, times(1)).deleteById(1);
    }
}