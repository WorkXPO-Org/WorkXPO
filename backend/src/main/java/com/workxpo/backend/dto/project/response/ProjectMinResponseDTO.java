package com.workxpo.backend.dto.project.response;

public record ProjectMinResponseDTO(
        Long id,
        String title,
        String category,
        String imageUrl
) {}
