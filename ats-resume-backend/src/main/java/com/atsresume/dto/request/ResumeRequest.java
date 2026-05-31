package com.atsresume.dto.request;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeRequest {

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

    private List<EducationRequest> educations;
    private List<ProjectRequest> projects;
    private List<ExperienceRequest> experiences;
    private List<CertificationRequest> certifications;
    private List<SkillRequest> skills;
}