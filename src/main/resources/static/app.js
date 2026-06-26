/**
 * ==========================================================================
 * STUDENT PORTFOLIO FRONTEND LOGIC & CONTROLLER
 * Dynamically binds REST APIs, builds scroll spies, and handles modals
 * ==========================================================================
 */

const BASE_URL = window.location.port === '8080' 
    ? '/api/public' 
    : 'http://localhost:8080/api/public';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise Menu Toggle & Navigation behaviors
    initNavigation();

    // 2. Fetch and render portfolio contents
    fetchPortfolioData();

    // 3. Setup modal closure listeners
    initModal();
});

/**
 * Handle navigation interactions (Mobile Hamburger Menu and Scroll Spy Active highlights)
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Mobile menu drawer
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll spy tracker
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 120; // offset header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Fetch and Render student portfolio data from API.
 */
async function fetchPortfolioData() {
    let rawData = {};

    try {
        // Concurrently query simple attributes to speed up load time
        const [nameRes, roleRes, cgpaRes, degreeRes, collegeRes, picRes, descRes, emailRes, phoneRes, resumeRes] = 
            await Promise.all([
                fetch(`${BASE_URL}/name`),
                fetch(`${BASE_URL}/role`),
                fetch(`${BASE_URL}/cgpa`),
                fetch(`${BASE_URL}/degree`),
                fetch(`${BASE_URL}/college`),
                fetch(`${BASE_URL}/profile-pic`),
                fetch(`${BASE_URL}/description`),
                fetch(`${BASE_URL}/email`),
                fetch(`${BASE_URL}/phone`),
                fetch(`${BASE_URL}/resume`)
            ]);

        // Parse responses safely, fallback to null/default on empty or error
        rawData.adminName = nameRes.ok ? (await nameRes.json()).adminName : null;
        rawData.yourRole = roleRes.ok ? (await roleRes.json()).yourRole : null;
        rawData.cgpa = cgpaRes.ok ? (await cgpaRes.json()).cgpa : null;
        rawData.degree = degreeRes.ok ? (await degreeRes.json()).degree : null;
        rawData.educationCollege = collegeRes.ok ? (await collegeRes.json()).educationCollege : null;
        rawData.profilePicUrl = picRes.ok ? (await picRes.json()).profilePicUrl : null;
        rawData.description = descRes.ok ? (await descRes.json()).description : null;
        rawData.email = emailRes.ok ? (await emailRes.json()).email : null;
        rawData.phoneNo = phoneRes.ok ? (await phoneRes.json()).phoneNo : null;
        rawData.resumeUrl = resumeRes.ok ? (await resumeRes.json()).resumeUrl : null;

        // Fetch complex lists
        const [projectsRes, timelineRes, expRes, techDomainsRes, contactsRes] = await Promise.all([
            fetch(`${BASE_URL}/projects`),
            fetch(`${BASE_URL}/academic-timeline`),
            fetch(`${BASE_URL}/experience`),
            fetch(`${BASE_URL}/tech-domains`),
            fetch(`${BASE_URL}/contacts`)
        ]);

        rawData.projects = projectsRes.ok ? (await projectsRes.json()) : [];
        rawData.academicTimeline = timelineRes.ok ? (await timelineRes.json()) : [];
        rawData.experience = expRes.ok ? (await expRes.json()) : [];
        rawData.techDomains = techDomainsRes.ok ? (await techDomainsRes.json()) : [];
        rawData.contacts = contactsRes.ok ? (await contactsRes.json()) : [];

        // Render everything directly from database data
        renderActualData(rawData);

    } catch (e) {
        console.error("Critical error fetching portfolio database content:", e);
        showUIError("Failed to connect to the backend server. Please verify the API status.");
    }
}

/**
 * Display a clear error message in the hero details section if network/server is down
 */
