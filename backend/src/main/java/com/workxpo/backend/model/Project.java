package com.workxpo.backend.model;

import jakarta.persistence.*;
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
