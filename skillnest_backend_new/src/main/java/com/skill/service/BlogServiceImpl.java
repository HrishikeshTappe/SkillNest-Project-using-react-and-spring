package com.skill.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skill.dto.BlogCreateDto;
import com.skill.dto.BlogDto;
import com.skill.entity.Blog;
import com.skill.entity.User;
import com.skill.repository.BlogRepository;
import com.skill.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    private BlogDto toDto(Blog b) {
        BlogDto dto = new BlogDto();
        dto.setId(b.getId());
        dto.setUserId(b.getUser_id());
        dto.setTitle(b.getTitle());
        dto.setContent(b.getContent());
        return dto;
    }

    @Override
    public List<BlogDto> getAllBlogsPublic() {
        return blogRepository.findAll()
                .stream().map(this::toDto).toList();
    }



    @Override
    public BlogDto createBlog(BlogCreateDto dto) {
     
        Blog b = new Blog();
        b.setUser_id(dto.getId());
        b.setTitle(dto.getTitle());
        b.setContent(dto.getContent());

        return toDto(blogRepository.save(b));
    }



    }


