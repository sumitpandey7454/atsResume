package com.atsresume.controller;

import com.atsresume.entity.Template;
import com.atsresume.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping("/all")
    public ResponseEntity<List<Template>> getAllTemplates() {
        return ResponseEntity.ok(templateService.getAllTemplates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Template> getTemplate(@PathVariable Long id) {
        return ResponseEntity.ok(templateService.getTemplateById(id));
    }
}