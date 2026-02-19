// CV Builder UI + Preview Logic

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cv-form-container');
    if (form) {
        form.addEventListener('input', () => {
            updatePreview();
            scheduleAutoSave();
        });
    }

    updatePreview();
    setSaveStatus('Sin cambios');
});

let autoSaveTimer = null;

function scheduleAutoSave() {
    setSaveStatus('Editando...');
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        if (window.saveCV) window.saveCV(true);
    }, 1500);
}

function setSaveStatus(text, isError = false) {
    const status = document.getElementById('save-status');
    if (!status) return;
    status.textContent = text;
    status.classList.toggle('error', Boolean(isError));
}

function makeDynamicId(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function removeElement(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
    updatePreview();
    scheduleAutoSave();
}

function handlePhotoUpload() {
    const input = document.getElementById('photoInput');
    const file = input?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const result = event.target?.result;
        const photoContainer = document.getElementById('preview-photo-container');
        const photoImg = document.getElementById('preview-photo-img');

        if (photoImg && result) {
            photoImg.src = result;
            photoContainer.classList.remove('hidden');
        }

        updatePreview();
        scheduleAutoSave();
    };
    reader.readAsDataURL(file);
}

function addExperience(data = {}) {
    const id = makeDynamicId('exp');
    document.getElementById('experience-container').insertAdjacentHTML('beforeend', `
        <div class="editor-card" id="${id}">
            <div class="card-header">
                <h4>Experiencia</h4>
                <button type="button" class="btn-icon-danger" onclick="removeElement('${id}')">Eliminar sección</button>
            </div>
            <div class="field-grid two-col">
                <div class="field-group">
                    <label>Cargo</label>
                    <input type="text" class="input-field input-exp-role" value="${escapeHtml(data.role || '')}">
                </div>
                <div class="field-group">
                    <label>Empresa</label>
                    <input type="text" class="input-field input-exp-company" value="${escapeHtml(data.company || '')}">
                </div>
                <div class="field-group">
                    <label>Fecha</label>
                    <input type="text" class="input-field input-exp-date" placeholder="2022 - 2024" value="${escapeHtml(data.date || '')}">
                </div>
                <div class="field-group">
                    <label>Ubicación</label>
                    <input type="text" class="input-field input-exp-loc" value="${escapeHtml(data.location || '')}">
                </div>
                <div class="field-group two-col-span">
                    <label>Descripción (una línea por logro)</label>
                    <textarea class="input-area input-exp-desc" rows="3">${escapeHtml(data.description || '')}</textarea>
                </div>
            </div>
        </div>
    `);
}

function addEducation(data = {}) {
    const id = makeDynamicId('edu');
    document.getElementById('education-container').insertAdjacentHTML('beforeend', `
        <div class="editor-card" id="${id}">
            <div class="card-header">
                <h4>Educación</h4>
                <button type="button" class="btn-icon-danger" onclick="removeElement('${id}')">Eliminar sección</button>
            </div>
            <div class="field-grid two-col">
                <div class="field-group"><label>Institución</label><input type="text" class="input-field input-edu-school" value="${escapeHtml(data.school || '')}"></div>
                <div class="field-group"><label>Título</label><input type="text" class="input-field input-edu-degree" value="${escapeHtml(data.degree || '')}"></div>
                <div class="field-group"><label>Fecha</label><input type="text" class="input-field input-edu-date" value="${escapeHtml(data.date || '')}"></div>
                <div class="field-group"><label>Ubicación</label><input type="text" class="input-field input-edu-loc" value="${escapeHtml(data.location || '')}"></div>
            </div>
        </div>
    `);
}

