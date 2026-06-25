package com.jeffy.portfolio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tech_domains")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TechDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "domain_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "domain_name", nullable = false)
    private String domainName; // e.g., "BACKEND & ARCHITECTURE"

    @Column(name = "domain_icon_url")
    private String domainIconUrl; // To store the path to the blue/purple icons in your image

    @ElementCollection
    @CollectionTable(
            name = "domain_skills",
            joinColumns = @JoinColumn(name = "domain_id")
    )
    @Column(name = "skill_name")
    private List<String> skills = new ArrayList<>(); // e.g., ["Java", "Spring Boot", "REST API"]
}