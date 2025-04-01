// Данные о сертификатах и курсах
const certificatesData = [
    {
        title: "Pandas",
        imageUrl: "script/img/cert/Churkenberg - Pandas.png",
        courseUrl: "https://github.com/IlyaElevrin/certificates/blob/main/Churkenberg%20-%20Pandas.png",
        issuer: "Kaggle"
    },
    {
        title: "Data Analytics and Visualization Job Simulation",
        imageUrl: "script/img/cert/Accenture North America.png",
        courseUrl: "https://github.com/IlyaElevrin/certificates/blob/main/hzmoNKtzvAzXsEqx8_Accenture%20North%20America_cBvmuNKXd29t7GPLu_1718301125680_completion_certificate.pdf",
        issuer: "Forage"
    },
    {
        title: "Introduction to Data Science and Machine Learning",
        imageUrl: "script/img/cert/Introduction to Data Science and Machine Learning.png",
        courseUrl: "https://github.com/IlyaElevrin/certificates/blob/main/stepik-certificate-4852-188053a.pdf",
        issuer: "Bioinformatics Institute"
    },
    {
        title: "Basics of statistics",
        imageUrl: "script/img/cert/Basics of statistics.png",
        courseUrl: "https://github.com/IlyaElevrin/certificates/blob/main/stepik-certificate-76-3594ee3.pdf",
        issuer: "Bioinformatics Institute"
    }
];

// Функция для отображения сертификатов
function displayCertificates() {
    const container = document.getElementById('certificates-container');
    
    certificatesData.forEach(cert => {
        const certElement = document.createElement('div');
        certElement.className = 'certificate-card';
        certElement.innerHTML = `
            <a href="${cert.courseUrl}" target="_blank" class="certificate-link">
                <div class="certificate-image-container">
                    <img src="${cert.imageUrl}" alt="${cert.title}" class="certificate-image">
                </div>
                <div class="certificate-info">
                    <h3>${cert.title}</h3>
                    <p class="issuer">${cert.issuer}</p>
                </div>
            </a>
        `;
        container.appendChild(certElement);
    });
}

// Загружаем сертификаты при загрузке страницы
document.addEventListener('DOMContentLoaded', displayCertificates);