package com.workxpo.backend.dto.user.response;

import java.util.UUID;

public record UserResponseDTO(
   UUID id,
   String email,
   String username,
   String institution,
   String course,
   String description,
   String linkedinUrl
) {}
