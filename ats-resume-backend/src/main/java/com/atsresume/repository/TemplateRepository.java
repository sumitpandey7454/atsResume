package com.atsresume.repository;

import com.atsresume.entity.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
    List<Template> findByIsActiveTrue();
    List<Template> findByStyle(Template.TemplateStyle style);
}