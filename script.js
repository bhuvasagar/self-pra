// Global variables
let currentSlideIndex = 0;
let slideInterval;
let userRegistered = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    checkUserRegistration();
    setupEventListeners();
});

// Hero Slider Functions
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Start auto-sliding
    slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval on manual navigation
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Add click events to navigation arrows
    document.querySelector('.nav-prev').addEventListener('click', () => {
        previousSlide();
        resetInterval();
    });
    
    document.querySelector('.nav-next').addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Add click events to indicators
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
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
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
        // Show registration prompt after 2 seconds
        setTimeout(() => {
            if (!userRegistered) {
                showModal();
            }
        }, 2000);
    }
}
const servicesData = [
    {
        title: "દાખલો",
        titleEn: "Certificates",
        description: "તમામ પ્રકારના સરકારી દાખલો મેળવો",
        icon: "file-text",
        subServices: [
            { name: "આવકનું દાખલો", nameEn: "Income Certificate", description: "આવકના પુરાવા માટે" },
            { name: "જાતિનું દાખલો", nameEn: "Caste Certificate", description: "જાતિના પુરાવા માટે" },
            { name: "જન્મ દાખલો", nameEn: "Birth Certificate", description: "જન્મના પુરાવા માટે" },
            { name: "મૃત્યુ દાખલો", nameEn: "Death Certificate", description: "મૃત્યુના પુરાવા માટે" },
            { name: "બિન અનામત દાખલા", nameEn: "Non-reserved instance", description: "બિન અનામત દાખલા માટે" },
            { name: "૧૦% (E.W.S.)અનામત વગના દાખલા", nameEn: "10% (E.W.S.) Reservation Scheme Example", description: "૧૦% (E.W.S.)અનામત વગના દાખલા માટે" },
            { name: "ડોમીસાઈલ સટી", nameEn: "Domicile Certificate", description: "ડોમીસાઈલ સટી માટે" },
            { name: "નોન ક્રિમીલેયર સટી", nameEn: "Non-creamy layer Certificate", description: "નોન ક્રિમીલેયર સટી માટે" },
            { name: "સીનીયર સીટીઝન પ્રમાણપત્ર ", nameEn: "Senior Citizen Certificate", description: "સીનીયર સીટીઝન પ્રમાણપત્ર માટે" },
            { name: "વિચરતી-વિમુક્ત જાતિ દાખલો ", nameEn: "NT-DNT Certificate", description: "વિચરતી-વિમુક્ત જાતિ દાખલો માટે" },
        ]
    },
    {
        title: "સહાય",
        titleEn: "Assistance Services",
        description: "સહાય સંબંધિત તમામ સેવાઓ",
        icon: "credit-card",
        subServices: [
            { name: "વિધવા સહાય માટે", nameEn: "For widow assistance", description: "વિધવા સહાય માટે અરજી" },
            { name: "વ્રુધ્ધ પેન્સન માટે", nameEn: "pension assistance", description: "વ્રુધ્ધ સહાય માટે અરજી" },
            { name: "વ્હાલી દીકરી સહાય", nameEn: "Dear Daughter", description: "વ્હાલી દીકરી સહાય માટે અરજી" },
            { name: "કુવરબાઈ મામેરુ સહાય", nameEn: "Kuvarbai Mameru", description: "કુવરબાઈ મામેરુ સહાય માટે અરજી" },
        ]
    },
    {
        title: "ઓનલાઇન સેવાઓ",
        titleEn: "Online Services",
        description: "તમામ પ્રકારના સરકારી ઓનલાઇન મેળવો",
        icon: "settings",
        subServices: [
            { name: "પાસપોર્ટ સેવાઓ", nameEn: "Passport Services", description: "પાસપોર્ટ અરજી અને સેવાઓ" },
            { name: "વોટર આઈડી", nameEn: "Voter ID", description: "મતદાર ઓળખ કાર્ડ સેવાઓ" },
            { name: "ઇ -શ્રમ કાર્ડ", nameEn: "E-shram card", description: "મતદાર ઓળખ કાર્ડ સેવાઓ" },
            { name: "ઉદ્યમ આધાર", nameEn: "udyam aadhar", description: "ઉદ્યમ આધાર માટના પરાવા ની યાદી" },
        ]
    },

    {
        title: "અન્ય સેવાઓ",
        titleEn: "Other Services",
        description: "તમામ પ્રકારના સરકારી અન્ય મેળવો",
        icon: "settings",
        subServices: [
            { name: "લાઇટ કનેક્શન", nameEn: "Light connection", description: "પાસપોર્ટ અરજી અને સેવાઓ" },
            { name: "પાન કાર્ડ - નવું અને સુધારણા", nameEn: "Pan Card -New and Correction", description: "પાન કાર્ડ - નવું અને સુધારણા સેવાઓ" },
            { name: "ભાડા કરાર", nameEn: "Rent Agreement", description: "ભાડા કરાર સેવાઓ" },
            { name: "રેશન કાર્ડ", nameEn: "Ration Card", description: "રેશન કાર્ડ અરજી અને સેવાઓ" },
        ]
    }
];

