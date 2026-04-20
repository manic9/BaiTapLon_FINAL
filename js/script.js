// Simple interactive feedback for buttons
document.addEventListener('DOMContentLoaded', () => {
    const joinBtn = document.getElementById('joinServerBtn');
    const discordBtn = document.getElementById('discordBtn');
    
    if (joinBtn) {
        joinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('➡️ Connect to play.cubecraft.net (Java Edition / Bedrock)');
        });
    }
    
    if (discordBtn) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('✨ Join the official CubeCraft Discord community!');
        });
    }
    
    // Optional: handle any other "#" links to prevent navigation
    const allFakeLinks = document.querySelectorAll('a[href="#"]');
    allFakeLinks.forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });
    const menu = document.querySelector('.forum-header');

    if (menu) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                menu.classList.add('sticky-active');
            } else {
                menu.classList.remove('sticky-active');
            }
        });
    }
});