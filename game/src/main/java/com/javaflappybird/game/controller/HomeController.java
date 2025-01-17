package com.javaflappybird.game.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Controller
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/info")
    public String info(
            @RequestParam(name = "message", required = false) String message,
            Model model
    ) {
        if (message != null) {
            model.addAttribute("message", message);
        }
        return "info";
    }


    @GetMapping("/menu")
    public String menu() {
        return "menu";
    }

    @GetMapping("/play")
    public String play() {
        return "play";
    }

    @GetMapping("/leaderboard")
    public String leaderboard() {
        return "leaderboard";
    }

    @GetMapping("/settings")
    public String settings() {
        return "settings";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/exit")
    public String exit() {
        return "exit";
    }
}