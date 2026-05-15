package com.workxpo.backend.service;

import com.workxpo.backend.dto.user.*;
import com.workxpo.backend.dto.user.request.UserCreateDTO;
import com.workxpo.backend.dto.user.request.UserUpdateDTO;
import com.workxpo.backend.dto.user.response.UserResponseDTO;
import com.workxpo.backend.model.User;
import com.workxpo.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

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


    @Override
    @Transactional
    public void deleteUserById(UUID supabaseId) {
        User user = userRepository.findById(supabaseId)
                .orElseThrow(() -> new RuntimeException("User does not exist"));

        userRepository.delete(user);
    }

    @Transactional
    @Override
    public UserResponseDTO updateUser(UUID supabaseId, UserUpdateDTO updateRequest) {

        User user = userRepository.findById(supabaseId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // update the required fields
        Optional.ofNullable(updateRequest.username()).ifPresent(user::setUsername);
        Optional.ofNullable(updateRequest.email()).ifPresent(user::setEmail);

        // update the optional fields
        Optional.ofNullable(updateRequest.institution()).ifPresent(user::setInstitution);
        Optional.ofNullable(updateRequest.course()).ifPresent(user::setCourse);
        Optional.ofNullable(updateRequest.description()).ifPresent(user::setDescription);
        Optional.ofNullable(updateRequest.linkedinUrl()).ifPresent(user::setLinkedinUrl);

        return userDTOMapper.toResponseDTO(user);
    }

}
