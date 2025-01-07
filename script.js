// Initialize Swiper
const swiper = new Swiper('.hero-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Effect
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// Initialize Hero Swiper
const heroSwiper = new Swiper('.hero-swiper', {
    // Enable loop mode
    loop: true,
    
    // Enable autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    
    // Add smooth transition effect
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    
    // Configure navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Configure pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    
    // Add keyboard control
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    
    // Smooth transition speed
    speed: 1000,
});

// Initialize Executive Team Slider
const executiveSlider = new Swiper('.executive-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
});

// Initialize Partners Slider
const partnersSlider = new Swiper('.partners-slider', {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    speed: 3000, // Slower speed for smoother continuous motion
    allowTouchMove: false, // Disable touch/mouse drag
    autoplay: {
        delay: 0, // No delay between transitions
        disableOnInteraction: false,
        pauseOnMouseEnter: false, // Don't pause on hover
    },
    pagination: false, // Remove pagination for continuous flow
    breakpoints: {
        320: {
            slidesPerView: 3,
            spaceBetween: 10,
            slidesPerGroup: 1 // Move one at a time for smoother motion
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 1
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
            slidesPerGroup: 1
        },
    }
});

// Hero Slider Configuration
const heroSlider = new Swiper('.hero-slider', {
    speed: 300, // Transition speed
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    on: {
        slideChangeTransitionStart: function () {
            // Reset animations
            const activeSlide = this.slides[this.activeIndex];
            const elements = activeSlide.querySelectorAll('.animate-up');
            elements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = null;
            });
        }
    }
});

// Pause slider on hover
const sliderEl = document.querySelector('.hero-slider');
sliderEl.addEventListener('mouseenter', () => {
    heroSlider.autoplay.stop();
});
sliderEl.addEventListener('mouseleave', () => {
    heroSlider.autoplay.start();
});

// Partners Slider Configuration
const partnersSlider = new Swiper('.partners-slider', {
    speed: 500,
    autoplay: {
        delay: 500,
        disableOnInteraction: false
    },
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 4,
        },
        1024: {
            slidesPerView: 7,
        },
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic counter animation for impact numbers
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.number');
            numbers.forEach(num => {
                const target = parseInt(num.textContent);
                animateValue(num, 0, target, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.impact-numbers').forEach(section => {
    observer.observe(section);
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Mobile menu enhancements
const mobileMenu = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && !mobileMenu.contains(e.target)) {
            navbarCollapse.classList.remove('show');
            document.body.classList.remove('menu-open');
        }
    });
}

// Optimize dropdown behavior
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (window.innerWidth > 992) {
        let timeoutId;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.querySelector('.dropdown-menu')?.classList.remove('show');
                }
            });
            menu?.classList.add('show');
        });
        
        dropdown.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                menu?.classList.remove('show');
            }, 200);
        });
    }
});

// Optimize scroll performance
let lastScrollTop = 0;
let ticking = false;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(function() {
            handleScroll(currentScroll);
            ticking = false;
        });
        
        ticking = true;
    }
    
    lastScrollTop = currentScroll;
});

function handleScroll(currentScroll) {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (currentScroll > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
}

// Optimize form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const submitButton = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, textarea');
    
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        input.classList.add('is-invalid');
                    }
                });
            }
            form.classList.add('was-validated');
        });
    }
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('is-invalid');
            }
        });
    });
});

// Optimize smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth < 992) {
                navbarCollapse?.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        }
    });
});

// Optimize animations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize window resize handler
const optimizedResize = debounce(() => {
    if (window.innerWidth > 992) {
        document.body.classList.remove('menu-open');
        navbarCollapse?.classList.remove('show');
    }
}, 250);

window.addEventListener('resize', optimizedResize);

// Dropdown hover effect for desktop
if (window.innerWidth > 992) {
    document.querySelectorAll('.navbar .dropdown').forEach(function(dropdown) {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-toggle').click();
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-toggle').click();
        });
    });
}

// Program cards hover effect
document.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation for contact forms (if any)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    });
});