function showUIError(msg) {
    document.getElementById('admin-name').textContent = "Connection Error";
    document.getElementById('role').textContent = "API Unreachable";
    document.getElementById('description').innerHTML = `<span style="color: #ff0055; font-weight: 500;">${msg}</span>`;
    
    // Clear loaders in lists
    document.getElementById('projects-grid').innerHTML = `<div class="loading-spinner" style="color: #ff0055;">Offline: Could not load projects.</div>`;
    document.getElementById('academic-timeline-list').innerHTML = `<div class="loading-spinner" style="color: #ff0055;">Offline: Could not load academic timeline.</div>`;
    document.getElementById('experience-list').innerHTML = `<div class="loading-spinner" style="color: #ff0055;">Offline: Could not load experiences.</div>`;
    document.getElementById('skills-matrix').innerHTML = `<div class="loading-spinner" style="color: #ff0055;">Offline: Could not load skills.</div>`;
}

/**
 * Renders actual database-fetched data into DOM elements
 */
function renderActualData(data) {
    document.getElementById('admin-name').textContent = data.adminName || "No Name Configured";
    document.getElementById('logo-name').textContent = data.adminName ? data.adminName.split(' ')[0] : "Portfolio";
    document.getElementById('footer-name').textContent = data.adminName || "Portfolio";
    document.getElementById('role').textContent = data.yourRole || "Developer";
    document.getElementById('cgpa').textContent = data.cgpa ? parseFloat(data.cgpa).toFixed(2) + '%' : '0.00%';
    document.getElementById('college-name').textContent = data.educationCollege || 'NO COLLEGE SET';
    document.getElementById('degree').textContent = data.degree || 'NO DEGREE SET';
    document.getElementById('description').textContent = data.description || "Welcome to my portfolio.";
    
    // Binding contact details
    document.getElementById('contact-email').textContent = data.email || "N/A";
    const emailLink = document.getElementById('email-link');
    if (data.email) {
        emailLink.href = `mailto:${data.email}`;
        emailLink.classList.remove('hidden');
    } else {
        emailLink.classList.add('hidden');
    }

    document.getElementById('contact-phone').textContent = data.phoneNo || "N/A";
    const phoneLink = document.getElementById('phone-link');
    if (data.phoneNo) {
        phoneLink.href = `tel:${data.phoneNo}`;
        phoneLink.classList.remove('hidden');
    } else {
        phoneLink.classList.add('hidden');
    }

    // Profile Pic
    const profilePic = document.getElementById('profile-pic');
    if (data.profilePicUrl) {
        profilePic.src = data.profilePicUrl;
    } else {
        profilePic.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop'; // fallback avatar placeholder
    }

    // Resume button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        if (data.resumeUrl && data.resumeUrl.trim() !== '') {
            resumeBtn.href = data.resumeUrl;
            resumeBtn.classList.remove('hidden');
            resumeBtn.onclick = null;
        } else {
            resumeBtn.href = '#';
            resumeBtn.classList.remove('hidden');
            resumeBtn.onclick = (e) => { 
                e.preventDefault(); 
                alert('Resume has not been uploaded yet.'); 
            };
        }
    }

    // Dynamic Lists (Projects, Timeline, Experience, Tech Domains, Contacts)
    renderProjects(data.projects);
    renderTimeline(data.academicTimeline);
    renderExperience(data.experience);
    renderTechDomains(data.techDomains);
    renderContacts(data.contacts);

    // Update footer year dynamically
    document.getElementById('footer-year').textContent = new Date().getFullYear();
}

/**
 * Projects dynamic card renderer
 */
