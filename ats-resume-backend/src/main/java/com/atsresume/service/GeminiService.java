package com.atsresume.service;

import com.atsresume.config.GeminiConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiService {

    private final GeminiConfig geminiConfig;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private String callGemini(String prompt) {
        try {
            String url = geminiConfig.getApiUrl() +
                    "/models/gemini-2.5-flash:generateContent?key=" +
                    geminiConfig.getApiKey();

            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(
                                    Map.of("text", prompt)
                            ))
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    url, entity, Map.class);

            Map responseBody = response.getBody();
            List candidates = (List) responseBody.get("candidates");
            Map candidate = (Map) candidates.get(0);
            Map content = (Map) candidate.get("content");
            List parts = (List) content.get("parts");
            Map part = (Map) parts.get(0);
            return (String) part.get("text");

        } catch (Exception e) {
            throw new RuntimeException("Gemini API call failed: " + e.getMessage());
        }
    }

    public String getATSScore(String resumeText, String jobDescription) {
        String prompt = """
                Analyze this resume against the job description and provide ATS scoring.
                
                Resume:
                %s
                
                Job Description:
                %s
                
                Provide response in this exact JSON format only, no extra text:
                {
                    "score": <number 0-100>,
                    "missingKeywords": ["keyword1", "keyword2"],
                    "strongPoints": ["point1", "point2"],
                    "improvements": ["improvement1", "improvement2"],
                    "overallFeedback": "brief feedback here"
                }
                """.formatted(resumeText, jobDescription);
        return callGemini(prompt);
    }

    public String improveResumeLine(String line, String jobRole) {
        String prompt = """
                Rewrite this resume line to be stronger and ATS friendly for %s role.
                Original line: %s
                Return only the improved line, nothing else.
                """.formatted(jobRole, line);
        return callGemini(prompt);
    }

    public String generateAboutMe(String name, String jobRole,
                                   String skills, String experienceType) {
        String prompt = """
                Write a professional About Me section for a resume.
                Name: %s
                Job Role: %s
                Skills: %s
                Experience Type: %s
                
                Requirements:
                - Maximum 4 lines
                - ATS friendly
                - Strong action words
                - First person
                - No fluff
                Return only the About Me text, nothing else.
                """.formatted(name, jobRole, skills, experienceType);
        return callGemini(prompt);
    }

    public String generateKeywords(String jobRole) {
        String prompt = """
                Generate top 30 ATS keywords for %s role in 2024.
                Include technical skills, tools, frameworks, methodologies.
                Return as comma separated list only, nothing else.
                """.formatted(jobRole);
        return callGemini(prompt);
    }

    public String generateTechStack(String jobRole, String experienceType) {
        String prompt = """
                Suggest the most important tech stack for %s role for a %s candidate in 2024.
                Return in this exact JSON format only:
                {
                    "languages": ["lang1", "lang2"],
                    "frameworks": ["fw1", "fw2"],
                    "databases": ["db1", "db2"],
                    "tools": ["tool1", "tool2"]
                }
                """.formatted(jobRole, experienceType);
        return callGemini(prompt);
    }

    public String generateInterviewQuestions(String resumeText, String jobRole) {
        String prompt = """
                Based on this resume and job role, generate top 10 interview questions.
                Job Role: %s
                Resume: %s
                
                Return in this exact JSON format only:
                {
                    "questions": [
                        {
                            "question": "question here",
                            "suggestedAnswer": "answer based on resume here"
                        }
                    ]
                }
                """.formatted(jobRole, resumeText);
        return callGemini(prompt);
    }

    public String extractJDKeywords(String jobDescription) {
        String prompt = """
                Extract all important ATS keywords from this job description.
                Job Description: %s
                
                Return in this exact JSON format only:
                {
                    "mustHave": ["skill1", "skill2"],
                    "goodToHave": ["skill1", "skill2"],
                    "tools": ["tool1", "tool2"],
                    "softSkills": ["skill1", "skill2"]
                }
                """.formatted(jobDescription);
        return callGemini(prompt);
    }

    public String generateLinkedInAbout(String resumeText) {
        String prompt = """
                Write a LinkedIn About section based on this resume.
                Resume: %s
                
                Requirements:
                - Professional and engaging
                - First person
                - Maximum 5 lines
                - Keyword rich
                - End with a call to action
                Return only the LinkedIn About text, nothing else.
                """.formatted(resumeText);
        return callGemini(prompt);
    }

    public String generateGithubReadme(String name, String skills, String projects) {
        String prompt = """
                Generate a GitHub profile README.md for a developer.
                Name: %s
                Skills: %s
                Projects: %s
                
                Include:
                - Greeting with name
                - About section
                - Skills with badges
                - Projects section
                - Contact links
                - Fun stats
                Make it impressive for recruiters.
                Return only the README markdown, nothing else.
                """.formatted(name, skills, projects);
        return callGemini(prompt);
    }
}