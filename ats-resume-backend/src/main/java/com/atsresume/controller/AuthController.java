package com.atsresume.controller;

import com.atsresume.dto.response.UserResponse;
import com.atsresume.entity.User;
import com.atsresume.service.AuthService;
import lombok.RequiredArgsConstructor;



import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getProfile(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
                authService.getUserProfile(user.getEmail()));
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Backend is running!");
    }
    
    
}