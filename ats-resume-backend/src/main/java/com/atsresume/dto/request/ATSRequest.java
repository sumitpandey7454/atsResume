package com.atsresume.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ATSRequest {
    private String resumeText;
    private String jobDescription;
}