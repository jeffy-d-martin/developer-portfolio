package com.jeffy.portfolio.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "certificates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certificate_id")
    private Long id;

    @Column(name = "certificate_name", nullable = false)
    private String certificateName;

    @Column(name = "who_gave_certificate", nullable = false) // e.g., Coursera, Udemy, AWS, Google
    private String whoGaveCertificate;

    @Column(name = "certificate_image_url") // Stores the hosted string URL path of the certificate image
    private String certificateImageUrl;

    @Column(name = "certificate_icon_url") // Stores the hosted string URL path for the organization's icon
    private String certificateIconUrl;

    // Notice: Absolutely NO Admin fields here. It is completely standalone in Java.
}