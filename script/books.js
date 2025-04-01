// Данные книг прямо в скрипте
const booksData = {
    "books": [
      {
        "title": "Machine learning for absolute beginners",
        "author": "Oliver Theobald",
        "cover": "script/img/books/machin learning oliver.jpg",
        "categories": ["Ml", "Development"]
      },
      {
        "title": "Статистика и котики",
        "author": "Владимир Савельев",
        "cover": "script/img/books/stat on cats.jpg",
        "categories": ["Math", "Ml"]
      },
      {
        "title": "Погружение в аналитику данных. От Excel к Python и R",
        "author": "Джордж Маунт",
        "cover": "script/img/books/data analytics excel.jpg",
        "categories": ["Data", "Math"]
      }
    ]
  };
  
  // Отрисовка списка книг
function renderBooks(books) {
    const container = document.getElementById('books-container');
    if (!container) return;
  
    container.innerHTML = '';
  
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.src='img/default_book.jpg'">
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <div class="categories">
            ${book.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
          </div>
        </div>
      `;
      container.appendChild(bookCard);
    });
  }
  
  // Визуализация нейронной сети для книг
  function initBooksNetwork(books) {
    const canvas = document.getElementById('booksCanvas');
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
  
    // Создаем узлы
    const nodes = [];
    const categoryMap = {};
  
    // Добавляем книги
    books.forEach(book => {
      nodes.push({
        id: book.title,
        type: 'book',
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        radius: 10,
        cover: book.cover,
        categories: book.categories
      });
  
      // Собираем категории
      book.categories.forEach(cat => {
        if (!categoryMap[cat]) {
          categoryMap[cat] = {
            id: cat,
            type: 'category',
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: 0,
            vy: 0,
            radius: 15,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          };
          nodes.push(categoryMap[cat]);
        }
      });
    });
  
    // Физическая модель
    function updatePhysics() {
      // Обновление позиций
      nodes.forEach(node => {
        // Применяем скорость
        node.x += node.vx;
        node.y += node.vy;
        
        // Применяем трение
        node.vx *= 0.95;
        node.vy *= 0.95;
        
        // Отталкивание от границ
        if (node.x < node.radius) {
          node.x = node.radius;
          node.vx *= -0.5;
        }
        if (node.x > canvas.width - node.radius) {
          node.x = canvas.width - node.radius;
          node.vx *= -0.5;
        }
        if (node.y < node.radius) {
          node.y = node.radius;
          node.vy *= -0.5;
        }
        if (node.y > canvas.height - node.radius) {
          node.y = canvas.height - node.radius;
          node.vy *= -0.5;
        }
      });
  
      // Притяжение книг к своим категориям
      nodes.forEach(node => {
        if (node.type === 'book') {
          node.categories.forEach(cat => {
            const category = categoryMap[cat];
            if (category) {
              const dx = category.x - node.x;
              const dy = category.y - node.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance > 50) {
                const force = 0.0005 * distance;
                node.vx += dx * force;
                node.vy += dy * force;
              }
            }
          });
        }
      });
  
      // Отталкивание всех узлов
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const node1 = nodes[i];
          const node2 = nodes[j];
          const dx = node1.x - node2.x;
          const dy = node1.y - node2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = node1.radius + node2.radius + 10;
          
          if (distance < minDistance) {
            const force = 0.01 * (minDistance - distance);
            const fx = dx / distance * force;
            const fy = dy / distance * force;
            
            node1.vx += fx;
            node1.vy += fy;
            node2.vx -= fx;
            node2.vy -= fy;
          }
        }
      }
    }
  
    // Отрисовка
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Рисуем связи
      nodes.forEach(node => {
        if (node.type === 'book') {
          node.categories.forEach(cat => {
            const category = categoryMap[cat];
            if (category) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(category.x, category.y);
              ctx.strokeStyle = category.color.replace(')', ', 0.2)').replace('hsl', 'hsla');
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
      });
  
      // Рисуем узлы
      nodes.forEach(node => {
        if (node.type === 'category') {
          // Категории
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
          
          // Текст категории
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(node.id, node.x, node.y + 22);
        } else {
          // Книги (обложки)
          const img = new Image();
          img.src = node.cover;
          img.onerror = function() {
            // Запасной вариант если изображение не загрузилось
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#007BFF';
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(node.id.substring(0, 3), node.x, node.y + 3);
          };
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, node.x - node.radius, node.y - node.radius, node.radius * 2, node.radius * 2);
          ctx.restore();
        }
      });
    }
  
    // Анимация
    function animate() {
      updatePhysics();
      draw();
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  
  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    renderBooks(booksData.books);
    initBooksNetwork(booksData.books);
    
    // Добавляем обработчик для ресайза окна
    window.addEventListener('resize', () => {
      const canvas = document.getElementById('booksCanvas');
      if (canvas) {
        canvas.width = canvas.offsetWidth;
      }
    });
  });