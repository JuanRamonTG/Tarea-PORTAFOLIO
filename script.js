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
  