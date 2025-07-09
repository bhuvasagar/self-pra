// Global variables
let currentSlideIndex = 0;
let slideInterval;
let userRegistered = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeSlider();
    checkUserRegistration();
    setupEventListeners();
    lucide.createIcons();
    setupNavigation();
    renderServices();
    showPage('home');
    checkUserAccessSource(); // ✅ NEW
});

// Hero Slider Functions
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    slideInterval = setInterval(nextSlide, 5000);

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    document.querySelector('.nav-prev').addEventListener('click', () => {
        previousSlide();
        resetInterval();
    });

    document.querySelector('.nav-next').addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide(index + 1);
            resetInterval();
        });
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// User Registration Functions
function checkUserRegistration() {
    const userData = localStorage.getItem('pragalbhUserData');
    if (userData) {
        userRegistered = true;
        showServices();
    } else {
        setTimeout(() => {
            if (!userRegistered) {
                showModal();
            }
        }, 2000);
    }
}

// ✅ NEW FUNCTION: Hide services if user didn't come via Apply button
function checkUserAccessSource() {
    const cameFromApp = localStorage.getItem('enteredFromApp');

    if (!cameFromApp) {
        const servicesPage = document.getElementById('services-grid');
        const homePage = document.getElementById('home-services-grid');

        if (servicesPage)
            servicesPage.innerHTML = '<p style="text-align:center;">માફ કરો, આપ પ્રમાણિત ઉપયોગકર્તા નથી.</p>';

        if (homePage)
            homePage.innerHTML = '<p style="text-align:center;">માફ કરો, સેવાઓ જોવા માટે અધિકૃત રીતે પ્રવેશ કરો.</p>';
    }
}

// ✅ Clear flag on page close/reload
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('enteredFromApp');
});

function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });
    navMenu.addEventListener('click', function () {
        navMenu.classList.remove('active');
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');
    window.location.hash = pageId;
}

function renderServices() {
    const servicesGrid = document.getElementById('services-grid');
    const homeServicesGrid = document.getElementById('home-services-grid');

    servicesData.forEach((service, index) => {
        const serviceCard = createServiceCard(service, index);
        servicesGrid.appendChild(serviceCard);

        if (homeServicesGrid) {
            const clonedCard = serviceCard.cloneNode(true);
            clonedCard.querySelector('.service-header').setAttribute('onclick', `toggleService(${index})`);
            clonedCard.querySelectorAll('.apply-button').forEach((btn, i) => {
                btn.setAttribute('onclick', `handleServiceRequest('${service.subServices[i].name}')`);
            });
            homeServicesGrid.appendChild(clonedCard);
        }
    });
    lucide.createIcons();
}

function createServiceCard(service, index) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.id = `service-${index}`;
    card.innerHTML = `
        <div class="service-header" onclick="toggleService(${index})">
            <div class="service-header-content">
                <div class="service-info">
                    <div class="service-icon">
                        <i data-lucide="${service.icon}"></i>
                    </div>
                    <div class="service-title">
                        <h3>${service.title}</h3>
                        <p>${service.titleEn}</p>
                    </div>
                </div>
                <i data-lucide="chevron-down" class="chevron"></i>
            </div>
            <div class="service-description">${service.description}</div>
        </div>
        <div class="service-content">
            <h4 class="sub-services-title">ઉપલબ્ધ સેવાઓ:</h4>
            ${service.subServices.map(subService => `
                <div class="sub-service-item">
                    <div class="sub-service-info">
                        <h4>${subService.name}</h4>
                        <p>${subService.nameEn}</p>
                        <span>${subService.description}</span>
                    </div>
                    <button class="apply-button" onclick="handleServiceRequest('${subService.name}')">
                        અરજી કરો
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    return card;
}

function toggleService(index) {
    const allCards = document.querySelectorAll('.service-card');
    allCards.forEach((card, i) => {
        if (i !== index) card.classList.remove('expanded');
    });
    const currentCard = document.getElementById(`service-${index}`);
    currentCard.classList.toggle('expanded');
    lucide.createIcons();
}

// ✅ Updated to store flag when user clicks apply
function handleServiceRequest(serviceName) {
    const whatsappNumber = "919898329056";

    localStorage.setItem('enteredFromApp', 'true'); // ✅ FLAG STORED

    const matchingKey = Object.keys(documentRequirements).find(key => key.includes(serviceName)) || serviceName;
    let documents = documentRequirements[matchingKey];

    if (!documents) {
        documents = ["દસ્તાવેજોની માહિતી ઉપલબ્ધ નથી."];
    }

    const message = `📌 *${serviceName}* માટે અરજી કરવી છે.\n\n📝 જરૂરી દસ્તાવેજો:\n${documents.map((doc, i) => `${i + 1}. ${doc}`).join('\n')}\n\n📍Pragalbh Associates\n📞 9898329056`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function submitContactForm(event) {
    event.preventDefault();
    alert('તમારો સંદેશ મોકલાયો છે! અમે જલ્દીથી સંપર્ક કરીશું.');
    event.target.reset();
}

window.addEventListener('hashchange', function () {
    const hash = window.location.hash.substring(1);
    showPage(hash || 'home');
});

window.addEventListener('load', function () {
    const hash = window.location.hash.substring(1);
    showPage(hash || 'home');
});
