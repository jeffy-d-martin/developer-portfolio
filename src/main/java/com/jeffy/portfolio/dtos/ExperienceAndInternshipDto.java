package com.jeffy.portfolio.dtos;

import java.util.ArrayList;
import java.util.List;

public record ExperienceAndInternshipDto(
        Long id,
        String companyName,
        String companyIconUrl,
        String stackName,
        String workExperience,
        String workYears,
        String certificateUrl,
        List<String> skillsKnown,
        List<String> toolsKnown
) {

    public ExperienceAndInternshipDto(Long id, String companyName, String companyIconUrl,
                                      String stackName, String workExperience, String workYears,
                                      String certificateUrl) {
        this(id, companyName, companyIconUrl, stackName, workExperience, workYears, certificateUrl,
                new ArrayList<>(), new ArrayList<>());
    }
}