package com.atsresume.service;

import com.atsresume.dto.request.ATSRequest;
import com.atsresume.dto.response.ATSResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ATSService {

    private final GeminiService geminiService;
    private final FileParserService fileParserService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ATSResponse checkATS(ATSRequest request) {
        try {
            String result = geminiService.getATSScore(
                    request.getResumeText(),
                    request.getJobDescription()
            );
            return objectMapper.readValue(
                    cleanJson(result), ATSResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("ATS check failed: " + e.getMessage());
        }
    }

    public ATSResponse checkATSFromFile(MultipartFile file,
                                         String jobDescription) {
        try {
            String resumeText = fileParserService.extractText(file);
            String result = geminiService.getATSScore(
                    resumeText, jobDescription);
            return objectMapper.readValue(
                    cleanJson(result), ATSResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("ATS check failed: " + e.getMessage());
        }
    }

    private String cleanJson(String text) {
        return text.replaceAll("```json", "")
                   .replaceAll("```", "")
                   .trim();
    }
}