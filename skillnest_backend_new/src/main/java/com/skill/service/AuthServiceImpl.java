package com.skill.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.skill.dto.APIResponse;
import com.skill.dto.LoginRequest;
import com.skill.dto.RegisterRequest;
import com.skill.entity.User;
import com.skill.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // ============================
    // REGISTER — Only USER allowed
    // ============================
    @Override
    public APIResponse register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new APIResponse("Email already exists", null);
        }

        // Create only USER (no role from frontend)
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Always USER
        user.setRole("USER");

        userRepository.save(user);

        // Hide password
        user.setPassword(null);

        return new APIResponse("Registration successful", user);
    }

    // ============================
    // LOGIN
    // ============================
    @Override
    public APIResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new APIResponse("User not found", null);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new APIResponse("Invalid password", null);
        }

        // Safe object
        User safeUser = new User();
        safeUser.setId(user.getId());
        safeUser.setFullName(user.getFullName());
        safeUser.setEmail(user.getEmail());
        safeUser.setPhoneNumber(user.getPhoneNumber());
        safeUser.setRole(user.getRole());
        safeUser.setPassword(null);

        return new APIResponse("Login successful", safeUser);
    }
}
