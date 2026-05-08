package com.workxpo.backend.dto.user.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

public record UserUpdateDTO(

        @Email
        String email,
        @Size(min = 3, max = 30) String username,

        @Size(max = 100)
        String institution,

        @Size(max = 80)
        String course,

        @Size(max = 350)
        String description,

        @URL
        String linkedinUrl
) {}

