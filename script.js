// Función para mostrar una pestaña y ocultar las demás
function mostrarPestaña(pestaña) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.pestaña');
    secciones.forEach((seccion) => {
      seccion.style.display = 'none';
    });
  
    // Mostrar la sección seleccionada
    const pestañaSeleccionada = document.getElementById(pestaña);
    if (pestañaSeleccionada) {
      pestañaSeleccionada.style.display = 'block';
    }
  }
  
  // Por defecto, mostramos la pestaña "inicio"
  document.addEventListener('DOMContentLoaded', () => {
    mostrarPestaña('inicio');
  });
  
  // Función para ver el CV en una nueva pestaña
  function verPDF() {
    window.open('pdf/cv.pdf', '_blank');  // Abre el PDF en una nueva pestaña
  }
  
  // Función para forzar la descarga del CV
  function downloadCV() {
    window.location.href = 'pdf/cv.pdf';  // Esto redirige a la ubicación del archivo y lo descarga
  }
  
  function mostrarPestaña(id) {
    const pestañas = document.querySelectorAll('.pestaña');
    pestañas.forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    // Función para activar la animación
    function activateAnimation() {
        const elements = document.querySelectorAll('.hidden');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1, // Ajusta este valor para controlar cuándo se activa la animación
            }
        );

        elements.forEach((element) => {
            observer.observe(element);
        });
    }

    // Activar la animación al cargar la página
    activateAnimation();

    // Reiniciar la animación al cambiar de pestaña
    const tabButtons = document.querySelectorAll('.nav-link');
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Ocultar todos los elementos nuevamente
            const elements = document.querySelectorAll('.visible');
            elements.forEach((element) => {
                element.classList.remove('visible');
                element.classList.add('hidden');
            });

            // Activar la animación nuevamente
            setTimeout(() => {
                activateAnimation();
            }, 50); // Pequeño retraso para asegurar que los elementos estén ocultos
        });
    });
});

document.addEventListener('mousemove', function(e) {
  var cursor = document.querySelector('.cursor');
  var trail = document.createElement('div');
  trail.classList.add('cursor-trail');
  document.body.appendChild(trail);

  // Actualizar la posición de la animación con requestAnimationFrame
  function moveCursor() {
      cursor.style.left = e.pageX + 'px';
      cursor.style.top = e.pageY + 'px';

      trail.style.left = e.pageX + 'px';
      trail.style.top = e.pageY + 'px';
  }

  // Usar requestAnimationFrame para optimizar el rendimiento
  requestAnimationFrame(moveCursor);

  // Eliminar el rastro después de un tiempo
  setTimeout(() => {
      trail.remove();
  }, 500);
});


let codeSnippet = `
function helloWorld() {
  console.log("Hola Mundo");
}

var greeting = "Hola";
let name = "Usuario";

if(greeting === "Helo") {
  console.log("Ups, parece que hay un error.");
  // Simulación de corrección automática
  setTimeout(() => {
    document.getElementById("code-output").innerHTML = document.getElementById("code-output").innerHTML.replace("Helo", "Hola");
  }, 1500);
}

if(greeting === "Hola") {
  console.log("¡Bienvenido " + name + "!");
}
`;

let index = 0;
const codeOutput = document.getElementById("code-output");

function writeCode() {
  if (index < codeSnippet.length) {
    let char = codeSnippet.charAt(index);

    // Simula error
    if (char === 'e' && codeSnippet.charAt(index + 1) === 'l') {
      codeOutput.innerHTML += `<span class="error">e</span>`;
      setTimeout(() => {
        codeOutput.innerHTML = codeOutput.innerHTML.replace('<span class="error">e</span>', '<span class="correction">e</span>');
      }, 500);
    } else {
      codeOutput.innerHTML += char;
    }

    index++;
    setTimeout(writeCode, 50);
  }
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) { // Inicia cuando se haya desplazado un poco
    writeCode();
  }
});


