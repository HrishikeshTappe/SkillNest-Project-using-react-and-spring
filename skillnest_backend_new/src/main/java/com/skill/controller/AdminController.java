package com.skill.controller;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.skill.dto.APIResponse;
import com.skill.dto.PurchasedCourseResponse;
import com.skill.entity.Contact;
import com.skill.entity.Course;
import com.skill.entity.User;
import com.skill.entity.PurchasedCourse;
import com.skill.repository.ContactRepository;
import com.skill.repository.CourseRepository;
import com.skill.repository.UserRepository;
import com.skill.repository.PurchasedCourseRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final PurchasedCourseRepository purchasedCourseRepository;
    private final ContactRepository contactRepository;

    // ====================== USERS ======================
    @GetMapping("/users")
    public ResponseEntity<APIResponse> listUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(new APIResponse("OK", users));
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<APIResponse> updateUser(@PathVariable Long id, @RequestBody User payload) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return ResponseEntity.ok(new APIResponse("User not found", null));

        if (payload.getFullName() != null) user.setFullName(payload.getFullName());
        if (payload.getEmail() != null) user.setEmail(payload.getEmail());
        if (payload.getPhoneNumber() != null) user.setPhoneNumber(payload.getPhoneNumber());
        if (payload.getRole() != null) user.setRole(payload.getRole());

        userRepository.save(user);
        user.setPassword(null);

        return ResponseEntity.ok(new APIResponse("User updated", user));
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<APIResponse> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok(new APIResponse("User deleted", id));
    }

    // ====================== COURSES ======================
    @GetMapping("/courses")
    public ResponseEntity<APIResponse> listCourses() {
        return ResponseEntity.ok(new APIResponse("OK", courseRepository.findAll()));
    }

    @PostMapping(value = "/course", consumes = "multipart/form-data")
    public ResponseEntity<APIResponse> addCourse(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("image") MultipartFile image) {

        try {
            File uploadDir = new File("uploads");
            if (!uploadDir.exists()) uploadDir.mkdirs();

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            String filePath = uploadDir.getAbsolutePath() + "/" + fileName;

            image.transferTo(new File(filePath));

            String imageUrl = "http://localhost:8080/uploads/" + fileName;

            Course c = new Course();
            c.setTitle(title);
            c.setDescription(description);
            c.setPrice(price);
            c.setImageUrl(imageUrl);

            return ResponseEntity.ok(new APIResponse("Course added", courseRepository.save(c)));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new APIResponse("Image upload failed", e.getMessage()));
        }
    }

    @PutMapping("/course/{id}")
    public ResponseEntity<APIResponse> updateCourse(@PathVariable Long id, @RequestBody Course payload) {
        Course c = courseRepository.findById(id).orElse(null);
        if (c == null) return ResponseEntity.ok(new APIResponse("Course not found", null));

        if (payload.getTitle() != null) c.setTitle(payload.getTitle());
        if (payload.getDescription() != null) c.setDescription(payload.getDescription());
        if (payload.getPrice() != null) c.setPrice(payload.getPrice());

        return ResponseEntity.ok(new APIResponse("Course updated", courseRepository.save(c)));
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<APIResponse> deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
        return ResponseEntity.ok(new APIResponse("Course deleted", id));
    }

    // ===================== PURCHASES ======================
    @GetMapping("/purchases")
    public ResponseEntity<APIResponse> allPurchases() {

        List<PurchasedCourse> purchases = purchasedCourseRepository.findAll();

        List<PurchasedCourseResponse> response = purchases.stream()
                .map(p -> {
                    User user = userRepository.findById(p.getUserId()).orElse(null);

                    return new PurchasedCourseResponse(
                            p.getId(),
                            p.getUserId(),
                            user != null ? user.getFullName() : "Unknown User",
                            p.getCourseName(),
                            "₹" + (p.getAmount() != null ? p.getAmount() : "0"),
                            p.getPurchaseDate() != null ? p.getPurchaseDate().toString() : "",
                            p.getPaymentStatus()
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(new APIResponse("OK", response));
    }

    // ⭐ UPDATE PURCHASE (ADMIN)
    @PutMapping("/purchase/{id}")
    public ResponseEntity<APIResponse> updatePurchase(@PathVariable Long id, @RequestBody PurchasedCourse payload) {

        PurchasedCourse p = purchasedCourseRepository.findById(id).orElse(null);
        if (p == null) return ResponseEntity.ok(new APIResponse("Purchase not found", null));

        if (payload.getCourseName() != null) p.setCourseName(payload.getCourseName());
        if (payload.getPaymentStatus() != null) p.setPaymentStatus(payload.getPaymentStatus());
        if (payload.getAmount() != null) p.setAmount(payload.getAmount());

        purchasedCourseRepository.save(p);

        return ResponseEntity.ok(new APIResponse("Purchase updated", p));
    }

    // ⭐ DELETE PURCHASE (ADMIN)
    @DeleteMapping("/purchase/{id}")
    public ResponseEntity<APIResponse> deletePurchase(@PathVariable Long id) {
        purchasedCourseRepository.deleteById(id);
        return ResponseEntity.ok(new APIResponse("Purchase deleted", id));
    }
    
    
    // Contact Management
    @GetMapping("/contacts")
    public ResponseEntity<APIResponse> getAllContacts() {
        List<Contact> contacts = contactRepository.findAll();
        return ResponseEntity.ok(new APIResponse("OK", contacts));
    }

    @DeleteMapping("/contact/{id}")
    public ResponseEntity<APIResponse> deleteContact(@PathVariable Long id) {
        contactRepository.deleteById(id);
        return ResponseEntity.ok(new APIResponse("Contact message deleted successfully", null));

    }


}
