// ============================================================
// SUPPTIME - APPLICATION LOGIC
// ============================================================

const STORAGE_KEY = 'supptime_user_v1';

let state = {
    user: null,           // { name, email }
    profile: {},          // age, gender, activity, goal, times
    selectedSupplements: [],
    supplementMeta: {},   // { vitD3: {start:'2026-04-07', end:'2026-05-19'} }
    selectedMedications: [],
    selectedConditions: [],
    currentStep: 1,
    totalSteps: 6
};

const DAYS = [
    {id:'mon',label:'Maandag'},{id:'tue',label:'Dinsdag'},{id:'wed',label:'Woensdag'},
    {id:'thu',label:'Donderdag'},{id:'fri',label:'Vrijdag'},{id:'sat',label:'Zaterdag'},{id:'sun',label:'Zondag'}
];
const SPORTS = [
    ['','— Kies sport —'],['strength','Krachttraining'],['running','Hardlopen'],
    ['cycling','Wielrennen / fietsen'],['mtb','Mountainbike'],['swimming','Zwemmen'],
    ['yoga','Yoga'],['pilates','Pilates'],['tennis','Tennis'],['padel','Padel'],
    ['squash','Squash'],['football','Voetbal'],['basketball','Basketbal'],
    ['hockey','Hockey'],['volleyball','Volleybal'],['handball','Handbal'],
    ['rugby','Rugby'],['golf','Golf'],['climbing','Klimmen / boulderen'],
    ['martial','Vechtsport / boksen'],['dance','Dansen'],['rowing','Roeien'],
    ['skating','Schaatsen'],['ski','Skiën / snowboarden'],['surfing','Surfen / SUP'],
    ['horse','Paardrijden'],['walking','Wandelen / hiken'],['crossfit','CrossFit / HIIT'],
    ['triathlon','Triatlon'],['other','Anders']
];

function renderDaySchedulePicker(containerId, schedule, withSport) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = DAYS.map(d => {
        const e = schedule[d.id] || {};
        return `
        <div class="day-row${e.active?' active':''}" data-day="${d.id}">
            <label class="day-toggle">
                <input type="checkbox" ${e.active?'checked':''}
                    onchange="toggleDayRow('${containerId}','${d.id}',this.checked)">
                <span>${d.label}</span>
            </label>
            <div class="day-fields">
                <input type="time" value="${e.start||''}" placeholder="start"
                    onchange="setDayField('${containerId}','${d.id}','start',this.value)">
                <span class="dash">–</span>
                <input type="time" value="${e.end||''}" placeholder="eind"
                    onchange="setDayField('${containerId}','${d.id}','end',this.value)">
                ${withSport ? `<select onchange="setDayField('${containerId}','${d.id}','sport',this.value)">
                    ${SPORTS.map(([v,l])=>`<option value="${v}" ${e.sport===v?'selected':''}>${l}</option>`).join('')}
                </select>` : ''}
            </div>
        </div>`;
    }).join('');
}
function _schedFor(containerId) {
    return containerId === 'ob-work-schedule' ? state._workSchedule : state._trainSchedule;
}
function toggleDayRow(containerId, dayId, checked) {
    const sched = _schedFor(containerId);
    if (!sched[dayId]) sched[dayId] = {};
    sched[dayId].active = checked;
    document.querySelector(`#${containerId} .day-row[data-day="${dayId}"]`)?.classList.toggle('active', checked);
}
function setDayField(containerId, dayId, field, value) {
    const sched = _schedFor(containerId);
    if (!sched[dayId]) sched[dayId] = { active: true };
    sched[dayId][field] = value;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderSupplementCheckboxes();
    renderMedicationCheckboxes();
    renderConditionCheckboxes();
    renderEncyclopedia();
    state._workSchedule = {
        mon:{active:true,start:'09:00',end:'17:00'}, tue:{active:true,start:'09:00',end:'17:00'},
        wed:{active:true,start:'09:00',end:'17:00'}, thu:{active:true,start:'09:00',end:'17:00'},
        fri:{active:true,start:'09:00',end:'17:00'}
    };
    state._trainSchedule = {};
    renderDaySchedulePicker('ob-work-schedule', state._workSchedule, false);
    renderDaySchedulePicker('ob-train-schedule', state._trainSchedule, true);

    const saved = loadState();
    if (saved && saved.user && saved.profile && saved.profile.wake) {
        state = { ...state, ...saved };
        showScreen('main');
        bootMain();
    } else if (saved && saved.user) {
        state.user = saved.user;
        document.getElementById('welcome-name').textContent = state.user.name || '';
        showScreen('onboarding');
    } else {
        showScreen('login');
    }
});

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        user: state.user,
        profile: state.profile,
        selectedSupplements: state.selectedSupplements,
        supplementMeta: state.supplementMeta,
        selectedMedications: state.selectedMedications,
        selectedConditions: state.selectedConditions
    }));
}
function loadState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
}

function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + name).classList.add('active');
}

// ===== LOGIN =====
function doLogin() {
    const name = document.getElementById('login-name').value.trim();
    const email = document.getElementById('login-email').value.trim();
    if (!name || !email) { alert('Vul je naam en e-mail in.'); return; }
    state.user = { name, email };
    saveState();
    document.getElementById('welcome-name').textContent = name;
    state.currentStep = 1;
    updateStepUI();
    showScreen('onboarding');
}

