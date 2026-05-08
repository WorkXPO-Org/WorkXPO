package com.workxpo.backend.dto.project.request;

import com.workxpo.backend.model.User;
import com.workxpo.backend.model.enums.HelpStatus;
import com.workxpo.backend.model.enums.ProjectStatus;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.util.List;

public record ProjectUpdateDTO(

        @Size(min = 3, max = 125)
        String title,

        @Size(max = 350)
        String description,
        String category,

        @Size(max = 100)
        String institution,

        @Size(max = 80)
        String advisor,

        List<User> studentsGroup,

        @URL
        String readmeUrl,

        @URL
        String imageUrl,
        ProjectStatus statusProject,
        HelpStatus statusHelp,

        @Size(max = 100)
        String contactLink
) {}
