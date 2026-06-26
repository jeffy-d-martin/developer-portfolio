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

    @Column(name = "from_where")
    private String fromWhere;

    @Column(name = "certificate_image_url")
    private String certificateImageUrl;

    @Column(name = "is_technical", nullable = false)
    private boolean isTechnical;

}