function logout() {
    if (!confirm('Uitloggen? Je gegevens blijven lokaal bewaard.')) return;
    showScreen('login');
}

// ===== ONBOARDING =====
function updateStepUI() {
    document.querySelectorAll('.onboard-step').forEach(s => s.classList.remove('active'));
    document.querySelector(`.onboard-step[data-step="${state.currentStep}"]`).classList.add('active');
    document.getElementById('progress-fill').style.width = (state.currentStep / state.totalSteps * 100) + '%';
    document.getElementById('progress-text').textContent = `Stap ${state.currentStep} van ${state.totalSteps}`;
}
function nextStep() {
    if (state.currentStep < state.totalSteps) { state.currentStep++; updateStepUI(); }
}
function prevStep() {
    if (state.currentStep > 1) { state.currentStep--; updateStepUI(); }
}

function finishOnboarding() {
    state.profile = {
        ageGroup: document.getElementById('ob-age').value,
        gender: document.getElementById('ob-gender').value,
        activity: document.getElementById('ob-activity').value,
        goal: document.getElementById('ob-goal').value,
        wake: document.getElementById('ob-wake').value || '07:00',
        breakfast: document.getElementById('ob-breakfast').value || '07:30',
        lunch: document.getElementById('ob-lunch').value || '12:30',
        dinner: document.getElementById('ob-dinner').value || '18:30',
        sleep: document.getElementById('ob-sleep').value || '22:30',
        workSchedule: JSON.parse(JSON.stringify(state._workSchedule)),
        trainSchedule: JSON.parse(JSON.stringify(state._trainSchedule)),
        workPattern: document.getElementById('ob-work-pattern').value,
        coffee: document.getElementById('ob-coffee').value,
        sun: document.getElementById('ob-sun').value,
        stress: document.getElementById('ob-stress').value,
        alcohol: document.getElementById('ob-alcohol').value,
        smoking: document.getElementById('ob-smoking').value,
        contraception: document.getElementById('ob-contraception').value,
        sleepQuality: document.getElementById('ob-sleep-quality').value,
        weight: parseFloat(document.getElementById('ob-weight').value) || null,
        height: parseFloat(document.getElementById('ob-height').value) || null,
        jetlag: document.getElementById('ob-jetlag').value
    };
    if (state.profile.weight && state.profile.height) {
        state.profile.bmi = +(state.profile.weight / Math.pow(state.profile.height/100, 2)).toFixed(1);
    }
    saveState();
    showScreen('main');
    bootMain();
}

function editProfile() {
    // Prefill
    const p = state.profile;
    if (p.ageGroup) document.getElementById('ob-age').value = p.ageGroup;
    if (p.gender) document.getElementById('ob-gender').value = p.gender;
    if (p.activity) document.getElementById('ob-activity').value = p.activity;
    if (p.goal) document.getElementById('ob-goal').value = p.goal;
    ['wake','breakfast','lunch','dinner','sleep'].forEach(k => {
        if (p[k] !== undefined) document.getElementById('ob-' + k).value = p[k];
    });
    const setVal = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined && v !== null) el.value = v; };
    setVal('ob-work-pattern', p.workPattern);
    setVal('ob-coffee', p.coffee);
    setVal('ob-sun', p.sun);
    setVal('ob-stress', p.stress);
    setVal('ob-alcohol', p.alcohol);
    setVal('ob-smoking', p.smoking);
    setVal('ob-contraception', p.contraception);
    setVal('ob-sleep-quality', p.sleepQuality);
    setVal('ob-weight', p.weight);
    setVal('ob-height', p.height);
    setVal('ob-jetlag', p.jetlag);
    state._workSchedule = JSON.parse(JSON.stringify(p.workSchedule || {}));
    state._trainSchedule = JSON.parse(JSON.stringify(p.trainSchedule || {}));
    renderDaySchedulePicker('ob-work-schedule', state._workSchedule, false);
    renderDaySchedulePicker('ob-train-schedule', state._trainSchedule, true);
    // Re-mark checkboxes
    document.querySelectorAll('#supplement-checkboxes .supplement-check').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#medication-checkboxes .supplement-check').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('#condition-checkboxes .supplement-check').forEach(el => el.classList.remove('active'));
    state.currentStep = 2;
    updateStepUI();
    showScreen('onboarding');
}

// ===== TABS =====
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
}

// ===== MAIN BOOT =====
function bootMain() {
    document.getElementById('user-chip').textContent = state.user ? state.user.name : '';
    renderToday();
    renderSchedule();
    renderInteractions();
    renderProfileSummary();
}

