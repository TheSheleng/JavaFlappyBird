package com.javaflappybird.game.controller;

import com.javaflappybird.game.CurrentUser;
import com.javaflappybird.game.model.Score;
import com.javaflappybird.game.model.User;
import com.javaflappybird.game.repository.ScoreRepository;
import com.javaflappybird.game.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Cipher;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.time.LocalDateTime;
import java.util.Base64;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final UserRepository userRepository;
    private final ScoreRepository scoreRepository;

    private final KeyPair keyPair;

    @Autowired
    public GameController(
            UserRepository userRepository,
            ScoreRepository scoreRepository
    ) throws NoSuchAlgorithmException {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        this.keyPair = keyGen.generateKeyPair();

        this.userRepository = userRepository;
        this.scoreRepository = scoreRepository;
    }

//    @GetMapping("/publicKey")
//    public String getPublicKey() {
//        PublicKey publicKey = keyPair.getPublic();
//        String key = Base64.getEncoder().encodeToString(publicKey.getEncoded());
//        return key;
//    }
//
//    @PostMapping("/submitScore")
//    public String submitEncryptedScore(@RequestBody EncryptedDataRequest request) {
//        try {
//            byte[] encryptedData = Base64.getDecoder().decode(request.getEncryptedData());
//            Cipher cipher = Cipher.getInstance("RSA");
//            cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());
//            byte[] decryptedData = cipher.doFinal(encryptedData);
//
//            String decryptedMessage = new String(decryptedData);
//            return "Data received and decrypted: " + decryptedMessage;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error during decryption: " + e.getMessage();
//        }
//    }
//
//    public static class EncryptedDataRequest {
//        private String encryptedData;
//
//        public String getEncryptedData() {
//            return encryptedData;
//        }
//
//        public void setEncryptedData(String encryptedData) {
//            this.encryptedData = encryptedData;
//        }
//    }

    @PostMapping("/sendScore")
    public void sendScore(
            @CurrentUser User user,
            @RequestBody Integer score
    ) {
        Score newScore = new Score();
        newScore.setScore(score);
        newScore.setUser(user);
        newScore.setPlayDate(LocalDateTime.now());
        newScore.setMessage(user.getDescription());
        scoreRepository.save(newScore);
    }
}