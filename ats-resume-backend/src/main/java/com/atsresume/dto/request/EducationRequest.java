package com.atsresume.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationRequest {
    private String degree;
    private String institution;
    private String board;
    private String startYear;
    private String endYear;
    private String grade;
    private String gradeType;
}