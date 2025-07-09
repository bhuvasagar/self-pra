// Global variables
let currentSlideIndex = 0;
let slideInterval;
let userRegistered = false;

// Full services data
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
            { name: "૧૦% (E.W.S.)અનામત વગના દાખલા", nameEn: "10% (E.W.S.) Reservation Scheme Example", description: "૧૦% (E.W.S.)અનામત влияના દાખલા માટે" },
            { name: "ડોમીસાઈલ સર્ટી", nameEn: "Domicile Certificate", description: "ડોમીસાઈલ સર્ટી માટે" },
            { name: "નોન ક્રિમીલેયર સર્ટી", nameEn: "Non-creamy layer Certificate", description: "નોન ક્રિમીલેયર સર્ટી માટે" },
            { name: "સીનીયર સીટીઝન પ્રમાણપત્ર ", nameEn: "Senior Citizen Certificate", description: "સીનીયર સીટીઝન પ્રમાણપત્ર માટે" },
            { name: "વિચરતી-વિમુક્ત જાતિ દાખલો ", nameEn: "NT-DNT Certificate", description: "વિચરતી-વિમુક્ત જાતિ દાખલો માટે" }
        ]
    },
    {
        title: "સહાય",
        titleEn: "Assistance Services",
        description: "સહાય સંબંધિત તમામ સેવાઓ",
        icon: "credit-card",
        subServices: [
            { name: "વિધવા સહાય માટે", nameEn: "For widow assistance", description: "વિધવા સહાય માટે" },
            { name: "વ્રુધ્ધ પેન્સન માટે", nameEn: "pension assistance", description: "વ્રુધ્ધ સહાય માટે" },
            { name: "વ્હાલી દીકરી સહાય", nameEn: "Dear Daughter", description: "વ્હાલી દીકરી સહાય માટે" },
            { name: "કુવરબાઈ મામેરુ સહાય", nameEn: "Kuvarbai Mameru", description: "કુવરબાઈ મામેરુ સહાય માટે" }
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
            { name: "ઉદ્યમ આધાર", nameEn: "udyam aadhar", description: "ઉદ્યમ આધાર માટના પરાવા ની યાદી" }
        ]
    },
    {
        title: "અન્ય સેવાઓ",
        titleEn: "Other Services",
        description: "તમામ પ્રકારના સરકારી અન્ય મેળવો",
        icon: "settings",
        subServices: [
            { name: "લાઇટ કનેક્શન", nameEn: "Light connection", description: "લાઇટ કનેક્શન" },
            { name: "પાન કાર્ડ - નવું અને સુધારણા", nameEn: "Pan Card -New and Correction", description: "પાન કાર્ડ - નવું અને સુધારણા સેવાઓ" },
            { name: "ભાડા કરાર", nameEn: "Rent Agreement", description: "ભાડા કરાર સેવાઓ" },
            { name: "રેશન કાર્ડ", nameEn: "Ration Card", description: "રેશન કાર્ડ અરજી અને સેવાઓ" },
            { name: "ભાગીદારી દસ્તાવેજ", nameEn: "PARTNARSHIP DEED", description: "ભાગીદારી દસ્તાવેજ" }
        ]
    }
];

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

// User Registration
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

// Form for WhatsApp Request
function showRequestForm(serviceName) {
    const formHtml = `
        <div class="form-overlay" id="form-overlay">
            <div class="form-popup">
                <h3>${serviceName} માટે અરજી કરો</h3>
                <form id="userRequestForm">
                    <label for="username">નામ:</label>
                    <input type="text" id="username" name="username" required>
                    <label for="usernumber">WhatsApp નંબર:</label>
                    <input type="tel" id="usernumber" name="usernumber" required pattern="[0-9]{10}" placeholder="10 અંક દાખલ કરો">
                    <button type="submit">મોકલો</button>
                    <button type="button" onclick="closeRequestForm()">બંધ કરો</button>
                </form>
            </div>
        </div>`;

    const formContainer = document.createElement('div');
    formContainer.innerHTML = formHtml;
    document.body.appendChild(formContainer);

    const form = document.getElementById("userRequestForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const number = form.usernumber.value.trim();
        const name = form.username.value.trim();
        sendDocumentsToWhatsapp(serviceName, number, name);
        closeRequestForm();
    });
}

function closeRequestForm() {
    const overlay = document.getElementById("form-overlay");
    if (overlay) overlay.remove();
}

function sendDocumentsToWhatsapp(serviceName, whatsappNumber, username = "") {
    const matchingKey = Object.keys(documentRequirements).find(key => key.includes(serviceName)) || serviceName;
    let documents = documentRequirements[matchingKey];

    if (!documents) {
        documents = ["દસ્તાવેજોની માહિતી ઉપલબ્ધ નથી."];
    }

    const message = `📌 *${serviceName}* માટે અરજી કરવી છે.
👤 નામ: ${username}
📱 વોટ્સએપ નંબર: ${whatsappNumber}

📝 જરૂરી દસ્તાવેજો:
${documents.map((doc, i) => `${i + 1}. ${doc}`).join('\n')}
\n📍Pragalbh Associates\n📞 9898329056`;

    const url = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function handleServiceRequest(serviceName) {
    showRequestForm(serviceName);
}
