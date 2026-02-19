// CV Builder Logic

document.addEventListener('DOMContentLoaded', () => {
    // Add Event Listeners for dynamic inputs
    document.getElementById('cv-form-container').addEventListener('input', updatePreview);
});

function updatePreview() {
    // 1. Update Personal Info
    document.getElementById('preview-name').textContent = document.getElementById('fullName').value || 'TU NOMBRE';

    // 2. Build Contact Line
    const contact = [
        document.getElementById('email').value,
        document.getElementById('phone').value,
        document.getElementById('location').value,
        document.getElementById('linkedin').value
    ].filter(Boolean).join('  •  ');

    document.getElementById('preview-contact').textContent = contact;

    // 3. Profile Section Logic
    const profile = document.getElementById('profile').value;
    const profileSection = document.getElementById('preview-profile-section');
    if (profile) {
        profileSection.style.display = 'block';
        document.getElementById('preview-profile').textContent = profile;
    } else {
        profileSection.style.display = 'none';
    }

    // 4. Trigger Section Renders
    renderExperience();
    renderEducation();
    renderSkills(); // Also renders languages
    renderProjects();
    renderCertifications();
    renderReferences();

    // 5. Fake Auto-Save Indicator
    const status = document.getElementById('save-status');
    if (status) {
        status.style.opacity = '1';
        status.innerHTML = '<span class="status-indicator" style="background: #FBBF24;"></span> Editando...';

        // Debounce save "completed" visual
        clearTimeout(window.saveTimeout);
        window.saveTimeout = setTimeout(() => {
            status.innerHTML = '<span class="status-indicator"></span> Guardado';
        }, 1000);
    }
}

