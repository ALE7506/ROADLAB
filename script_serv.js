document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los contenedores de carrusel
    const carousels = document.querySelectorAll('.card-carousel');
    
    // Para cada carrusel
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.parentElement.querySelector('.prev');
        const nextBtn = carousel.parentElement.querySelector('.next');
        let currentIndex = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'prev', 'next');
                
                if (i === index) {
                    slide.classList.add('active');
                } else if (i < index) {
                    slide.classList.add('prev');
                } else {
                    slide.classList.add('next');
                }
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Mostrar el primer slide al cargar
        showSlide(0);
    });
});