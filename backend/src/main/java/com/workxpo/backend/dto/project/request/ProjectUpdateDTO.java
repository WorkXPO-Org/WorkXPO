package com.workxpo.backend.dto.project.request;

import com.workxpo.backend.model.enums.Category;
import com.workxpo.backend.model.enums.HelpStatus;
import com.workxpo.backend.model.enums.ProjectStatus;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.util.List;
import java.util.UUID;

public record ProjectUpdateDTO(

        @Size(min = 3, max = 125)
        String title,

        @Size(max = 350)
        String description,

        @Size(max = 100)
        String institution,

        @Size(max = 80)
        String advisor,

        List<String> studentsGroup,

        @URL
        String readmeUrl,

        @URL
        String imageUrl,

        ProjectStatus statusProject,
        HelpStatus statusHelp,
        Category category,

        @Size(max = 100)
        String contactLink
) {}
