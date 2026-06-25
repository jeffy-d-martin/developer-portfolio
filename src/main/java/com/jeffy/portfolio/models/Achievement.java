package com.jeffy.portfolio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "achievements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achievement_id")
    private Long id;

    @Column(name = "achievement_name", nullable = false)
    private String achievementName;

    @Column(name = "from_where") // e.g., Hackathon, College Event, Inter-college competition
    private String fromWhere;

    @Column(name = "certificate_image_url") // Stores the hosted string URL path of the certificate/photo
    private String certificateImageUrl;

    @Column(name = "is_technical", nullable = false) // Boolean flag to distinguish Technical vs Non-Technical
    private boolean isTechnical;

    // Standalone entity: No fields referring back to SemesterDetail in Java code
}