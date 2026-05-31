package com.atsresume.service;

import com.atsresume.entity.Resume;
import com.atsresume.exception.ResourceNotFoundException;
import com.atsresume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExportService {

    private final ResumeRepository resumeRepository;

    public Resume getResumeForExport(Long resumeId, String email) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));
        if (!resume.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access denied");
        }
        return resume;
    }
}