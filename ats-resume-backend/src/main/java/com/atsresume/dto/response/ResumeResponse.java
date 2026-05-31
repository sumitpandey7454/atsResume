package com.atsresume.dto.response;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeResponse {
    private Long id;
    private String resumeTitle;
    private String jobRole;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String linkedin;
    private String github;
    private String portfolio;
    private String aboutMe;
    private String experienceType;
    private Long templateId;
    private Integer pageCount;
    private Integer atsScore;
    private List<EducationResponse> educations;
    private List<ProjectResponse> projects;
    private List<ExperienceResponse> experiences;
    private List<CertificationResponse> certifications;
    private List<SkillResponse> skills;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}