package com.workxpo.backend.dto.project;

public record ProjectResponseDTO(
        Long id,
        String title,
        String description,
        String category,
        String institution,
        String advisor,
        String studentsGroup,
        String readmeUrl,
        String imageUrl
) { }

