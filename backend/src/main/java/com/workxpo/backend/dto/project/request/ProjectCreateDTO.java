package com.workxpo.backend.dto.project.request;

import com.workxpo.backend.model.enums.Category;
import com.workxpo.backend.model.enums.HelpStatus;
import com.workxpo.backend.model.enums.ProjectStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.util.List;

public record ProjectCreateDTO(

        @NotBlank(message = "Project must contain a title")
        @Size(min = 3, max = 125)
        String title,

        @NotNull(message = "Project must have a category")
        Category category,

        @NotNull(message = "Project must show its status")
        ProjectStatus statusProject,

        @NotNull(message = "Project must have a status help")
        HelpStatus statusHelp,

        @NotBlank
        @Email
        String contactLink,

        // optional data
        @Size(max = 350, message = "Description must not exceed 350 characters")
        String description,

        @Size(max = 100, message = "Institution name must not exceed 100 characters")
        String institution,

        @Size(max = 80, message = "Advisor name must not exceed 80 characters")
        String advisor,

        @URL(message = "Please provide a valid README URL")
        String readmeUrl,

        @URL(message = "Please provide a valid Image URL")
        String imageUrl,

        List<String> studentsGroup
) { }