// Real-time Impact Counter
function initDonationTicker() {
    const donations = [
        { name: 'Anonymous', amount: '$50', message: 'Keep up the great work!' },
        { name: 'Sarah M.', amount: '$100', message: 'For a better future' },
        { name: 'John D.', amount: '$25', message: 'Happy to support' }
    ];

    const ticker = document.getElementById('donationTicker');
    let index = 0;

    function addDonation() {
        const donation = donations[index];
        const div = document.createElement('div');
        div.className = 'donation-item';
        div.innerHTML = `
            <strong>${donation.name}</strong> donated ${donation.amount}
            <p>${donation.message}</p>
        `;
        ticker.insertBefore(div, ticker.firstChild);
        if (ticker.children.length > 5) {
            ticker.removeChild(ticker.lastChild);
        }
        index = (index + 1) % donations.length;
    }

    setInterval(addDonation, 3000);
}

// Progress Bars Animation
function initProgressBars() {
    const bars = document.querySelectorAll('.progress-bar');
    bars.forEach(bar => {
        const target = bar.getAttribute('data-target');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = target + '%';
        }, 500);
    });
}

// Interactive Map
function initImpactMap() {
    if (!document.getElementById('impactMap')) return;

    const map = L.map('impactMap').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const impactLocations = [
        { lat: 40.7128, lng: -74.0060, title: 'New York Project' },
        { lat: 51.5074, lng: -0.1278, title: 'London Initiative' },
        { lat: -33.8688, lng: 151.2093, title: 'Sydney Program' }
    ];

    impactLocations.forEach(location => {
        L.marker([location.lat, location.lng])
            .bindPopup(location.title)
            .addTo(map);
    });
}

// Donation Amount Buttons
function initDonationButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            amountButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Social Impact Feed
function initSocialFeed() {
    const socialFeed = document.getElementById('socialFeed');
    if (!socialFeed) return;

    const posts = [
        {
            platform: 'twitter',
            content: 'Excited to announce our new sustainable development project reaching 1000+ families! #SocialImpact',
            author: '@NGOImpact',
            date: '2 hours ago'
        },
        {
            platform: 'instagram',
            content: 'Our volunteers making a difference in local communities. Swipe to see more! 📸',
            author: '@ngo_impact',
            date: '1 day ago'
        }
    ];

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'social-post';
        postElement.innerHTML = `
            <div class="post-header">
                <i class="fab fa-${post.platform}"></i>
                <span>${post.author}</span>
                <span class="date">${post.date}</span>
            </div>
            <div class="post-content">${post.content}</div>
        `;
        socialFeed.appendChild(postElement);
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initDonationTicker();
    initProgressBars();
    initImpactMap();
    initDonationButtons();
    initSocialFeed();

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});

// AI Impact Predictor
class ImpactPredictor {
    constructor() {
        this.chart = null;
        this.currentPeriod = 'yearly';
        this.currentMetric = 'beneficiaries';
        this.updateInterval = null;
        this.animationInProgress = false;
        
        // Format functions for different metrics
        this.formatters = {
            beneficiaries: value => new Intl.NumberFormat().format(value),
            communities: value => new Intl.NumberFormat().format(value),
            funding: value => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value)
        };

        // Preset values for metrics
        this.presetValues = {
            beneficiaries: {
                base: 5000,
                growth: 1.6,
                confidence: 92
            },
            communities: {
                base: 50,
                growth: 1.75,
                confidence: 90
            },
            funding: {
                base: 100000,
                growth: 1.8,
                confidence: 89
            }
        };
        
        // Initialize data with preset values
        this.data = this.generateInitialData();
        
