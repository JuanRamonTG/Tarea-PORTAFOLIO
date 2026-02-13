// ===== CONFIGURACIÓN Y TRADUCCIONES =====
const translations = {
    "es": {
        "navInicio": "Inicio",
        "navSobreMi": "Sobre mí",
        "navCertificaciones": "Certificaciones",
        "navProyectos": "Proyectos",
        "heroTitle": "Hola, soy <span class='highlight-text-grayscale'>Juan Torres</span>",
        "heroLead": "Un Software Developer apasionado por la innovación y la eficiencia.",
        "btnDownload": "Descargar CV <i class='bi bi-download'></i>",
        "aboutTitle": "Sobre mí",
        "aboutText": "Hola, soy Juan Ramon, un orgulloso salvadoreño con una pasión desbordante por crear experiencias digitales que fusionan creatividad y tecnología. Desde El Salvador, me dedico a dar vida a proyectos web utilizando herramientas como .NET Core, MySQL, HTML, CSS y JavaScript.",
        "devSkillsTitle": "Habilidades de Programación",
        "html5Description": "Lenguaje de marcado para estructurar páginas web.",
        "css3Description": "Estilos visuales para personalizar la apariencia web.",
        "jsDescription": "Lenguaje de programación para interactividad web.",
        "bootstrapDescription": "Framework CSS para diseño responsivo y moderno.",
        "cardDotnetText": "Framework de desarrollo para apps modernas y escalables.",
        "softSkillsTitle": "Habilidades Blandas",
        "softSkillDisciplineTitle": "Disciplina",
        "softSkillDisciplineText": "Constancia en el aprendizaje, el ejercicio y los proyectos personales.",
        "certificationsTitle": "Certificaciones",
        "techInterestsTitle": "Mis Intereses en la Tecnología",
        "projectsTitle": "Mis Proyectos",
        "project1Title": "Calculadora Contable",
        "project1Description": "El sistema contable es una herramienta integral diseñada para facilitar la gestión financiera y contable.",
        "project1Status": "Finalizado",
        "project2Status": "En Desarrollo",
        "footerText": "© 2025 Juan Ramón Torres Guzmán. Todos los derechos reservados."
    },
    "en": {
        "navInicio": "Home",
        "navSobreMi": "About Me",
        "navCertificaciones": "Certifications",
        "navProyectos": "Projects",
        "heroTitle": "Hi, I'm <span class='highlight-text-grayscale'>Juan Torres</span>",
        "heroLead": "A Software Developer passionate about innovation and efficiency.",
        "btnDownload": "Download CV <i class='bi bi-download'></i>",
        "aboutTitle": "About Me",
        "aboutText": "Hi, I'm Juan Ramon, a proud Salvadoran with a boundless passion for creating digital experiences that merge creativity and technology. From El Salvador, I dedicate myself to bringing web projects to life using tools like .NET Core, MySQL, HTML, CSS, and JavaScript.",
        "devSkillsTitle": "Programming Skills",
        "html5Description": "Markup language for structuring web pages.",
        "css3Description": "Visual styles for customizing web appearance.",
        "jsDescription": "Programming language for web interactivity.",
        "bootstrapDescription": "CSS Framework for responsive and modern design.",
        "cardDotnetText": "Development framework for modern and scalable apps.",
        "softSkillsTitle": "Soft Skills",
        "softSkillDisciplineTitle": "Discipline",
        "softSkillDisciplineText": "Consistency in learning, exercise, and personal projects.",
        "certificationsTitle": "Certifications",
        "techInterestsTitle": "Tech Interests",
        "projectsTitle": "My Projects",
        "project1Title": "Accounting Calculator",
        "project1Description": "A comprehensive accounting system designed to facilitate financial and accounting management.",
        "project1Status": "Finished",
        "project2Status": "In Development",
        "footerText": "© 2025 Juan Ramón Torres Guzmán. All rights reserved."
    }
};

// ===== ANIMACIONES =====
function activateAnimation() {
    const elements = document.querySelectorAll('.hidden, .card, .testimonial-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if(entry.target.classList.contains('card')) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach((el) => {
        if(!el.classList.contains('visible')) {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "all 0.6s ease-out";
        }
        observer.observe(el);
    });
}

// ===== SISTEMA DE TRADUCCIÓN POR DICCIONARIO =====
function applyAutoTranslation(lang) {
    const langData = translations[lang];
    
    // Recorremos las llaves del diccionario y buscamos el elemento por ID
    Object.keys(langData).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            // Usamos innerHTML para mantener etiquetas como <span> o <i>
            element.innerHTML = langData[key];
        }
    });

    document.documentElement.lang = lang;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    activateAnimation();

    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        let currentLang = localStorage.getItem('lang') || 'es';
        
        // Aplicar idioma guardado al cargar
        if (currentLang !== 'es') {
            applyAutoTranslation(currentLang);
            languageToggle.textContent = 'EN/ES';
        }

        languageToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            
            applyAutoTranslation(currentLang);
            localStorage.setItem('lang', currentLang);
            
            languageToggle.textContent = currentLang === 'es' ? 'ES/EN' : 'EN/ES';
        });
    }

    // Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.hash !== "") {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if(target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if(navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
});