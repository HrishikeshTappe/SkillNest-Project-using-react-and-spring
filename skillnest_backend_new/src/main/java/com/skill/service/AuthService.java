package com.skill.service;

import com.skill.dto.APIResponse;
import com.skill.dto.LoginRequest;
import com.skill.dto.RegisterRequest;

public interface AuthService {
    APIResponse register(RegisterRequest request);
    APIResponse login(LoginRequest request);
}
