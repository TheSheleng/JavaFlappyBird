package com.javaflappybird.game.repository;

import com.javaflappybird.game.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByGoogleId(String googleId);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
