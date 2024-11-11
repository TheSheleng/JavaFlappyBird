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

    // Создание новой сессии
    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    // Получение всех сессий пользователя
    public List<Session> getSessionsByUser(User user) {
        return sessionRepository.findByUser(user);
    }

    // Получение сессии по ID
    public Optional<Session> getSessionById(Integer sessionId) {
        return sessionRepository.findById(sessionId);
    }

    // Удаление сессии
    public void deleteSession(Integer sessionId) {
        sessionRepository.deleteById(sessionId);
    }
}

