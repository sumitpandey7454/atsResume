package com.atsresume.service;

import com.atsresume.dto.request.*;
import com.atsresume.dto.response.*;
import com.atsresume.entity.*;
import com.atsresume.exception.ResourceNotFoundException;
import com.atsresume.exception.UnauthorizedException;
import com.atsresume.repository.ResumeRepository;
import com.atsresume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;

    public ResumeResponse createResume(ResumeRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Resume resume = Resume.builder()
                .user(user)
                .resumeTitle(request.getResumeTitle())
                .jobRole(request.getJobRole())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .linkedin(request.getLinkedin())
                .github(request.getGithub())
                .portfolio(request.getPortfolio())
                .aboutMe(request.getAboutMe())
                .experienceType(Resume.ExperienceType
                        .valueOf(request.getExperienceType()))
                .templateId(request.getTemplateId())
                .pageCount(request.getPageCount())
                .build();

        if (request.getEducations() != null) {
            List<Education> educations = request.getEducations().stream()
                    .map(e -> Education.builder()
                            .resume(resume)
                            .degree(e.getDegree())
                            .institution(e.getInstitution())
                            .board(e.getBoard())
                            .startYear(e.getStartYear())
                            .endYear(e.getEndYear())
                            .grade(e.getGrade())
                            .gradeType(Education.GradeType
                                    .valueOf(e.getGradeType()))
                            .build())
                    .collect(Collectors.toList());
            resume.setEducations(educations);
        }

        if (request.getProjects() != null) {
            List<Project> projects = request.getProjects().stream()
                    .map(p -> Project.builder()
                            .resume(resume)
                            .title(p.getTitle())
                            .description(p.getDescription())
                            .techStack(p.getTechStack())
                            .projectUrl(p.getProjectUrl())
                            .githubUrl(p.getGithubUrl())
                            .startDate(p.getStartDate())
                            .endDate(p.getEndDate())
                            .build())
                    .collect(Collectors.toList());
            resume.setProjects(projects);
        }

        if (request.getExperiences() != null) {
            List<Experience> experiences = request.getExperiences().stream()
                    .map(e -> Experience.builder()
                            .resume(resume)
                            .companyName(e.getCompanyName())
                            .position(e.getPosition())
                            .description(e.getDescription())
                            .startDate(e.getStartDate())
                            .endDate(e.getEndDate())
                            .isCurrent(e.getIsCurrent())
                            .category(Experience.ExperienceCategory
                                    .valueOf(e.getCategory()))
                            .build())
                    .collect(Collectors.toList());
            resume.setExperiences(experiences);
        }

        if (request.getCertifications() != null) {
            List<Certification> certifications = request.getCertifications()
                    .stream()
                    .map(c -> Certification.builder()
                            .resume(resume)
                            .name(c.getName())
                            .issuer(c.getIssuer())
                            .issueDate(c.getIssueDate())
                            .expiryDate(c.getExpiryDate())
                            .credentialUrl(c.getCredentialUrl())
                            .build())
                    .collect(Collectors.toList());
            resume.setCertifications(certifications);
        }

        if (request.getSkills() != null) {
            List<Skill> skills = request.getSkills().stream()
                    .map(s -> Skill.builder()
                            .resume(resume)
                            .name(s.getName())
                            .category(Skill.SkillCategory
                                    .valueOf(s.getCategory()))
                            .build())
                    .collect(Collectors.toList());
            resume.setSkills(skills);
        }

        Resume saved = resumeRepository.save(resume);
        return mapToResponse(saved);
    }

    public List<ResumeResponse> getUserResumes(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
        return resumeRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ResumeResponse getResumeById(Long id, String email) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Resume not found"));
        if (!resume.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("Access denied");
        }
        return mapToResponse(resume);
    }

    public void deleteResume(Long id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
        resumeRepository.deleteByIdAndUserId(id, user.getId());
    }

    private ResumeResponse mapToResponse(Resume resume) {
        return ResumeResponse.builder()
                .id(resume.getId())
                .resumeTitle(resume.getResumeTitle())
                .jobRole(resume.getJobRole())
                .fullName(resume.getFullName())
                .email(resume.getEmail())
                .phone(resume.getPhone())
                .address(resume.getAddress())
                .linkedin(resume.getLinkedin())
                .github(resume.getGithub())
                .portfolio(resume.getPortfolio())
                .aboutMe(resume.getAboutMe())
                .experienceType(resume.getExperienceType() != null ?
                        resume.getExperienceType().name() : null)
                .templateId(resume.getTemplateId())
                .pageCount(resume.getPageCount())
                .atsScore(resume.getAtsScore())
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .educations(resume.getEducations() != null ?
                        resume.getEducations().stream().map(e ->
                                EducationResponse.builder()
                                        .id(e.getId())
                                        .degree(e.getDegree())
                                        .institution(e.getInstitution())
                                        .board(e.getBoard())
                                        .startYear(e.getStartYear())
                                        .endYear(e.getEndYear())
                                        .grade(e.getGrade())
                                        .gradeType(e.getGradeType() != null ?
                                                e.getGradeType().name() : null)
                                        .build()
                        ).collect(Collectors.toList()) : null)
                .projects(resume.getProjects() != null ?
                        resume.getProjects().stream().map(p ->
                                ProjectResponse.builder()
                                        .id(p.getId())
                                        .title(p.getTitle())
                                        .description(p.getDescription())
                                        .techStack(p.getTechStack())
                                        .projectUrl(p.getProjectUrl())
                                        .githubUrl(p.getGithubUrl())
                                        .startDate(p.getStartDate())
                                        .endDate(p.getEndDate())
                                        .build()
                        ).collect(Collectors.toList()) : null)
                .experiences(resume.getExperiences() != null ?
                        resume.getExperiences().stream().map(e ->
                                ExperienceResponse.builder()
                                        .id(e.getId())
                                        .companyName(e.getCompanyName())
                                        .position(e.getPosition())
                                        .description(e.getDescription())
                                        .startDate(e.getStartDate())
                                        .endDate(e.getEndDate())
                                        .isCurrent(e.getIsCurrent())
                                        .category(e.getCategory() != null ?
                                                e.getCategory().name() : null)
                                        .build()
                        ).collect(Collectors.toList()) : null)
                .certifications(resume.getCertifications() != null ?
                        resume.getCertifications().stream().map(c ->
                                CertificationResponse.builder()
                                        .id(c.getId())
                                        .name(c.getName())
                                        .issuer(c.getIssuer())
                                        .issueDate(c.getIssueDate())
                                        .expiryDate(c.getExpiryDate())
                                        .credentialUrl(c.getCredentialUrl())
                                        .build()
                        ).collect(Collectors.toList()) : null)
                .skills(resume.getSkills() != null ?
                        resume.getSkills().stream().map(s ->
                                SkillResponse.builder()
                                        .id(s.getId())
                                        .name(s.getName())
                                        .category(s.getCategory() != null ?
                                                s.getCategory().name() : null)
                                        .build()
                        ).collect(Collectors.toList()) : null)
                .build();
    }
}