// ===== CHECKBOXES =====
function renderSupplementCheckboxes() {
    const c = document.getElementById('supplement-checkboxes');
    c.innerHTML = Object.entries(SUPPLEMENTS).map(([key, s]) => {
        const active = state.selectedSupplements.includes(key);
        const meta = state.supplementMeta[key] || {};
        return `
        <div class="supp-item${active?' active':''}" id="supp-item-${key}">
            <div class="supp-toggle" onclick="toggleSupplement('${key}')">
                <span class="check-box"></span>${s.name}
            </div>
            <div class="supp-dates">
                <small>Periode (laat leeg voor doorlopend gebruik):</small>
                <div class="date-row">
                    <label>Vanaf <input type="date" value="${meta.start||''}" onchange="setSuppMeta('${key}','start',this.value)"></label>
                    <label>Tot <input type="date" value="${meta.end||''}" onchange="setSuppMeta('${key}','end',this.value)"></label>
                </div>
            </div>
        </div>`;
    }).join('');
}
function setSuppMeta(key, field, value) {
    if (!state.supplementMeta[key]) state.supplementMeta[key] = {};
    state.supplementMeta[key][field] = value;
    saveState();
}
function renderMedicationCheckboxes() {
    const c = document.getElementById('medication-checkboxes');
    c.innerHTML = Object.entries(MEDICATIONS).map(([key, m]) => `
        <div class="supplement-check" onclick="toggleMedication('${key}', this)">
            <span class="check-box"></span>${m.name}
        </div>`).join('');
}
function renderConditionCheckboxes() {
    const c = document.getElementById('condition-checkboxes');
    c.innerHTML = CONDITIONS.map(c => `
        <div class="supplement-check" onclick="toggleCondition('${c.id}', this)">
            <span class="check-box"></span>${c.name}
        </div>`).join('');
}
function toggleSupplement(key) {
    const i = state.selectedSupplements.indexOf(key);
    if (i >= 0) state.selectedSupplements.splice(i,1); else state.selectedSupplements.push(key);
    document.getElementById('supp-item-' + key)?.classList.toggle('active');
    saveState();
}
function isSuppActiveToday(key) {
    const meta = state.supplementMeta[key];
    if (!meta) return true;
    const today = new Date().toISOString().slice(0,10);
    if (meta.start && today < meta.start) return false;
    if (meta.end && today > meta.end) return false;
    return true;
}
function activeSupplements() {
    return state.selectedSupplements.filter(isSuppActiveToday);
}
function toggleMedication(key, el) {
    el.classList.toggle('active');
    const i = state.selectedMedications.indexOf(key);
    if (i >= 0) state.selectedMedications.splice(i,1); else state.selectedMedications.push(key);
    saveState();
}
function toggleCondition(id, el) {
    el.classList.toggle('active');
    const i = state.selectedConditions.indexOf(id);
    if (i >= 0) state.selectedConditions.splice(i,1); else state.selectedConditions.push(id);
    saveState();
}

// ===== TIMING ENGINE =====
function timeToMin(t) { const [h,m] = t.split(':').map(Number); return h*60+m; }
function minToTime(m) { return String(Math.floor(m/60)).padStart(2,'0') + ':' + String(m%60).padStart(2,'0'); }

function todayDayKey() {
    return ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()];
}
function todaysTrainTime() {
    const t = state.profile.trainSchedule?.[todayDayKey()];
    return (t && t.active && t.start) ? t.start : '';
}
function buildDailyPlan() {
    const p = state.profile;
    const wake = timeToMin(p.wake);
    const todayWorkout = todaysTrainTime();
    const breakfast = timeToMin(p.breakfast);
    const lunch = timeToMin(p.lunch);
    const dinner = timeToMin(p.dinner);
    const sleep = timeToMin(p.sleep);

    const slots = {};
    function add(timeMin, label, item) {
        const key = minToTime(timeMin);
        if (!slots[key]) slots[key] = { time: timeMin, label, items: [] };
        slots[key].items.push(item);
    }

    const hasLevo = state.selectedMedications.includes('levothyroxine');
    const hasBisp = state.selectedMedications.includes('bisphosphonates');

    if (hasLevo) {
        add(wake, 'Direct na ontwaken (nuchter)', {
            name: '💊 Levothyroxine',
            note: 'Strikt nuchter, vol glas water. Wacht 30-60 min met ontbijt, 4 uur met mineralen/calcium.',
            tag: 'red'
        });
    }
    if (hasBisp) {
        add(wake, 'Direct na ontwaken (nuchter)', {
            name: '💊 Bisfosfonaat',
            note: 'Rechtop, nuchter, geen andere supplementen binnen 2 uur.',
            tag: 'red'
        });
    }

    activeSupplements().forEach(key => {
        const s = SUPPLEMENTS[key];
        let t, label, note = buildDetail(key, s);
        switch (s.timeSlot) {
            case 'earlyMorning': t = hasLevo ? wake + 60 : wake + 15; label = 'Ochtend (nuchter)'; break;
            case 'breakfast': t = breakfast; label = 'Bij ontbijt'; break;
            case 'midday': t = lunch; label = 'Bij lunch'; break;
            case 'afternoon': t = lunch + 120; label = 'Namiddag'; break;
            case 'evening': t = dinner; label = 'Bij avondeten'; break;
            case 'night': t = sleep - 30; label = 'Voor het slapen'; break;
            case 'workout': t = todayWorkout ? timeToMin(todayWorkout) : lunch + 180; label = 'Rond training'; break;
            default: t = breakfast; label = 'Bij ontbijt';
        }
        // Iron + levo conflict
        if (key === 'iron' && hasLevo) { t = lunch; label = 'Bij lunch'; note += ' ⚠ Verschoven i.v.m. 4u-scheiding van levothyroxine.'; }
        // Sport supps to workout
        if ((key === 'creatine' || key === 'wheyProtein') && todayWorkout) {
            t = timeToMin(todayWorkout); label = 'Rond training';
        }
        add(t, label, { name: s.name, note, tag: s.tagType });
    });

    return Object.values(slots).sort((a,b) => a.time - b.time);
}

