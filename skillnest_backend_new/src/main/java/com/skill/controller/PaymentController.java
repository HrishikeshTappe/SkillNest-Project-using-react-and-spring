package com.skill.controller;

import com.skill.dto.APIResponse;
import com.skill.entity.PurchasedCourse;
import com.skill.repository.PurchasedCourseRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PurchasedCourseRepository purchasedCourseRepository;

    // ==================================================
    //  FAKE PAYMENT SUCCESS ENDPOINT
    // ==================================================
    @PostMapping("/fake-success")
    public ResponseEntity<APIResponse> fakePaymentSuccess(@RequestBody Map<String, Object> request) {

        try {
            Long userId = Long.valueOf(request.get("userId").toString());
            Long courseId = Long.valueOf(request.get("courseId").toString());
            String courseName = request.get("courseName").toString();
            BigDecimal amount = new BigDecimal(request.get("amount").toString());

            PurchasedCourse purchase = new PurchasedCourse();
            purchase.setUserId(userId);
            purchase.setCourseId(courseId);
            purchase.setCourseName(courseName);
            purchase.setAmount(amount);
            purchase.setPaymentStatus("SUCCESS");
            purchase.setPurchaseDate(Instant.now());

            purchasedCourseRepository.save(purchase);

            return ResponseEntity.ok(new APIResponse("Payment stored successfully", purchase));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new APIResponse("Payment saving failed", e.getMessage()));
        }
    }
}
