package com.jeffy.portfolio.dtos;

public record AchievementDto(
        Long id,
        String achievementName,     // Matches entity field perfectly
        String fromWhere,           // Matches entity field perfectly
        String certificateImageUrl, // Matches entity field perfectly
        boolean isTechnical         // Matches entity field perfectly
) {}