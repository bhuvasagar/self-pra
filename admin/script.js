
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


const documentRequirements = {
    "આવકનું દાખલો": ["આધાર કાર્ડ (અરજદાર અને  રેશન કાર્ડ માં નામ હોય તે પુત્ર ના)", "રેશન કાર્ડ", "અરજદારનો ફોટો", "લાઇટબીલ", "વેરાબીલ", "ચુંટણી કાર્ડ"],

    "જાતિનું દાખલો": ["(૧) ફોટો અરજદાર નો અને (૧) ફોટો તેના પિતા નો", "આધાર કાર્ડ અને ચુટણી કાર્ડ (અરજદાર અને તેના પિતા નુ)", "અરજદાર નું  લિવિંગ સર્ટી અથવા બોનાફાઇડ", "અરજદાર ના પિતા,કાકા,ફોઈ,કોઈ એક નું લિવિંગ સર્ટી", "રેશન કાર્ડ", "લાઇટબીલ", "વેરાબીલ",],

    "જન્મ દાખલો": ["જન્મની તારીખનો પુરાવો", "માતાપિતાનું ઓળખપત્ર"],

    "મૃત્યુ દાખલો": ["મૃત્યુના હોસ્પિટલ દસ્તાવેજો", "ઓળખપત્ર"],

    "પાન કાર્ડ - નવું અને સુધારણા": ["(૨) ફોટો ", "આધાર કાર્ડ ", "પિતાનું આખું નામ", "મોબાઈલ નંબર", "ઈ મેઈલ ID ",],

    "વ્હાલી દીકરી સહાય": ["૧ – ફોટા દીકરીનો", "આધાર કાર્ડ દીકરી નું તથા માતા / પિતા નું", "દીકરી નો જન્મ નો દાખલો", "રેશન કાર્ડ ", "આવક નો દાખલો પિતાનો", "બેંક પાસબૂક  (S.B.I ./  B.O.B./  UNION / C.B.I)", "લાઇટબીલ", "લગ્ન નોંધ નું પ્રમાણપત્ર", "માતા / પિતાના લીવીંગ અથવા જન્મ ના દાખલા", "બીજું સંતાન હોય તો તેનો જન્મ નો દાખલો તથા આધાર કાર્ડ", "નોંધ :- દીકરી ના જન્મ ના ૧ વર્ષ ની સમય મર્યાદામાં ફોર્મ ભરવાનું રહેશે.",],

    "રેશન કાર્ડ": ["રેશન કાર્ડ", "૨ - ફોટા", "આધાર કાર્ડ તમામ સભ્યો ના", "ચુંટણી કાર્ડ (હોય તેના)", "અરજદાર ની બેંક પાસબૂક", "અરજદારનો  આવકનો  દાખલો", "લાઇટબીલ", "વેરાબીલ",],

    "વિધવા સહાય માટે": ["૪ - ફોટા", "આધાર કાર્ડ અરજદાર નું", "રેશન કાર્ડ અરજદારનું", "અરજદાર નો આવક નો દાખલો", "અજદાર ની બેંક પાસબૂક (S.B.I./ B.O.B./ UNION / C.B.I.)", "લાઇટબીલ", "વેરાબીલ", "મરણ નોંધ નો દાખલો", "બધા વારસદારો ના આધાર કાર્ડ પુત્ર / પુત્રી બંને", "વારસદાર નું રેશન કાર્ડ અલગ હોય તો તેમનું -", "રેશન કાર્ અને આવક નો દાખલો",],

    "લાઇટ કનેક્શન": ["મકાનનો પુરાવો", "જમીનદારોનો સંમતિ પત્ર", "અરજી ફોર્મ"],

    "૧૦% (E.W.S.)અનામત વગના દાખલા": ["(૧) ફોટો અરજદાર નો અને (૧) ફોટો તેના પિતા નો", "આધાર કાર્ડ અને ચુટણી કાર્ડ (અરજદાર અને તેના પિતા નુ)", "અરજદાર નું  લિવિંગ સર્ટી અથવા બોનાફાઇડ", "અરજદાર ના પિતા,કાકા,ફોઈ,કોઈ એક નું લિવિંગ સર્ટી", "આવક નો દાખલો", "રેશન કાર્ડ", "લાઇટબીલ", "વેરાબીલ", "અરજદાર નો બીન અનામત વર્ગનો દાખલો ", "ખેતી ની આવક હોય તો ૭,૧૨,૮અ પિતાના",],

    "બિન અનામત દાખલા": ["અરજદાર નો (૧) ફોટો ", "આધાર કાર્ડ (અરજદાર અને તેના પિતા નુ)", "અરજદાર નું  લિવિંગ સર્ટી, અથવા બોનાફાઇડ", "અરજદાર ના પિતા,કાકા,ફોઈ,કોઈ એક નું લિવિંગ સર્ટી", "રેશન કાર્ડ", "લાઇટબીલ", "વેરાબીલ",],

    "ડોમીસાઈલ સર્ટી માટેના પુરાવા ની યાદી": ["(૧) ફોટો અરજદાર નો અને (૧) ફોટો તેના પિતા નો", "આધાર કાર્ડ અને ચુટણી કાર્ડ (અરજદાર અને તેના પિતા નુ)", "અરજદાર નું  લિવિંગ સર્ટી અથવા બોનાફાઇડ", "અરજદાર નો જન્મ નો દાખલો", "અરજદાર ના પિતા,કાકા,ફોઈ,કોઈ એક નું લિવિંગ સર્ટી", "ધોરણ ૧ થી તમામ અભ્યાસ ની માર્કશીટ", "આવક નો દાખલો", "રેશન કાર્ડ", "લાઇટબીલ", "વેરાબીલ", "પોલીસ સ્ટેશન નો દાખલો", "તલાટીશ્રી નો ૧૦ વર્ષ નો રહેણાક નો દાખલો", "સોગંદનામું",],

    "I.T.R ઇન્કમટેક્ષ રિટર્ન માટેના પુરાવા ની યાદી": ["પાન કાર્ડ", "આધાર કાર્ડ", "બેન્ક પાસબૂક ૧ વર્ષ ની એન્ટ્રી સાથે (બધી બેન્ક ની ૦૧/૦૪/ થી ૩૧/૦૩ સુધીની)", "L.I.C. ની રસીદ ની નકલ હોય તો", "F.D. ની રસીદ ની નકલ હોય તો", "બાળકોની સ્કૂલ ફી ની રસીદ હોય તો", "કોઈ લોન ચાલતી હોય તો તેનું સ્ટેટમેન્ટ", "કોઈ પ્રોપર્ટી ખરીદી કે વેચાણ કરેલ હોય તો તેની વિગત", "અન્ય કોઈ રોકાણ કે આવક હોય તો તેની વિગત", "ખેતી ની આવક હોય તો ૭/૧૨ ની નકલ", "ખેતી વાળી ના ખરીદ વેચાણ ના બીલ ખેતી ની આવક હોય તો", "નોકરી કરતા હોય તેવામાં ફોર્મ – ૧૬", "ધંધા ની આવક હોય તો ખરીદ/વેચાણ તથા ખર્ચ ના બીલ",],

    "કુવરબાઈ મામેરુ સહાય": ["૧  ફોટો કન્યા નો", "આધાર કાર્ડ કન્યાનું", "આધાર કાર્ડ કન્યાના પિતાનું", "આધાર કાર્ડ પતિનું", "આવક નો દાખલો કન્યાના પિતા નો", "બેંક પાસબૂક કન્યાની", "મેરેજ સર્ટી", "રેશનકાર્ડ કન્યાના નામ વાળુ (KYC ફરજીયાત)", "નોંધ :- લગ્ન ના ૨ વર્ષ ની સમય મર્યાદામાં ફોર્મ ભરવાનું રહેશે.",],

    "મેરેજ સર્ટીફીકેટ માટેના પુરાવા ની યાદી": ["લીવીંગ સર્ટી  (વર તથા કન્યા ના)", "આધાર કાર્ડ (વર તથા કન્યા ના)", "રેશન કાર્ડ (વર તથા કન્યા ના)", "વર તથા કન્યા ના માતા પિતા ના આધાર કાર્ડ", "ગોર અદાનું આધાર કાર્ડ", "બે સાક્ષી ના આધાર કાર્ડ", "લગ્ન કંકોત્રી ", "લગ્ન ના જોઈટ ફોટા લગ્ન વિધિ વખતના ૪ x ૬ ની સાઈઝ માં", "નોંધ:- લગ્ન સ્થળ ગામડા માં હોય તો દરેક પુરાવાની ૨ નકલ આપવી.",],

    "નોન ક્રિમીલેયર સર્ટી માટેના પુરાવા ની યાદી": ["(૧) ફોટો અરજદાર નો અને (૧) ફોટો તેના પિતા નો", "આધાર કાર્ડ અને ચુટણી કાર્ડ (અરજદાર અને તેના પિતા નુ)", "અરજદાર નું  લિવિંગ સર્ટી અથવા બોનાફાઇડ", "અરજદાર ના પિતા,કાકા,ફોઈ,કોઈ એક નું લિવિંગ સર્ટી", "આવક નો દાખલો", "રેશન કાર્ડ", "લાઇટબીલ", "વેરાબીલ", "અરજદાર નો સામાજિક અને શૈક્ષણિક વર્ગનો જાતી દાખલો ", "પિતાના નામ નું અરજી સાથે સોગંદનામું",],

    "ભાગીદારી દસ્તાવેજ": ["દરેક ભાગીદારોના ફોટા - ૧", "દરેક ભાગીદારોના આઘાર કાર્ડ ", "દરેક ભાગીદારોના પાન કાર્ડ", "પેઢીનું નામ તથા સરનામું ", "પેઢીનું મુખ્ય કામકાજ ", "ભાડાની જગ્યા હોયતો ભાડા કરાર", "ભાગીદારોની ટકાવારી",],

    "પાસપોર્ટ સેવાઓ": ["આધાર કાર્ડ ", "ચુંટણી કાર્ડ ", "પાન કાર્ડ", "લિવિંગ સર્ટીફીકેટ અથવા જન્મ નો દાખલો", "લાસ્ટ માર્કશીટ", "મેરેજ સર્ટીફીકેટ મેરેજ થયેલ હોય તો", "મોબાઈલ નંબર", "ઈ મેઈલ ID", "ઈમરજન્સી કોન્ટેકટ પર્સન નું નામ અને મોબાઈલ નંબર",],

    "ભાડા કરાર (RENT AGREEMENT)": ["ભાડે આ૫નાર (માલીક) નો ફોટો - ૧", "ભાડે આ૫નાર (માલીક) નું આધાર કાર્ડ ", "ભાડે રાખનાર (ભાડુઆત) નો ફોટો - ૧", "ભાડે રાખનાર (ભાડુઆત) નું આધાર કાર્ડ", "લાઇટ બીલ", "વેરા બીલ", "દસ્તાવેજની નકલ",],

    "સીનીયર સીટીઝન પ્રમાણપત્ર માટેના પુરાવા ની યાદી": ["ફોટો અરજદાર નો ", "આધાર કાર્ડ ", "ચુંટણી કાર્ડ ", "રેશન કાર્ડ", "લાઇટબીલ", "વેરાબીલ ", "અરજદાર નું  લિવિંગ સર્ટી અથવા જન્મ નો દાખલો",],

    "ઉદ્યમ આધાર": ["આધાર કાર્ડ ", "પાન કાર્ડ", "બેંક પાસબૂક", "ધંધા નુ નામ સરનામું", "ધંધો સરૂ કર્યા ની તારીખ ", "મોબાઈલ નંબર", "ઈ મેઈલ ID ",],

    "વારસાઈ આંબા માટેના પુરાવા ની યાદી": ["૨ – ફોટા (મરણ ના કિસ્સા માં કોઈ એક વારસદાર ના ફોટા)", "આધાર કાર્ડ અરજદાર નું (હૈયાતી માં હોય તો)", "રેશન કાર્ડ અરજદારનું", "અરજદાર ના વારસદારો પુત્ર/પુત્રી,પતિ/પત્ની ના આધાર કાર્ડ", "મરણ ના કિસ્સા માં મરણ નોંધ નો દાખલો",],

    "વ્રુધ્ધ પેન્સન માટે": ["અરજદારની ઉપર ૬૦ વર્ષથી ઉપર હોય તો અરજી કરી શકાશે.", "૨ - ફોટા ", "આધાર કાર્ડ અરજદાર નું", "રેશન કાર્ડ અરજદારનું", "ચુંટણી કાર્ડ", "આવકનો દાખલો", "અરજદાર ની બેંક પાસબૂક (S.B.I ./  B.O.B./  UNION / C.B.I)", "લાઇટબીલ તથા વેરાબીલ", "લીવીંગ સર્ટી અથવા ઉમર નો દાખલો સરકારી હોસ્પિટલ માંથી", "BPL કાર્ડ ", "આ યોજના ફક્ત BPL કાર્ડ ધારકો ને તથા સંતાન માં પુત્ર ન હોય ", "તેવા અરજદારોને આ યોજના નો લાભ મળવા પત્ર છે.", "નોંધ:- વારસદારો  માં પુત્ર ન હોય તો વારસાઈ આંબો",],

    "વિચરતી – વિમુકત જાતિના દાખલા માટેના પુરાવા ની યાદી": ["(૧) ફોટો અરજદાર નો અને (૧) ફોટો તેના પિતા નો", "આધાર કાર્ડ અને ચુટણી કાર્ડ (અરજદાર અને તેના પિતા નુ)", "અરજદાર નું  લિવિંગ સર્ટી અથવા બોનાફાઇડ", "અરજદાર ના પિતા,કાકા,ફોઈ,કોઈ એક નું લિવિંગ સર્ટી", "રેશન કાર્ડ", "લાઇટબીલ", "વેરાબીલ",],

    "વોટર આઈડી": ["કુપન", "આધાર કાર્ડ", "લાઇટ બીલ", "ફોટા – ૧", "ઘરના સભ્યનું ચુંટણી કાર્ડ ", "અરજદારના સ્કુલ લિવિંગ સર્ટી",],
};


