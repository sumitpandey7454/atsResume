package com.atsresume.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationResponse {
    private Long id;
    private String degree;
    private String institution;
    private String board;
    private String startYear;
    private String endYear;
    private String grade;
    private String gradeType;
}