package com.atsresume.security;

import com.atsresume.entity.User;
import com.atsresume.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");
        String googleId = oAuth2User.getAttribute("sub");

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            // new user → save to database
            user = User.builder()
                    .email(email)
                    .name(name)
                    .picture(picture)
                    .googleId(googleId)
                    .role(User.Role.USER)
                    .build();
            userRepository.save(user);
        } else {
            // existing user → update info
            user.setName(name);
            user.setPicture(picture);
            userRepository.save(user);
        }

        return oAuth2User;
    }
}