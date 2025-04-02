// Данные проектов
const projectsData = {
    "projects": [
      {
        "title": "Нейросеть для анализа текста",
        "description": "Проект по обработке естественного языка с использованием TensorFlow и Python",
        "cover": "script/img/projects/nlp.jpg",
        "github": "https://github.com/example/text-analysis",
        "tags": ["AI", "Python", "NLP"]
      },
      {
        "title": "Веб-приложение для учета задач",
        "description": "Полнофункциональное приложение на React с бэкендом на Node.js",
        "cover": "script/img/projects/todo-app.jpg",
        "github": "https://github.com/example/todo-app",
        "tags": ["React", "Node.js", "MongoDB"]
      },
      {
        "title": "Мобильное приложение для трекинга здоровья",
        "description": "Приложение для iOS и Android, написанное на Flutter",
        "cover": "script/img/projects/health-app.jpg",
        "github": "https://github.com/example/health-tracker",
        "tags": ["Flutter", "Dart", "Firebase"]
      },
      {
        "title": "Анализ данных COVID-19",
        "description": "Визуализация данных о пандемии с использованием Python и D3.js",
        "cover": "script/img/projects/covid-dashboard.jpg",
        "github": "https://github.com/example/covid-analysis",
        "tags": ["Data Science", "Visualization"]
      },
      {
        "title": "Игра на Unity",
        "description": "2D-платформер с оригинальным геймплеем и дизайном",
        "cover": "script/img/projects/unity-game.jpg",
        "github": "https://github.com/example/unity-platformer",
        "tags": ["Unity", "C#", "Game Dev"]
      },
      {
        "title": "Веб-приложение для учета задач",
        "description": "Полнофункциональное приложение на React с бэкендом на Node.js",
        "cover": "script/img/projects/todo-app.jpg",
        "github": "https://github.com/example/todo-app",
        "tags": ["React", "Node.js", "MongoDB"]
      },
      {
        "title": "Мобильное приложение для трекинга здоровья",
        "description": "Приложение для iOS и Android, написанное на Flutter",
        "cover": "script/img/projects/health-app.jpg",
        "github": "https://github.com/example/health-tracker",
        "tags": ["Flutter", "Dart", "Firebase"]
      },
      {
        "title": "Анализ данных COVID-19",
        "description": "Визуализация данных о пандемии с использованием Python и D3.js",
        "cover": "script/img/projects/covid-dashboard.jpg",
        "github": "https://github.com/example/covid-analysis",
        "tags": ["Data Science", "Visualization"]
      },
      {
        "title": "Игра на Unity",
        "description": "2D-платформер с оригинальным геймплеем и дизайном",
        "cover": "script/img/projects/unity-game.jpg",
        "github": "https://github.com/example/unity-platformer",
        "tags": ["Unity", "C#", "Game Dev"]
      },
      {
        "title": "Игра на Unity",
        "description": "2D-платформер с оригинальным геймплеем и дизайном",
        "cover": "script/img/projects/unity-game.jpg",
        "github": "https://github.com/example/unity-platformer",
        "tags": ["Unity", "C#", "Game Dev"]
      }
    ]
  };
  
// Отрисовка списка проектов в одну колонку
function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;
  
    container.innerHTML = '';
  
    projects.forEach(project => {
      const projectCard = document.createElement('a');
      projectCard.className = 'project-card single-column'; // Добавили класс single-column
      projectCard.href = project.github;
      projectCard.target = '_blank';
      projectCard.rel = 'noopener noreferrer';
      
      projectCard.innerHTML = `
        <div class="project-content-wrapper">
          <div class="project-image-container">
            <img src="${project.cover}" alt="${project.title}" class="project-cover" onerror="this.src='img/default_project.jpg'">
          </div>
          <div class="project-info">
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
      container.appendChild(projectCard);
    });
  }
  
  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projectsData.projects);
  });