package com.skill.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.skill.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    // ⭐ NEW — Check if admin exists
    boolean existsByRole(String role);
}
