package com.atsresume.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "educations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    private String degree;
    private String institution;
    private String board;

    @Column(name = "start_year")
    private String startYear;

    @Column(name = "end_year")
    private String endYear;

    private String grade;

    @Enumerated(EnumType.STRING)
    @Column(name = "grade_type")
    private GradeType gradeType;

    public enum GradeType {
        CGPA, PERCENTAGE, GRADE
    }
}