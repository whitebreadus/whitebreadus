document.addEventListener('DOMContentLoaded', function() {
    // Универсальная функция для всех меню
    const setupToggleMenu = (buttonId, menuId) => {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        
        if (button && menu) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Предотвращаем всплытие, чтобы клик не сработал на document
                
                // Закрываем все другие открытые меню
                document.querySelectorAll('.submenu-container.active').forEach(openMenu => {
                    if (openMenu !== menu) {
                        openMenu.classList.remove('active');
                        const btn = openMenu.previousElementSibling;
                        if (btn.classList.contains('link')) {
                            btn.classList.remove('active');
                        }
                    }
                });
                
                // Переключаем текущее меню
                button.classList.toggle('active');
                menu.classList.toggle('active');
            });
        }
    };

    // Инициализация всех меню
    setupToggleMenu('windows-link', 'windows-container');
    setupToggleMenu('browser-link', 'browser-container');
    setupToggleMenu('games-link', 'games-container');
    setupToggleMenu('communications-link', 'communications-container');
    setupToggleMenu('network-link', 'network-container');
    setupToggleMenu('media-link', 'media-container');
    setupToggleMenu('customization-link', 'customization-container');
    setupToggleMenu('tools-link', 'tools-container');
    setupToggleMenu('files-tools-link', 'files-tools-container');



    
    // Закрытие меню при клике вне блока
    document.addEventListener('click', function(e) {
        // Проверяем, был ли клик вне контейнера с меню
        if (!e.target.closest('.links-container')) {
            // Закрываем все открытые меню
            document.querySelectorAll('.submenu-container.active').forEach(menu => {
                menu.classList.remove('active');
                const btn = menu.previousElementSibling;
                if (btn.classList.contains('link')) {
                    btn.classList.remove('active');
                }
            });
        }
    });

    // Анимация частиц (остается без изменений)
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 80;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.8 - 0.4,
                speedY: Math.random() * 0.8 - 0.4
            });
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }
});