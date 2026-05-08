package com.workxpo.backend.controller;


import com.workxpo.backend.dto.user.UserRequestDTO;
import com.workxpo.backend.dto.user.UserResponseDTO;
import com.workxpo.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {

        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/{id}")
    private ResponseEntity<UserResponseDTO> getUserById(@PathVariable UUID id) {

        return ResponseEntity.ok(userService.findUserById(id));
    }

    @PostMapping("/create/{supabaseId}")
    public ResponseEntity<UserResponseDTO> createUser(@PathVariable UUID supabaseId,
                           @Valid @RequestBody UserRequestDTO requestDTO) {

        UserResponseDTO newUser = userService.createUser(requestDTO, supabaseId);

        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUserById(id);

        return ResponseEntity.noContent().build();
    }

}
