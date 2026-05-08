package com.workxpo.backend.service;

import com.workxpo.backend.dto.project.ProjectDTOMapper;
import com.workxpo.backend.dto.project.request.ProjectCreateDTO;
import com.workxpo.backend.dto.project.response.ProjectMinResponseDTO;
import com.workxpo.backend.dto.project.response.ProjectResponseDTO;
import com.workxpo.backend.model.Project;
import com.workxpo.backend.model.User;
import com.workxpo.backend.model.enums.Category;
import com.workxpo.backend.model.enums.HelpStatus;
import com.workxpo.backend.model.enums.ProjectStatus;
import com.workxpo.backend.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectDTOMapper projectDTOMapper;

    @Override
    public List<ProjectMinResponseDTO> findAllProjectsForShowcase() {
        return projectRepository.findAll()
                .stream()
                .map(projectDTOMapper::toMinResponseDTO).toList();
    }

    @Override
    public ProjectResponseDTO findProjectById(Long id) {

        return projectRepository.findById(id)
                .map(projectDTOMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Project id not found"));

    }

    @Override
    public List<ProjectMinResponseDTO> filterProjectByCategory(Category category) {

        return projectRepository.findByCategory(category)
                .stream()
                .map(projectDTOMapper::toMinResponseDTO)
                .toList();
    }

    @Override
    @Transactional
    public ProjectResponseDTO createProject(ProjectCreateDTO projectRequest, User studentLeader) {

        Project project = projectDTOMapper.toEntity(projectRequest);
        project.setStudentLeader(studentLeader);

        Project savedProject = projectRepository.save(project);
        return projectDTOMapper.toResponseDTO(savedProject);
    }

    @Override
    @Transactional
    public ProjectResponseDTO updateProject(Long id, Map<String, Object> updatedRequest, UUID userId) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project does not exist"));

        if (!project.getStudentLeader().getId().equals(userId)) {
            throw new AccessDeniedException("You do not have permission to edit this project");
        }

        Optional.ofNullable((String) updatedRequest.get("title")).ifPresent(project::setTitle);
        Optional.ofNullable((String) updatedRequest.get("description")).ifPresent(project::setDescription);
        Optional.ofNullable((String) updatedRequest.get("readmeUrl")).ifPresent(project::setReadmeUrl);
        Optional.ofNullable((String) updatedRequest.get("imageUrl")).ifPresent(project::setImageUrl);
        Optional.ofNullable((String) updatedRequest.get("contactLink")).ifPresent(project::setContactLink);

        Optional.ofNullable((String) updatedRequest.get("statusProject"))
                .ifPresent(
                        status -> project.setStatusProject(ProjectStatus.valueOf(status))
                );

        Optional.ofNullable((String) updatedRequest.get("statusHelp"))
                .ifPresent(
                        status -> project.setStatusHelp(HelpStatus.valueOf(status))
                );

        Optional.ofNullable((String) updatedRequest.get("statusProject"))
                .ifPresent(
                        category -> project.setCategory(Category.valueOf(category))
                );

        return projectDTOMapper.toResponseDTO(projectRepository.save(project));
    }

    @Override
    @Transactional
    public void deleteProjectById(Long id, UUID userId)  {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project does not exist"));

        if (!project.getStudentLeader().getId().equals(userId)) {
            throw new AccessDeniedException("You do not have permission to edit this project");
        }

        projectRepository.delete(project);
    }
}
