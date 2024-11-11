package com.javaflappybird.game.service;

import com.javaflappybird.game.model.Session;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.SessionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @InjectMocks
    private SessionService sessionService;

    private User user;
    private Session session;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUserId(1);
        user.setUsername("testUser");

        session = new Session();
        session.setSessionId(1);
        session.setUser(user);
        session.setStartTime(LocalDateTime.now());
    }

    @Test
    void testGetSessionsByUser() {
        when(sessionRepository.findByUser(user)).thenReturn(List.of(session));

        List<Session> sessions = sessionService.getSessionsByUser(user);

        assertNotNull(sessions);
        assertFalse(sessions.isEmpty());
        assertEquals(1, sessions.size());
        verify(sessionRepository).findByUser(user);
    }
}

