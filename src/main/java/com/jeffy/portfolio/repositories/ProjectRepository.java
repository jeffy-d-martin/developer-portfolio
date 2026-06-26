package com.jeffy.portfolio.repositories;

import com.jeffy.portfolio.models.Project;
import com.jeffy.portfolio.dtos.ProjectDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT new com.jeffy.portfolio.dtos.ProjectDto(" +
            "p.id, p.projectName, p.description, p.problem, p.keyFeature, p.techStack, p.impact, p.githubUrl, p.liveDemoUrl, p.erDiagramUrl) " +
            "FROM Admin a JOIN a.projects p WHERE a.id = :adminId")
    List<ProjectDto> findAllPublicProjects(@Param("adminId") Long adminId);
}