function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    if (!projects || projects.length === 0) {
        grid.innerHTML = '<div class="loading-spinner">No projects listed.</div>';
        document.getElementById('projects-count').textContent = '0';
        return;
    }

    document.getElementById('projects-count').textContent = projects.length;

    // Cache list globally for modal lookup
    window.projectsList = projects;

    projects.forEach(project => {
        // Parse comma-separated tech stack
        const techStackArr = project.techStack 
            ? project.techStack.split(',').map(s => s.trim()) 
            : [];

        let techPillsHtml = '';
        techStackArr.forEach(tech => {
            if (tech) {
                techPillsHtml += `<span class="tech-pill">${tech}</span>`;
            }
        });

        // GitHub and Live links
        let linksHtml = '';
        if (project.githubUrl) {
            linksHtml += `
                <a href="${project.githubUrl}" target="_blank" class="project-link secondary" id="proj-git-${project.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    GitHub
                </a>`;
        }
        if (project.liveDemoUrl) {
            linksHtml += `
                <a href="${project.liveDemoUrl}" target="_blank" class="project-link primary" id="proj-live-${project.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    Live Demo
                </a>`;
        }

        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h3>${project.projectName}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tech">${techPillsHtml}</div>
            
            <div class="project-actions-row" style="margin-top: auto; display: flex; flex-direction: column; gap: 12px;">
                <a href="project-details.html?id=${project.id}" class="btn btn-secondary btn-block" id="proj-info-${project.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    More Info
                </a>
                ${linksHtml ? `<div class="project-links" style="border-top: none; padding-top: 0; margin-top: 0; width: 100%;">${linksHtml}</div>` : ''}
            </div>
        `;

        grid.appendChild(card);
    });
}

/**
 * Academic Timeline dynamic renderer
 */
function renderTimeline(timeline) {
    const list = document.getElementById('academic-timeline-list');
    list.innerHTML = '';

    if (!timeline || timeline.length === 0) {
        list.innerHTML = '<div class="loading-spinner">No academic records configured.</div>';
        document.getElementById('achievements-count').textContent = '0';
        return;
    }

    // Sort timeline items by Semester No ascending
    const sortedTimeline = [...timeline].sort((a, b) => a.semesterNo - b.semesterNo);
    
    let totalAchievements = 0;

    sortedTimeline.forEach(item => {
        let achievementsHtml = '';

        if (item.achievements && item.achievements.length > 0) {
            totalAchievements += item.achievements.length;

            achievementsHtml = `
                <div class="semester-achievements-container">
                    <div class="achievements-heading-new">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        Semester Achievements
                    </div>
                    <div class="achievements-stack">
            `;

            item.achievements.forEach(ach => {
                const badgeClass = ach.isTechnical ? 'technical' : 'non-technical';
                const badgeText = ach.isTechnical ? 'Technical' : 'General';
                
                let viewCertHtml = '';
                if (ach.certificateImageUrl) {
                    viewCertHtml = `
                        <button class="ach-cert-btn" 
                                onclick="openMediaModal('${ach.achievementName} Certificate', '${ach.certificateImageUrl}')"
                                title="View Certificate"
                                id="cert-ach-${ach.id}">
                            <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                            <span>Certificate</span>
                        </button>`;
                }

                achievementsHtml += `
                    <div class="achievement-card-redesign">
                        <div class="achievement-icon-wrapper">
                            <svg class="icon vibrant-star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        </div>
                        <div class="achievement-details">
                            <div class="achievement-meta-row">
                                <h4>${ach.achievementName}</h4>
                                <span class="type-tag ${badgeClass}">${badgeText}</span>
                            </div>
                            <span class="achievement-issuer">Issued by: <strong>${ach.fromWhere || 'College'}</strong></span>
                        </div>
                        ${viewCertHtml}
                    </div>
                `;
            });

            achievementsHtml += `</div></div>`;
        } else {
            achievementsHtml = `
                <div class="semester-achievements-container">
                    <div class="achievements-heading-new">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        Semester Achievements
                    </div>
                    <div class="no-achievements-msg">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        No achievements registered for this semester.
                    </div>
                </div>
            `;
        }

        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-card">
                <div class="timeline-card-header">
                    <h3 class="semester-title">Semester ${item.semesterNo}</h3>
                    <div class="semester-grades">
                        <div class="grade-badge">GPA: <strong>${item.gpa ? item.gpa.toFixed(2) : 'N/A'}</strong></div>
                        <div class="grade-badge">CGPA: <strong>${item.cgpa ? item.cgpa.toFixed(2) : 'N/A'}</strong></div>
                    </div>
                </div>
                ${achievementsHtml}
            </div>
        `;

        list.appendChild(div);
    });

    document.getElementById('achievements-count').textContent = totalAchievements;
}

