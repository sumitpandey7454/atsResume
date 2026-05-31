package com.atsresume.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificationResponse {
    private Long id;
    private String name;
    private String issuer;
    private String issueDate;
    private String expiryDate;
    private String credentialUrl;
}