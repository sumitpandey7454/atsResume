package com.atsresume.service;

import com.atsresume.entity.Message;
import com.atsresume.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message sendMessage(String name, String email, String messageText) {
        Message message = Message.builder()
                .name(name)
                .email(email)
                .message(messageText)
                .isRead(false)
                .build();
        return messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc();
    }

    public Long getUnreadCount() {
        return messageRepository.countByIsReadFalse();
    }

    public Message markAsRead(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setIsRead(true);
        return messageRepository.save(message);
    }

    public void deleteMessage(Long id) {
        messageRepository.deleteById(id);
    }
}