package com.skill.controller;


import com.skill.dto.APIResponse;
import com.skill.dto.ContactRequest;
import com.skill.entity.Contact;
import com.skill.repository.ContactRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class ContactController {

    private final ContactRepository contactRepository;

    @PostMapping("/send")
    public ResponseEntity<APIResponse> sendContactMessage(@Valid @RequestBody ContactRequest request) {
        Contact contact = new Contact();
        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setSubject(request.getSubject());
        contact.setMessage(request.getMessage());
        
        contactRepository.save(contact);
        
        return ResponseEntity.ok(new APIResponse("Message sent successfully! We'll get back to you soon.", null));

    }
}