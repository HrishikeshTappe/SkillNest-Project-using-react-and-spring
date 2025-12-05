package com.skill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skill.entity.Blog;

public interface BlogRepository extends JpaRepository<Blog, Long> {

//    List<Blog> findByUserId(Long userId);

}
