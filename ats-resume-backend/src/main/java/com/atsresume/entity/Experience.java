package com.atsresume.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "experiences")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(name = "company_name")
    private String companyName;

    private String position;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "is_current")
    private Boolean isCurrent;

    @Enumerated(EnumType.STRING)
    private ExperienceCategory category;

    public enum ExperienceCategory {
        INTERNSHIP, FULL_TIME, PART_TIME, FREELANCE
    }
}