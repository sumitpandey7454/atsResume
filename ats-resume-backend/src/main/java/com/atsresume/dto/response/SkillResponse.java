package com.atsresume.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillResponse {
    private Long id;
    private String name;
    private String category;
}