package com.workxpo.backend.service;

import com.workxpo.backend.dto.user.request.UserCreateDTO;
import com.workxpo.backend.dto.user.response.UserResponseDTO;
import com.workxpo.backend.dto.user.request.UserUpdateDTO;
import com.workxpo.backend.model.User;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;
import java.util.UUID;

public interface UserService {


    List<UserResponseDTO> findAllUsers();

    UserResponseDTO findUserById(UUID id);

    User findEntityById(UUID id);

    UserResponseDTO syncUserProfile(Jwt jwt, UserCreateDTO userRequest);

    /* UserResponseDTO createUser(UserCreateDTO userRequest, UUID supabaseId); */

    void deleteUserById(UUID supabaseId);

    UserResponseDTO updateUser(UUID supabaseId, UserUpdateDTO requestDTO);
}