const COFACTOR_FOODS = {
    'magnesium': 'pompoenpitten, amandelen, spinazie, pure chocolade, zwarte bonen',
    'vitamine k2': 'natto, oude kaas, eidooier, ganzenlever, zuurkool',
    'vitamine k': 'natto, oude kaas, eidooier, groene bladgroenten',
    'zink': 'rundvlees, oesters, pompoenpitten, cashewnoten, linzen',
    'koper': 'oesters, lever, cashewnoten, zonnebloempitten, pure chocolade, champignons',
    'vet': 'olijfolie, avocado, noten, vette vis, volle yoghurt, ei',
    'vitamine d3': 'vette vis (zalm, makreel, haring), eidooier, zongedroogde paddenstoelen',
    'vitamine d': 'vette vis (zalm, makreel, haring), eidooier, zongedroogde paddenstoelen',
    'calcium': 'zuivel, sardientjes met graat, amandelen, broccoli, tahin, tofu',
    'foliumzuur': 'donkergroene bladgroenten, peulvruchten, asperges, avocado, bietjes',
    'folaat': 'donkergroene bladgroenten, peulvruchten, asperges, avocado',
    'vitamine b6': 'kip, zalm, banaan, aardappel, kikkererwten, zonnebloempitten',
    'b6': 'kip, zalm, banaan, aardappel, kikkererwten, zonnebloempitten',
    'vitamine b12': 'vlees, vis, eieren, zuivel (niet in plantaardig voedsel)',
    'b12': 'vlees, vis, eieren, zuivel',
    'vitamine c': 'paprika, kiwi, citrusfruit, aardbeien, broccoli, peterselie',
    'vitamine e': 'amandelen, zonnebloempitten, tarwekiemolie, avocado, hazelnoten',
    'selenium': 'paranoten (1-2 per dag is genoeg!), tonijn, eieren, zonnebloempitten',
    'eiwit': 'vlees, vis, eieren, zuivel, peulvruchten, tofu, noten',
    'leucine': 'kwark, kip, ei, wei-eiwit, linzen, tonijn',
    'bioflavonoïden': 'schil van citrusvruchten, bessen, uien, appels, groene thee',
    'koolhydraten': 'rijst, aardappel, havermout, fruit, volkoren brood',
    'prebiotische vezels': 'ui, knoflook, prei, banaan, haver, asperges, witlof',
    'prebiotica': 'ui, knoflook, prei, banaan, haver, asperges, witlof',
    'aminozuren': 'vlees, vis, eieren, peulvruchten, zuivel',
    'intrinsieke factor': null // komt uit je eigen maag, geen voedsel
};

function foodsFor(name) {
    const n = name.toLowerCase().trim();
    // Exact match eerst
    if (COFACTOR_FOODS[n] !== undefined) return COFACTOR_FOODS[n];
    // Dan partial match op sleutel
    for (const key in COFACTOR_FOODS) {
        if (n.includes(key)) return COFACTOR_FOODS[key];
    }
    return null;
}

function formatCofactors(cofactors) {
    if (!cofactors || !cofactors.length) return '';
    const simple = cofactors.map(c => c.replace(/\s*\([^)]*\)/g, '').trim()).filter(Boolean);
    let html = '💪 <strong>Wordt het beste opgenomen wanneer u dit erbij neemt:</strong> ' + simple.join(', ');
    const li = cofactors.map(c => {
        const m = c.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
        const name = (m ? m[1] : c).trim();
        const explain = m ? m[2].trim() : '';
        const foods = foodsFor(name);
        let inner = `<strong>${name}</strong>`;
        if (explain) inner += `: ${explain}`;
        if (foods) inner += `<br><em>Zit bv. in: ${foods}</em>`;
        return `<li>${inner}</li>`;
    }).join('');
    html += `<details class="cofactor-details"><summary>Meer info + voedingsbronnen</summary><ul>${li}</ul></details>`;
    return html;
}

