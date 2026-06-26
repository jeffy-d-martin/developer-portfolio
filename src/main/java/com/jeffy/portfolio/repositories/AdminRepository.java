package com.jeffy.portfolio.repositories;

import com.jeffy.portfolio.dtos.PublicAttributeDtos;
import com.jeffy.portfolio.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface AdminRepository extends JpaRepository<Admin , Long> {
    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$NameDto(a.adminName) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.NameDto> findNameById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$CgpaDto(a.cgpa) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.CgpaDto> findCgpaById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$DegreeDto(a.degree) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.DegreeDto> findDegreeById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$DescriptionDto(a.description) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.DescriptionDto> findDescriptionById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$CollegeDto(a.educationCollege) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.CollegeDto> findCollegeById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$EmailDto(a.email) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.EmailDto> findEmailById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$PhoneDto(a.phoneNo) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.PhoneDto> findPhoneById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$ResumeDto(a.resumeUrl) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.ResumeDto> findResumeById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$RoleDto(a.yourRole) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.RoleDto> findRoleById(@Param("id") Long id);

    @Query("SELECT new com.jeffy.portfolio.dtos.PublicAttributeDtos$ProfilePicDto(a.profilePicUrl) FROM Admin a WHERE a.id = :id")
    Optional<PublicAttributeDtos.ProfilePicDto> findProfilePicById(@Param("id") Long id);
}
