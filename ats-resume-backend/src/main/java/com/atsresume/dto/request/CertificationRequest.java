package com.atsresume.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificationRequest {
    private String name;
    private String issuer;
    private String issueDate;
    private String expiryDate;
    private String credentialUrl;
}