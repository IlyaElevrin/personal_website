// Удаляем переключение темы
const languageSwitcher = document.getElementById('language-switcher');
languageSwitcher.addEventListener('change', function () {
    alert('Язык изменен на: ' + this.value);
});

// Плавная прокрутка к секциям (только для якорных ссылок)
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Проверяем, является ли ссылка якорной (начинается с #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Для внешних ссылок (например, index.html, books.html) оставляем стандартное поведение
    });
});

// Анимация нейронной сети
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

// Установка размеров canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Параметры нейронной сети
const nodes = [];
const connections = [];
const mouse = { x: null, y: null };

// Создание узлов с начальными параметрами (60 вместо 30 - в 2 раза больше)
for (let i = 0; i < 60; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        radius: Math.random() * 3 + 1,
        friction: 0.95
    });
}

// Обработчик движения мыши
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Функция анимации
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Обновление позиций узлов
    nodes.forEach(node => {
        // Применяем трение для постепенного замедления
        node.vx *= node.friction;
        node.vy *= node.friction;
        
        // Если скорость очень маленькая, останавливаем полностью
        if (Math.abs(node.vx) < 0.01) node.vx = 0;
        if (Math.abs(node.vy) < 0.01) node.vy = 0;
        
        // Движение узлов
        node.x += node.vx;
        node.y += node.vy;
        
        // Мягкое отталкивание от границ с замедлением
        if (node.x < 0) {
            node.x = 0;
            node.vx *= -0.5;
        }
        if (node.x > canvas.width) {
            node.x = canvas.width;
            node.vx *= -0.5;
        }
        if (node.y < 0) {
            node.y = 0;
            node.vy *= -0.5;
        }
        if (node.y > canvas.height) {
            node.y = canvas.height;
            node.vy *= -0.5;
        }
        
        // Взаимодействие с мышью
        if (mouse.x && mouse.y) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                const force = Math.min((150 - distance) / 50, 2);
                
                node.vx -= Math.cos(angle) * force * 0.05;
                node.vy -= Math.sin(angle) * force * 0.05;
            }
        }
        
        // Отрисовка узлов
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
        ctx.fill();
    });
    
    // Отрисовка соединений с увеличенной дальностью (250 вместо 150)
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 250) { // Увеличили дальность соединений
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(50, 150, 255, ${0.3 * (1 - distance / 250)})`; // Соответственно изменили прозрачность
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

animate();


function showStarAnimation() {
    if (!sessionStorage.getItem('animationShown')) {
        const overlay = document.createElement('div');
        overlay.className = 'star-overlay';
        
        const container = document.createElement('div');
        container.className = 'star-container';
        
        // Создаем 150 звёзд (можно регулировать количество)
        const starCount = 150;
        const stars = [];
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            
            // Случайный размер звезды
            const sizeClass = ['star-small', 'star-medium', 'star-large'][Math.floor(Math.random() * 3)];
            star.className = `star ${sizeClass}`;
            
            // Случайная позиция
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Случайная задержка появления (0-2 сек)
            star.style.setProperty('--delay', `${Math.random() * 2}s`);
            
            // Случайная задержка мерцания
            star.style.animationDelay = `${Math.random() * 2}s, ${Math.random() * 0.5}s`;
            
            container.appendChild(star);
        }
        
        overlay.appendChild(container);
        document.body.prepend(overlay);
        
        // Плавное угасание звёзд вместе с размытием
        setTimeout(() => {
            // Добавляем класс для анимации угасания
            overlay.classList.add('fade-out');
            
            // Удаляем overlay после завершения анимации
            setTimeout(() => {
                overlay.remove();
            }, 2000); // Длительность анимации угасания
        }, 3000); // Задержка перед началом угасания
        
        sessionStorage.setItem('animationShown', 'true');
    }
}

document.addEventListener('DOMContentLoaded', showStarAnimation);