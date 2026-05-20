package com.workxpo.backend.repository;

import com.workxpo.backend.model.Project;
import com.workxpo.backend.model.User;
import com.workxpo.backend.model.enums.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByCategory(Category category);
    List<Project> findByStudentLeader(User user);
}
