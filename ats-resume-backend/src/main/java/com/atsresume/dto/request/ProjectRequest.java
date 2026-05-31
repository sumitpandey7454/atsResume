package com.atsresume.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequest {
    private String title;
    private String description;
    private String techStack;
    private String projectUrl;
    private String githubUrl;
    private String startDate;
    private String endDate;
}