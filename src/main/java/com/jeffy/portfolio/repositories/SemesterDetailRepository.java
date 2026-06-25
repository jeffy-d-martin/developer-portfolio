package com.jeffy.portfolio.repositories;

import com.jeffy.portfolio.models.SemesterDetail;
import com.jeffy.portfolio.dtos.SemesterDetailDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SemesterDetailRepository extends JpaRepository<SemesterDetail, Long> {

    /**
     * Fixed Constructor Projection Query:
     * Swapped 'a.semesterDetails' to 'a.semesters' to match Admin.java exactly!
     */
    @Query("SELECT new com.jeffy.portfolio.dtos.SemesterDetailDto(" +
            "s.id, s.semesterNo, s.gpa, s.cgpa, s.markSheetUrl) " +
            "FROM Admin a JOIN a.semesters s WHERE a.id = :adminId " + // <-- CHANGED HERE
            "ORDER BY s.semesterNo ASC")
    List<SemesterDetailDto> findAllPublicSemesterDetails(@Param("adminId") Long adminId);
}