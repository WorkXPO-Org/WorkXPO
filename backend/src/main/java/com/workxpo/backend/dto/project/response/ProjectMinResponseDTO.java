package com.workxpo.backend.dto.project.response;

import com.workxpo.backend.model.enums.HelpStatus;
import com.workxpo.backend.model.enums.ProjectStatus;

public record ProjectMinResponseDTO(
        Long id,
        String title,
        String category,
        ProjectStatus statusProject,
        HelpStatus statusHelp,
        String imageUrl
) {}
