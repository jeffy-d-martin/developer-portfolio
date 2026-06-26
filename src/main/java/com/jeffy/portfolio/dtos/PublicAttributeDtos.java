package com.jeffy.portfolio.dtos;

public class PublicAttributeDtos {
    public record NameDto(String adminName) {}
    public record CgpaDto(Double cgpa) {}
    public record DegreeDto(String degree) {}
    public record DescriptionDto(String description) {}
    public record CollegeDto(String educationCollege) {}
    public record EmailDto(String email) {}
    public record PhoneDto(String phoneNo) {}
    public record ResumeDto(String resumeUrl) {}
    public record RoleDto(String yourRole) {}
    public record ProfilePicDto(String profilePicUrl) {}
}