        // Enhanced data structure with growth rates and confidence scores
        this.data = {
            beneficiaries: {
                yearly: {
                    labels: ['2024', '2025', '2026', '2027', '2028'],
                    current: [5000, 7500, 12000, 18000, 25000],
                    projected: [5000, 8500, 15000, 25000, 40000],
                    growthRate: 60,
                    confidence: 92
                },
                quarterly: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    current: [1200, 1500, 1800, 2100],
                    projected: [1200, 1800, 2500, 3500],
                    growthRate: 45,
                    confidence: 88
                },
                monthly: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    current: [400, 450, 500, 550, 600, 650],
                    projected: [400, 480, 580, 700, 850, 1000],
                    growthRate: 35,
                    confidence: 85
                }
            },
            communities: {
                yearly: {
                    labels: ['2024', '2025', '2026', '2027', '2028'],
                    current: [50, 75, 100, 150, 200],
                    projected: [50, 100, 200, 350, 500],
                    growthRate: 75,
                    confidence: 90
                },
                quarterly: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    current: [12, 15, 18, 21],
                    projected: [12, 18, 25, 35],
                    growthRate: 55,
                    confidence: 87
                },
                monthly: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    current: [4, 5, 6, 7, 8, 9],
                    projected: [4, 6, 8, 10, 12, 15],
                    growthRate: 40,
                    confidence: 83
                }
            },
            funding: {
                yearly: {
                    labels: ['2024', '2025', '2026', '2027', '2028'],
                    current: [100000, 150000, 200000, 300000, 400000],
                    projected: [100000, 200000, 400000, 700000, 1000000],
                    growthRate: 80,
                    confidence: 89
                },
                quarterly: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    current: [25000, 30000, 35000, 40000],
                    projected: [25000, 35000, 50000, 70000],
                    growthRate: 65,
                    confidence: 86
                },
                monthly: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    current: [8000, 9000, 10000, 11000, 12000, 13000],
                    projected: [8000, 10000, 13000, 17000, 22000, 28000],
                    growthRate: 50,
                    confidence: 84
                }
            }
        };

        // Enhanced insights with dynamic content
        this.insights = {
            beneficiaries: [
                {
                    icon: 'fa-chart-line',
                    title: 'Growth Trajectory',
                    getContent: (data) => `Exponential growth predicted with ${data.growthRate}% increase year-over-year`
                },
                {
                    icon: 'fa-bullseye',
                    title: 'Impact Target',
                    getContent: (data) => `On track to reach ${new Intl.NumberFormat().format(data.projected[data.projected.length - 1])} beneficiaries by ${data.labels[data.labels.length - 1]}`
                },
                {
                    icon: 'fa-users',
                    title: 'Community Impact',
                    getContent: (data) => `Current impact rate suggests ${new Intl.NumberFormat().format(Math.round(data.projected[data.projected.length - 1] * 1.2))} potential beneficiaries`
                }
            ],
            communities: [
                {
                    icon: 'fa-globe',
                    title: 'Community Expansion',
                    getContent: (data) => `Projected to impact ${data.projected[data.projected.length - 1]}+ communities by ${data.labels[data.labels.length - 1]}`
                },
                {
                    icon: 'fa-handshake',
                    title: 'Partnership Growth',
                    getContent: (data) => `Strategic partnerships could accelerate growth by ${Math.round(data.growthRate * 1.25)}%`
                },
                {
                    icon: 'fa-map-marker-alt',
                    title: 'Geographic Reach',
                    getContent: (data) => `Expansion potential identified in ${Math.round(data.projected[data.projected.length - 1] * 1.5)} new locations`
                }
            ],
            funding: [
                {
                    icon: 'fa-dollar-sign',
                    title: 'Funding Forecast',
                    getContent: (data) => `Potential to reach $${new Intl.NumberFormat().format(data.projected[data.projected.length - 1])} by ${data.labels[data.labels.length - 1]}`
                },
                {
                    icon: 'fa-chart-pie',
                    title: 'Resource Allocation',
                    getContent: (data) => `Optimal distribution could improve impact by ${Math.round(data.growthRate * 0.8)}%`
                },
                {
                    icon: 'fa-coins',
                    title: 'Investment Impact',
                    getContent: (data) => `Each $1 invested generates $${((data.projected[data.projected.length - 1] / data.current[0]) * 0.1).toFixed(2)} in social value`
                }
            ]
        };
    }

    generateInitialData() {
        const data = {};
        Object.keys(this.presetValues).forEach(metric => {
            const preset = this.presetValues[metric];
            data[metric] = {
                yearly: this.generateDataSet(preset, 5, 12),
                quarterly: this.generateDataSet(preset, 4, 3),
                monthly: this.generateDataSet(preset, 6, 1)
            };
        });
        return data;
    }

    generateDataSet(preset, points, monthsPerPoint) {
        const current = [];
        const projected = [];
        const labels = [];
        
        let baseValue = preset.base;
        for (let i = 0; i < points; i++) {
            current.push(Math.round(baseValue));
            projected.push(Math.round(baseValue * preset.growth));
            
            if (monthsPerPoint === 12) {
                labels.push(String(2024 + i));
            } else if (monthsPerPoint === 3) {
                labels.push(`Q${i + 1}`);
            } else {
                const date = new Date(2024, i, 1);
                labels.push(date.toLocaleString('default', { month: 'short' }));
            }
            
            baseValue *= preset.growth;
        }
        
        return {
            labels,
            current,
            projected,
            growthRate: Math.round((preset.growth - 1) * 100),
            confidence: preset.confidence
        };
    }

    init() {
        this.initChart();
        this.initControls();
        this.updateChart();
        this.updateMetricsDisplay();
        this.startRealTimeUpdates();
        this.initResponsiveLayout();
        
        // Initial load animation
        this.animateEntry();
    }

    animateEntry() {
        const elements = document.querySelectorAll('.predictor-wrapper > *');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initChart() {
        const ctx = document.getElementById('impactChart').getContext('2d');
        Chart.defaults.font.family = "'Inter', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif'";
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: this.getChartData(),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#666',
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: (context) => {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                label += new Intl.NumberFormat().format(context.parsed.y);
                                return label;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: value => new Intl.NumberFormat().format(value),
                            font: {
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            }
        });
    }

    getChartData() {
        const dataset = this.data[this.currentMetric][this.currentPeriod];
        const gradientCurrent = this.chart?.ctx.createLinearGradient(0, 0, 0, 400);
        const gradientProjected = this.chart?.ctx.createLinearGradient(0, 0, 0, 400);
        
        if (gradientCurrent && gradientProjected) {
            gradientCurrent.addColorStop(0, 'rgba(33, 150, 243, 0.4)');
            gradientCurrent.addColorStop(1, 'rgba(33, 150, 243, 0)');
            
            gradientProjected.addColorStop(0, 'rgba(76, 175, 80, 0.4)');
            gradientProjected.addColorStop(1, 'rgba(76, 175, 80, 0)');
        }

        return {
            labels: dataset.labels,
            datasets: [
                {
                    label: 'Projected Impact',
                    data: dataset.projected,
                    borderColor: '#4CAF50',
                    backgroundColor: gradientProjected || 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#4CAF50',
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Current Impact',
                    data: dataset.current,
                    borderColor: '#2196F3',
                    backgroundColor: gradientCurrent || 'rgba(33, 150, 243, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#2196F3',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        };
    }

    initControls() {
        document.querySelectorAll('[data-period]').forEach(button => {
            button.addEventListener('click', () => {
                if (this.animationInProgress) return;
                
                document.querySelectorAll('[data-period]').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.animationInProgress = true;
                this.currentPeriod = button.dataset.period;
                
                // Animate chart update
                this.chart.data.datasets.forEach((dataset, index) => {
                    const newData = this.getChartData().datasets[index].data;
                    dataset.data = newData;
                });
                
                this.chart.update('none');
                this.updateMetrics();
                
                setTimeout(() => {
                    this.animationInProgress = false;
                }, 1000);
            });
        });

        const metricSelect = document.getElementById('metricSelect');
        metricSelect.addEventListener('change', (e) => {
            if (this.animationInProgress) return;
            
            this.animationInProgress = true;
            this.currentMetric = e.target.value;
            
            // Fade out current content
            const container = document.querySelector('.predictor-wrapper');
            container.style.opacity = '0.5';
            
            setTimeout(() => {
                this.updateChart();
                this.updateInsights();
                
                // Fade in new content
                container.style.opacity = '1';
                this.animationInProgress = false;
            }, 300);
        });
    }

    updateChart() {
        const newData = this.getChartData();
        this.chart.data = newData;
        this.chart.update('none');
        this.updateMetrics();
    }

    updateMetrics() {
        const dataset = this.data[this.currentMetric][this.currentPeriod];
        const current = dataset.current[dataset.current.length - 1];
        const projected = dataset.projected[dataset.projected.length - 1];
        const growth = dataset.growthRate;
        const confidence = dataset.confidence;
        
        this.animateValue('currentBeneficiaries', current, 1500);
        this.animateValue('projectedGrowth', growth, 1500, true);
        this.animateValue('confidenceScore', confidence, 1500, true);
    }

    animateValue(elementId, endValue, duration, isPercentage = false) {
        const element = document.getElementById(elementId);
        const startValue = parseInt(element.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const range = endValue - startValue;
        const minTimer = 50;
        let stepTime = Math.abs(Math.floor(duration / range));
        stepTime = Math.max(stepTime, minTimer);
        
        let current = startValue;
        const step = range / (duration / minTimer);
        
        const timer = setInterval(() => {
            current += step;
            if (current < endValue) {
                element.textContent = isPercentage ? 
                    `${current.toFixed(1)}%` : 
                    new Intl.NumberFormat().format(Math.round(current));
                requestAnimationFrame(step);
            } else {
                element.textContent = isPercentage ? 
                    `${endValue.toFixed(1)}%` : 
                    new Intl.NumberFormat().format(Math.round(endValue));
                clearInterval(timer);
            }
        }, stepTime);
    }

    updateInsights() {
        const insightsContainer = document.getElementById('aiInsights');
        const currentDataset = this.data[this.currentMetric][this.currentPeriod];
        const currentInsights = this.insights[this.currentMetric];
        
        // Clear current insights with fade-out
        insightsContainer.style.opacity = '0';
        
        setTimeout(() => {
            insightsContainer.innerHTML = '';
            
            // Add new insights with animation
            currentInsights.forEach((insight, index) => {
                const card = document.createElement('div');
                card.className = 'insight-card';
                card.style.animationDelay = `${index * 200}ms`;
                
                card.innerHTML = `
                    <div class="insight-header">
                        <i class="fas ${insight.icon}"></i>
                        <span class="insight-date">Updated ${this.getRandomTime()}</span>
                    </div>
                    <h4>${insight.title}</h4>
                    <p>${insight.getContent(currentDataset)}</p>
                `;
                
                insightsContainer.appendChild(card);
            });
            
            // Fade in new insights
            insightsContainer.style.opacity = '1';
        }, 300);
    }

    startRealTimeUpdates() {
        // Update insights every 30 seconds
        setInterval(() => {
            this.updateInsights();
        }, 30000);

        // Simulate real-time data updates every 5 minutes
        setInterval(() => {
            this.simulateDataUpdate();
        }, 300000);
    }

    simulateDataUpdate() {
        const variation = 0.05; // 5% variation
        Object.keys(this.data).forEach(metric => {
            Object.keys(this.data[metric]).forEach(period => {
                this.data[metric][period].current = this.data[metric][period].current.map(value => {
                    const change = value * (1 + (Math.random() * variation * 2 - variation));
                    return Math.round(change);
                });
            });
        });
        this.updateChart();
    }

    initResponsiveLayout() {
        const updateLayout = () => {
            const wrapper = document.querySelector('.predictor-wrapper');
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                wrapper.classList.add('mobile-layout');
            } else {
                wrapper.classList.remove('mobile-layout');
            }
        };

        window.addEventListener('resize', updateLayout);
        updateLayout();
    }

    getRandomTime() {
        const times = ['just now', '1 min ago', '2 mins ago', '5 mins ago'];
        return times[Math.floor(Math.random() * times.length)];
    }

    updateMetricsDisplay() {
        const period = this.currentPeriod;
        const metrics = ['beneficiaries', 'communities', 'funding'];
        
        metrics.forEach(metric => {
            const data = this.data[metric][period];
            const currentValue = data.current[data.current.length - 1];
            const previousValue = data.current[data.current.length - 2] || data.current[0];
            const growthRate = ((currentValue - previousValue) / previousValue) * 100;
            
            // Update value
            const valueElement = document.getElementById(`${metric}-value`);
            if (valueElement) {
                this.animateValue(valueElement, currentValue, this.formatters[metric]);
            }
            
            // Update trend
            const trendElement = document.getElementById(`${metric}-trend`);
            if (trendElement) {
                const trendArrow = trendElement.previousElementSibling;
                trendElement.textContent = `${Math.abs(growthRate).toFixed(1)}%`;
                
                if (growthRate > 0) {
                    trendElement.style.color = '#4CAF50';
                    trendArrow.innerHTML = '<i class="fas fa-arrow-up"></i>';
                } else {
                    trendElement.style.color = '#f44336';
                    trendArrow.innerHTML = '<i class="fas fa-arrow-down"></i>';
                }
            }
        });
    }

    animateValue(element, endValue, formatter) {
        const startValue = parseInt(element.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const duration = 1000;
        const startTime = performance.now();
        
        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.round(startValue + (endValue - startValue) * easeOutQuart);
            
            element.textContent = formatter(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };
        
        requestAnimationFrame(updateValue);
    }

    initControls() {
        // Time period selection
        document.querySelectorAll('.time-period-selection .btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.time-period-selection .btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentPeriod = btn.dataset.period;
                this.updateChart();
                this.updateMetricsDisplay();
            });
        });
    }

    startRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.updateInterval = setInterval(() => {
            if (!document.hidden && !this.animationInProgress) {
                this.simulateDataUpdate();
                this.updateMetricsDisplay();
            }
        }, 30000);
    }
}

