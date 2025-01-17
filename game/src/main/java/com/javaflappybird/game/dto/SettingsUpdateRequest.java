package com.javaflappybird.game.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class SettingsUpdateRequest {
    private MultipartFile avatar;
    private String username;
    private String description;
}