function buildDetail(key, s) {
    const parts = [];
    if (s.timing) parts.push('🕒 ' + s.timing);
    const cof = formatCofactors(s.cofactors);
    if (cof) parts.push(cof);
    // Medication interactions affecting this supplement
    const medNotes = [];
    state.selectedMedications.forEach(medKey => {
        const med = MEDICATIONS[medKey];
        if (!med) return;
        med.interactions.forEach(int => {
            if (keyMatches(int.with, key)) medNotes.push(`${med.name}: ${int.rule}`);
        });
    });
    if (medNotes.length) parts.push('⚠ ' + medNotes.join(' | '));
    // Lifestyle hints
    const p = state.profile;
    if ((key === 'iron' || key === 'calcium' || key === 'zinc') && p.coffee && p.coffee !== 'none') {
        parts.push('☕ Houd minimaal 1-2 uur afstand van koffie/thee (tannines remmen opname).');
    }
    if (key === 'vitD3' && p.sun === 'high') {
        parts.push('☀ Je bent veel buiten — in de zomer is een lagere dosis vaak voldoende.');
    }
    if ((key === 'magnesiumSleep' || key === 'magnesiumMuscle') && p.stress === 'high') {
        parts.push('🧘 Bij chronische stress is magnesium extra belangrijk; overweeg een avonddosis.');
    }
    if ((key === 'creatine' || key === 'wheyProtein') && p.trainSchedule) {
        const dayLabels = {mon:'ma',tue:'di',wed:'wo',thu:'do',fri:'vr',sat:'za',sun:'zo'};
        const days = Object.entries(p.trainSchedule).filter(([,v])=>v.active)
            .map(([k,v]) => `${dayLabels[k]} ${v.start||''}${v.sport?' ('+(SPORTS.find(s=>s[0]===v.sport)?.[1]||v.sport)+')':''}`);
        if (days.length) parts.push('🏋 Trainingsdagen: ' + days.join(' • '));
    }
    // Roken verhoogt behoefte aan vit C en B-vitamines
    if (p.smoking && p.smoking !== 'none' && (key === 'vitC' || key === 'bComplex' || key === 'vitB12')) {
        parts.push('🚬 Roken verhoogt de behoefte aan deze stof aanzienlijk.');
    }
    // Anticonceptiepil verlaagt B6, foliumzuur, magnesium, B12
    if (p.contraception && ['pill','hormonal'].includes(p.contraception) &&
        (key === 'bComplex' || key === 'folate' || key === 'magnesium' || key === 'vitB12')) {
        parts.push('💊 Hormonale anticonceptie kan deze stof verlagen — extra aandacht aanbevolen.');
    }
    // BMI / gewicht voor vit D
    if (key === 'vitD3' && p.bmi) {
        if (p.bmi >= 30) parts.push(`⚖ BMI ${p.bmi}: bij hoger lichaamsgewicht is een hogere dosis vaak nodig (vit D wordt opgeslagen in vetweefsel).`);
        else if (p.bmi >= 25) parts.push(`⚖ BMI ${p.bmi}: overweeg de hogere kant van het doseringsbereik.`);
    }
    // Slechte slaap → magnesium, melatonine
    if (p.sleepQuality === 'poor' && (key === 'magnesium')) {
        parts.push('😴 Slechte slaap: neem deze bij voorkeur 30-60 min voor het slapen (glycinaat-vorm).');
    }
    // Jetlag → melatonine timing
    if (p.jetlag === 'yes' && key === 'magnesium') {
        parts.push('✈ Jetlag: timing aanpassen aan nieuwe lokale tijd, niet je oude ritme.');
    }
    return parts.join('<br>');
}

// ===== TODAY VIEW =====
function renderToday() {
    const now = new Date();
    const hour = now.getHours();
    let greet = 'Goedemorgen', emoji = '🌅';
    if (hour >= 12 && hour < 18) { greet = 'Goedemiddag'; emoji = '☀'; }
    else if (hour >= 18) { greet = 'Goedenavond'; emoji = '🌙'; }
    document.getElementById('greeting-emoji').textContent = emoji;
    document.getElementById('greeting-text').textContent = `${greet}, ${state.user.name}!`;
    document.getElementById('today-date').textContent = now.toLocaleDateString('nl-NL', { weekday:'long', day:'numeric', month:'long' });

    const plan = buildDailyPlan();
    const nowMin = hour*60 + now.getMinutes();
    const next = plan.find(s => s.time >= nowMin) || plan[0];

    const nextEl = document.getElementById('next-up');
    if (next) {
        nextEl.innerHTML = `
            <div class="next-label">Volgende inname</div>
            <div class="next-time">${minToTime(next.time)}</div>
            <div class="next-detail">${next.label}</div>
            <div class="next-items">${next.items.map(i => `<div>• ${i.name}</div>`).join('')}</div>`;
    } else {
        nextEl.innerHTML = `<p>Nog geen supplementen geselecteerd. <a href="#" onclick="editProfile();return false;">Voeg ze toe in je profiel</a>.</p>`;
    }

    const tl = document.getElementById('today-timeline');
    if (plan.length === 0) {
        tl.innerHTML = '<p class="muted">Geen geplande innames. Ga naar Profiel om supplementen toe te voegen.</p>';
        return;
    }
    tl.innerHTML = plan.map(slot => `
        <div class="timeline-slot ${slot.time < nowMin ? 'past' : ''}">
            <div class="timeline-time">${minToTime(slot.time)}</div>
            <div class="timeline-body">
                <div class="timeline-label">${slot.label}</div>
                ${slot.items.map(i => `
                    <div class="timeline-item tag-${i.tag||''}">
                        <strong>${i.name}</strong>
                        <div class="timeline-note">${i.note}</div>
                    </div>`).join('')}
            </div>
        </div>`).join('');

    // Mobile pager: one slot at a time, default to "now or next"
    state._todayPlan = plan;
    const startIdx = plan.findIndex(s => s.time >= nowMin);
    state._todayIdx = startIdx === -1 ? plan.length - 1 : startIdx;
    renderTodayPager();
}

