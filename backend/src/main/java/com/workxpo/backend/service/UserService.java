package com.workxpo.backend.service;

import com.workxpo.backend.dto.user.UserRequestDTO;
import com.workxpo.backend.dto.user.UserResponseDTO;

import java.util.List;
import java.util.UUID;

public interface UserService {


    List<UserResponseDTO> findAllUsers();
    UserResponseDTO findUserById(UUID id);

    UserResponseDTO createUser(UserRequestDTO userRequest, UUID supabaseId);
}
