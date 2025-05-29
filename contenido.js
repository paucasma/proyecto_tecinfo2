document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto de Scroll para el Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Navegación Suave (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Cerrar el menú móvil si está abierto
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active'); // Opcional, si tienes un icono que cambia
            }
        });
    });

    // 3. Menú Hamburguesa (Mobile Navigation)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active'); // Para cambiar el icono si se desea
    });

    // 4. Modal de Donación de Alimentos
    const openFoodFormBtn = document.getElementById('openFoodForm');
    const foodDonationModal = document.getElementById('foodDonationModal');
    const closeButton = foodDonationModal.querySelector('.close-button');
    const foodDonationForm = document.getElementById('foodDonationForm');

    openFoodFormBtn.addEventListener('click', () => {
        foodDonationModal.classList.add('show');
    });

    closeButton.addEventListener('click', () => {
        foodDonationModal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === foodDonationModal) {
            foodDonationModal.classList.remove('show');
        }
    });

    foodDonationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío real del formulario

        // Aquí iría la lógica para enviar los datos del formulario (ej. a una API)
        // Por ahora, solo mostraremos una alerta
        alert('¡Gracias por tu interés en donar alimentos! Tu solicitud ha sido enviada.');
        foodDonationModal.classList.remove('show');
        foodDonationForm.reset(); // Limpia el formulario
    });

    // 5. Botones de Donación Monetaria Predefinidos
    document.querySelectorAll('.money-option-card .money-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const amount = event.target.dataset.amount;
            alert(`¡Gracias por donar $${amount} pesos! Tu apoyo es invaluable.`);
            // En una aplicación real, aquí integrarías un sistema de pago (Stripe, PayPal, etc.)
        });
    });

    // 6. Donación Monetaria Personalizada
    const customAmountField = document.getElementById('customAmount');
    const donateCustomAmountBtn = document.getElementById('donateCustomAmount');

    donateCustomAmountBtn.addEventListener('click', () => {
        const customAmount = customAmountField.value;
        if (customAmount && customAmount > 0) {
            alert(`¡Gracias por tu generosa donación de $${customAmount} pesos! Tu apoyo es invaluable.`);
            // Integrar sistema de pago
            customAmountField.value = '';
        } else {
            alert('Por favor, ingresa una cantidad válida para donar.');
        }
    });

    // 7. Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        updateDots(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Crear los puntos del slider
    testimonialSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            currentSlide = index;
            startSlider(); // Reinicia el intervalo después de un clic manual
        });
        sliderDotsContainer.appendChild(dot);
    });

    function updateDots(index) {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    showSlide(currentSlide);
    startSlider();


    // 8. Animación de los elementos del Timeline al hacer scroll
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        root: null, // Observa el viewport
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% del elemento sea visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });


    // 9. Animación de los íconos de "Quiénes Somos"
    const aboutItems = document.querySelectorAll('.about-item');
    const aboutObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.icon-large');
                if (icon) {
                    icon.style.animation = 'bounceIn 1s ease-out forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 }); // Cuando el 40% del about-item sea visible

    aboutItems.forEach(item => {
        aboutObserver.observe(item);
    });

    // 10. Animación de los íconos de "Donar Alimentos" y "Donar Dinero"
    const donationSteps = document.querySelectorAll('.food-step, .money-option-card');
    const donationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.step-icon, .money-icon');
                if (icon) {
                    icon.style.animation = 'rotateIn 0.8s ease-out forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    donationSteps.forEach(step => {
        donationObserver.observe(step);
    });

});
