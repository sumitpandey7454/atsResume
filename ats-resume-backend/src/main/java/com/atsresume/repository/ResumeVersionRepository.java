package com.atsresume.repository;

import com.atsresume.entity.ResumeVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResumeVersionRepository extends JpaRepository<ResumeVersion, Long> {
    List<ResumeVersion> findByUserId(Long userId);
    List<ResumeVersion> findByResumeId(Long resumeId);
}