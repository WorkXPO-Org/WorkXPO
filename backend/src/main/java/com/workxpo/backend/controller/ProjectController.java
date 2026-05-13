package com.workxpo.backend.controller;

import com.workxpo.backend.dto.project.request.ProjectCreateDTO;
import com.workxpo.backend.dto.project.request.ProjectUpdateDTO;
import com.workxpo.backend.dto.project.response.ProjectMinResponseDTO;
import com.workxpo.backend.dto.project.response.ProjectResponseDTO;
import com.workxpo.backend.model.enums.Category;
import com.workxpo.backend.service.ProjectService;
import com.workxpo.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<ProjectMinResponseDTO>> getProjectsForShowcase() {

        return ResponseEntity.ok(projectService.findAllProjectsForShowcase());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id) {

        return ResponseEntity.ok(projectService.findProjectById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProjectMinResponseDTO>> getProjectsByCategory(@PathVariable Category category) {

        return ResponseEntity.ok(projectService.filterProjectByCategory(category));
    }

    @GetMapping("/metrics/icp")
    public ResponseEntity<Map<Category, Double>> getICPByEachCategory() {
        return ResponseEntity.ok(projectService.calculateICPByEachCategory());
    }


    @PostMapping("/create")
    public ResponseEntity<ProjectResponseDTO> createProject(
            @Valid @RequestBody ProjectCreateDTO projectRequest,
            @AuthenticationPrincipal Jwt jwt) {

        UUID userId = UUID.fromString(jwt.getSubject());

        ProjectResponseDTO response = projectService.createProject(projectRequest, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectUpdateDTO updateRequest,
            @AuthenticationPrincipal Jwt jwt
    ) {

        UUID userId = UUID.fromString(jwt.getSubject());

        ProjectResponseDTO response = projectService.updateProject(id, updateRequest, userId);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt) {

        UUID userId = UUID.fromString(jwt.getSubject());

        projectService.deleteProjectById(id, userId);

        return ResponseEntity.noContent().build();
    }
}
