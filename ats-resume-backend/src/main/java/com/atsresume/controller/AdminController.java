package com.atsresume.controller;

import com.atsresume.repository.ResumeRepository;
import com.atsresume.repository.MessageRepository;
import com.atsresume.repository.UserRepository;
import com.atsresume.service.VisitorService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final MessageRepository messageRepository;
    private final VisitorService visitorService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalResumes", resumeRepository.count());
        stats.put("totalMessages", messageRepository.count());
        // Add visitor stats
        Map<String, Long> visitorStats = visitorService.getStats();
        stats.put("totalVisitors", visitorStats.get("totalVisitors"));
        stats.put("liveUsers", visitorStats.get("liveUsers"));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}