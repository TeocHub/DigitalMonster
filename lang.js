const translations = {
    es: {
        nav_work: "PROYECTOS",
        hero_1: "CREAMOS",
        hero_2: "MONSTRUOS",
        cat_webcomic: "WEBCOMIC",
        fire_desc: "Una travesía a través de la fantasía y ciencia ficción.",
        status_soon: "PRÓXIMAMENTE",
        footer_text: "ESTUDIO CREATIVO"
    },
    en: {
        nav_work: "WORK",
        hero_1: "WE CREATE",
        hero_2: "MONSTERS",
        cat_webcomic: "WEBCOMIC",
        fire_desc: "A journey through fantasy and science fiction.",
        status_soon: "COMING SOON",
        footer_text: "CREATIVE STUDIO"
    }
};

function changeLang(lang) {
    // Cambiar textos
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Cambiar estado de botones
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    
    // Guardar preferencia
    localStorage.setItem('selectedLang', lang);
}

// Cargar idioma preferido al abrir la web
window.onload = () => {
    const savedLang = localStorage.getItem('selectedLang') || 'es';
    changeLang(savedLang);
};