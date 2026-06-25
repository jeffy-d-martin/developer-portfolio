package com.jeffy.portfolio.dtos;

import java.util.List;

public record SemesterWithAchievementsDto(
        Long id,
        Integer semesterNo,
        Double gpa,
        Double cgpa,
        String markSheetUrl,
        List<AchievementDto> achievements
) {}