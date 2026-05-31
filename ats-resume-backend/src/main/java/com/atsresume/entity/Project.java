package com.atsresume.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "tech_stack")
    private String techStack;

    @Column(name = "project_url")
    private String projectUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;
}