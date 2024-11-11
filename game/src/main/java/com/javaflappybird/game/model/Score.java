package com.javaflappybird.game.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "scores", indexes = {
        @Index(name = "idx_user_id", columnList = "user_id")
})
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "score_id")
    private Integer scoreId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "play_date", nullable = false)
    private LocalDateTime playDate;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "message", nullable = true, length = 500)
    private String message;
}