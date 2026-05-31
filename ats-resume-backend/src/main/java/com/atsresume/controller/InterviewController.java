package com.atsresume.controller;

import com.atsresume.dto.response.InterviewResponse;
import com.atsresume.entity.User;
import com.atsresume.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping("/generate")
    public ResponseEntity<InterviewResponse> generateQuestions(
            @RequestParam String resumeText,
            @RequestParam String jobRole,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                interviewService.generateQuestions(resumeText, jobRole));
    }
}