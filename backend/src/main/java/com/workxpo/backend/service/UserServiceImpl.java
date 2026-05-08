package com.workxpo.backend.service;

import com.workxpo.backend.dto.user.UserDTOMapper;
import com.workxpo.backend.dto.user.UserRequestDTO;
import com.workxpo.backend.dto.user.UserResponseDTO;
import com.workxpo.backend.model.User;
import com.workxpo.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO findUserById(UUID id) {
        return userRepository.findById(id)
                .map(userDTOMapper)
                .orElseThrow(() -> new RuntimeException("User id not found"));
    }

    @Override
    @Transactional
    public UserResponseDTO createUser(UserRequestDTO userRequest, UUID supabaseId) {

        if (userRepository.existsById(supabaseId)) {
            throw new RuntimeException("User already registered");
        }

        User newUser = userDTOMapper.toEntity(userRequest);
        newUser.setId(supabaseId);

        User savedUser = userRepository.save(newUser);

        return userDTOMapper.apply(savedUser);
    }

    @Transactional
    @Override
    public void deleteUserById(UUID supabaseId) {
        User user = userRepository.findById(supabaseId)
                .orElseThrow(() -> new RuntimeException("User does not exist"));

        userRepository.delete(user);
    }
}
