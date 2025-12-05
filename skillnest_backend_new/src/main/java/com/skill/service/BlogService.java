package com.skill.service;

import java.util.List;

import com.skill.dto.BlogCreateDto;
import com.skill.dto.BlogDto;

public interface BlogService {

    List<BlogDto> getAllBlogsPublic();

    BlogDto createBlog(BlogCreateDto dto);


}
