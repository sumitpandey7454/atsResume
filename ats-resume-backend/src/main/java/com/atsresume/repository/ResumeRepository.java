package com.atsresume.repository;

import com.atsresume.entity.Resume;
import com.atsresume.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUser(User user);
    List<Resume> findByUserId(Long userId);
    void deleteByIdAndUserId(Long id, Long userId);
}