function addLanguage(data = {}) {
    const id = makeDynamicId('lang');
    document.getElementById('languages-container').insertAdjacentHTML('beforeend', `
        <div class="editor-card" id="${id}">
            <div class="card-header">
                <h4>Idioma</h4>
                <button type="button" class="btn-icon-danger" onclick="removeElement('${id}')">Eliminar sección</button>
            </div>
            <div class="field-grid two-col">
                <div class="field-group"><label>Idioma</label><input type="text" class="input-field input-lang-name" value="${escapeHtml(data.name || '')}"></div>
                <div class="field-group"><label>Nivel</label><input type="text" class="input-field input-lang-level" value="${escapeHtml(data.level || '')}" placeholder="B2 / Avanzado"></div>
            </div>
        </div>
    `);
}

function addCertification(data = {}) {
    const id = makeDynamicId('cert');
    document.getElementById('certs-container').insertAdjacentHTML('beforeend', `
        <div class="editor-card" id="${id}">
            <div class="card-header">
                <h4>Certificación</h4>
                <button type="button" class="btn-icon-danger" onclick="removeElement('${id}')">Eliminar sección</button>
            </div>
            <div class="field-grid two-col">
                <div class="field-group"><label>Nombre</label><input type="text" class="input-field input-cert-name" value="${escapeHtml(data.name || '')}"></div>
                <div class="field-group"><label>Emisor</label><input type="text" class="input-field input-cert-issuer" value="${escapeHtml(data.issuer || '')}"></div>
                <div class="field-group two-col-span"><label>Fecha</label><input type="text" class="input-field input-cert-date" value="${escapeHtml(data.date || '')}"></div>
            </div>
        </div>
    `);
}

function addProject(data = {}) {
    const id = makeDynamicId('project');
    document.getElementById('projects-container').insertAdjacentHTML('beforeend', `
        <div class="editor-card" id="${id}">
            <div class="card-header">
                <h4>Proyecto</h4>
                <button type="button" class="btn-icon-danger" onclick="removeElement('${id}')">Eliminar sección</button>
            </div>
            <div class="field-group"><label>Nombre</label><input type="text" class="input-field input-proj-name" value="${escapeHtml(data.name || '')}"></div>
            <div class="field-group"><label>Enlace</label><input type="url" class="input-field input-proj-link" value="${escapeHtml(data.link || '')}"></div>
            <div class="field-group"><label>Descripción</label><textarea class="input-area input-proj-desc" rows="3">${escapeHtml(data.description || '')}</textarea></div>
        </div>
    `);
}

function addCourse(data = {}) {
    const id = makeDynamicId('course');
    document.getElementById('courses-container').insertAdjacentHTML('beforeend', `
        <div class="editor-card" id="${id}">
            <div class="card-header">
                <h4>Curso</h4>
                <button type="button" class="btn-icon-danger" onclick="removeElement('${id}')">Eliminar sección</button>
            </div>
            <div class="field-grid two-col">
                <div class="field-group"><label>Curso</label><input type="text" class="input-field input-course-name" value="${escapeHtml(data.name || '')}"></div>
                <div class="field-group"><label>Institución</label><input type="text" class="input-field input-course-provider" value="${escapeHtml(data.provider || '')}"></div>
                <div class="field-group two-col-span"><label>Fecha</label><input type="text" class="input-field input-course-date" value="${escapeHtml(data.date || '')}"></div>
            </div>
        </div>
    `);
}

function addReference(data = {}) {
    const id = makeDynamicId('ref');
    document.getElementById('refs-container').insertAdjacentHTML('beforeend', `
        <div class="editor-card" id="${id}">
            <div class="card-header">
                <h4>Referencia</h4>
                <button type="button" class="btn-icon-danger" onclick="removeElement('${id}')">Eliminar sección</button>
            </div>
            <div class="field-group"><label>Nombre</label><input type="text" class="input-field input-ref-name" value="${escapeHtml(data.name || '')}"></div>
            <div class="field-group"><label>Cargo y empresa</label><input type="text" class="input-field input-ref-role" value="${escapeHtml(data.role || '')}"></div>
            <div class="field-group"><label>Contacto</label><input type="text" class="input-field input-ref-contact" value="${escapeHtml(data.contact || '')}"></div>
        </div>
    `);
}

