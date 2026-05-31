package com.atsresume.service;

import com.atsresume.dto.response.UserResponse;
import com.atsresume.entity.User;
import com.atsresume.exception.ResourceNotFoundException;
import com.atsresume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .picture(user.getPicture())
                .role(user.getRole().name())
                .build();
    }
}