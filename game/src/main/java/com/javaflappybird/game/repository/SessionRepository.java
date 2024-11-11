package com.javaflappybird.game.repository;

import com.javaflappybird.game.model.Session;
import com.javaflappybird.game.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Integer> {
    List<Session> findByUser(User user);
}