function handleServiceRequest(serviceName) {
    window.selectedService = serviceName;
    document.getElementById("whatsappFormModal").style.display = "flex";
}

function submitForm() {
    const name = document.getElementById("userName").value.trim();
    const phone = document.getElementById("userPhone").value.trim();
    const service = window.selectedService;

    if (!name || !phone) {
        alert("કૃપા કરીને નામ અને વોટ્સએપ નંબર નાખો.");
        return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
        alert("કૃપા કરીને સાચો મોબાઈલ નંબર દાખલ કરો.");
        return;
    }

    const docList = documentRequirements[service];
    let message = `📌 *${service}* માટે અરજી છે.\n`;

    if (docList && docList.length > 0) {
        message += `\n📝 જરૂરી દસ્તાવેજો:\n`;
        docList.forEach((item, i) => {
            message += `${i + 1}. ${item}\n`;
        });
    } else {
        message += `\n(દસ્તાવેજોની સૂચિ ઉપલબ્ધ નથી)\n`;
    }

    message += `\n📞 Pragalbh Associates\nમોબાઇલ: 9898329056`;

    const encoded = encodeURIComponent(message);
    const waLink = `https://wa.me/91${cleanPhone}?text=${encoded}`;

    window.open(waLink, "_blank");

    document.getElementById("whatsappFormModal").style.display = "none";

    // Clear inputs after submit
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
}

