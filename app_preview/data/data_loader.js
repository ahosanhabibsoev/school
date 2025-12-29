/**
 * Data Loader - JSON ফাইল থেকে ডাটা লোড করে পেজে দেখায়
 * এই ফাইলটি app_preview.html এ যোগ করতে হবে
 */

// ডাটা স্টোর
let schoolData = {
    teachers: [],
    classRoutine: {},
    holidays: {},
    schoolInfo: {},
    events: []
};

// JSON ফাইল লোড করার ফাংশন
async function loadJSON(filename) {
    try {
        const response = await fetch(`data/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

// সব ডাটা লোড করা
async function loadAllData() {
    const [teachers, routine, holidays, schoolInfo, events] = await Promise.all([
        loadJSON('teachers.json'),
        loadJSON('class_routine.json'),
        loadJSON('holidays.json'),
        loadJSON('school_info.json'),
        loadJSON('events.json')
    ]);

    if (teachers) schoolData.teachers = teachers.teachers;
    if (routine) schoolData.classRoutine = routine;
    if (holidays) schoolData.holidays = holidays;
    if (schoolInfo) schoolData.schoolInfo = schoolInfo;
    if (events) schoolData.events = events.events;

    // ডাটা লোড হওয়ার পর UI আপডেট করা
    updateUI();
}

// UI আপডেট করা
function updateUI() {
    updateSchoolInfo();
    updateSocialLinks();
    updateTeachersList();
    updateHolidayCalendar();
}

// স্কুল ইনফো আপডেট
function updateSchoolInfo() {
    const info = schoolData.schoolInfo.schoolInfo;
    if (!info) return;

    // স্কুলের নাম
    const schoolNameEl = document.querySelector('.school-info h2');
    if (schoolNameEl) schoolNameEl.textContent = info.nameBn;

    // মটো
    const mottoEl = document.querySelector('.school-info p');
    if (mottoEl) mottoEl.textContent = info.motto;

    // কন্টাক্ট ইনফো
    const contactPanel = document.querySelector('.contact-info-panel');
    if (contactPanel && info.contact) {
        contactPanel.innerHTML = `
            <h4>যোগাযোগ</h4>
            <p><i class="fas fa-phone"></i> ${info.contact.phone}</p>
            <p><i class="fas fa-envelope"></i> ${info.contact.email}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${info.address.bn}</p>
        `;
    }
}

// সোশ্যাল লিংক আপডেট
function updateSocialLinks() {
    const social = schoolData.schoolInfo.schoolInfo?.socialMedia;
    if (!social) return;

    const socialIcons = document.querySelector('.social-icons');
    if (socialIcons) {
        socialIcons.innerHTML = `
            <a href="${social.facebook}" target="_blank" class="social-btn facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="${social.youtube}" target="_blank" class="social-btn youtube"><i class="fab fa-youtube"></i></a>
            <a href="${social.twitter}" target="_blank" class="social-btn twitter"><i class="fab fa-twitter"></i></a>
            <a href="${social.instagram}" target="_blank" class="social-btn instagram"><i class="fab fa-instagram"></i></a>
        `;
    }

    // অ্যাপ ডাউনলোড লিংক
    const appLinks = schoolData.schoolInfo.schoolInfo?.appLinks;
    if (appLinks) {
        const downloadBtns = document.querySelector('.download-btns');
        if (downloadBtns) {
            downloadBtns.innerHTML = `
                <a href="${appLinks.playStore}" target="_blank" class="download-btn">
                    <i class="fab fa-google-play"></i>
                    <span>Google Play</span>
                </a>
                <a href="${appLinks.appStore}" target="_blank" class="download-btn">
                    <i class="fab fa-apple"></i>
                    <span>App Store</span>
                </a>
            `;
        }
    }
}


// শিক্ষক তালিকা আপডেট (Settings এর Teachers Panel এ)
function updateTeachersList() {
    // এই ফাংশন প্রয়োজনে কল করা যাবে
    console.log('Teachers loaded:', schoolData.teachers.length);
}

// ছুটির ক্যালেন্ডার আপডেট
function updateHolidayCalendar() {
    // এই ফাংশন প্রয়োজনে কল করা যাবে
    console.log('Holidays loaded:', schoolData.holidays.holidays?.length || 0);
}

// শিক্ষকের নাম ID দিয়ে খুঁজে বের করা
function getTeacherById(teacherId) {
    return schoolData.teachers.find(t => t.id === teacherId);
}

// নির্দিষ্ট তারিখ ছুটি কিনা চেক করা
function isHoliday(date) {
    const dateStr = date.toISOString().split('T')[0];
    const dayName = date.toLocaleDateString('en-US', { weekday: 'lowercase' });
    
    // সাপ্তাহিক ছুটি চেক
    if (schoolData.holidays.weeklyHolidays?.includes(dayName)) {
        return { isHoliday: true, reason: 'সাপ্তাহিক ছুটি' };
    }
    
    // নির্দিষ্ট ছুটি চেক
    const holiday = schoolData.holidays.holidays?.find(h => h.date === dateStr);
    if (holiday) {
        return { isHoliday: true, reason: holiday.nameBn };
    }
    
    // ভ্যাকেশন চেক
    const vacation = schoolData.holidays.vacations?.find(v => {
        return dateStr >= v.startDate && dateStr <= v.endDate;
    });
    if (vacation) {
        return { isHoliday: true, reason: vacation.name };
    }
    
    return { isHoliday: false };
}

// আজকের ক্লাস রুটিন পাওয়া
function getTodayRoutine(className = '৬ষ্ঠ শ্রেণি') {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    
    const classData = schoolData.classRoutine.classes?.find(c => c.className === className);
    if (!classData) return [];
    
    return classData.routine[today] || [];
}

// আসন্ন ইভেন্ট পাওয়া
function getUpcomingEvents(limit = 5) {
    const today = new Date().toISOString().split('T')[0];
    return schoolData.events
        .filter(e => e.date >= today && e.isActive)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);
}

// আসন্ন ছুটি পাওয়া
function getUpcomingHolidays(limit = 5) {
    const today = new Date().toISOString().split('T')[0];
    return (schoolData.holidays.holidays || [])
        .filter(h => h.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);
}

// পেজ লোড হলে ডাটা লোড করা
document.addEventListener('DOMContentLoaded', loadAllData);

// এক্সপোর্ট (যদি মডিউল হিসেবে ব্যবহার করা হয়)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        schoolData,
        loadAllData,
        getTeacherById,
        isHoliday,
        getTodayRoutine,
        getUpcomingEvents,
        getUpcomingHolidays
    };
}
