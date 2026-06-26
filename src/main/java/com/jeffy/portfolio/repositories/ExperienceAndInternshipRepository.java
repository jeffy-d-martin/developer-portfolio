package com.jeffy.portfolio.repositories;

import com.jeffy.portfolio.models.ExperienceAndInternship;
import com.jeffy.portfolio.dtos.ExperienceAndInternshipDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExperienceAndInternshipRepository extends JpaRepository<ExperienceAndInternship, Long> {


    @Query("SELECT new com.jeffy.portfolio.dtos.ExperienceAndInternshipDto(" +
            "exp.id, exp.companyName, exp.companyIconUrl, exp.stackName, " +
            "exp.workExperience, exp.workYears, exp.certificateUrl) " + // Removed lists from here!
            "FROM Admin a JOIN a.experiencesAndInternships exp WHERE a.id = :adminId " +
            "ORDER BY exp.id DESC")
    List<ExperienceAndInternshipDto> findBasePublicExperiences(@Param("adminId") Long adminId);
}