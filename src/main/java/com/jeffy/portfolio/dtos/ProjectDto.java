package com.jeffy.portfolio.dtos;

public record ProjectDto(
        Long id,
        String projectName,
        String description,
        String problem,
        String keyFeature,
        String techStack,
        String impact,
        String githubUrl,
        String liveDemoUrl,
        String erDiagramUrl
) {}