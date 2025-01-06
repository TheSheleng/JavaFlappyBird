package com.javaflappybird.game.component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

public class CookieUtil {

    public static void setJwtCookie(String token, HttpServletResponse response) {
        Cookie cookie = new Cookie("token", token);
        cookie.setHttpOnly(true);       // The token is only accessible via HTTP, not via JavaScript.
        cookie.setSecure(true);         // Sent via HTTPS only
        cookie.setPath("/");            // The path on which the cookie is available
        cookie.setMaxAge(4 * 60 * 60);  // Cookie lifetime (4 hour)

        response.addCookie(cookie);

        // CSRF protection
        response.addHeader("Set-Cookie", "token=" + token + "; HttpOnly; Secure; Max-Age=3600; Path=/; SameSite=Strict");
    }


    public static void deleteJwtCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);  // NOTE: Make sure you are using HTTPS in your production environment.
        cookie.setPath("/");
        cookie.setMaxAge(0);  // Set expiration to 0 to delete cookies
        response.addCookie(cookie);
    }
}
