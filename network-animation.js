document.addEventListener('DOMContentLoaded', function() {
    const networkSection = document.querySelector('.projects-network-section');
    const networkItems = document.querySelectorAll('.network-item');
    const centerContent = document.querySelector('.center-content');
    
    // Intersection Observer for zoom effect
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const networkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-zoom-in');
            } else {
                entry.target.classList.remove('scroll-zoom-in');
            }
        });
    }, observerOptions);
    
    // Observe all network items and center content
    networkItems.forEach(item => networkObserver.observe(item));
    networkObserver.observe(centerContent);
});
