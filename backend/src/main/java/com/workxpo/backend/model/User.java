package com.workxpo.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    // i'm not annotating the generated value because i pretend to use supabase
    @Id
    private UUID id;

    @NotBlank
    @Email
    @Column(name = "user_email", unique = true)
    private String email;

    @Column(name = "user_name", nullable = false)
    private String fullName;

    @Column(name = "user_institution")
    private String institution;

    @Column(name = "user_course")
    private String course;

    @Column(name = "user_description")
    private String description;

    @Column(name = "user_linkedin")
    private String linkedinUrl;

    @Column(name = "user_created_at", updatable = false)
    private LocalDateTime createdAt;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
