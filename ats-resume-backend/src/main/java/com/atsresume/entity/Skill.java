package com.atsresume.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    private String name;

    @Enumerated(EnumType.STRING)
    private SkillCategory category;

    public enum SkillCategory {
        LANGUAGE, FRAMEWORK, DATABASE, TOOL, SOFT_SKILL
    }
}