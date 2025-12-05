package com.skill.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.skill.dto.APIResponse;
import com.skill.dto.PurchasedCourseResponse;
import com.skill.entity.User;
import com.skill.entity.PurchasedCourse;
import com.skill.repository.PurchasedCourseRepository;
import com.skill.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;
    private final PurchasedCourseRepository purchasedCourseRepository;

    // ============================
    // GET USER DETAILS
    // ============================
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse> getUser(@PathVariable Long id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(new APIResponse("User not found", null));
        }

        User u = opt.get();
        u.setPassword(null);

        return ResponseEntity.ok(new APIResponse("OK", u));
    }

    // ============================
    // UPDATE USER PROFILE (NO PASSWORD CHANGE HERE)
    // ============================
    @PutMapping("/update/{id}")
    public ResponseEntity<APIResponse> updateUser(@PathVariable Long id, @RequestBody User payload) {

        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.ok(new APIResponse("User not found", null));
        }

        User user = opt.get();

        if (payload.getFullName() != null) user.setFullName(payload.getFullName());
        if (payload.getPhoneNumber() != null) user.setPhoneNumber(payload.getPhoneNumber());
        if (payload.getEmail() != null) user.setEmail(payload.getEmail());

        // Password not updated here
        userRepository.save(user);

        user.setPassword(null);

        return ResponseEntity.ok(new APIResponse("Profile updated", user));
    }

    // ============================
    // GET PURCHASED COURSES FOR USER
    // ============================
    @GetMapping("/purchases/{userId}")
    public ResponseEntity<APIResponse> getPurchasedCourses(@PathVariable Long userId) {

        List<PurchasedCourse> purchases = purchasedCourseRepository.findByUserId(userId);

        // Convert to response DTO
        List<PurchasedCourseResponse> response = purchases.stream()
                .map(p -> new PurchasedCourseResponse(
                        p.getId(),
                        p.getUserId(),
                        null, // userName is not required here
                        p.getCourseName(),
                        "₹" + p.getAmount().toString(),
                        p.getPurchaseDate().toString(),
                        p.getPaymentStatus()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(new APIResponse("OK", response));
    }
}
