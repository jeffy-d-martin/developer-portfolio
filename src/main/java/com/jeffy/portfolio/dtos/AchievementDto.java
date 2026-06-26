package com.jeffy.portfolio.dtos;

public record AchievementDto(
        Long id,
        String achievementName,
        String fromWhere,
        String certificateImageUrl,
        boolean isTechnical
) {}