package com.atsresume.dto.response;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponse {
    private List<QuestionAnswer> questions;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class QuestionAnswer {
        private String question;
        private String suggestedAnswer;
    }
}