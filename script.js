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

// Form Popup + Submission Logic
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

// Replace original handleServiceRequest
function handleServiceRequest(serviceName) {
    showRequestForm(serviceName);
}

// keep rest same below...
// (no changes needed in rendering or nav setup logic)

// You can optionally move styles for popup form into your CSS
