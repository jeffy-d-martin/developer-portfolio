package com.jeffy.portfolio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "experience_and_internships")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceAndInternship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experience_id")
    private Long id;

    @Column(name = "stack_name", nullable = false) // e.g., "Java Backend Development"
    private String stackName;

    @Column(name = "company_name", nullable = false) // e.g., "Google", "XYZ Corp"
    private String companyName;

    @Column(name = "work_experience", columnDefinition = "TEXT") // e.g., "Software Engineer Intern"
    private String workExperience;

    @Column(name = "work_years") // e.g., "6 Months" or "1 Year"
    private String workYears;

    @Column(name = "certificate_url") // Hosted storage path to recommendation letter or proof document
    private String certificateUrl;

    @Column(name = "company_icon_url") // Hosted storage path string for the logo image
    private String companyIconUrl;

    // --- SUB-COLLECTIONS MANAGED AUTOMATICALLY ---

    @ElementCollection
    @CollectionTable(name = "experience_skills", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "skill_name")
    private List<String> skillsKnown; // Stores ["Core Java", "Spring Boot"]

    @ElementCollection
    @CollectionTable(name = "experience_tools", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "tool_name")
    private List<String> toolsKnown; // Stores ["IntelliJ IDEA", "Postman"]
}