package com.jeffy.portfolio.dtos;

import java.util.List;

public record TechDomainDto(
        Long id,
        String domainName,
        String domainIconUrl,
        List<String> skills
) {}