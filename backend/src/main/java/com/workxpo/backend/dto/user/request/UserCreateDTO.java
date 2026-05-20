package com.workxpo.backend.dto.user.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserCreateDTO(
        @NotBlank
        @Email
        String email,

        @NotBlank
        @Size(min = 3, max = 30, message = "User must have at least 3 characters and 30 characters max.")
        String username
) { }

