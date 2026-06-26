package com.jeffy.portfolio.controllers.publicsite;

import com.jeffy.portfolio.dtos.*;
import com.jeffy.portfolio.services.publicsite.PublicPortfolioService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class PublicPortfolioController {

    public final PublicPortfolioService publicPortfolioService;

    @GetMapping("/name")
    public ResponseEntity<PublicAttributeDtos.NameDto> getAdminName() {
        return ResponseEntity.ok(publicPortfolioService.getAdminName());
    }

    @GetMapping("/cgpa")
    public ResponseEntity<PublicAttributeDtos.CgpaDto> getCgpa() {
        return ResponseEntity.ok(publicPortfolioService.getCgpa());
    }

    @GetMapping("/degree")
    public ResponseEntity<PublicAttributeDtos.DegreeDto> getDegree() {
        return ResponseEntity.ok(publicPortfolioService.getDegree());
    }

    @GetMapping("/description") public ResponseEntity<PublicAttributeDtos.DescriptionDto> getDescription() {
        return ResponseEntity.ok(publicPortfolioService.getDescription());
    }

    @GetMapping("/college") public ResponseEntity<PublicAttributeDtos.CollegeDto> getCollege() {
        return ResponseEntity.ok(publicPortfolioService.getCollege());
    }

    @GetMapping("/email") public ResponseEntity<PublicAttributeDtos.EmailDto> getEmail() {
        return ResponseEntity.ok(publicPortfolioService.getEmail());
    }

    @GetMapping("/phone") public ResponseEntity<PublicAttributeDtos.PhoneDto> getPhone() {
        return ResponseEntity.ok(publicPortfolioService.getPhone());
    }

    @GetMapping("/resume") public ResponseEntity<PublicAttributeDtos.ResumeDto> getResume() {
        return ResponseEntity.ok(publicPortfolioService.getResume());
    }

    @GetMapping("/role") public ResponseEntity<PublicAttributeDtos.RoleDto> getYourRole() {
        return ResponseEntity.ok(publicPortfolioService.getYourRole());
    }

    @GetMapping("/profile-pic") public ResponseEntity<PublicAttributeDtos.ProfilePicDto> getProfilePic() {
        return ResponseEntity.ok(publicPortfolioService.getProfilePic());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDto>> getPublicProjects() {
        return ResponseEntity.ok(publicPortfolioService.getPublicProjects());
    }

    @GetMapping("/academic-timeline")
    public ResponseEntity<List<com.jeffy.portfolio.dtos.SemesterWithAchievementsDto>> getAcademicTimeline() {
        return ResponseEntity.ok(publicPortfolioService.getAcademicTimeline());
    }


    @GetMapping("/experience")
    public ResponseEntity<List<com.jeffy.portfolio.dtos.ExperienceAndInternshipDto>> getPublicExperiences() {
        return ResponseEntity.ok(publicPortfolioService.getPublicExperiences());
    }

    @GetMapping("/tech-domains")
    public ResponseEntity<List<TechDomainDto>> getTechDomains() {
        return ResponseEntity.ok(publicPortfolioService.getTechDomains());
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<ContactDto>> getContacts() {
        return ResponseEntity.ok(publicPortfolioService.getContacts());
    }
}
