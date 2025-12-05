package com.skill.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skill.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
