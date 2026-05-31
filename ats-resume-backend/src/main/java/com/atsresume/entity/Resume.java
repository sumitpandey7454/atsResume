package com.atsresume.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "resumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "resume_title")
    private String resumeTitle;

    @Column(name = "job_role")
    private String jobRole;

    @Column(name = "full_name")
    private String fullName;

    private String email;
    private String phone;
    private String address;
    private String linkedin;
    private String github;
    private String portfolio;

    @Column(columnDefinition = "TEXT")
    private String aboutMe;

    @Column(name = "experience_type")
    @Enumerated(EnumType.STRING)
    private ExperienceType experienceType;

    @Column(name = "template_id")
    private Long templateId;

    @Column(name = "page_count")
    private Integer pageCount;

    @Column(name = "ats_score")
    private Integer atsScore;

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Education> educations;

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Project> projects;

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Experience> experiences;

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Certification> certifications;

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Skill> skills;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum ExperienceType {
        FRESHER, EXPERIENCED
    }
}