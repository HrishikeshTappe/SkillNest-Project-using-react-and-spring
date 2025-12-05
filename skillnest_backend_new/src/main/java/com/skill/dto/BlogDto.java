package com.skill.dto;

import lombok.Data;

@Data
public class BlogDto {
    private Long id;
    private Long userId;
    private String title;
    private String content;
}
