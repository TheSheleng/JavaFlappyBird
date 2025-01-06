package com.javaflappybird.game.component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final JwtProvider jwtProvider;

    public JwtUtil(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    // Checking the validity of the token
    public boolean isTokenValid(String token) {
        // Logic for checking token validity
        return jwtProvider.validateToken(token);
    }

    // Extracting username from token
    public String extractUsername(String token) {
        return jwtProvider.getUsernameFromToken(token); // Логика извлечения username из токена
    }

    public String generateToken(String username) {
        return jwtProvider.generateToken(username);
    }

    // Getting the Authentication object for an authenticated user
    public UsernamePasswordAuthenticationToken getAuthentication(String token) {
        String username = extractUsername(token);

        // Here you can add logic to get user details
        UserDetails userDetails = User.builder()
                .username(username)
                .authorities("ROLE_USER") // We indicate the role
                .build();

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
