package com.atsresume.service;

import com.atsresume.dto.response.InterviewResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public InterviewResponse generateQuestions(String resumeText,
                                                String jobRole) {
        try {
            String result = geminiService
                    .generateInterviewQuestions(resumeText, jobRole);
            String cleaned = result.replaceAll("```json", "")
                                   .replaceAll("```", "")
                                   .trim();
            return objectMapper.readValue(cleaned, InterviewResponse.class);
        } catch (Exception e) {
            throw new RuntimeException(
                    "Interview generation failed: " + e.getMessage());
        }
    }
}