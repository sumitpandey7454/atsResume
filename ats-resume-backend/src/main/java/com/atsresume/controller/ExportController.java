package com.atsresume.controller;

import com.atsresume.entity.Resume;
import com.atsresume.entity.User;
import com.atsresume.service.ExportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/export")
@RequiredArgsConstructor
public class ExportController {

    private final ExportService exportService;

    @GetMapping("/pdf/{resumeId}")
    public ResponseEntity<byte[]> exportPDF(
            @PathVariable Long resumeId,
            @AuthenticationPrincipal User user) {

        Resume resume = exportService
                .getResumeForExport(resumeId, user.getEmail());

        // PDF generation will be handled by frontend
        // Backend just returns resume data
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return ResponseEntity.ok()
                .headers(headers)
                .body(resume.toString().getBytes());
    }
}