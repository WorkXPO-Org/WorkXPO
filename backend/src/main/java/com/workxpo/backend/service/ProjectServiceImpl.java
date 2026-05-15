package com.workxpo.backend.service;

import com.workxpo.backend.dto.project.ProjectDTOMapper;
import com.workxpo.backend.dto.project.request.ProjectCreateDTO;
import com.workxpo.backend.dto.project.request.ProjectUpdateDTO;
import com.workxpo.backend.dto.project.response.ProjectMinResponseDTO;
import com.workxpo.backend.dto.project.response.ProjectResponseDTO;
import com.workxpo.backend.model.Project;
import com.workxpo.backend.model.User;
import com.workxpo.backend.model.enums.Category;
import com.workxpo.backend.model.enums.HelpStatus;
import com.workxpo.backend.repository.ProjectRepository;
import com.workxpo.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectDTOMapper projectDTOMapper;
    private final UserRepository userRepository;
    private final UserService userService;

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
    public List<ProjectMinResponseDTO> findAllProjectsByAuthenticatedUser(UUID supabaseId) {

        User user = userRepository.findById(supabaseId).orElseThrow(() -> new RuntimeException("User not found"));

        return projectRepository.findByStudentLeader(user)
                .stream()
                .map(projectDTOMapper::toMinResponseDTO)
                .toList();
    }

    @Override
    public List<ProjectMinResponseDTO> filterProjectByCategory(Category category) {

        return projectRepository.findByCategory(category)
                .stream()
                .map(projectDTOMapper::toMinResponseDTO)
                .toList();
    }

    @Override
    public Map<Category, Double> calculateICPByEachCategory() {

        List<Project> projects = projectRepository.findAll();

        return projects.stream()
                .collect(Collectors.groupingBy(
                        Project::getCategory,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                list -> {
                                    if (list.isEmpty()) return 0.0;

                                    // filter the projects that already received help
                                    long contactedProjects = list.stream()
                                            .filter(proj -> proj.getStatusHelp() == HelpStatus.RECEIVED)
                                            .count();

                                    return (double) contactedProjects / list.size() * 100;
                                }
                        )
                ));
    }

    @Override
    @Transactional
    public ProjectResponseDTO createProject(ProjectCreateDTO projectRequest, UUID studentId) {

        // TODO: Verify if the method is working or changes in the ProjectCreateDTO are needed.
        User studentLeader = userService.findEntityById(studentId);

        Project project = projectDTOMapper.toEntity(projectRequest);
        project.setStudentLeader(studentLeader);

        Project savedProject = projectRepository.save(project);
        return projectDTOMapper.toResponseDTO(savedProject);
    }

    @Override
    @Transactional
    public ProjectResponseDTO updateProject(Long id, ProjectUpdateDTO dto, UUID userId) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project does not exist"));

        if (!project.getStudentLeader().getId().equals(userId)) {
            throw new AccessDeniedException("You do not have permission to edit this project");
        }

        // return the field for an update if they're present. If not, it doesn't update
        Optional.ofNullable(dto.title()).ifPresent(project::setTitle);
        Optional.ofNullable(dto.description()).ifPresent(project::setDescription);
        Optional.ofNullable(dto.institution()).ifPresent(project::setInstitution);
        Optional.ofNullable(dto.advisor()).ifPresent(project::setAdvisor);

        Optional.ofNullable(dto.readmeUrl()).ifPresent(project::setReadmeUrl);
        Optional.ofNullable(dto.imageUrl()).ifPresent(project::setImageUrl);


        Optional.ofNullable(dto.statusProject()).ifPresent(project::setStatusProject);
        Optional.ofNullable(dto.statusHelp()).ifPresent(project::setStatusHelp);
        Optional.ofNullable(dto.category()).ifPresent(project::setCategory);
        Optional.ofNullable(dto.contactLink()).ifPresent(project::setContactLink);

        Optional.ofNullable(dto.studentsGroup()).ifPresent(ids -> {

            List<User> users = userRepository.findAllById(ids);

            // verify if the ids does exist
            if (users.size() != ids.size()) {
                throw new RuntimeException("One or more ids in the group were not found");
            }

            project.setStudentsGroup(users);
        });

        return projectDTOMapper.toResponseDTO(projectRepository.save(project));
    }

    @Override
    @Transactional
    public void deleteProjectById(Long id, UUID userId) {

        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project does not exist"));

        if (!project.getStudentLeader().getId().equals(userId)) {
            throw new AccessDeniedException("You do not have permission to edit this project");
        }

        projectRepository.delete(project);
    }
}
