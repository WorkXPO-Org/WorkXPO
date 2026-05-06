package com.workxpo.backend.model;

import com.workxpo.backend.model.enums.HelpStatus;
import com.workxpo.backend.model.enums.ProjectStatus;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "project")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_title", nullable = false)
    private String title;

    @Column(name = "project_description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "project_category", nullable = false)
    private String category;

    @Column(name = "project_institution")
    private String institution;

    @Column(name = "project_advisor")
    private String advisor;

    @Column(name = "project_students_group")
    private String studentsGroup;

    @Column(name = "project_readme_url")
    private String readmeUrl;

    @Column(name = "project_image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_status_project", nullable = false)
    private ProjectStatus statusProject;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_status_help", nullable = false)
    private HelpStatus statusHelp;

    @NotBlank(message = "Contact link must not be blank")
    @Column(name = "project_contact_link", nullable = false)
    private String contactLink;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User student;

    @Column(name = "project_created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
