package com.atsresume.controller;

import com.atsresume.service.VisitorService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorService visitorService;

    // Public - track any visitor
    @PostMapping("/track")
    public ResponseEntity<String> track(
            @RequestParam String sessionId,
            @RequestParam(required = false) String page,
            @RequestParam(required = false, defaultValue = "false") Boolean isLoggedIn,
            HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) ip = request.getRemoteAddr();
        visitorService.trackVisitor(sessionId, ip, page, isLoggedIn);
        return ResponseEntity.ok("tracked");
    }

    // Public - heartbeat every 30 seconds
    @PostMapping("/heartbeat")
    public ResponseEntity<String> heartbeat(
            @RequestParam String sessionId) {
        visitorService.heartbeat(sessionId);
        return ResponseEntity.ok("ok");
    }

    // Admin only - get stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(visitorService.getStats());
    }
}