function renderTodayPager() {
    const pager = document.getElementById('today-pager');
    if (!pager) return;
    const plan = state._todayPlan || [];
    if (!plan.length) { pager.innerHTML = ''; return; }
    const idx = state._todayIdx;
    const slot = plan[idx];
    const now = new Date();
    const nowMin = now.getHours()*60 + now.getMinutes();
    pager.innerHTML = `
        <div class="today-pager-card ${slot.time < nowMin ? 'past' : ''}">
            <div class="today-pager-time">${minToTime(slot.time)}</div>
            <div class="today-pager-label">${slot.label}</div>
            ${slot.items.map(i => `
                <div class="timeline-item tag-${i.tag||''}">
                    <strong>${i.name}</strong>
                    <div class="timeline-note">${i.note}</div>
                </div>`).join('')}
        </div>
        <div class="today-pager-controls">
            <button class="btn btn-sm btn-outline" onclick="todayPagerStep(-1)" ${idx===0?'disabled':''}>‹ Vorige</button>
            <div class="today-pager-dots">
                ${plan.map((s,i) => `<button class="today-pager-dot ${i===idx?'active':''} ${s.time<nowMin?'past':''}" onclick="todayPagerJump(${i})" title="${minToTime(s.time)}"></button>`).join('')}
            </div>
            <button class="btn btn-sm btn-outline" onclick="todayPagerStep(1)" ${idx===plan.length-1?'disabled':''}>Volgende ›</button>
        </div>`;
}
function todayPagerStep(delta) {
    const plan = state._todayPlan || [];
    state._todayIdx = Math.max(0, Math.min(plan.length-1, state._todayIdx + delta));
    renderTodayPager();
}
function todayPagerJump(i) { state._todayIdx = i; renderTodayPager(); }

// ===== EAT NOW =====
function eatNow(mealSlot) {
    const mealLabels = { breakfast:'ontbijt', midday:'lunch', evening:'avondmaaltijd' };
    // Any supplement that needs food (regardless of which meal it's normally bound to)
    const withFoodSlots = ['breakfast','morning','midday','evening'];
    const items = activeSupplements()
        .map(k => ({ key:k, supp:SUPPLEMENTS[k] }))
        .filter(x => withFoodSlots.includes(x.supp.timeSlot) ||
                    (mealSlot === 'breakfast' && x.supp.timeSlot === 'earlyMorning'));

    const hasLevo = state.selectedMedications.includes('levothyroxine');
    const warnings = [];
    if (hasLevo && mealSlot === 'breakfast') {
        warnings.push('⚠ Heb je vandaag al levothyroxine geslikt? Wacht minimaal 30-60 min na inname voor je ontbijt, en 4 uur voor je calcium/ijzer/magnesium neemt.');
    }

    const out = document.getElementById('eat-now-result');
    if (items.length === 0 && warnings.length === 0) {
        out.innerHTML = `<div class="eat-now-card"><strong>Eet smakelijk!</strong> Geen supplementen die specifiek bij je ${mealLabels[mealSlot]} horen.</div>`;
        return;
    }
    out.innerHTML = `
        <div class="eat-now-card">
            <h3>Bij je ${mealLabels[mealSlot]} nu:</h3>
            ${items.length ? `<ul>${items.map(x => `
                <li><strong>${x.supp.name}</strong><br>
                    <small>${buildDetail(x.key, x.supp)}</small></li>`).join('')}</ul>`
              : '<p class="muted">Geen specifieke supplementen voor deze maaltijd.</p>'}
            ${warnings.length ? `<div class="eat-now-warn">${warnings.join('<br>')}</div>` : ''}
            <button class="btn btn-sm btn-outline" onclick="document.getElementById('eat-now-result').innerHTML=''">Sluiten</button>
        </div>`;
}

// ===== TRAIN NOW =====
function trainNow(phase) {
    // phase: 'pre' | 'during' | 'post'
    const phaseLabels = { pre:'vóór je training', during:'tijdens je training', post:'na je training' };
    const advice = {
        pre: {
            include: ['creatine'], // only if already taken earlier; creatine timing is flexible
            tip: 'Vóór de training: licht eten (1-2 uur ervoor) met wat koolhydraten. Zware supplementen of hoge dosis vitamine C/E kun je beter na de training nemen — die kunnen je trainingsprikkel afzwakken. Drink 300-500 ml water.',
            avoidSlots: []
        },
        during: {
            include: ['electrolytes'],
            tip: 'Tijdens lange of zware training (>60 min, warmte, veel zweten): water met elektrolyten. Bij korte training is water genoeg.',
            avoidSlots: []
        },
        post: {
            include: ['wheyProtein','creatine'],
            tip: 'Binnen 0-2 uur na de training: eiwit (20-40 g) met wat koolhydraten voor herstel. Dit is ook het beste moment voor creatine.',
            avoidSlots: []
        }
    };

    const active = activeSupplements();
    const relevantKeys = advice[phase].include.filter(k => active.includes(k));
    const items = relevantKeys.map(k => ({ key:k, supp:SUPPLEMENTS[k] }));

    // Warnings: things to AVOID around training
    const warnings = [];
    if (phase === 'pre' || phase === 'during') {
        if (active.includes('vitC')) warnings.push('⚠ Geen hoge dosis vitamine C vlak voor/tijdens de training — kan je trainingseffect afzwakken.');
        if (active.includes('vitE')) warnings.push('⚠ Geen hoge dosis vitamine E rond de training om dezelfde reden.');
        if (active.includes('iron')) warnings.push('⚠ IJzer niet direct rond de training innemen.');
        if (active.includes('omega3')) warnings.push('⚠ Omega-3 liever niet vlak voor of na krachttraining.');
    }

    const out = document.getElementById('train-now-result');
    if (items.length === 0 && warnings.length === 0) {
        out.innerHTML = `<div class="eat-now-card"><strong>Veel plezier met trainen!</strong><br><small>${advice[phase].tip}</small></div>`;
        return;
    }
    out.innerHTML = `
        <div class="eat-now-card">
            <h3>${phaseLabels[phase].charAt(0).toUpperCase()+phaseLabels[phase].slice(1)}:</h3>
            <p><small>${advice[phase].tip}</small></p>
            ${items.length ? `<ul>${items.map(x => `
                <li><strong>${x.supp.name}</strong><br>
                    <small>${buildDetail(x.key, x.supp)}</small></li>`).join('')}</ul>` : ''}
            ${warnings.length ? `<div class="eat-now-warn">${warnings.join('<br>')}</div>` : ''}
            <button class="btn btn-sm btn-outline" onclick="document.getElementById('train-now-result').innerHTML=''">Sluiten</button>
        </div>`;
}

