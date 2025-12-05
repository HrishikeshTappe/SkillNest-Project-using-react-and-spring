package com.skill.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skill.entity.PurchasedCourse;
import java.util.List;

public interface PurchasedCourseRepository extends JpaRepository<PurchasedCourse, Long> {
    List<PurchasedCourse> findByUserId(Long userId);
}
