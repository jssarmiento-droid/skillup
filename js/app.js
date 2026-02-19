// Soft Skills App - Global Logic

document.addEventListener('DOMContentLoaded', () => {
    console.log('SkillUp App Loaded');

    // Auth Status Check
    checkUserStatus();

    // Initialize Modal Logic if present
    initModal();
});

// Check User Status
function checkUserStatus() {
    const user = JSON.parse(localStorage.getItem('piensaUser')) || JSON.parse(localStorage.getItem('softSkillsUser'));

    // Update navigation based on auth state (basic implementation)
    // This can be expanded to toggle "Iniciar Sesión" vs "Mi Perfil" buttons
    if (user) {
        console.log(`User active: ${user.email}`);
    }
}

// Modal Logic
function initModal() {
    const modal = document.getElementById('modal-info');
    const btnOpen = document.getElementById('btn-saber-mas');
    const btnClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    if (btnOpen && modal) {
        btnOpen.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        // Close on X
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close on click outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }
}

// Global Toast Notification System
window.showToast = function (message, type = 'info') {
    // Create container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Choose icon based on type
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
        <span style="font-size: 1.2rem;">${icon}</span>
        <div>${message}</div>
    `;

    // Add to container
    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}