function getCardValues(containerId, classMap) {
    return Array.from(document.querySelectorAll(`#${containerId} .editor-card`)).map((card) => {
        const item = {};
        Object.entries(classMap).forEach(([field, selector]) => {
            item[field] = card.querySelector(selector)?.value?.trim() || '';
        });
        return item;
    }).filter((item) => Object.values(item).some(Boolean));
}

function collectCVData() {
    const photoSrc = document.getElementById('preview-photo-img')?.src || '';
    return {
        personal: {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            location: document.getElementById('location').value.trim(),
            linkedin: document.getElementById('linkedin').value.trim(),
            photo: photoSrc.startsWith('data:image') ? photoSrc : ''
        },
        profile: document.getElementById('profile').value.trim(),
        skills: {
            hard: document.getElementById('skills-input').value.trim()
        },
        experience: getCardValues('experience-container', {
            role: '.input-exp-role',
            company: '.input-exp-company',
            date: '.input-exp-date',
            location: '.input-exp-loc',
            description: '.input-exp-desc'
        }),
        education: getCardValues('education-container', {
            school: '.input-edu-school',
            degree: '.input-edu-degree',
            date: '.input-edu-date',
            location: '.input-edu-loc'
        }),
        languages: getCardValues('languages-container', {
            name: '.input-lang-name',
            level: '.input-lang-level'
        }),
        certifications: getCardValues('certs-container', {
            name: '.input-cert-name',
            issuer: '.input-cert-issuer',
            date: '.input-cert-date'
        }),
        projects: getCardValues('projects-container', {
            name: '.input-proj-name',
            link: '.input-proj-link',
            description: '.input-proj-desc'
        }),
        courses: getCardValues('courses-container', {
            name: '.input-course-name',
            provider: '.input-course-provider',
            date: '.input-course-date'
        }),
        references: getCardValues('refs-container', {
            name: '.input-ref-name',
            role: '.input-ref-role',
            contact: '.input-ref-contact'
        })
    };
}

function fillCVForm(data = {}) {
    document.getElementById('fullName').value = data.personal?.fullName || '';
    document.getElementById('email').value = data.personal?.email || '';
    document.getElementById('phone').value = data.personal?.phone || '';
    document.getElementById('location').value = data.personal?.location || '';
    document.getElementById('linkedin').value = data.personal?.linkedin || '';
    document.getElementById('profile').value = data.profile || '';
    document.getElementById('skills-input').value = data.skills?.hard || '';

    const photo = data.personal?.photo || '';
    const photoContainer = document.getElementById('preview-photo-container');
    const photoImg = document.getElementById('preview-photo-img');
    if (photo) {
        photoImg.src = photo;
        photoContainer.classList.remove('hidden');
    }

    document.getElementById('experience-container').innerHTML = '';
    (data.experience || []).forEach(addExperience);

    document.getElementById('education-container').innerHTML = '';
    (data.education || []).forEach(addEducation);

    document.getElementById('languages-container').innerHTML = '';
    (data.languages || []).forEach(addLanguage);

    document.getElementById('certs-container').innerHTML = '';
    (data.certifications || []).forEach(addCertification);

    document.getElementById('projects-container').innerHTML = '';
    (data.projects || []).forEach(addProject);

    document.getElementById('courses-container').innerHTML = '';
    (data.courses || []).forEach(addCourse);

    document.getElementById('refs-container').innerHTML = '';
    (data.references || []).forEach(addReference);

    updatePreview();
    setSaveStatus('Guardado');
}

function renderList(containerId, sectionId, formatter) {
    const listContainer = document.getElementById(containerId);
    const section = document.getElementById(sectionId);
    const html = formatter();
    listContainer.innerHTML = html;
    section.style.display = html ? 'block' : 'none';
}