// Initialize Impact Predictor
document.addEventListener('DOMContentLoaded', function() {
    const predictor = new ImpactPredictor();
    predictor.init();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            },
            { threshold: 0.5 }
        );
        
        observer.observe(counter);
    });
}

// Newsletter Personalization
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const tags = document.querySelectorAll('.tag input');
    
    tags.forEach(tag => {
        tag.addEventListener('change', () => {
            tag.parentElement.classList.toggle('active');
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedInterests = Array.from(tags)
            .filter(tag => tag.checked)
            .map(tag => tag.value);
            
        // Here you would typically send this to your backend
        console.log('Selected interests:', selectedInterests);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'Thank you for subscribing! We\'ll send you personalized updates.';
        form.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
            form.reset();
        }, 3000);
    });
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function() {
    initCounters();
    initNewsletter();
});

// Impact Predictor Configuration
const impactConfig = {
    metrics: {
        beneficiaries: {
            label: 'Beneficiaries',
            current: 150000,
            growth: 25,
            confidence: 92,
            format: (value) => value.toLocaleString(),
            icon: 'fa-users',
            color: '#2196F3'
        },
        communities: {
            label: 'Communities',
            current: 450,
            growth: 15,
            confidence: 88,
            format: (value) => value.toLocaleString(),
            icon: 'fa-globe',
            color: '#4CAF50'
        },
        funding: {
            label: 'Funding (USD)',
            current: 5000000,
            growth: 30,
            confidence: 85,
            format: (value) => `$${(value/1000000).toFixed(1)}M`,
            icon: 'fa-dollar-sign',
            color: '#FFC107'
        }
    },
    periods: {
        yearly: {
            label: 'Year',
            dataPoints: 5,
            growthMultiplier: 1,
            format: (i) => `${new Date().getFullYear() - (5 - i)}`
        },
        quarterly: {
            label: 'Quarter',
            dataPoints: 8,
            growthMultiplier: 0.25,
            format: (i) => `Q${(i % 4) + 1}`
        },
        monthly: {
            label: 'Month',
            dataPoints: 12,
            growthMultiplier: 0.083,
            format: (i) => new Date(0, i).toLocaleString('default', { month: 'short' })
        }
    }
};