// ✅ CLOSE MODAL FUNCTION
function closeFormModal() {
    const modal = document.getElementById("whatsappFormModal");

    // Hide the modal
    modal.style.display = "none";

    // Reset form fields
    document.getElementById("userName").value = "";
    document.getElementById("userPhone").value = "";
}

// ✅ OPTIONAL: CLOSE MODAL IF CLICKED OUTSIDE
window.addEventListener("click", function (event) {
    const modal = document.getElementById("whatsappFormModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// ✅ RENDER SERVICES TO HOME
function renderHomeServices() {
    const container = document.getElementById("home-services-grid");
    servicesData.forEach(service => {
        const card = document.createElement("div");
        card.className = "service-card";

        const header = document.createElement("div");
        header.className = "service-header";

        header.innerHTML = `
            <div class="service-header-content">
                <div class="service-info">
                    <div class="service-icon"><i class="fa-solid fa-${service.icon}"></i></div>
                    <div class="service-title">
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                    </div>
                </div>
            </div>
        `;

        const content = document.createElement("div");
        content.className = "service-content";
        service.subServices.forEach(sub => {
            const item = document.createElement("div");
            item.className = "sub-service-item";
            item.innerHTML = `
                <div class="sub-service-info">
                    <h4>${sub.name}</h4>
                    <p>${sub.description}</p>
                </div>
                <button class="apply-button" onclick="handleServiceRequest('${sub.name}')">Apply</button>
            `;
            content.appendChild(item);
        });

        content.style.display = "block";
        card.appendChild(header);
        card.appendChild(content);
        container.appendChild(card);
    });
}

// ✅ INIT LOAD
document.addEventListener("DOMContentLoaded", function () {
    renderHomeServices();
});
