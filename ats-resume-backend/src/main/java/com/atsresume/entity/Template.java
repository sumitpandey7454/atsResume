package com.atsresume.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "templates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "preview_image")
    private String previewImage;

    @Enumerated(EnumType.STRING)
    private TemplateStyle style;

    @Column(name = "is_active")
    private Boolean isActive;

    public enum TemplateStyle {
        MINIMAL, PROFESSIONAL, CREATIVE
    }
}