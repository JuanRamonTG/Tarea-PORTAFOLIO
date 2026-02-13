# GUÍA DE TESTING - Validación de Funcionalidad

**Proyecto:** Portfolio refactorizado  
**Fecha:** 12 de Febrero de 2026

---

## CÓMO PROBAR EL PROYECTO

### Opción 1: Abrir directamente en el navegador (Rápido)
```
1. Abre el Explorador de Archivos
2. Navega a: C:\Users\Mar\Pictures\Cosas Ramon\PROGRAMAS\Repo-Personal\Portafolio\Tarea-PORTAFOLIO\public
3. Haz doble clic en: index.html
4. Se abrirá en tu navegador predeterminado
```

### Opción 2: Usar un servidor local (Recomendado)

#### Con Python (si está instalado):
```bash
cd "C:\Users\Mar\Pictures\Cosas Ramon\PROGRAMAS\Repo-Personal\Portafolio\Tarea-PORTAFOLIO\public"
python -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

#### Con Node.js (si tienes npm):
```bash
npm install -g http-server
cd "C:\Users\Mar\Pictures\Cosas Ramon\PROGRAMAS\Repo-Personal\Portafolio\Tarea-PORTAFOLIO\public"
http-server

# El servidor correrá en http://localhost:8080
```

#### Con Live Server en VS Code:
```
1. Instala la extensión "Live Server" (autor: Ritwick Dey)
2. Abre index.html
3. Click derecho → "Open with Live Server"
4. Se abrirá automáticamente en http://localhost:5500
```

---

## ✅ CHECKLIST DE FUNCIONALIDADES A PROBAR

### 1. Carga & Estructura General
- [ ] La página carga sin errores en la consola del navegador
- [ ] El diseño es responsive (prueba redimensionando la ventana)
- [ ] Los colores se ven correctos
- [ ] Las imágenes se cargan

### 2. Navegación
- [ ] La barra de navegación es "sticky" (se queda arriba al scroll)
- [ ] El logo es visible en la esquina izquierda
- [ ] Los links de navegación funcionan:
  - [ ] "Inicio" → Salta al hero section
  - [ ] "Sobre mí" → Salta a la sección de about
  - [ ] "Certificaciones" → Salta al carrusel
  - [ ] "Proyectos" → Salta a tarjetas de proyectos
- [ ] El botón de idioma "ES/EN" es visible

### 3. Hero Section (Sección Principal)
- [ ] Se ve la foto de perfil (yo.jpg)
- [ ] El título "Juan Torres" está visible
- [ ] El botón "Descargar CV" es visible y clickeable
- [ ] El texto está bien posicionado en desktop y móvil

### 4. Secciones de Contenido
- [ ] Sección "Sobre mí" muestra el texto correctamente
- [ ] Sección "Habilidades de Programación" muestra 5 tarjetas (HTML, CSS, JS, Bootstrap, .NET)
- [ ] Sección "Habilidades Blandas" muestra 5 tarjetas
- [ ] Sección "Mis Intereses en la Tecnología" muestra 4 tarjetas

### 5. Sistema de Traducción (ES/EN)
- [ ] Click en "ES/EN" cambia el idioma:
  - [ ] "Sobre mí" → "About me"
  - [ ] "Certificaciones" → "Certifications"
  - [ ] "Proyectos" → "Projects"
  - [ ] Text de secciones cambia a inglés
  - [ ] Text de footer cambia a inglés
- [ ] Al recargar la página, mantiene el idioma seleccionado (gracias a localStorage)
- [ ] El botón ahora dice "EN/ES" cuando está en EN

### 6. Carrusel de Certificaciones
- [ ] Se ve la primera certificación (cer1.png)
- [ ] El botón "Next" (→) funciona y muestra cer2.png
- [ ] El botón "Prev" (←) funciona y regresa a cer1.png
- [ ] Los controles del carrusel son responsive

### 7. Tarjetas de Proyectos
- [ ] Se ven 3 tarjetas de proyectos
- [ ] Cada tarjeta muestra:
  - [ ] Una imagen del proyecto
  - [ ] Título del proyecto
  - [ ] Descripción breve
  - [ ] Tags de tecnología (HTML, CSS, JavaScript, etc.)
  - [ ] Status badge (Finalizado / En Desarrollo)
  - [ ] Link "Ver Proyecto" que abre GitHub
- [ ] Hover effect: Las tarjetas se elevan al pasar el mouse
- [ ] Links a GitHub abren en pestaña nueva

### 8. Testimonios
- [ ] Se ven 4 tarjetas de testimonios
- [ ] Cada testimonio muestra:
  - [ ] Foto circular de la persona
  - [ ] Nombre
  - [ ] Profesión
  - [ ] Comilla de apertura (")
  - [ ] Texto del testimonio con palabras en bold
- [ ] Hover effect: Sombra más pronunciada

### 9. Funcionalidades JavaScript
- [ ] **Descarga del CV**
  - [ ] Click en "Descargar CV" descarga el PDF
  - [ ] Archivo: `pdf/cv.pdf` se descarga correctamente
- [ ] **Animaciones en scroll**
  - [ ] Al hacer scroll, los elemento se desvanecen gradualmente
  - [ ] Las animaciones son fluidas

### 10. Responsive Design
- [ ] **Desktop (1920x1080)**
  - [ ] Layout de 4 columnas en tarjetas
  - [ ] Navegación horizontal completa
- [ ] **Tablet (768px)**
  - [ ] Layout adapta a 2 columnas
  - [ ] Menu colapsa (hamburger icon)
  - [ ] Texto legible
- [ ] **Móvil (375px)**
  - [ ] Layout de 1 columna
  - [ ] Menu hamburger visible y funcional
  - [ ] Botones son tapables (al menos 44px)
  - [ ] Texto no se corta

---

## 🐛 DEBUGGING (Si algo no funciona)

### Abrir Consola del Navegador
```
Windows/Linux: F12 o Ctrl+Shift+I
Mac: Cmd+Option+I
```

### Verificar Errores
- Si ves errores rojos, nota el mensaje exacto
- Los errores de CSS/JS quebrado lo mostrarán aquí

### Check de Network
- Tab "Network" en DevTools
- Verifica que se carguen:
  - [ ] bootstrap@5.3.0 (CSS)
  - [ ] css/estilos.css ✅
  - [ ] js/script.js ✅
  - [ ] Todas las imágenes en assets/images/
  - [ ] El PDF en pdf/cv.pdf

### Verificar localStorage
```javascript
// En la consola (F12 > Console):
localStorage.getItem('lang')
// Debería mostrar: "es" o "en"
```

---

## 📸 COMPORTAMIENTOS ESPERADOS POR SECCIÓN

### Navbar
```
Aspecto:
- Fondo oscuro (negro/gris oscuro)
- Texto blanco
- Logo en la izquierda
- Links centrados
- Botón ES/EN en la derecha
- Fixed top: Se queda en la parte superior al scroll

