package com.skill.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skill.dto.APIResponse;
import com.skill.dto.BlogCreateDto;
import com.skill.dto.BlogDto;
import com.skill.service.BlogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<APIResponse> getAllBlogs() {
        return ResponseEntity.ok(new APIResponse("OK", blogService.getAllBlogsPublic()));
    }

    @PostMapping
    public ResponseEntity<APIResponse> createBlog(
            @RequestBody BlogCreateDto dto) {
    	return ResponseEntity.ok(new APIResponse("Blog added", blogService.createBlog(dto)));    }
}
