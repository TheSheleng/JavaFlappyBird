package com.javaflappybird.game.service;

import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        // Вызов стандартного метода для получения данных пользователя
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Получение атрибутов пользователя
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // Например, получение email
        String email = (String) attributes.get("email");

        // Логика обработки данных (например, сохранение пользователя в БД)
        System.out.println("User Email: " + email);

        // Возврат объекта пользователя (можно настроить, например, роли)
        return new DefaultOAuth2User(
                oAuth2User.getAuthorities(),
                attributes,
                "name" // Основной атрибут (например, "name" для Google)
        );
    }
}
