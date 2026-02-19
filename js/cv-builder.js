// CV Builder Logic

document.addEventListener('DOMContentLoaded', () => {
    // Add Event Listeners for dynamic inputs
    document.getElementById('cv-form-container').addEventListener('input', updatePreview);
});

function updatePreview() {
    // Personal Info
    document.getElementById('preview-name').textContent = document.getElementById('fullName').value || 'TU NOMBRE';

    const contact = [
        document.getElementById('email').value,
        document.getElementById('phone').value,
        document.getElementById('location').value,
        document.getElementById('linkedin').value
    ].filter(Boolean).join(' | ');

    document.getElementById('preview-contact').textContent = contact;

    // Professional Profile
    const profile = document.getElementById('profile').value;
    const profileSection = document.getElementById('preview-profile-section');
    if (profile) {
        profileSection.style.display = 'block';
        document.getElementById('preview-profile').textContent = profile;
    } else {
        profileSection.style.display = 'none';
    }

    // Dynamic Sections (Experience, Education, etc.) will be handled by specific renderers
    // For now we just trigger them
    renderExperience();
    renderEducation();
    renderSkills();
}

// Experience
function addExperience() {
    const container = document.getElementById('experience-container');
    const id = Date.now();
    const html = `
        <div class="card mb-3 p-3" id="exp-${id}">
            <div class="d-flex justify-content-between">
                <h5>Experiencia</h5>
                <button type="button" class="btn btn-sm btn-danger" onclick="removeElement('exp-${id}')">X</button>
            </div>
            <input type="text" class="input-exp-role full-width mb-2" placeholder="Cargo / Título" oninput="updatePreview()">
            <input type="text" class="input-exp-company full-width mb-2" placeholder="Empresa" oninput="updatePreview()">
            <div class="d-flex gap-2 mb-2">
                <input type="text" class="input-exp-date full-width" placeholder="Fecha (Ej: Ene 2020 - Pres)" oninput="updatePreview()">
                <input type="text" class="input-exp-loc full-width" placeholder="Ubicación" oninput="updatePreview()">
            </div>
            <textarea class="input-exp-desc full-width" placeholder="Logros y responsabilidades..." oninput="updatePreview()"></textarea>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderExperience() {
    const container = document.getElementById('experience-container');
    const previewContainer = document.getElementById('preview-experience-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.card');
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
        <div class="card mb-3 p-3" id="edu-${id}">
            <div class="d-flex justify-content-between">
                <h5>Educación</h5>
                <button type="button" class="btn btn-sm btn-danger" onclick="removeElement('edu-${id}')">X</button>
            </div>
            <input type="text" class="input-edu-school full-width mb-2" placeholder="Institución" oninput="updatePreview()">
            <input type="text" class="input-edu-degree full-width mb-2" placeholder="Título" oninput="updatePreview()">
            <div class="d-flex gap-2">
                <input type="text" class="input-edu-date full-width" placeholder="Fecha" oninput="updatePreview()">
                <input type="text" class="input-edu-loc full-width" placeholder="Ubicación" oninput="updatePreview()">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function renderEducation() {
    const container = document.getElementById('education-container');
    const previewContainer = document.getElementById('preview-education-list');
    previewContainer.innerHTML = '';

    const items = container.querySelectorAll('.card');
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

// Skills
function updateSkills() {
    const input = document.getElementById('skills-input').value;
    const preview = document.getElementById('preview-skills');
    const section = document.getElementById('preview-skills-section');

    if (input) {
        section.style.display = 'block';
        preview.textContent = input;
    } else {
        section.style.display = 'none';
    }
}

// Utilities
window.removeElement = function (id) {
    document.getElementById(id).remove();
    updatePreview();
}

window.addExperience = addExperience;
window.addEducation = addEducation;
