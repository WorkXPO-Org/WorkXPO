package com.workxpo.backend.dto.project;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequestDTO {

    private String title;
    private String category;
    private String description;
    private String readmeUrl;
    private String imageUrl;
}