// ===== SCHEDULE TAB =====
function renderSchedule() {
    const c = document.getElementById('schedule-content');
    const plan = buildDailyPlan();
    if (plan.length === 0) {
        c.innerHTML = '<div class="card"><p>Geen schema. Bewerk je profiel om supplementen te kiezen.</p></div>';
        return;
    }
    c.innerHTML = `<div class="card"><h2>Jouw dagschema</h2>
        <p class="card-desc">Op basis van jouw dagindeling en gekozen supplementen.</p></div>` +
        plan.map(slot => `
        <div class="card">
            <div class="card-head"><h3>${minToTime(slot.time)} — ${slot.label}</h3></div>
            ${slot.items.map(i => `
                <div class="schedule-item">
                    <div class="schedule-item-name">${i.name}</div>
                    <div class="schedule-item-detail">${i.note}</div>
                </div>`).join('')}
        </div>`).join('');
}

// ===== INTERACTIONS =====
// Alias map: legacy/group keys → real supplement keys
const KEY_ALIASES = { magnesium: ['magnesiumSleep','magnesiumMuscle'] };
function expandKey(k) { return KEY_ALIASES[k] || [k]; }
function keyMatches(intKey, suppKey) { return expandKey(intKey).includes(suppKey); }
function selectedHas(intKey) { return expandKey(intKey).some(k => state.selectedSupplements.includes(k)); }

function renderInteractions() {
    const container = document.getElementById('interactions-content');
    const interactions = [];
    SUPP_INTERACTIONS.forEach(int => {
        if (selectedHas(int.a) && selectedHas(int.b)) interactions.push(int);
    });
    state.selectedMedications.forEach(medKey => {
        const med = MEDICATIONS[medKey];
        if (!med) return;
        med.interactions.forEach(int => {
            if (selectedHas(int.with)) {
                const realKey = expandKey(int.with).find(k => state.selectedSupplements.includes(k)) || int.with;
                interactions.push({
                    level: int.level,
                    title: `${med.name} + ${SUPPLEMENTS[realKey]?.name || int.with}`,
                    desc: int.rule, mechanism: int.desc
                });
            }
        });
    });
    if (interactions.length === 0) {
        container.innerHTML = `<div class="card"><p class="muted">Geen interacties gevonden voor jouw selectie.</p></div>`;
        return;
    }
    const order = { red: 0, yellow: 1, green: 2 };
    interactions.sort((a,b) => order[a.level] - order[b.level]);
    container.innerHTML = interactions.map(int => `
        <div class="interaction-card">
            <div class="interaction-dot ${int.level}"></div>
            <div class="interaction-body">
                <div class="interaction-title">${int.title}</div>
                <div class="interaction-desc">${int.desc}</div>
                ${int.mechanism ? `<div class="interaction-mechanism"><strong>Mechanisme:</strong> ${int.mechanism}</div>` : ''}
            </div>
        </div>`).join('');
}

// ===== ENCYCLOPEDIA =====
function renderEncyclopedia() {
    const c = document.getElementById('encyclopedia-content');
    if (!c) return;
    c.innerHTML = Object.entries(SUPPLEMENTS).map(([key, s]) => `
        <div class="ency-card" data-name="${s.name.toLowerCase()}">
            <div class="ency-header" onclick="this.parentElement.classList.toggle('open')">
                <h3>${s.name} <span class="muted">${s.category}</span></h3>
                <span class="ency-arrow">▾</span>
            </div>
            <div class="ency-body">
                <div class="ency-section"><h4>Functie</h4><p>${s.shortDesc||''}</p></div>
                <div class="ency-section"><h4>Optimale Timing</h4><p>${s.timing||''}</p></div>
                <div class="ency-section"><h4>Vorm</h4><p>${s.form||''}</p></div>
                ${s.mechanism ? `<div class="ency-section"><h4>Mechanisme</h4><p>${s.mechanism}</p></div>` : ''}
            </div>
        </div>`).join('');
}
function filterEncyclopedia() {
    const q = document.getElementById('search-input').value.toLowerCase();
    document.querySelectorAll('.ency-card').forEach(card => {
        card.style.display = card.dataset.name.includes(q) ? '' : 'none';
    });
}

