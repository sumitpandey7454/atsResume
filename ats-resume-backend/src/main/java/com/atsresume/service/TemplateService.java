package com.atsresume.service;

import com.atsresume.entity.Template;
import com.atsresume.exception.ResourceNotFoundException;
import com.atsresume.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    public List<Template> getAllTemplates() {
        return templateRepository.findByIsActiveTrue();
    }

    public Template getTemplateById(Long id) {
        return templateRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Template not found"));
    }
}