function updatePreview() {
    const data = collectCVData();

    document.getElementById('preview-name').textContent = data.personal.fullName || 'TU NOMBRE';
    const contact = [data.personal.email, data.personal.phone, data.personal.location, data.personal.linkedin]
        .filter(Boolean)
        .join(' · ');
    document.getElementById('preview-contact').textContent = contact || 'correo@email.com · +593 999 999 999 · Ciudad';

    const profileSection = document.getElementById('preview-profile-section');
    if (data.profile) {
        profileSection.style.display = 'block';
        document.getElementById('preview-profile').textContent = data.profile;
    } else {
        profileSection.style.display = 'none';
    }

    renderList('preview-experience-list', 'preview-experience-section', () => data.experience.map((item) => {
        const bullets = item.description
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => `<li>${escapeHtml(line)}</li>`)
            .join('');

        return `
            <div class="cv-item">
                <div class="cv-item-header"><span>${escapeHtml(item.role)}</span><span>${escapeHtml(item.date)}</span></div>
                <div class="cv-item-subheader"><span>${escapeHtml(item.company)}</span><span>${escapeHtml(item.location)}</span></div>
                ${bullets ? `<ul class="cv-bullets">${bullets}</ul>` : ''}
            </div>
        `;
    }).join(''));

    renderList('preview-education-list', 'preview-education-section', () => data.education.map((item) => `
        <div class="cv-item">
            <div class="cv-item-header"><span>${escapeHtml(item.degree)}</span><span>${escapeHtml(item.date)}</span></div>
            <div class="cv-item-subheader"><span>${escapeHtml(item.school)}</span><span>${escapeHtml(item.location)}</span></div>
        </div>
    `).join(''));

    const skillsSection = document.getElementById('preview-skills-section');
    if (data.skills.hard) {
        skillsSection.style.display = 'block';
        document.getElementById('preview-skills').textContent = data.skills.hard;
    } else {
        skillsSection.style.display = 'none';
    }

    renderList('preview-languages-list', 'preview-languages-section', () => data.languages.map((item) => `
        <div class="cv-item-line"><strong>${escapeHtml(item.name)}:</strong> ${escapeHtml(item.level)}</div>
    `).join(''));

    renderList('preview-certs-list', 'preview-certs-section', () => data.certifications.map((item) => `
        <div class="cv-item-line"><strong>${escapeHtml(item.name)}</strong> · ${escapeHtml(item.issuer)} · ${escapeHtml(item.date)}</div>
    `).join(''));

    renderList('preview-projects-list', 'preview-projects-section', () => data.projects.map((item) => `
        <div class="cv-item">
            <div class="cv-item-header"><span>${escapeHtml(item.name)}</span><span>${escapeHtml(item.link)}</span></div>
            <p>${escapeHtml(item.description)}</p>
        </div>
    `).join(''));

    renderList('preview-courses-list', 'preview-courses-section', () => data.courses.map((item) => `
        <div class="cv-item-line"><strong>${escapeHtml(item.name)}</strong> · ${escapeHtml(item.provider)} · ${escapeHtml(item.date)}</div>
    `).join(''));

    renderList('preview-refs-list', 'preview-refs-section', () => data.references.map((item) => `
        <div class="cv-item-line"><strong>${escapeHtml(item.name)}</strong> · ${escapeHtml(item.role)} · ${escapeHtml(item.contact)}</div>
    `).join(''));
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

window.addExperience = addExperience;
window.addEducation = addEducation;
window.addLanguage = addLanguage;
window.addCertification = addCertification;
window.addProject = addProject;
window.addCourse = addCourse;
window.addReference = addReference;
window.removeElement = removeElement;
window.handlePhotoUpload = handlePhotoUpload;
window.collectCVData = collectCVData;
window.fillCVForm = fillCVForm;
window.updatePreview = updatePreview;
window.setSaveStatus = setSaveStatus;
