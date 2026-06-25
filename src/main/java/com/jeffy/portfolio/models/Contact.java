package com.jeffy.portfolio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "contacts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "platform_name", nullable = false)
    private String platformName; // e.g., "GitHub", "LinkedIn"

    @Column(name = "url", nullable = false)
    private String url; // e.g., "https://github.com/jeffy", "mailto:geethanjalivn06@gmail.com"

    @Column(name = "icon_url")
    private String iconUrl; // e.g., "/assets/icons/github.svg"

    @Column(name = "description")
    private String description;
}