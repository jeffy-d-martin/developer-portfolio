const BASE_URL = window.location.port === '8080' 
    ? '/api/public' 
    : 'http://localhost:8080/api/public';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get project ID from query params
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));

    if (isNaN(projectId)) {
        showDetailsError("Invalid Project ID parameter.");
        return;
    }

    // 2. Fetch project detailed data
    fetchProjectDetails(projectId);
    
    // 3. Update footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();
});

async function fetchProjectDetails(projectId) {
    try {
        const response = await fetch(`${BASE_URL}/projects`);
        if (!response.ok) {
            throw new Error("Failed to reach project API");
        }

        const projects = await response.json();
        const project = projects.find(p => p.id === projectId);

        if (!project) {
            showDetailsError("Project not found in database.");
            return;
        }

        renderProjectDetails(project);
    } catch (e) {
        console.error("Error loading project details:", e);
        showDetailsError("Could not retrieve project information from the database server.");
    }
}

function showDetailsError(msg) {
    const loader = document.getElementById('details-loader');
    loader.innerHTML = `<span style="color: #ff0055; font-weight: 500;">Error: ${msg}</span>`;
}

function renderProjectDetails(project) {
    // Hide loader, show container
    document.getElementById('details-loader').classList.add('hidden');
    document.getElementById('details-container').classList.remove('hidden');

    // Title & Description
    document.getElementById('details-title').textContent = project.projectName;
    document.getElementById('details-desc').textContent = project.description || "No description provided.";

    // Tech Stack pills
    const techStackContainer = document.getElementById('details-tech-stack');
    techStackContainer.innerHTML = '';
    const techStackArr = project.techStack 
        ? project.techStack.split(',').map(s => s.trim()) 
        : [];
    techStackArr.forEach(tech => {
        if (tech) {
            techStackContainer.innerHTML += `<span class="tech-pill" style="font-size: 12px; padding: 5px 12px;">${tech}</span>`;
        }
    });

    // Problem Block
    const problemBlock = document.getElementById('details-problem-block');
    if (project.problem) {
        problemBlock.classList.remove('hidden');
        document.getElementById('details-problem').textContent = project.problem;
    } else {
        problemBlock.classList.add('hidden');
    }

    // Features Block
    const featuresBlock = document.getElementById('details-features-block');
    if (project.keyFeature) {
        featuresBlock.classList.remove('hidden');
        document.getElementById('details-features').textContent = project.keyFeature;
    } else {
        featuresBlock.classList.add('hidden');
    }

    // Impact Block
    const impactBlock = document.getElementById('details-impact-block');
    if (project.impact) {
        impactBlock.classList.remove('hidden');
        document.getElementById('details-impact').textContent = project.impact;
    } else {
        impactBlock.classList.add('hidden');
    }

    // ER Diagram Block
    const erBlock = document.getElementById('details-er-block');
    if (project.erDiagramUrl) {
        erBlock.classList.remove('hidden');
        const erImg = document.getElementById('details-er-img');
        erImg.src = project.erDiagramUrl;
        erImg.onerror = () => {
            erImg.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop';
        };
    } else {
        erBlock.classList.add('hidden');
    }

    // Project links (GitHub, Live Demo)
    const linksContainer = document.getElementById('details-links');
    linksContainer.innerHTML = '';
    let linksHtml = '';

    if (project.githubUrl) {
        linksHtml += `
            <a href="${project.githubUrl}" target="_blank" class="project-link secondary" style="padding: 12px 24px; font-size: 13px; text-decoration: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub Repository
            </a>`;
    }
    if (project.liveDemoUrl) {
        linksHtml += `
            <a href="${project.liveDemoUrl}" target="_blank" class="project-link primary" style="padding: 12px 24px; font-size: 13px; text-decoration: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Live Demo Website
            </a>`;
    }

    if (linksHtml) {
        linksContainer.innerHTML = linksHtml;
    } else {
        linksContainer.style.display = 'none';
    }
}
