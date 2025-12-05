package com.skill.controller;

import org.springframework.web.bind.annotation.*;

import com.skill.dto.APIResponse;
import com.skill.dto.LoginRequest;
import com.skill.dto.RegisterRequest;
import com.skill.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(
    origins = "http://localhost:3000",
    allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public APIResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public APIResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
