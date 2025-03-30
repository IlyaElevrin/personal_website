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

// Создание узлов
for (let i = 0; i < 30; i++) {
    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        radius: Math.random() * 3 + 1
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
        // Движение узлов
        node.x += node.vx;
        node.y += node.vy;
        
        // Отталкивание от границ
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Взаимодействие с мышью
        if (mouse.x && mouse.y) {
            const dx = mouse.x - node.x;
            const dy = mouse.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                const force = (150 - distance) / 50;
                node.vx -= Math.cos(angle) * force * 0.1;
                node.vy -= Math.sin(angle) * force * 0.1;
            }
        }
        
        // Отрисовка узлов
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
        ctx.fill();
    });
    
    // Отрисовка соединений
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

animate();