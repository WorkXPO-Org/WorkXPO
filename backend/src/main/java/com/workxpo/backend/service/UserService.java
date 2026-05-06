package com.workxpo.backend.service;

import com.workxpo.backend.dto.user.UserRequestDTO;

import java.util.List;

public interface UserService {


    List<UserRequestDTO> findAllUsers();
}
