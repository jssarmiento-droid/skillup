// Soft Skills App - Global Logic

document.addEventListener('DOMContentLoaded', () => {
    console.log('Soft Skills App Loaded');
    checkUserStatus();
});

// Simple check if user is logged in
function checkUserStatus() {
    const user = JSON.parse(localStorage.getItem('softSkillsUser'));
    const authButtons = document.getElementById('auth-buttons');
    const userWelcome = document.getElementById('user-welcome');

    // Logic to show/hide login buttons vs dashboard link would go here
    // For now we just log it
    if (user) {
        console.log(`Welcome back, ${user.name}`);
    } else {
        console.log('No user logged in');
    }
}
