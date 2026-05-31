package com.atsresume.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "certifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    private String name;
    private String issuer;

    @Column(name = "issue_date")
    private String issueDate;

    @Column(name = "expiry_date")
    private String expiryDate;

    @Column(name = "credential_url")
    private String credentialUrl;
}