document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const slideInElements = document.querySelectorAll('.slide-in');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add the visible class
                observer.unobserve(entry.target); // Stop observing once it has been made visible
            }
        });
    }, options);

    fadeInElements.forEach(element => {
        observer.observe(element); // Observe each fade-in element
    });

    slideInElements.forEach(element => {
        observer.observe(element); // Observe each slide-in element
    });
});