package com.atsresume.service;

import com.atsresume.entity.Visitor;
import com.atsresume.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VisitorService {

    private final VisitorRepository visitorRepository;

    // Called when user opens website
    public void trackVisitor(String sessionId, String ipAddress,
                              String page, Boolean isLoggedIn) {
        Visitor visitor = visitorRepository
                .findBySessionId(sessionId)
                .orElse(null);

        if (visitor == null) {
            // New visitor
            visitor = Visitor.builder()
                    .sessionId(sessionId)
                    .ipAddress(ipAddress)
                    .pageVisited(page)
                    .isLoggedIn(isLoggedIn)
                    .lastSeen(LocalDateTime.now())
                    .build();
        } else {
            // Existing visitor — update last seen
            visitor.setLastSeen(LocalDateTime.now());
            visitor.setPageVisited(page);
            visitor.setIsLoggedIn(isLoggedIn);
        }
        visitorRepository.save(visitor);
    }

    // Called every 30 seconds (heartbeat)
    public void heartbeat(String sessionId) {
        visitorRepository.findBySessionId(sessionId)
                .ifPresent(v -> {
                    v.setLastSeen(LocalDateTime.now());
                    visitorRepository.save(v);
                });
    }

    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        // Live = active in last 2 minutes
        LocalDateTime twoMinutesAgo = LocalDateTime.now().minusMinutes(2);
        stats.put("liveUsers", visitorRepository.countLiveVisitors(twoMinutesAgo));
        stats.put("totalVisitors", visitorRepository.count());
        return stats;
    }
}