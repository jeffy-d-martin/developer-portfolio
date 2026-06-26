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

    @Column(name = "stack_name", nullable = false)
    private String stackName;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "work_experience", columnDefinition = "TEXT")
    private String workExperience;

    @Column(name = "work_years")
    private String workYears;

    @Column(name = "certificate_url")
    private String certificateUrl;

    @Column(name = "company_icon_url")
    private String companyIconUrl;


    @ElementCollection
    @CollectionTable(name = "experience_skills", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "skill_name")
    private List<String> skillsKnown;

    @ElementCollection
    @CollectionTable(name = "experience_tools", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "tool_name")
    private List<String> toolsKnown;
}