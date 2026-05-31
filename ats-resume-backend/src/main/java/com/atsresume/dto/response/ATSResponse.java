package com.atsresume.dto.response;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ATSResponse {
    private Integer score;
    private List<String> missingKeywords;
    private List<String> improvements;
    private List<String> strongPoints;
    private String overallFeedback;
}