const documentRequirements = {
    "આવકનું દાખલો": [
        "અરજદારનો ફોટો",
        "આધાર કાર્ડ (રેશન કાર્ડમાં નામ હોય તો પુષ્ટિ)",
        "ચૂંટણી કાર્ડ",
        "રેશન કાર્ડ",
        "લાઇટ બિલ",
        "વેરાબીલ"
    ],
    "જાતિનું દાખલો": [
        "આધાર કાર્ડ",
        "પિતાનું દાખલો",
        "જાતિના પુરાવા તરીકે કોઈ સરકારી દસ્તાવેજ",
        "રેશન કાર્ડ",
        "ચૂંટણી કાર્ડ"
    ],
    "જન્મ દાખલો": [
        "હોસ્પિટલ સર્ટિફિકેટ અથવા નર્સિંગ હોમ રેકોર્ડ",
        "માતા-પિતાનો આધાર કાર્ડ",
        "જુના દાખલા / સ્કૂલના દાખલાની નકલ",
        "રેશન કાર્ડ"
    ],
    "મૃત્યુ દાખલો": [
        "મૃતકનું હોસ્પિટલ/ડોક્ટરનું પ્રમાણપત્ર",
        "મૃતકના આધાર કાર્ડની નકલ",
        "રેશન કાર્ડ (જોઇએ તો)",
        "મૃત્યુ સ્થળનું સરનામું"
    ],
    "બિન અનામત દાખલા": [
        "અરજદારનો ફોટો",
        "આધાર કાર્ડ (અરજદાર અને પિતાનું)",
        "અરજદારનું વતનની સર્ટિ. અથવા બોનાફાઇડ",
        "અરજદારના પિતા/કાકા/ફોઈમાંથી કોઈ એકનું વતનની સર્ટિ.",
        "રેશન કાર્ડ",
        "લાઇટ બિલ",
        "વેરાબીલ"
    ],
    "૧૦% (E.W.S.)અનામત વગના દાખલા": [
        "અરજદારનો ફોટો અને પિતાનો ફોટો",
        "આધાર કાર્ડ અને ચૂંટણી કાર્ડ (અરજદાર અને પિતાનું)",
        "અરજદારનું જિલ્લા વતનની સર્ટિ. અથવા બોનાફાઇડ",
        "અરજદારના પિતા/કાકા/ફોઈમાંથી કોઈ એકનું વતનની સર્ટિ.",
        "આવકનો દાખલો",
        "રેશન કાર્ડ",
        "લાઇટ બિલ",
        "વેરાબીલ",
        "બિન અનામત વતનનો દાખલો",
        "ખેતીની આવક હોય તો 7/12/8આ પિતાનું"
    ],
    "ડોમીસાઈલ સટી": [
        "અરજદાર અને પિતાનો ફોટો",
        "આધાર કાર્ડ અને ચૂંટણી કાર્ડ",
        "અરજદારનું વતનની સર્ટિ. અથવા બોનાફાઇડ",
        "જન્મનો દાખલો",
        "ધોરણ 1 થી તમામ માર્કશીટ",
        "આવકનો દાખલો",
        "રેશન કાર્ડ",
        "લાઇટ બિલ",
        "વેરાબીલ",
        "પોલીસ સ્ટેશનનો દાખલો",
        "તલાટીની રહેઠાણની સર્ટિ. (10 વર્ષ)",
        "સોગંદનામું"
    ],
    "નોન ક્રિમીલેયર સટી": [
        "અરજદારનો ફોટો",
        "પિતાનો આધાર કાર્ડ",
        "જાતિનો દાખલો",
        "આવકના પ્રમાણપત્ર (3 વર્ષ)",
        "રેશન કાર્ડ",
        "વતનની સર્ટિ.",
        "લાઈટ બિલ",
        "ચૂંટણી કાર્ડ"
    ],
    "સીનીયર સીટીઝન પ્રમાણપત્ર": [
        "ફોટો",
        "આધાર કાર્ડ",
        "ઉંમરના પુરાવા તરીકે જન્મનો દાખલો અથવા સ્કૂલ લિવિંગ"
    ],
    "વિચરતી-વિમુક્ત જાતિ દાખલો": [
        "જાતિનો દાખલો",
        "વતન દાખલો",
        "આવક દાખલો",
        "રેશન કાર્ડ",
        "ફોટો",
        "આધાર કાર્ડ"
    ],
    "વિધવા સહાય માટે": [
        "મૃત્યુ દાખલો (પતિનો)",
        "આધાર કાર્ડ",
        "જાતિ દાખલો (જોઇએ તો)",
        "રેશન કાર્ડ",
        "ફોટો"
    ],
    "વ્રુધ્ધ પેન્સન માટે": [
        "ઉંમરના પુરાવા (જન્મ દાખલો, સ્કૂલ લિવિંગ)",
        "આધાર કાર્ડ",
        "રેશન કાર્ડ",
        "ફોટો"
    ],
    "વ્હાલી દીકરી સહાય": [
        "જન્મ દાખલો (દીકરીનો)",
        "આધાર કાર્ડ (પિતા/માતા)",
        "બેંક પાસબુક",
        "સ્કૂલ દાખલાની નકલ",
        "ફોટો"
    ],
    "કુવરબાઈ મામેરુ સહાય": [
        "નિકાહ/લગ્નનું સર્ટિફિકેટ",
        "વધુમાં ઘરના સભ્યોના આધાર કાર્ડ",
        "આવક દાખલો",
        "રેશન કાર્ડ",
        "ફોટો"
    ],
    "પાસપોર્ટ સેવાઓ": [
        "આધાર કાર્ડ",
        "ચૂંટણી કાર્ડ",
        "પાન કાર્ડ",
        "વતનની સર્ટિ. અથવા જન્મ દાખલો",
        "લાસ્ટ માર્કશીટ",
        "મેરેજ સર્ટિ. (હોય તો)",
        "મોબાઈલ નંબર",
        "ઈમેલ ID",
        "ઈમરજન્સી કોન્ટેક્ટ નામ અને નંબર"
    ],
    "વોટર આઈડી": [
        "આધાર કાર્ડ",
        "રેશન કાર્ડ",
        "વતનની માહિતી",
        "ફોટો"
    ],
    "ઇ -શ્રમ કાર્ડ": [
        "આધાર કાર્ડ",
        "મોબાઇલ નંબર",
        "બેંક એકાઉન્ટ વિગતો",
        "ફોટો"
    ],
    "ઉદ્યમ આધાર": [
        "આધાર કાર્ડ",
        "મોબાઈલ નંબર",
        "ઈમેલ ID",
        "બિઝનેસનું નામ અને સરનામું"
    ],
    "લાઇટ કનેક્શન": [
        "ભાડા કરાર/માલિકી દસ્તાવેજ",
        "ઓલ્ડ બિલ (જો છે તો)",
        "ઓનલાઈન ફોર્મ",
        "ફોટો"
    ],
    "પાન કાર્ડ - નવું અને સુધારણા": [
        "2 ફોટા",
        "આધાર કાર્ડ",
        "પિતાનું સંપૂર્ણ નામ",
        "મોબાઈલ નંબર",
        "ઈમેલ ID"
    ],
    "ભાડા કરાર": [
        "માલિકનું પાન કાર્ડ અને આધાર કાર્ડ",
        "ભાડેથી રહેનારના આધાર કાર્ડ",
        "સ્થળની વિગતો",
        "રજીસ્ટ્રેશન ફોર્મ"
    ],
    "રેશન કાર્ડ": [
        "મોબાઈલ નંબર",
        "આધાર કાર્ડ (સૌના)",
        "જાતિ દાખલો",
        "આવક દાખલો",
        "લાઇટ બિલ",
        "ફોટો"
    ]
};


document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
    setupNavigation();
    renderServices();
    showPage('home');
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

function handleServiceRequest(serviceName) {
    const whatsappNumber = "919898329056";

    // KEY MAPPING IF EXACT NOT FOUND
    const matchingKey = Object.keys(documentRequirements).find(key => key.includes(serviceName)) || serviceName;

    let documents = documentRequirements[matchingKey];

    if (!documents) {
        documents = ["દસ્તાવેજોની માહિતી ઉપલબ્ધ નથી."];
    }

    const message = `📌 *${serviceName}* માટે અરજી કરવાની ઇચ્છા છે.\n\n📝 જરૂરી દસ્તાવેજો:\n${documents.map((doc, i) => `${i + 1}. ${doc}`).join('\n')}\n\n📍Pragalbh Associates\n📞 9898329056`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}


function submitContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
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

