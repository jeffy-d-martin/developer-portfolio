package com.jeffy.portfolio.services.publicsite;


import com.jeffy.portfolio.dtos.*;
import com.jeffy.portfolio.exceptions.ProfileNotInitializedException;
import com.jeffy.portfolio.exceptions.ResourceNotFoundException;
import com.jeffy.portfolio.models.Admin;
import com.jeffy.portfolio.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class PublicPortfolioService {

    private final AdminRepository adminRepository;
    private final ProjectRepository projectRepository;
    private final AchievementRepository achievementRepository;
    private final SemesterDetailRepository semesterDetailRepository;
    private final ExperienceAndInternshipRepository experienceAndInternshipRepository;
    private final ContactRepository contactRepository;

    private static final Long MASTER_ADMIN_ID = 1L;
    private static final String ERR_MSG = "Portfolio attribute information is currently uninitialized.";

    public PublicAttributeDtos.NameDto getAdminName() { return adminRepository.findNameById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.CgpaDto getCgpa() { return adminRepository.findCgpaById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.DegreeDto getDegree() { return adminRepository.findDegreeById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.DescriptionDto getDescription() { return adminRepository.findDescriptionById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.CollegeDto getCollege() { return adminRepository.findCollegeById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.EmailDto getEmail() { return adminRepository.findEmailById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.PhoneDto getPhone() { return adminRepository.findPhoneById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.ResumeDto getResume() { return adminRepository.findResumeById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.RoleDto getYourRole() { return adminRepository.findRoleById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }
    public PublicAttributeDtos.ProfilePicDto getProfilePic() { return adminRepository.findProfilePicById(MASTER_ADMIN_ID).orElseThrow(() -> new ProfileNotInitializedException(ERR_MSG)); }

    // Add inside your PublicPortfolioService class:

    public List<ProjectDto> getPublicProjects() {
        return projectRepository.findAllPublicProjects(1L);
    }

    @Transactional(readOnly = true)
    public List<SemesterWithAchievementsDto> getAcademicTimeline() {
        Long masterAdminId = 1L; // [cite: 287]

        return semesterDetailRepository.findAllPublicSemesterDetails(masterAdminId).stream()
                .map(sem -> {
                    List<AchievementDto> achievements = achievementRepository
                            .findAchievementsBySemesterId(sem.id());

                    return new SemesterWithAchievementsDto(
                            sem.id(),
                            sem.semesterNo(),
                            sem.gpa(),
                            sem.cgpa(),
                            sem.markSheetUrl(),
                            achievements
                    );
                })
                .toList();// Quick Java 16+ syntax for cleaner collection mapping
    }

    @Transactional(readOnly = true) // readOnly turns off dirty tracking for maximum optimization speeds
    public List<ExperienceAndInternshipDto> getPublicExperiences() {
        Long masterAdminId = 1L; // Bounded to your single profile profile key context

        // 1. Fetch the lightweight flat records base
        return experienceAndInternshipRepository.findBasePublicExperiences(masterAdminId).stream()
                .map(baseDto -> {
                    // 2. Fetch the true entity to load its element collection records out safely
                    return experienceAndInternshipRepository.findById(baseDto.id())
                            .map(entity -> new ExperienceAndInternshipDto(
                                    entity.getId(),
                                    entity.getCompanyName(),
                                    entity.getCompanyIconUrl(),
                                    entity.getStackName(),
                                    entity.getWorkExperience(),
                                    entity.getWorkYears(),
                                    entity.getCertificateUrl(),
                                    List.copyOf(entity.getSkillsKnown()), // Populates element collections dynamically
                                    List.copyOf(entity.getToolsKnown())   // Populates element collections dynamically
                            ))
                            .orElse(baseDto);
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TechDomainDto> getTechDomains() {
        // 1. Fetch the central profile
        Admin admin = adminRepository.findById(MASTER_ADMIN_ID)
                .orElseThrow(() -> new ResourceNotFoundException("Admin profile", "id", MASTER_ADMIN_ID.toString()));

        // 2. Safely map the entities to DTOs
        // Because of @Transactional, calling .getSkills() triggers Hibernate to fetch the @ElementCollection seamlessly
        return admin.getTechDomains().stream()
                .map(domain -> new TechDomainDto(
                        domain.getId(),
                        domain.getDomainName(),
                        domain.getDomainIconUrl(),
                        domain.getSkills()
                ))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ContactDto> getContacts() {
        Admin admin = adminRepository.findById(MASTER_ADMIN_ID).orElse(null);
        if (admin == null || admin.getContacts() == null) {
            return List.of();
        }
        return admin.getContacts().stream()
                .map(c -> new ContactDto(c.getId(), c.getPlatformName(), c.getUrl(), c.getIconUrl(), c.getDescription()))
                .collect(Collectors.toList());
    }
}
