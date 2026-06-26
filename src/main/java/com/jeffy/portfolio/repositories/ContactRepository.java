package com.jeffy.portfolio.repositories;

import com.jeffy.portfolio.models.Contact;
import com.jeffy.portfolio.dtos.ContactDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query("SELECT new com.jeffy.portfolio.dtos.ContactDto(c.id, c.platformName, c.url, c.iconUrl, c.description) FROM Admin a JOIN a.contacts c WHERE a.id = :adminId")
    List<ContactDto> findContactsByAdminId(@Param("adminId") Long adminId);
}