// Experience
function addExperience() {
    const container = document.getElementById('experience-container');
    const id = Date.now();
    const html = `
        <div class="editor-card mb-3" id="exp-${id}">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="m-0 text-muted">Experiencia</h5>
                <button type="button" class="btn-icon-danger" onclick="removeElement('exp-${id}')">×</button>
            </div>
            
            <label class="input-label">Cargo</label>
            <input type="text" class="input-field input-exp-role mb-2" placeholder="Ej: Senior Developer" oninput="updatePreview()">
            
            <label class="input-label">Empresa</label>
            <input type="text" class="input-field input-exp-company mb-2" placeholder="Ej: Tech Solutions Inc." oninput="updatePreview()">
            
            <div class="grid-2 mb-2">
                <div>
                    <label class="input-label">Fecha</label>
                    <input type="text" class="input-field input-exp-date" placeholder="2020 - Presente" oninput="updatePreview()">
                </div>
                <div>
                    <label class="input-label">Ubicación</label>
                    <input type="text" class="input-field input-exp-loc" placeholder="Remoto / Ciudad" oninput="updatePreview()">
                </div>
            </div>
            
            <label class="input-label">Descripción</label>
            <textarea class="input-area input-exp-desc" rows="3" placeholder="Logros principales..." oninput="updatePreview()"></textarea>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderExperience() {
    const container = document.getElementById('experience-container');
    const previewContainer = document.getElementById('preview-experience-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.editor-card');
    if (items.length > 0) {
        document.getElementById('preview-experience-section').style.display = 'block';
    } else {
        document.getElementById('preview-experience-section').style.display = 'none';
        return;
    }

    items.forEach(item => {
        const role = item.querySelector('.input-exp-role').value;
        const company = item.querySelector('.input-exp-company').value;
        const date = item.querySelector('.input-exp-date').value;
        const loc = item.querySelector('.input-exp-loc').value;
        const desc = item.querySelector('.input-exp-desc').value;

        if (!role && !company) return;

        // Format description bullets
        const descHtml = desc.split('\n').map(line => line.trim() ? `<li>${line}</li>` : '').join('');

        const html = `
            <div class="cv-item">
                <div class="cv-item-header">
                    <span>${company}</span>
                    <span>${loc}</span>
                </div>
                <div class="cv-item-subheader">
                    <span>${role}</span>
                    <span>${date}</span>
                </div>
                <div class="cv-item-details">
                    <ul class="cv-bullets">
                        ${descHtml}
                    </ul>
                </div>
            </div>
        `;
        previewContainer.insertAdjacentHTML('beforeend', html);
    });
}

// Education
function addEducation() {
    const container = document.getElementById('education-container');
    const id = Date.now();
    const html = `
        <div class="editor-card mb-3" id="edu-${id}">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="m-0 text-muted">Educación</h5>
                <button type="button" class="btn-icon-danger" onclick="removeElement('edu-${id}')">×</button>
            </div>

            <label class="input-label">Institución</label>
            <input type="text" class="input-field input-edu-school mb-2" placeholder="Universidad / Instituto" oninput="updatePreview()">
            
            <label class="input-label">Título</label>
            <input type="text" class="input-field input-edu-degree mb-2" placeholder="Ej: Ingeniería en Sistemas" oninput="updatePreview()">
            
            <div class="grid-2">
                <div>
                    <label class="input-label">Fecha</label>
                    <input type="text" class="input-field input-edu-date" placeholder="2015 - 2019" oninput="updatePreview()">
                </div>
                <div>
                    <label class="input-label">Ubicación</label>
                    <input type="text" class="input-field input-edu-loc" placeholder="Ciudad" oninput="updatePreview()">
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderEducation() {
    const container = document.getElementById('education-container');
    const previewContainer = document.getElementById('preview-education-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.editor-card');
    if (items.length > 0) {
        document.getElementById('preview-education-section').style.display = 'block';
    } else {
        document.getElementById('preview-education-section').style.display = 'none';
        return;
    }

    items.forEach(item => {
        const school = item.querySelector('.input-edu-school').value;
        const degree = item.querySelector('.input-edu-degree').value;
        const date = item.querySelector('.input-edu-date').value;
        const loc = item.querySelector('.input-edu-loc').value;

        if (!school) return;

        const html = `
            <div class="cv-item">
                <div class="cv-item-header">
                    <span>${school}</span>
                    <span>${loc}</span>
                </div>
                <div class="cv-item-subheader">
                    <span>${degree}</span>
                    <span>${date}</span>
                </div>
            </div>
        `;
        previewContainer.insertAdjacentHTML('beforeend', html);
    });
}

// === NEW SECTIONS ===

// Languages
function addLanguage() {
    const container = document.getElementById('languages-container');
    const id = Date.now();
    const html = `
        <div class="editor-card mb-2" id="lang-${id}">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="m-0 text-muted">Idioma</h6>
                <button type="button" class="btn-icon-danger" onclick="removeElement('lang-${id}')">×</button>
            </div>
            <div class="grid-2">
                <input type="text" class="input-field input-lang-name" placeholder="Idioma (Ej: Inglés)" oninput="updatePreview()">
                <select class="input-field input-lang-level" onchange="updatePreview()">
                    <option value="Básico">Básico</option>
                    <option value="Intermedio" selected>Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Nativo">Nativo</option>
                </select>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderLanguages() {
    const container = document.getElementById('languages-container');
    const previewContainer = document.getElementById('preview-languages-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.editor-card');
    let hasLangs = false;

    if (items.length > 0) hasLangs = true;

    items.forEach(item => {
        const name = item.querySelector('.input-lang-name').value;
        const level = item.querySelector('.input-lang-level').value;
        if (!name) return;

        const html = `<div><strong>${name}:</strong> ${level}</div>`;
        previewContainer.insertAdjacentHTML('beforeend', html);
    });
    return hasLangs;
}

// Projects
function addProject() {
    const container = document.getElementById('projects-container');
    const id = Date.now();
    const html = `
        <div class="editor-card mb-3" id="proj-${id}">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 class="m-0 text-muted">Proyecto</h5>
                <button type="button" class="btn-icon-danger" onclick="removeElement('proj-${id}')">×</button>
            </div>
            <input type="text" class="input-field input-proj-name mb-2" placeholder="Nombre del Proyecto" oninput="updatePreview()">
            <input type="text" class="input-field input-proj-link mb-2" placeholder="Enlace (Opcional)" oninput="updatePreview()">
            <textarea class="input-area input-proj-desc" rows="2" placeholder="Descripción breve..." oninput="updatePreview()"></textarea>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    const previewContainer = document.getElementById('preview-projects-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.editor-card');
    if (items.length > 0) {
        document.getElementById('preview-projects-section').style.display = 'block';
    } else {
        document.getElementById('preview-projects-section').style.display = 'none';
    }

    items.forEach(item => {
        const name = item.querySelector('.input-proj-name').value;
        const link = item.querySelector('.input-proj-link').value;
        const desc = item.querySelector('.input-proj-desc').value;
        if (!name) return;

        const html = `
            <div class="cv-item">
                <div class="cv-item-header">
                    <span>${name} ${link ? `<a href="${link}" target="_blank" style="font-weight:normal; font-size: 0.9em;">[Link]</a>` : ''}</span>
                </div>
                <div class="cv-item-details">${desc}</div>
            </div>
        `;
        previewContainer.insertAdjacentHTML('beforeend', html);
    });
}

// Certifications
function addCertification() {
    const container = document.getElementById('certs-container');
    const id = Date.now();
    const html = `
        <div class="editor-card mb-2" id="cert-${id}">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="m-0 text-muted">Certificación</h6>
                <button type="button" class="btn-icon-danger" onclick="removeElement('cert-${id}')">×</button>
            </div>
            <input type="text" class="input-field input-cert-name mb-2" placeholder="Nombre (Ej: AWS Certified)" oninput="updatePreview()">
            <div class="grid-2">
                <input type="text" class="input-field input-cert-issuer" placeholder="Emisor (Ej: Amazon)" oninput="updatePreview()">
                <input type="text" class="input-field input-cert-date" placeholder="Fecha (Año)" oninput="updatePreview()">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderCertifications() {
    const container = document.getElementById('certs-container');
    const previewContainer = document.getElementById('preview-certs-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.editor-card');
    if (items.length > 0) {
        document.getElementById('preview-certs-section').style.display = 'block';
    } else {
        document.getElementById('preview-certs-section').style.display = 'none';
    }

    items.forEach(item => {
        const name = item.querySelector('.input-cert-name').value;
        const issuer = item.querySelector('.input-cert-issuer').value;
        const date = item.querySelector('.input-cert-date').value;
        if (!name) return;

        const html = `
            <div class="cv-item" style="margin-bottom: 0.5rem;">
                <strong>${name}</strong> — ${issuer} <em>(${date})</em>
            </div>
        `;
        previewContainer.insertAdjacentHTML('beforeend', html);
    });
}

// References
function addReference() {
    const container = document.getElementById('refs-container');
    const id = Date.now();
    const html = `
        <div class="editor-card mb-2" id="ref-${id}">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="m-0 text-muted">Referencia</h6>
                <button type="button" class="btn-icon-danger" onclick="removeElement('ref-${id}')">×</button>
            </div>
            <input type="text" class="input-field input-ref-name mb-2" placeholder="Nombre" oninput="updatePreview()">
            <input type="text" class="input-field input-ref-role mb-2" placeholder="Cargo y Empresa" oninput="updatePreview()">
            <input type="text" class="input-field input-ref-contact" placeholder="Email o Teléfono" oninput="updatePreview()">
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderReferences() {
    const container = document.getElementById('refs-container');
    const previewContainer = document.getElementById('preview-refs-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.editor-card');
    if (items.length > 0) {
        document.getElementById('preview-refs-section').style.display = 'block';
    } else {
        document.getElementById('preview-refs-section').style.display = 'none';
    }

    items.forEach(item => {
        const name = item.querySelector('.input-ref-name').value;
        const role = item.querySelector('.input-ref-role').value;
        const contact = item.querySelector('.input-ref-contact').value;
        if (!name) return;

        const html = `
            <div style="margin-bottom: 0.5rem;">
                <div style="font-weight: bold;">${name}</div>
                <div>${role}</div>
                <div style="font-size: 0.9em;">${contact}</div>
            </div>
        `;
        previewContainer.insertAdjacentHTML('beforeend', html);
    });
}


// Skills
function updateSkills() {
    const input = document.getElementById('skills-input').value;
    const inputSoft = document.getElementById('soft-skills-input').value;

    const section = document.getElementById('preview-skills-section');
    const preview = document.getElementById('preview-skills');
    const previewSoft = document.getElementById('preview-soft-skills');
    const previewSoftContainer = document.getElementById('preview-soft-skills-container');

    const hasLangs = renderLanguages();

    if (input || inputSoft || hasLangs) {
        section.style.display = 'block';
        preview.textContent = input;

        if (inputSoft) {
            previewSoftContainer.style.display = 'block';
            previewSoft.textContent = inputSoft;
        } else {
            previewSoftContainer.style.display = 'none';
        }
    } else {
        section.style.display = 'none';
    }
}

// Photo Handling
window.handlePhotoUpload = function () {
    const input = document.getElementById('photoInput');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Save to LocalStorage/State if needed, here we just show preview
            let img = document.getElementById('preview-photo-img');
            if (!img) {
                // If IMG doesn't exist, create it in header
                const header = document.querySelector('.cv-header');
                const photoContainer = document.createElement('div');
                photoContainer.id = 'preview-photo-container';
                photoContainer.innerHTML = `<img id="preview-photo-img" src="${e.target.result}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;">`;
                header.insertBefore(photoContainer, header.firstChild);
            } else {
                img.src = e.target.result;
            }
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Utilities
window.removeElement = function (id) {
    document.getElementById(id).remove();
    updatePreview();
}

window.addExperience = addExperience;
window.addEducation = addEducation;
window.addLanguage = addLanguage;
window.addProject = addProject;
window.addCertification = addCertification;
window.addReference = addReference;
window.updateSkills = updateSkills;
