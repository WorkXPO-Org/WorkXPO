package com.workxpo.backend.controller;


import com.workxpo.backend.dto.user.request.UserCreateDTO;
import com.workxpo.backend.dto.user.response.UserResponseDTO;
import com.workxpo.backend.dto.user.request.UserUpdateDTO;
import com.workxpo.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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

    // creates the user if it doesn't exist in the DB
    @PostMapping("/sync")
    public ResponseEntity<UserResponseDTO> syncUserProfile(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UserCreateDTO requestDTO
    ) {

        UserResponseDTO synchronizedUser = userService.syncUserProfile(jwt, requestDTO);

        return ResponseEntity.ok(synchronizedUser);
    }

    /*
    @PostMapping("/create")
    public ResponseEntity<UserResponseDTO> createUser(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UserCreateDTO requestDTO) {

        UUID supabaseId = UUID.fromString(jwt.getSubject());

        UserResponseDTO newUser = userService.createUser(requestDTO, supabaseId);

        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }
     */

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody UserUpdateDTO requestDTO) {

        UserResponseDTO userResponse = userService.updateUser(id, requestDTO);
        return ResponseEntity.ok(userResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUserById(id);

        return ResponseEntity.noContent().build();
    }
}