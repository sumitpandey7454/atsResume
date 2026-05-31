package com.atsresume.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceRequest {
    private String companyName;
    private String position;
    private String description;
    private String startDate;
    private String endDate;
    private Boolean isCurrent;
    private String category;
}