// Initialize Impact Chart with optimized rendering
let impactChart;
const initImpactChart = () => {
    const ctx = document.getElementById('impactChart').getContext('2d');
    
    // Create gradient for projected data
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(76, 175, 80, 0.15)');
    gradientFill.addColorStop(1, 'rgba(76, 175, 80, 0)');

    impactChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Current',
                    data: [],
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2196F3',
                    pointBorderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Projected',
                    data: [],
                    borderColor: '#4CAF50',
                    backgroundColor: gradientFill,
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#4CAF50',
                    pointBorderWidth: 2,
                    tension: 0.4,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    padding: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const metric = document.getElementById('metricSelect').value;
                            const value = context.raw;
                            const label = context.dataset.label;
                            return `${label}: ${impactConfig.metrics[metric].format(value)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f0f0f0'
                    },
                    ticks: {
                        color: '#666',
                        callback: function(value) {
                            const metric = document.getElementById('metricSelect').value;
                            return impactConfig.metrics[metric].format(value);
                        }
                    }
                }
            }
        }
    });
};

// Generate Impact Data with smooth transitions
const generateImpactData = (metric, period) => {
    const config = impactConfig.metrics[metric];
    const periodConfig = impactConfig.periods[period];
    const data = [];
    const labels = [];

    // Generate historical data with realistic variations
    for (let i = 0; i < periodConfig.dataPoints; i++) {
        const progress = i / (periodConfig.dataPoints - 1);
        const randomVariation = 1 + (Math.random() - 0.5) * 0.1;
        const value = config.current * (0.5 + progress * 0.5) * randomVariation;
        data.push(Math.round(value));
        labels.push(periodConfig.format(i));
    }

    // Generate projected data with confidence-based variations
    const projectedData = [...data];
    const growthRate = config.growth / 100 * periodConfig.growthMultiplier;
    const confidenceVariation = (100 - config.confidence) / 100;
    
    for (let i = 0; i < 5; i++) {
        const lastValue = projectedData[projectedData.length - 1];
        const randomVariation = 1 + (Math.random() - 0.5) * confidenceVariation;
        const newValue = lastValue * (1 + growthRate) * randomVariation;
        projectedData.push(Math.round(newValue));
        labels.push(periodConfig.format(periodConfig.dataPoints + i));
    }

    return {
        labels,
        current: data,
        projected: projectedData
    };
};

// Update Impact Metrics with animations
const updateImpactMetrics = (metric) => {
    const config = impactConfig.metrics[metric];
    const currentImpact = document.getElementById('currentImpact');
    const currentMetricLabel = document.getElementById('currentMetricLabel');
    const projectedGrowth = document.getElementById('projectedGrowth');
    const confidenceFill = document.getElementById('confidenceFill');
    const confidenceValue = document.getElementById('confidenceValue');

    // Animate current impact value
    const startValue = parseInt(currentImpact.textContent.replace(/[^0-9]/g, '')) || 0;
    const endValue = config.current;
    animateValue(currentImpact, startValue, endValue, 1000, config.format);

    // Update other elements
    currentMetricLabel.textContent = config.label;
    projectedGrowth.textContent = `+${config.growth}%`;

    // Animate confidence bar
    confidenceFill.style.transition = 'width 1s ease-out';
    confidenceFill.style.width = `${config.confidence}%`;
    confidenceValue.textContent = `${config.confidence}%`;
};

// Generate AI Insights with enhanced animations
const generateInsights = (metric, period) => {
    const config = impactConfig.metrics[metric];
    const periodConfig = impactConfig.periods[period];
    const insights = [
        {
            icon: 'fa-chart-line',
            title: 'Growth Trajectory',
            content: `Projected ${config.growth}% growth in ${config.label.toLowerCase()} over the next ${periodConfig.label.toLowerCase()}, with ${config.confidence}% confidence.`
        },
        {
            icon: 'fa-bullseye',
            title: 'Impact Target',
            content: `On track to reach ${config.format(config.current * (1 + config.growth/100))} ${config.label.toLowerCase()} by next ${periodConfig.label.toLowerCase()}.`
        },
        {
            icon: 'fa-lightbulb',
            title: 'AI Recommendation',
            content: generateRecommendation(metric, config)
        }
    ];

    const container = document.getElementById('aiInsights');
    container.innerHTML = '';

    insights.forEach((insight, index) => {
        const card = document.createElement('div');
        card.className = 'insight-card';
        card.style.animationDelay = `${index * 200}ms`;
        
        card.innerHTML = `
            <div class="insight-header">
                <i class="fas ${insight.icon}"></i>
                <span class="insight-date">Updated ${new Date().toLocaleDateString()}</span>
            </div>
            <h4>${insight.title}</h4>
            <p>${insight.content}</p>
        `;
        
        container.appendChild(card);
    });
};

// Generate contextual recommendations
const generateRecommendation = (metric, config) => {
    const recommendations = {
        beneficiaries: [
            'Expand outreach programs in underserved areas',
            'Implement targeted community engagement initiatives',
            'Develop new partnership opportunities'
        ],
        communities: [
            'Focus on sustainable community development',
            'Strengthen local leadership programs',
            'Enhance cross-community collaboration'
        ],
        funding: [
            'Diversify funding sources through new partnerships',
            'Optimize resource allocation across programs',
            'Explore innovative fundraising strategies'
        ]
    };

    const options = recommendations[metric];
    return options[Math.floor(Math.random() * options.length)];
};

// Utility function for smooth number animations
const animateValue = (element, start, end, duration, formatter) => {
    const range = end - start;
    const startTime = performance.now();
    
    const updateValue = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (range * easeOutQuart));
        
        element.textContent = formatter(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    };
    
    requestAnimationFrame(updateValue);
};

// Initialize Impact Predictor with optimized event handling
const initImpactPredictor = () => {
    const metricSelect = document.getElementById('metricSelect');
    const periodButtons = document.querySelectorAll('.time-range-group .btn');
    
    // Initialize Chart
    initImpactChart();
    
    // Initial update with animation
    setTimeout(() => {
        updateChart(metricSelect.value, 'yearly');
    }, 500);
    
    // Event Listeners with debouncing
    let updateTimeout;
    metricSelect.addEventListener('change', (e) => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            updateChart(e.target.value, getActivePeriod());
        }, 100);
    });
    
    periodButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) return;
            
            periodButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(() => {
                updateChart(metricSelect.value, e.target.dataset.period);
            }, 100);
        });
    });

    // Real-time updates with smooth transitions
    setInterval(() => {
        const metric = metricSelect.value;
        const randomChange = (Math.random() - 0.5) * 0.02;
        impactConfig.metrics[metric].current *= (1 + randomChange);
        updateChart(metric, getActivePeriod(), true);
    }, 30000);
};

// Update Chart with optimized animations
const updateChart = (metric, period, isRealTimeUpdate = false) => {
    const data = generateImpactData(metric, period);
    
    // Update chart with smooth animation
    impactChart.data.labels = data.labels;
    impactChart.data.datasets[0].data = data.current;
    impactChart.data.datasets[1].data = data.projected;
    
    // Adjust animation duration based on update type
    impactChart.options.animation.duration = isRealTimeUpdate ? 500 : 1000;
    impactChart.update();
    
    // Update metrics and insights
    updateImpactMetrics(metric);
    if (!isRealTimeUpdate) {
        generateInsights(metric, period);
    }
};

// Helper function to get active period
const getActivePeriod = () => {
    const activeButton = document.querySelector('.time-range-group .btn.active');
    return activeButton.dataset.period;
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initImpactPredictor();
});

// GitHub Feed Integration
async function loadGitHubFeed() {
    const username = 'YOUR_GITHUB_USERNAME'; // Replace with your GitHub username
    const feedContainer = document.getElementById('github-feed');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events/public`);
        const events = await response.json();
        
        const activityHTML = events.slice(0, 5).map(event => {
            const date = new Date(event.created_at).toLocaleDateString();
            let content = '';
            
            switch(event.type) {
                case 'PushEvent':
                    content = `Pushed to ${event.repo.name}`;
                    break;
                case 'CreateEvent':
                    content = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                    break;
                case 'IssuesEvent':
                    content = `${event.payload.action} issue in ${event.repo.name}`;
                    break;
                default:
                    content = `Activity in ${event.repo.name}`;
            }
            
            return `
                <div class="github-activity">
                    <div class="activity-date">${date}</div>
                    <div class="activity-content">
                        <i class="fab fa-github"></i>
                        ${content}
                    </div>
                </div>
            `;
        }).join('');
        
        feedContainer.innerHTML = activityHTML;
    } catch (error) {
        feedContainer.innerHTML = '<p>Failed to load GitHub activity</p>';
        console.error('Error loading GitHub feed:', error);
    }
}

