package com.jeffy.portfolio.dtos;

public record ContactDto(
        Long id,
        String platformName,
        String url,
        String iconUrl,
        String description
) {}