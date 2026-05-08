package com.workxpo.backend.dto.project.response;

import com.workxpo.backend.model.User;

import java.util.List;

public record ProjectResponseDTO(
        Long id,
        String title,
        String description,
        String category,
        String institution,
        String advisor,
        List<User> studentsGroup,
        User studentLeader,
        String readmeUrl,
        String imageUrl
) { }

