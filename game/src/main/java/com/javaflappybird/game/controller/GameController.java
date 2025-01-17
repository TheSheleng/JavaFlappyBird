package com.javaflappybird.game.controller;

import org.springframework.web.bind.annotation.*;

import javax.crypto.Cipher;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.util.Base64;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final KeyPair keyPair;

    public GameController() throws NoSuchAlgorithmException {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        this.keyPair = keyGen.generateKeyPair();
    }

    @GetMapping("/publicKey")
    public String getPublicKey() {
        PublicKey publicKey = keyPair.getPublic();
        String key = Base64.getEncoder().encodeToString(publicKey.getEncoded());
        return key;
    }

    @PostMapping("/submitScore")
    public String submitEncryptedScore(@RequestBody EncryptedDataRequest request) {
        try {
            byte[] encryptedData = Base64.getDecoder().decode(request.getEncryptedData());
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate());
            byte[] decryptedData = cipher.doFinal(encryptedData);

            String decryptedMessage = new String(decryptedData);
            return "Data received and decrypted: " + decryptedMessage;

        } catch (Exception e) {
            e.printStackTrace();
            return "Error during decryption: " + e.getMessage();
        }
    }

    public static class EncryptedDataRequest {
        private String encryptedData;

        public String getEncryptedData() {
            return encryptedData;
        }

        public void setEncryptedData(String encryptedData) {
            this.encryptedData = encryptedData;
        }
    }
}