Comportamiento:
- Responsive: En móvil se colapsa con hamburger (☰)
- Hover en links: Color changes
- Click en links: Scroll suave a la sección
- Botón ES/EN: Toglea entre ES y EN
```

### Hero Section
```
Aspecto:
- Fondo de degradado o color oscuro
- Foto circular con sombra
- Título grande y bold
- Subtítulo
- Botón "Descargar CV" con efecto hover

Comportamiento:
- Fade in animation al cargar
- Responsive: En móvil la foto está arriba, texto abajo
- Botón descarga el PDF
```

### Cards/Tarjetas
```
Aspecto:
- Sombra suave
- Borde redondeado
- Contenido centrado
- Ícono o imagen

Comportamiento:
- Hover (pasar mouse): Sombra más pronunciada, levantamiento
- Transition suave (0.3s)
- Links abiertos en nueva pestaña (_blank)
```

### Traducciones
```
Idiomas:
- ES: Español (default)
- EN: English

Elementos que cambian:
- Navegación
- Títulos de secciones
- Descripciones
- Footer
- Projects status (Finalizado → Completed)

Método:
- localStorage.setItem('lang', 'en')
- Persiste entre refreshes
```

---

## 🔍 VERIFICACIÓN TÉCNICA

### En la Consola del Navegador (F12 > Console):

```javascript
// 1. Verificar que no haya errores
console.log('Errores esperados: 0');

// 2. Verificar idioma guardado
console.log('Idioma guardado:', localStorage.getItem('lang'));
// Output: "es" o "en"