// Initialize GitHub feed
document.addEventListener('DOMContentLoaded', () => {
    loadGitHubFeed();
    // Refresh GitHub feed every 5 minutes
    setInterval(loadGitHubFeed, 300000);
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Hero Slider Configuration
const heroSlider = new Swiper('.hero-slider', {
    speed: 300, // Transition speed
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    on: {
        slideChangeTransitionStart: function () {
            const activeSlide = this.slides[this.activeIndex];
            const elements = activeSlide.querySelectorAll('.animate-up');
            elements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight;
                el.style.animation = null;
            });
        }
    }
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const options = {
    threshold: 1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        }
    });
}, options);

counters.forEach(counter => observer.observe(counter));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.navbar-toggler');
const navbar = document.querySelector('.navbar-collapse');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });
}

// Initialize Charts
const ctx = document.getElementById('impactChart');
if (ctx) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'People Impacted',
                data: [1000, 2500, 3800, 4500, 5000],
                borderColor: '#2196f3',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

const growthCtx = document.getElementById('growthChart');
if (growthCtx) {
    new Chart(growthCtx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Growth Rate',
                data: [15, 25, 30, 35],
                backgroundColor: '#4caf50'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

const engagementCtx = document.getElementById('engagementChart');
if (engagementCtx) {
    new Chart(engagementCtx, {
        type: 'doughnut',
        data: {
            labels: ['Youth Programs', 'Community Projects', 'Environmental Initiatives', 'Rights Advocacy'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: ['#2196f3', '#4caf50', '#ffc107', '#f44336']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Gallery Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 0);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
