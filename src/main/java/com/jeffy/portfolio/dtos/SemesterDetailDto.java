package com.jeffy.portfolio.dtos;

public record SemesterDetailDto(
        Long id,
        Integer semesterNo,
        Double gpa,
        Double cgpa,
        String markSheetUrl
) {}