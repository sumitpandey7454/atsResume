package com.atsresume.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceResponse {
    private Long id;
    private String companyName;
    private String position;
    private String description;
    private String startDate;
    private String endDate;
    private Boolean isCurrent;
    private String category;
}