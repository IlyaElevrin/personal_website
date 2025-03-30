// Удаляем переключение темы
const languageSwitcher = document.getElementById('language-switcher');
languageSwitcher.addEventListener('change', function () {
    alert('Язык изменен на: ' + this.value);
});

// Плавная прокрутка к секциям
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
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
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
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
                ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 * (1 - distance / 250)})`; // Соответственно изменили прозрачность
                ctx.lineWidth = 0.3;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

animate();