package com.workxpo.backend.service;

import com.workxpo.backend.dto.user.*;
import com.workxpo.backend.dto.user.request.UserCreateDTO;
import com.workxpo.backend.dto.user.request.UserUpdateDTO;
import com.workxpo.backend.dto.user.response.UserResponseDTO;
import com.workxpo.backend.model.User;
import com.workxpo.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    @Value("${supabase.url}")
    private String supabaseUrl;
    @Value("${supabase.service-role-key}")
    private String serviceRoleKey;
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public List<UserResponseDTO> findAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(userDTOMapper::toResponseDTO).toList();
    }

    @Override
    public UserResponseDTO findUserById(UUID id) {
        return userRepository.findById(id)
                .map(userDTOMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("User id not found"));
    }

    public User findEntityById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User id not found"));
    }

    @Override
    @Transactional
    public UserResponseDTO syncUserProfile(Jwt jwt, UserCreateDTO userRequest) {

        UUID supabaseId = UUID.fromString(jwt.getSubject());

        User user = userRepository.findById(supabaseId)
                .orElseGet(() -> {
                    User newUser = userDTOMapper.toEntity(userRequest);
                    newUser.setId(supabaseId);
                    return userRepository.save(newUser);
                });

        return userDTOMapper.toResponseDTO(user);
    }

    /*
    @Override
    @Transactional
    public UserResponseDTO createUser(UserCreateDTO userRequest, UUID supabaseId) {

        if (userRepository.existsById(supabaseId)) {
            throw new RuntimeException("User already registered");
        }

        User newUser = userDTOMapper.toEntity(userRequest);
        newUser.setId(supabaseId);

        User savedUser = userRepository.save(newUser);
        return userDTOMapper.toResponseDTO(savedUser);
    }
     */

    @Transactional
    @Override
    public UserResponseDTO updateUser(UUID supabaseId, UserUpdateDTO updateRequest) {

        User user = userRepository.findById(supabaseId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // update the required fields
        Optional.ofNullable(updateRequest.username()).ifPresent(user::setUsername);

        // update the optional fields
        Optional.ofNullable(updateRequest.institution()).ifPresent(user::setInstitution);
        Optional.ofNullable(updateRequest.course()).ifPresent(user::setCourse);
        Optional.ofNullable(updateRequest.description()).ifPresent(user::setDescription);
        Optional.ofNullable(updateRequest.linkedinUrl()).ifPresent(user::setLinkedinUrl);

        return userDTOMapper.toResponseDTO(user);
    }

    @Transactional
    @Override
    public void deleteUserById(UUID userId) {
        // we delete the user via admin
        String url = supabaseUrl + "/auth/v1/admin/users/" + userId;

        // pass the credentials
        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", serviceRoleKey);
        headers.set("Authorization", "Bearer " + serviceRoleKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            restTemplate.exchange(url, HttpMethod.DELETE, entity, Void.class);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao deletar usuário no Supabase Auth: " + e.getMessage());
        }

        // delete the user and projects binded to him in the db
        userRepository.deleteById(userId);
    }
}