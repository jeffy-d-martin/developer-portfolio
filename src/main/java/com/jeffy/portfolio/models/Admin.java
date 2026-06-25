package com.jeffy.portfolio.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "admin_user_details")
public class Admin {
    @Id
    @Column(name = "admin_id", nullable = false, updatable = false)
    private Long id = 1L;

    @Column(name = "admin_name", nullable = false)
    private String adminName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "degree")
    private String degree;

    @Column(name = "cgpa")
    private Double cgpa;

    @Column(name = "education_college")
    private String educationCollege;

    @Column(name = "your_role")
    private String yourRole;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "profile_pic_url") // Clean string path mapping to your photo
    private String profilePicUrl;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "admin_id", nullable = false)
    private java.util.List<Project> projects;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "admin_id", nullable = false) // Automatically creates an admin_id column in the certificates table
    private List<Certificate> certificates;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "admin_id", nullable = false) // Creates an admin_id foreign key column in the semester_details table
    private List<SemesterDetail> semesters;

    // Open Admin.java and update this collection field:

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "admin_id", nullable = false)
    private List<ExperienceAndInternship> experiencesAndInternships;

    // Inside your Admin.java class, add this alongside your other collections:

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "admin_id", nullable = false)
    private List<TechDomain> techDomains = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    private List<Contact> contacts = new ArrayList<>();
}
