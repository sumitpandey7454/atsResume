package com.atsresume.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectResponse {
    private Long id;
    private String title;
    private String description;
    private String techStack;
    private String projectUrl;
    private String githubUrl;
    private String startDate;
    private String endDate;
}