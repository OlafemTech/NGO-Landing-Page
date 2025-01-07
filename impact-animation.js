document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / speed;
            
            if(count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };

    // Progress Ring Animation
    const progressRings = document.querySelectorAll('.progress-ring__circle-progress');
    const progressValues = [75, 85, 60, 90]; // Percentage for each ring

    progressRings.forEach((ring, index) => {
        const circumference = 2 * Math.PI * 52; // r = 52
        ring.style.strokeDasharray = `${circumference} ${circumference}`;
        
        const setProgress = (percent) => {
            const offset = circumference - (percent / 100 * circumference);
            ring.style.strokeDashoffset = offset;
        };

        setProgress(progressValues[index]);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                if(entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe counters
    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Add hover effects for cards
    const impactCards = document.querySelectorAll('.impact-card');
    
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progress = card.querySelector('.progress-ring__circle-progress');
            progress.style.stroke = '#0056b3';
        });
        
        card.addEventListener('mouseleave', () => {
            const progress = card.querySelector('.progress-ring__circle-progress');
            progress.style.stroke = '#007bff';
        });
    });
});
