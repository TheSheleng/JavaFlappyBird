package com.javaflappybird.game.component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final JwtProvider jwtProvider; // Допустим, у вас есть JwtProvider для работы с JWT

    public JwtUtil(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    // Проверка валидности токена
    public boolean isTokenValid(String token) {
        // Логика проверки валидности токена
        return jwtProvider.validateToken(token);
    }

    // Извлечение имени пользователя из токена
    public String extractUsername(String token) {
        return jwtProvider.getUsernameFromToken(token); // Логика извлечения username из токена
    }

    public String generateToken(String username) {
        return jwtProvider.generateToken(username);
    }

    // Получение объекта Authentication для аутентифицированного пользователя
    public UsernamePasswordAuthenticationToken getAuthentication(String token) {
        String username = extractUsername(token);

        // Здесь вы можете добавить логику для получения подробностей пользователя
        // например, из базы данных или кэша. Для простоты, используем User с пустыми правами.
        UserDetails userDetails = User.builder()
                .username(username)
                .password("") // Здесь можно поставить пароль, если это необходимо
                .authorities("ROLE_USER") // Указываем роль
                .build();

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
