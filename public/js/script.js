// ===== CONFIGURACIÓN Y ESTADO GLOBAL =====
const TRANSLATE_APIS = [
    "https://libretranslate.de/translate",
    "https://libretranslate.com/translate"
];
const DELIM = "___|||___";
let currentApiIndex = 0;

// Cache para evitar retraducir lo mismo
const translationCache = new Map();

// ===== SISTEMA DE TRADUCCIÓN AUTOMÁTICA =====
async function applyAutoTranslation(targetLang) {
    // Si es español, restaurar original
    if (targetLang === "es") {
        restoreOriginalText();
        document.documentElement.lang = "es";
        return;
    }

    // Obtener todos los nodos de texto traducibles
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            const tagName = parent.tagName;
            // Excluir scripts, estilos y elementos ya procesados
            if (["SCRIPT", "STYLE", "I", "SVG", "CODE"].includes(tagName)) 
                return NodeFilter.FILTER_REJECT;
            // No traducir textos muy cortos
            if (node.nodeValue.trim().length < 2) 
                return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    let node;
    while (node = walker.nextNode()) textNodes.push(node);

    // Guardar textos originales si no existen
    textNodes.forEach(n => {
        if (!n.parentElement.dataset.origText) 
            n.parentElement.dataset.origText = n.nodeValue;
    });

    // Traducir en lotes para mejor rendimiento
    const batchSize = 5;
    for (let i = 0; i < textNodes.length; i += batchSize) {
        const batch = textNodes.slice(i, i + batchSize);
        await Promise.all(batch.map(node => translateNode(node, targetLang)));
    }
    
    document.documentElement.lang = targetLang;
}

// Función para traducir un nodo individual
async function translateNode(node, targetLang) {
    const originalText = node.parentElement.dataset.origText;
    
    // Verificar cache
    const cacheKey = `${originalText}_${targetLang}`;
    if (translationCache.has(cacheKey)) {
        node.nodeValue = translationCache.get(cacheKey);
        return;
    }

    // No traducir si ya está en el idioma original
    if (targetLang === "es") return;

    try {
        const translatedText = await fetchTranslation(originalText, targetLang);
        if (translatedText) {
            node.nodeValue = translatedText;
            translationCache.set(cacheKey, translatedText);
        }
    } catch (error) {
        console.error("Error traduciendo nodo:", error);
    }
}

// Función principal de traducción
async function fetchTranslation(text, targetLang) {
    // Intentar con diferentes APIs si una falla
    for (let i = 0; i < TRANSLATE_APIS.length; i++) {
        const apiUrl = TRANSLATE_APIS[(currentApiIndex + i) % TRANSLATE_APIS.length];
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout 5s

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: text,
                    source: 'auto',
                    target: targetLang,
                    format: 'text'
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            currentApiIndex = (currentApiIndex + i) % TRANSLATE_APIS.length;
            return data.translatedText;
            
        } catch (error) {
            console.warn(`Fallo con API ${apiUrl}:`, error.message);
            // Continuar con la siguiente API
        }
    }
    
    throw new Error('Todas las APIs de traducción fallaron');
}

// Restaurar texto original
function restoreOriginalText() {
    const elements = document.querySelectorAll('[data-orig-text]');
    elements.forEach(el => {
        if (el.dataset.origText) {
            el.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.nodeValue = el.dataset.origText;
                }
            });
        }
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Activar animaciones
    activateAnimation();

    // 2. Manejo del botón de idioma
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        let currentLang = localStorage.getItem('lang') || 'es';
        languageToggle.textContent = currentLang === 'es' ? 'ES/EN' : 'EN/ES';
        
        languageToggle.addEventListener('click', async () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            languageToggle.disabled = true;
            languageToggle.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...';
            
            try {
                await applyAutoTranslation(currentLang);
                localStorage.setItem('lang', currentLang);
                languageToggle.innerHTML = currentLang === 'es' ? 'ES/EN' : 'EN/ES';
                
                // Feedback visual de éxito
                showToast('Idioma cambiado exitosamente', 'success');
                
            } catch (error) {
                console.error("Error en traducción:", error);
                showToast('Error al cambiar idioma. Intenta de nuevo.', 'error');
                // Revertir cambio
                currentLang = currentLang === 'es' ? 'en' : 'es';
            } finally {
                languageToggle.disabled = false;
            }
        });
    }

    // 3. Smooth Scroll para navegación
    setupSmoothScroll();
});

// Función para mostrar notificaciones
function showToast(message, type = 'success') {
    // Puedes usar Bootstrap Toast o SweetAlert
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0 position-fixed bottom-0 end-0 m-3`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    document.body.appendChild(toast);
    
    if (typeof bootstrap !== 'undefined') {
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    } else {
        console.log(message);
    }
    
    // Limpiar después de 3 segundos
    setTimeout(() => toast.remove(), 3000);
}

// Configurar smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
                
                // Cerrar menú móvil
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
}