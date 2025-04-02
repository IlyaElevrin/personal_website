// Данные хобби
const hobbiesData = {
    "hobbies": [
      {
        "name": "Фотография",
        "description": "Увлечение пейзажной и портретной фотографией",
        "links": [
          {"name": "500px", "url": "https://500px.com"},
          {"name": "Flickr", "url": "https://www.flickr.com"},
          {"name": "Instagram", "url": "https://www.instagram.com"}
        ]
      },
      {
        "name": "Горные лыжи",
        "description": "Катание на горных лыжах в зимний сезон",
        "links": [
          {"name": "Ski.ru", "url": "https://www.ski.ru"},
          {"name": "WeSnow", "url": "https://www.wesnow.ru"},
          {"name": "YouTube канал", "url": "https://youtube.com"}
        ]
      },
      {
        "name": "Программирование",
        "description": "Пет-проекты и участие в open-source",
        "links": [
          {"name": "GitHub", "url": "https://github.com"},
          {"name": "LeetCode", "url": "https://leetcode.com"},
          {"name": "StackOverflow", "url": "https://stackoverflow.com"}
        ]
      },
      {
        "name": "Путешествия",
        "description": "Исследование новых стран и культур",
        "links": [
          {"name": "TripAdvisor", "url": "https://www.tripadvisor.ru"},
          {"name": "Booking.com", "url": "https://www.booking.com"},
          {"name": "Airbnb", "url": "https://www.airbnb.ru"}
        ]
      },
      {
        "name": "Чтение",
        "description": "Научная фантастика и профессиональная литература",
        "links": [
          {"name": "Goodreads", "url": "https://www.goodreads.com"},
          {"name": "LiveLib", "url": "https://www.livelib.ru"},
          {"name": "Bookmate", "url": "https://bookmate.com"}
        ]
      }
    ]
  };
  
  // Отрисовка списка хобби
  function renderHobbies(hobbies) {
    const container = document.getElementById('hobbies-container');
    if (!container) return;
  
    container.innerHTML = '';
  
    hobbies.forEach(hobby => {
      const hobbyCard = document.createElement('div');
      hobbyCard.className = 'hobby-card';
      
      hobbyCard.innerHTML = `
        <div class="hobby-content">
          <h3>${hobby.name}</h3>
          <p class="hobby-description">${hobby.description}</p>
          <div class="hobby-links">
            ${hobby.links.map(link => `
              <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="hobby-link">
                ${link.name}
              </a>
            `).join('')}
          </div>
        </div>
      `;
      container.appendChild(hobbyCard);
    });
  }
  
  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    renderHobbies(hobbiesData.hobbies);
  });