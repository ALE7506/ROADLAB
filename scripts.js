// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Ocultar todas las secciones al cargar la página
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Mostrar la primera sección (puedes ajustar según lo que necesites)
    document.getElementById("grupoinversiones").style.display = "block"; // O cualquier otra sección que desees mostrar inicialmente

    // Añadir event listeners a los enlaces de navegación
    const links = document.querySelectorAll(".navbar a");
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Prevenir la acción predeterminada del enlace

            // Ocultar todas las secciones
            sections.forEach(section => {
                section.style.display = "none";
            });

            // Obtener el id de la sección correspondiente y mostrarla
            const targetId = this.getAttribute("href").substring(1); // Extraer el id (sin el "#")
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = "block"; // Mostrar la sección seleccionada
            }
        });
    });

});


