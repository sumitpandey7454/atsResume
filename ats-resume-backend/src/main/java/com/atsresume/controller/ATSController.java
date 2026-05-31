package com.atsresume.controller;

import com.atsresume.dto.request.ATSRequest;
import com.atsresume.dto.response.ATSResponse;
import com.atsresume.service.ATSService;
import com.atsresume.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ats")
@RequiredArgsConstructor
public class ATSController {

    private final ATSService atsService;
    private final GeminiService geminiService;

    // no login required
    @PostMapping("/check")
    public ResponseEntity<ATSResponse> checkATS(
            @RequestBody ATSRequest request) {
        return ResponseEntity.ok(atsService.checkATS(request));
    }

    // no login required
    @PostMapping("/check-file")
    public ResponseEntity<ATSResponse> checkATSFromFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobDescription") String jobDescription) {
        return ResponseEntity.ok(
                atsService.checkATSFromFile(file, jobDescription));
    }

    // login required
    @PostMapping("/extract-jd-keywords")
    public ResponseEntity<String> extractJDKeywords(
            @RequestParam("jobDescription") String jobDescription) {
        return ResponseEntity.ok(
                geminiService.extractJDKeywords(jobDescription));
    }

    // login required
    @PostMapping("/improve-line")
    public ResponseEntity<String> improveLine(
            @RequestParam("line") String line,
            @RequestParam("jobRole") String jobRole) {
        return ResponseEntity.ok(
                geminiService.improveResumeLine(line, jobRole));
    }
}