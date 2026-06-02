package com.atsresume.controller;

import com.atsresume.entity.Message;
import com.atsresume.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    // Public - anyone can send
    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendMessage(
            @RequestParam String name,
            @RequestParam(required = false) String email,
            @RequestParam String message) {
        messageService.sendMessage(name, email, message);
        return ResponseEntity.ok(Map.of("status", "Message sent successfully!"));
    }

    // Admin only
    @GetMapping("/all")
    public ResponseEntity<List<Message>> getAllMessages() {
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount() {
        return ResponseEntity.ok(messageService.getUnreadCount());
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Message> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.markAsRead(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id);
        return ResponseEntity.ok("Deleted");
    }
}