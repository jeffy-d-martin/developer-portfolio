package com.jeffy.portfolio.repositories;

import com.jeffy.portfolio.models.Achievement;
import com.jeffy.portfolio.dtos.AchievementDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    /**
     * Corrected Projection Query:
     * We map the exact entity fields: id, achievementName, fromWhere, certificateImageUrl, isTechnical.
     * We target the underlying auto-managed foreign key join constraint.
     */
    @Query("SELECT new com.jeffy.portfolio.dtos.AchievementDto(" +
            "ach.id, ach.achievementName, ach.fromWhere, ach.certificateImageUrl, ach.isTechnical) " +
            "FROM SemesterDetail sem JOIN sem.achievements ach " +
            "WHERE sem.id = :semesterId " +
            "ORDER BY ach.id DESC")
    List<AchievementDto> findAchievementsBySemesterId(@Param("semesterId") Long semesterId);
}