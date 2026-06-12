package com.atsresume.repository;

import com.atsresume.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    Optional<Visitor> findBySessionId(String sessionId);

    // Count visitors active in last 2 minutes = live users
    @Query("SELECT COUNT(v) FROM Visitor v WHERE v.lastSeen > :since")
    Long countLiveVisitors(LocalDateTime since);

}