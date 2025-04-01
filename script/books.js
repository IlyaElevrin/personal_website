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

// Фиксированная визуализация нейронной сети для книг
function initBooksNetwork(books) {
  const canvas = document.getElementById('booksCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = 400;

  // Создаем узлы
  const nodes = [];
  const categoryMap = {};
  const categoryPositions = {};
  
  // Фиксированные позиции для категорий (располагаем по кругу)
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.35;
  
  // Собираем все уникальные категории
  const allCategories = [];
  books.forEach(book => {
    book.categories.forEach(cat => {
      if (!allCategories.includes(cat)) {
        allCategories.push(cat);
      }
    });
  });
  
  // Распределяем категории по кругу
  allCategories.forEach((cat, index) => {
    const angle = (index / allCategories.length) * Math.PI * 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    categoryMap[cat] = {
      id: cat,
      type: 'category',
      x: x,
      y: y,
      radius: 20,
      color: `hsl(${(index * 360 / allCategories.length)}, 70%, 50%)`
    };
    nodes.push(categoryMap[cat]);
  });

  // Добавляем книги и размещаем их между категориями
  books.forEach((book, bookIndex) => {
    // Вычисляем среднюю позицию между категориями книги
    let sumX = 0;
    let sumY = 0;
    
    book.categories.forEach(cat => {
      const category = categoryMap[cat];
      sumX += category.x;
      sumY += category.y;
    });
    
    const avgX = sumX / book.categories.length;
    const avgY = sumY / book.categories.length;
    
    // Немного смещаем книги от центра для лучшей визуализации
    const offsetDirection = bookIndex % 2 === 0 ? 1 : -1;
    const offsetX = offsetDirection * 60;
    const offsetY = offsetDirection * 60;
    
    nodes.push({
      id: book.title,
      type: 'book',
      x: avgX + offsetX,
      y: avgY + offsetY,
      radius: 15,
      cover: book.cover,
      categories: book.categories
    });
  });

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
            ctx.strokeStyle = category.color.replace(')', ', 0.3)').replace('hsl', 'hsla');
            ctx.lineWidth = 2;
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
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.id, node.x, node.y + 25);
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

  draw();
  
  // Обработчик ресайза
  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    draw();
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  renderBooks(booksData.books);
  initBooksNetwork(booksData.books);
});