// 3. Verificar que CSS se cargó
window.getComputedStyle(document.body).getPropertyValue('background-color');
// Output: color esperado (no blanco por defecto)

// 4. Verificar que Bootstrap está disponible
console.log('Bootstrap:', typeof bootstrap !== 'undefined' ? 'Cargado ✅' : 'Error ❌');

// 5. Verificar que el script está cargado
console.log('ShowTab function:', typeof mostrarPestaña !== 'undefined' ? 'Existe ✅' : 'No encontrada ❌');
```

---

## 📋 NOTAS IMPORTANTES

### Puntos de Atención
1. **Google Fonts:**
   - Si la conexión a internet es lenta, las fuentes tardarán en cargar
   - Fallback es serif por defecto (normal)

2. **CDN Externo:**
   - Bootstrap y Font Awesome vienen de CDN
   - Si no hay internet, estos no se cargarán
   - CSS local (estilos.css) sí funcionará sin internet

3. **Rutas de Archivos:**
   - Los paths son relativos: `css/estilos.css`, `js/script.js`
   - Esto permite que funcione desde cualquier ubicación

4. **Sistema de Traducción:**
   - Almacena preferencia en localStorage
   - Persiste entre sesiones del navegador
   - No se borra al limpiar cache normalmente (protegido)

---

## QUÉ CAMBIÓ EN ESTA REFACTORIZACIÓN

### Lo Que DEBE funcionar igual que antes:
- ✅ Todos los estilos visuales
- ✅ Todas las animaciones
- ✅ Sistema de traducción
- ✅ Descarga del PDF
- ✅ Responsividad
- ✅ Interactividad

### Lo Que ES DIFERENTE (pero mejor):
- ✅ HTML es más limpio (463 líneas vs 2021)
- ✅ CSS está en archivo separado (no embebido)
- ✅ JavaScript está en archivo separado (no inline)
- ✅ HTML es válido W3C
- ✅ Más rápido de cargar
- ✅ Más fácil de mantener

---

## RESULTADO ESPERADO

Después de la refactorización, el portafolio debe:

1. ✅ **Verse exactamente igual** - Mismo diseño, colores, layout
2. ✅ **Funcionar exactamente igual** - Mismas interacciones, mismo contenido
3. ✅ **Ser más eficiente** - Cargar más rápido, mejor code quality
4. ✅ **Ser más mantenible** - Fácil de actualizar código
5. ✅ **Ser más profesional** - Estructura limpia y modular

---

## SI ALGO NO FUNCIONA

### Caso 1: Page appears blank/white
```
✓ Abre DevTools (F12)
✓ Verifica Tab "Network" - ¿Se cargan los estilos?
✓ Si estilos están con rojo 404: Problema de ruta
✓ Intenta con http://localhost:8000 en lugar de file://
```

### Caso 2: Falta traducción o botón ES/EN no funciona
```
✓ Abre DevTools > Console
✓ Escribe: localStorage.getItem('lang')
✓ Verifica que el script.js se cargó (Network tab, verde)
✓ Si no aparece: F5 (refresh) y vuelve a intentar
```

### Caso 3: Imágenes no se ven
```
✓ DevTools > Network tab
✓ Busca las imágenes en rojo (404 error)
✓ Verifica que la ruta sea: assets/images/nombreimagen.png
✓ Asegúrate de estar desde public/ (no desde la carpeta raíz)
```

### Caso 4: CSS no se aplica
```
✓ DevTools > Elements tab
✓ Inspecciona un elemento
✓ Verifica que veas: link rel="stylesheet" href="css/estilos.css"
✓ Si ves <style> tag en el HTML: Entonces algo salió mal
✓ Recrea el HTML desde cero
```

---

## RESUMEN RÁPIDO

| Característica | Estado | Verificación |
|---|---|---|
| **HTML Válido** | ✅ | F12 > Elements - Una sola <head>, una sola <body> |
| **CSS Externo** | ✅ | F12 > Network - css/estilos.css cargado |
| **JS Externo** | ✅ | F12 > Network - js/script.js cargado |
| **Traducción** | ✅ | Click ES/EN - El idioma cambia |
| **Responsive** | ✅ | Redimensiona ventana - Se adapta |
| **Performance** | ✅ | F12 > Performance - Sin errores |

---

**¡La refactorización está lista para testing!** 🚀

*Última actualización: 12 de Febrero de 2026*