/**
 * Work Experiences dynamic renderer
 */
function renderExperience(experiences) {
    const container = document.getElementById('experience-list');
    container.innerHTML = '';

    if (!experiences || experiences.length === 0) {
        container.innerHTML = '<div class="loading-spinner">No professional experiences listed.</div>';
        return;
    }

    experiences.forEach(exp => {
        // Logo details with dynamic image success/failure fallback
        const initial = exp.companyName ? exp.companyName.charAt(0).toUpperCase() : 'W';
        const logoHtml = `
            <img src="${exp.companyIconUrl || ''}" alt="${exp.companyName} Logo" class="company-logo-img" onload="this.style.display='block'; if(this.nextElementSibling) this.nextElementSibling.style.display='none';" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';">
            <div class="logo-fallback">${initial}</div>
        `;

        // Years text formatting (handles numbers like "2" -> "2 Years" or raw ranges)
        const yearsText = /^\d+$/.test(exp.workYears) 
            ? `${exp.workYears} Year${exp.workYears === '1' ? '' : 's'}` 
            : exp.workYears;

        // Skills badges
        let skillsHtml = '';
        if (exp.skillsKnown && exp.skillsKnown.length > 0) {
            let pills = '';
            exp.skillsKnown.forEach(s => pills += `<span class="tag skill-tag">${s}</span>`);
            skillsHtml = `
                <div class="meta-tags-group">
                    <h4>Skills:</h4>
                    <div class="tags-wrapper">${pills}</div>
                </div>`;
        }

        // Tools badges
        let toolsHtml = '';
        if (exp.toolsKnown && exp.toolsKnown.length > 0) {
            let pills = '';
            exp.toolsKnown.forEach(t => pills += `<span class="tag tool-tag">${t}</span>`);
            toolsHtml = `
                <div class="meta-tags-group">
                    <h4>Tools:</h4>
                    <div class="tags-wrapper">${pills}</div>
                </div>`;
        }

        // Certificate link - styled as inline action button
        let certHtml = '';
        if (exp.certificateUrl) {
            certHtml = `
                <div class="cert-wrapper">
                    <button class="cert-action-btn" 
                            onclick="openMediaModal('${exp.companyName} Experience Certificate', '${exp.certificateUrl}')"
                            id="cert-exp-${exp.id}">
                        <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
                        View Experience Certificate
                    </button>
                </div>`;
        }

        const itemDiv = document.createElement('div');
        itemDiv.className = 'timeline-item';
        itemDiv.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-card">
                <div class="experience-card-header">
                    <div class="company-logo">${logoHtml}</div>
                    <div class="company-details">
                        <div class="company-details-top">
                            <h3>${exp.companyName}</h3>
                            <span class="exp-years">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                ${yearsText}
                            </span>
                        </div>
                        <div class="company-details-bottom">
                            <span class="exp-role-tag">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                ${exp.stackName}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="experience-body">
                    <p>${exp.workExperience}</p>
                    <div class="experience-meta-tags">
                        ${skillsHtml}
                        ${toolsHtml}
                    </div>
                    ${certHtml}
                </div>
            </div>
        `;

        container.appendChild(itemDiv);
    });
}

/**
 * Renders technical domains and their badges dynamically from the database
 */
function renderTechDomains(techDomains) {
    const container = document.getElementById('skills-matrix');
    container.className = 'skills-grid'; // Ensure grid layout class is active
    container.innerHTML = '';

    if (!techDomains || techDomains.length === 0) {
        container.innerHTML = '<div class="loading-spinner">No technical domains configured.</div>';
        return;
    }

    // Sort by domain ID ascending to maintain logical order
    const sortedDomains = [...techDomains].sort((a, b) => a.id - b.id);

    sortedDomains.forEach(domain => {
        // Map dynamic stylesheet class names based on database domain name
        let className = 'tools'; // default
        let iconSvg = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
        `;

        const nameLower = domain.domainName.toLowerCase();
        if (nameLower.includes('backend') || nameLower.includes('back-end')) {
            className = 'backend';
            iconSvg = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
            `;
        } else if (nameLower.includes('frontend') || nameLower.includes('front-end')) {
            className = 'frontend';
            iconSvg = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            `;
        }

        const card = document.createElement('div');
        card.className = `skills-category-card ${className}`;
        
        let pillsHtml = '';
        if (domain.skills && domain.skills.length > 0) {
            // Sort skills alphabetically
            const sortedSkills = [...domain.skills].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            sortedSkills.forEach(s => {
                pillsHtml += `<span class="skill-matrix-tag">${s}</span>`;
            });
        }

        // Format domainName by inserting spaces before uppercase letters (e.g. BackEndDevelopment -> Back End Development)
        const formattedName = domain.domainName
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

        card.innerHTML = `
            <div class="skills-category-header">
                <div class="skills-category-icon">
                    ${iconSvg}
                </div>
                <h3>${formattedName}</h3>
            </div>
            <div class="skills-category-list">
                ${pillsHtml}
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * Initialise Modal overlay event handlers
 */
function initModal() {
    const modal = document.getElementById('media-modal');
    const closeBtn = document.getElementById('modal-close');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            closeMediaModal();
        });

        // Close on overlay backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeMediaModal();
            }
        });

        // Close on Escape press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeMediaModal();
            }
        });
    }
}

/**
 * Open the media modal view for images or PDFs (Certificates, Marksheets)
 */
function openMediaModal(title, url) {
    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalPdf = document.getElementById('modal-pdf');

    if (!modal || !url) return;

    modalTitle.textContent = title;

    // Detect if target is PDF or image
    if (url.toLowerCase().endsWith('.pdf')) {
        modalImg.classList.add('hidden');
        modalPdf.classList.remove('hidden');
        modalPdf.src = url;
    } else {
        modalPdf.classList.add('hidden');
        modalImg.classList.remove('hidden');
        modalImg.src = url;
        modalImg.onerror = () => {
            modalImg.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop';
        };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock page scroll
}

/**
 * Close modal and purge iframe buffers
 */
function closeMediaModal() {
    const modal = document.getElementById('media-modal');
    const modalImg = document.getElementById('modal-img');
    const modalPdf = document.getElementById('modal-pdf');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
        
        // Reset src buffers to avoid trailing loads
        setTimeout(() => {
            modalImg.src = '';
            modalPdf.src = '';
        }, 300);
    }
}

/**
 * Render contact cards dynamically based on API responses
 */
function renderContacts(contacts) {
    const grid = document.getElementById('contacts-grid');
    grid.innerHTML = '';

    if (!contacts || contacts.length === 0) {
        grid.innerHTML = '<div class="loading-spinner">No social connections configured.</div>';
        return;
    }

    // Icons map (inline SVGs matching user screenshot style)
    const iconsMap = {
        'github': `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
        'linkedin': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
        'leetcode': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line><line x1="12" y1="17" x2="12" y2="20"></line></svg>`,
        'hackerrank': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        'email': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
    };

    contacts.forEach(contact => {
        const platformKey = contact.platformName.toLowerCase();
        const desc = contact.description || 'Connect with me on this platform.';
        const iconSvg = iconsMap[platformKey] || `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`;

        let emailDetailsHtml = '';
        if (platformKey === 'email') {
            const emailAddress = contact.url.replace('mailto:', '');
            emailDetailsHtml = `<div class="social-email-address">${emailAddress}</div>`;
        }

        const card = document.createElement('div');
        card.className = 'social-card';
        card.innerHTML = `
            <div class="social-icon-box ${platformKey}">
                ${iconSvg}
            </div>
            <h3>${contact.platformName}</h3>
            <p>${desc}</p>
            ${emailDetailsHtml}
            <a href="${contact.url}" target="_blank" class="social-action-link" id="social-link-${contact.id}">
                Open in new tab 
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
        `;
        grid.appendChild(card);
    });
}
