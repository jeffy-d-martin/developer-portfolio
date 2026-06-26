package com.jeffy.portfolio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "semester_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SemesterDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "semester_id")
    private Long id;

    @Column(name = "semester_no", nullable = false)
    private Integer semesterNo;

    @Column(name = "gpa", nullable = false)
    private Double gpa;

    @Column(name = "cgpa", nullable = false)
    private Double cgpa;

    @Column(name = "mark_sheet_url")
    private String markSheetUrl;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "semester_id", nullable = false)
    private List<Achievement> achievements;
}