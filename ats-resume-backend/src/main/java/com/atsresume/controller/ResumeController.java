package com.atsresume.controller;

import com.atsresume.dto.request.ResumeRequest;
import com.atsresume.dto.response.ResumeResponse;
import com.atsresume.entity.User;
import com.atsresume.service.GeminiService;
import com.atsresume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
    private final GeminiService geminiService;

    @PostMapping("/create")
    public ResponseEntity<ResumeResponse> createResume(
            @RequestBody ResumeRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                resumeService.createResume(request, user.getEmail()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ResumeResponse>> getAllResumes(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                resumeService.getUserResumes(user.getEmail()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeResponse> getResume(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                resumeService.getResumeById(id, user.getEmail()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResume(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        resumeService.deleteResume(id, user.getEmail());
        return ResponseEntity.ok("Resume deleted successfully");
    }

    @PostMapping("/generate-about-me")
    public ResponseEntity<String> generateAboutMe(
            @RequestParam String name,
            @RequestParam String jobRole,
            @RequestParam String skills,
            @RequestParam String experienceType) {
        return ResponseEntity.ok(
                geminiService.generateAboutMe(
                        name, jobRole, skills, experienceType));
    }

    @PostMapping("/generate-keywords")
    public ResponseEntity<String> generateKeywords(
            @RequestParam String jobRole) {
        return ResponseEntity.ok(
                geminiService.generateKeywords(jobRole));
    }

    @PostMapping("/generate-techstack")
    public ResponseEntity<String> generateTechStack(
            @RequestParam String jobRole,
            @RequestParam String experienceType) {
        return ResponseEntity.ok(
                geminiService.generateTechStack(jobRole, experienceType));
    }

    @PostMapping("/generate-linkedin")
    public ResponseEntity<String> generateLinkedIn(
            @RequestParam String resumeText) {
        return ResponseEntity.ok(
                geminiService.generateLinkedInAbout(resumeText));
    }

    @PostMapping("/generate-github-readme")
    public ResponseEntity<String> generateGithubReadme(
            @RequestParam String name,
            @RequestParam String skills,
            @RequestParam String projects) {
        return ResponseEntity.ok(
                geminiService.generateGithubReadme(name, skills, projects));
    }
}