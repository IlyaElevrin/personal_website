// Переключение темы
const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('change', function () {
    document.body.classList.toggle('dark', this.value === 'dark');
    document.body.classList.toggle('light', this.value === 'light');
});

// Переключение языка (заглушка)
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