// ===== PROFILE SUMMARY =====
function formatScheduleShort(sched, withSport) {
    if (!sched) return '-';
    const lbl = {mon:'Ma',tue:'Di',wed:'Wo',thu:'Do',fri:'Vr',sat:'Za',sun:'Zo'};
    const out = Object.entries(sched).filter(([,v])=>v.active).map(([k,v]) => {
        const sport = withSport && v.sport ? ' ' + (SPORTS.find(s=>s[0]===v.sport)?.[1]||v.sport) : '';
        return `${lbl[k]} ${v.start||'?'}–${v.end||'?'}${sport}`;
    });
    return out.length ? out.join(' • ') : '-';
}
function renderProfileSummary() {
    const p = state.profile;
    const ageL = { child:'Kind/Tiener', adult:'Volwassene', senior:'50+' };
    const actL = { sedentary:'Sedentair', moderate:'Matig actief', athlete:'Krachtsport', endurance:'Duursport' };
    const goalL = { general:'Algemene gezondheid', energy:'Energie & Cognitie', sleep:'Slaap', sport:'Sportprestatie', bone:'Botgezondheid', immune:'Immuunsysteem' };
    document.getElementById('profile-summary').innerHTML = `
        <p><strong>Naam:</strong> ${state.user.name}</p>
        <p><strong>Leeftijd:</strong> ${ageL[p.ageGroup]||'-'} • <strong>Geslacht:</strong> ${p.gender==='male'?'Man':p.gender==='female'?'Vrouw':'-'}</p>
        <p><strong>Activiteit:</strong> ${actL[p.activity]||'-'} • <strong>Doel:</strong> ${goalL[p.goal]||'-'}</p>
        <p><strong>Dagindeling:</strong> opstaan ${p.wake} • ontbijt ${p.breakfast} • lunch ${p.lunch} • diner ${p.dinner} • slapen ${p.sleep}</p>
        <p><strong>Werk (${p.workPattern||'-'}):</strong> ${formatScheduleShort(p.workSchedule)}</p>
        <p><strong>Training:</strong> ${formatScheduleShort(p.trainSchedule, true)}</p>
        <p><strong>Leefstijl:</strong> koffie ${p.coffee||'-'} • zon ${p.sun||'-'} • stress ${p.stress||'-'} • alcohol ${p.alcohol||'-'} • roken ${p.smoking||'-'}</p>
        <p><strong>Gezondheid:</strong> ${p.weight?p.weight+' kg':'-'} • ${p.height?p.height+' cm':'-'}${p.bmi?` • BMI ${p.bmi}`:''} • slaap ${p.sleepQuality||'-'} • anticonceptie ${p.contraception||'-'} • jetlag ${p.jetlag||'-'}</p>
        <p><strong>Supplementen (${state.selectedSupplements.length}):</strong> ${state.selectedSupplements.map(k=>SUPPLEMENTS[k]?.name).filter(Boolean).join(', ')||'-'}</p>
        <p><strong>Medicatie (${state.selectedMedications.length}):</strong> ${state.selectedMedications.map(k=>MEDICATIONS[k]?.name).filter(Boolean).join(', ')||'-'}</p>`;
}

// ===== EXPORT / IMPORT =====
function exportData() {
    const payload = {
        app: 'SuppTime',
        version: 1,
        exportedAt: new Date().toISOString(),
        data: {
            user: state.user,
            profile: state.profile,
            selectedSupplements: state.selectedSupplements,
            supplementMeta: state.supplementMeta,
            selectedMedications: state.selectedMedications,
            selectedConditions: state.selectedConditions
        }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const stamp = new Date().toISOString().slice(0,10);
    a.href = url;
    a.download = `supptime-${(state.user?.name||'backup').toLowerCase().replace(/\s+/g,'-')}-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const parsed = JSON.parse(e.target.result);
            if (parsed.app !== 'SuppTime' || !parsed.data) {
                alert('Dit is geen geldig SuppTime-bestand.');
                return;
            }
            if (!confirm('Weet je het zeker? Dit overschrijft je huidige gegevens op dit apparaat.')) return;
            const d = parsed.data;
            state.user = d.user || state.user;
            state.profile = d.profile || {};
            state.selectedSupplements = d.selectedSupplements || [];
            state.supplementMeta = d.supplementMeta || {};
            state.selectedMedications = d.selectedMedications || [];
            state.selectedConditions = d.selectedConditions || [];
            saveState();
            alert('Gegevens geïmporteerd! De app wordt opnieuw geladen.');
            location.reload();
        } catch (err) {
            alert('Kon het bestand niet lezen: ' + err.message);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ===== NOTIFICATIONS =====
let notifTimers = [];
function requestNotifications() {
    if (!('Notification' in window)) { alert('Je browser ondersteunt geen notificaties.'); return; }
    Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
            scheduleNotifications();
            alert('Reminders ingeschakeld voor vandaag! ✅');
        } else {
            alert('Notificaties geweigerd. Je kunt dit aanpassen in je browserinstellingen.');
        }
    });
}
function scheduleNotifications() {
    notifTimers.forEach(t => clearTimeout(t));
    notifTimers = [];
    const plan = buildDailyPlan();
    const now = new Date();
    const nowMin = now.getHours()*60 + now.getMinutes();
    plan.forEach(slot => {
        if (slot.time <= nowMin) return;
        const delay = (slot.time - nowMin) * 60 * 1000 - now.getSeconds()*1000;
        const items = slot.items.map(i => i.name).join(', ');
        const t = setTimeout(() => {
            new Notification('SuppTime — ' + slot.label, { body: items });
        }, delay);
        notifTimers.push(t);
    });
}
