package com.javaflappybird.game.service;

import com.javaflappybird.game.model.Session;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    // Creating a new session
    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    // Get all user sessions
    public List<Session> getSessionsByUser(User user) {
        return sessionRepository.findByUser(user);
    }

    // Getting session by ID
    public Optional<Session> getSessionById(Integer sessionId) {
        return sessionRepository.findById(sessionId);
    }

    // Deleting a session
    public void deleteSession(Integer sessionId) {
        sessionRepository.deleteById(sessionId);
    }
}

