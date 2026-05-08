package com.workxpo.backend.service;

import com.workxpo.backend.dto.project.request.ProjectCreateDTO;
import com.workxpo.backend.dto.project.request.ProjectUpdateDTO;
import com.workxpo.backend.dto.project.response.ProjectMinResponseDTO;
import com.workxpo.backend.dto.project.response.ProjectResponseDTO;
import com.workxpo.backend.model.User;
import com.workxpo.backend.model.enums.Category;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface ProjectService {

    List<ProjectMinResponseDTO> findAllProjectsForShowcase();

    ProjectResponseDTO findProjectById(Long id);

    List<ProjectMinResponseDTO> filterProjectByCategory(Category category);

    ProjectResponseDTO createProject(ProjectCreateDTO projectRequest, User studentLeader);

    ProjectResponseDTO updateProject(Long id, Map<String, Object> updatedRequest, UUID userId);

    void deleteProjectById(Long id, UUID userId);
}
