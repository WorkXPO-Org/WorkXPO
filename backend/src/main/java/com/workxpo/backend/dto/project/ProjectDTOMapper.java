package com.workxpo.backend.dto.project;

import com.workxpo.backend.dto.project.request.ProjectCreateDTO;
import com.workxpo.backend.dto.project.response.ProjectMinResponseDTO;
import com.workxpo.backend.dto.project.response.ProjectResponseDTO;
import com.workxpo.backend.dto.user.UserDTOMapper;
import com.workxpo.backend.model.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
@RequiredArgsConstructor
public class ProjectDTOMapper {

    private final UserDTOMapper userMapper;

    public ProjectMinResponseDTO toMinResponseDTO(Project project) {
        return new ProjectMinResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getCategory().name(),
                project.getStatusProject(),
                project.getStatusHelp(),
                project.getImageUrl()
        );
    }

    public ProjectResponseDTO toResponseDTO(Project project) {
        return new ProjectResponseDTO(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getCategory().name(),
                project.getStatusProject(),
                project.getStatusHelp(),
                project.getInstitution(),
                project.getAdvisor(),
                project.getStudentsGroup() == null ? List.of() :
                        project.getStudentsGroup().stream()
                        .map(userMapper::toResponseDTO)
                        .toList(),
                userMapper.toResponseDTO(project.getStudentLeader()),
                project.getReadmeUrl(),
                project.getImageUrl(),
                project.getContactLink()
        );
    }

    public Project toEntity(ProjectCreateDTO dto) {
        Project project = new Project();
        project.setTitle(dto.title());
        project.setCategory(dto.category());
        project.setStatusProject(dto.statusProject());
        project.setStatusHelp(dto.statusHelp());
        project.setContactLink(dto.contactLink());

        return project;
    }
}