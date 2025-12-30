/* ========================================
   ডেমো উচ্চ বিদ্যালয় - Main JavaScript
   ======================================== */

// DOM Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Toggle
function toggleMenu() {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
}

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// Navbar scroll effect
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when stats section is visible
                if (entry.target.closest('.stats')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Class Routine Tab Switching
const routineData = {
    6: [
        ['রবিবার', 'বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান', 'ধর্ম'],
        ['সোমবার', 'গণিত', 'বাংলা', 'আইসিটি', 'ইংরেজি', 'বিজ্ঞান'],
        ['মঙ্গলবার', 'ইংরেজি', 'বিজ্ঞান', 'বাংলা', 'গণিত', 'আইসিটি'],
        ['বুধবার', 'বিজ্ঞান', 'গণিত', 'ইংরেজি', 'ধর্ম', 'বাংলা'],
        ['বৃহস্পতিবার', 'আইসিটি', 'ধর্ম', 'গণিত', 'বাংলা', 'ইংরেজি']
    ],
    7: [
        ['রবিবার', 'গণিত', 'বাংলা', 'ইংরেজি', 'বিজ্ঞান', 'আইসিটি'],
        ['সোমবার', 'ইংরেজি', 'গণিত', 'বাংলা', 'ধর্ম', 'বিজ্ঞান'],
        ['মঙ্গলবার', 'বাংলা', 'বিজ্ঞান', 'গণিত', 'ইংরেজি', 'ধর্ম'],
        ['বুধবার', 'বিজ্ঞান', 'ইংরেজি', 'আইসিটি', 'বাংলা', 'গণিত'],
        ['বৃহস্পতিবার', 'ধর্ম', 'আইসিটি', 'বিজ্ঞান', 'গণিত', 'বাংলা']
    ],
    8: [
        ['রবিবার', 'ইংরেজি', 'গণিত', 'বাংলা', 'আইসিটি', 'বিজ্ঞান'],
        ['সোমবার', 'বাংলা', 'বিজ্ঞান', 'ইংরেজি', 'গণিত', 'ধর্ম'],
        ['মঙ্গলবার', 'গণিত', 'বাংলা', 'বিজ্ঞান', 'ধর্ম', 'ইংরেজি'],
        ['বুধবার', 'আইসিটি', 'ইংরেজি', 'গণিত', 'বাংলা', 'বিজ্ঞান'],
        ['বৃহস্পতিবার', 'বিজ্ঞান', 'ধর্ম', 'বাংলা', 'ইংরেজি', 'গণিত']
    ],
    9: [
        ['রবিবার', 'পদার্থ', 'রসায়ন', 'গণিত', 'বাংলা', 'ইংরেজি'],
        ['সোমবার', 'গণিত', 'জীববিজ্ঞান', 'পদার্থ', 'আইসিটি', 'বাংলা'],
        ['মঙ্গলবার', 'ইংরেজি', 'গণিত', 'রসায়ন', 'পদার্থ', 'ধর্ম'],
        ['বুধবার', 'জীববিজ্ঞান', 'বাংলা', 'ইংরেজি', 'গণিত', 'রসায়ন'],
        ['বৃহস্পতিবার', 'রসায়ন', 'পদার্থ', 'জীববিজ্ঞান', 'ইংরেজি', 'আইসিটি']
    ],
    10: [
        ['রবিবার', 'গণিত', 'পদার্থ', 'রসায়ন', 'ইংরেজি', 'বাংলা'],
        ['সোমবার', 'রসায়ন', 'গণিত', 'জীববিজ্ঞান', 'বাংলা', 'পদার্থ'],
        ['মঙ্গলবার', 'পদার্থ', 'ইংরেজি', 'গণিত', 'আইসিটি', 'রসায়ন'],
        ['বুধবার', 'বাংলা', 'রসায়ন', 'পদার্থ', 'জীববিজ্ঞান', 'গণিত'],
        ['বৃহস্পতিবার', 'জীববিজ্ঞান', 'বাংলা', 'ইংরেজি', 'গণিত', 'ধর্ম']
    ]
};

function updateRoutineTable(classNum) {
    const tbody = document.getElementById('routineBody');
    const data = routineData[classNum];
    
    tbody.innerHTML = data.map((row, index) => `
        <tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            ${index === 0 ? '<td rowspan="5" class="break-cell">টিফিন</td>' : ''}
            <td>${row[4]}</td>
            <td>${row[5]}</td>
        </tr>
    `).join('');
}

function initRoutineTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateRoutineTable(btn.getAttribute('data-class'));
        });
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।');
        form.reset();
    });
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
menuToggle.addEventListener('click', toggleMenu);
window.addEventListener('scroll', handleScroll);
backToTop.addEventListener('click', scrollToTop);

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollAnimations();
    initRoutineTabs();
    initContactForm();
});


/* ========================================
   JSON Data Loader & Dynamic Content
   ======================================== */

// Data Store
let siteData = {
    teachers: [],
    holidays: [],
    notices: [],
    schoolInfo: {},
    classRoutine: null
};

// Load JSON file
async function loadJSON(filename) {
    try {
        const response = await fetch(`app_preview/data/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return null;
    }
}

// Load all data
async function loadAllSiteData() {
    console.log('Loading all site data...');
    
    const [teachers, holidays, notices, schoolInfo, classRoutine] = await Promise.all([
        loadJSON('teachers.json'),
        loadJSON('holidays.json'),
        loadJSON('notices.json'),
        loadJSON('school_info.json'),
        loadJSON('class_routine.json')
    ]);

    console.log('Loaded teachers:', teachers);
    console.log('Loaded notices:', notices);

    if (teachers) siteData.teachers = teachers.teachers;
    if (holidays) siteData.holidays = holidays;
    if (notices) siteData.notices = notices.notices;
    if (schoolInfo) siteData.schoolInfo = schoolInfo;
    if (classRoutine) siteData.classRoutine = classRoutine;

    console.log('siteData after loading:', siteData);

    // Update UI
    updateTeachersSection();
    updateNoticesSection();
    updateClassRoutine();
    initCalendar();
}

// Update Teachers Section
function updateTeachersSection() {
    const teachersGrid = document.querySelector('.teachers-grid');
    
    if (!teachersGrid) return;
    if (!siteData.teachers || siteData.teachers.length === 0) return;

    teachersGrid.innerHTML = siteData.teachers.map(teacher => `
        <div class="teacher-card">
            <div class="teacher-avatar ${teacher.nameBn.includes('খাতুন') || teacher.nameBn.includes('বেগম') || teacher.nameBn.includes('আক্তার') ? 'female' : ''}" ${teacher.imageUrl ? `onclick="openGalleryPopup('${teacher.imageUrl}', '${teacher.nameBn}')"` : ''}>
                ${teacher.imageUrl ? `<img src="${teacher.imageUrl}" alt="${teacher.nameBn}">` : '<i class="fas fa-user-tie"></i>'}
            </div>
            <h3>${teacher.nameBn}</h3>
            <p class="designation">${teacher.designationBn}</p>
            <p class="subject">${teacher.subjectBn}</p>
            <div class="teacher-info">
                <a href="tel:${teacher.phone}" class="contact-link">
                    <i class="fas fa-phone"></i> ${teacher.phone}
                </a>
                <a href="mailto:${teacher.email}" class="contact-link">
                    <i class="fas fa-envelope"></i> ${teacher.email}
                </a>
            </div>
        </div>
    `).join('');
}

// Update Notices Section - Show latest 5
function updateNoticesSection() {
    const noticeGrid = document.querySelector('.notice-grid');
    
    if (!noticeGrid) return;
    if (!siteData.notices || siteData.notices.length === 0) return;

    // Sort by date (latest first) and take 5
    const sortedNotices = [...siteData.notices]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    noticeGrid.innerHTML = sortedNotices.map(notice => `
        <div class="notice-card ${notice.type === 'urgent' ? 'urgent' : ''}">
            <div class="notice-date">
                <span class="day">${notice.day}</span>
                <span class="month">${notice.month}</span>
            </div>
            <div class="notice-content">
                <span class="notice-badge ${notice.type}">${notice.typeBn}</span>
                <h3>${notice.titleBn}</h3>
                <p>${notice.contentBn}</p>
                <a href="all-notices.html" class="notice-link">বিস্তারিত <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

// Update Class Routine Section
function updateClassRoutine() {
    const routineTabs = document.getElementById('routineTabs');
    const routineHead = document.getElementById('routineHead');
    const routineBody = document.getElementById('routineBody');
    
    if (!routineBody || !siteData.classRoutine) return;
    
    const data = siteData.classRoutine;
    
    // Create tabs
    if (routineTabs && data.classes) {
        routineTabs.innerHTML = data.classes.map((cls, index) => 
            `<button class="tab-btn ${index === 0 ? 'active' : ''}" data-class-index="${index}">${cls.className}</button>`
        ).join('');
        
        // Add click handlers
        routineTabs.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                routineTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderRoutineTable(parseInt(btn.dataset.classIndex));
            });
        });
    }
    
    // Render header
    if (routineHead && data.periodTiming) {
        const timing = data.periodTiming;
        routineHead.innerHTML = `
            <tr>
                <th>দিন</th>
                <th>১ম পিরিয়ড<br><small>${timing.period1.start}-${timing.period1.end}</small></th>
                <th>২য় পিরিয়ড<br><small>${timing.period2.start}-${timing.period2.end}</small></th>
                <th>৩য় পিরিয়ড<br><small>${timing.period3.start}-${timing.period3.end}</small></th>
                <th>বিরতি<br><small>${timing.tiffinBreak.start}-${timing.tiffinBreak.end}</small></th>
                <th>৪র্থ পিরিয়ড<br><small>${timing.period5.start}-${timing.period5.end}</small></th>
            </tr>
        `;
    }
    
    // Render first class routine
    renderRoutineTable(0);
}

function renderRoutineTable(classIndex) {
    const routineBody = document.getElementById('routineBody');
    if (!routineBody || !siteData.classRoutine) return;
    
    const classData = siteData.classRoutine.classes[classIndex];
    if (!classData) return;
    
    const dayNames = {
        sunday: 'রবিবার',
        monday: 'সোমবার',
        tuesday: 'মঙ্গলবার',
        wednesday: 'বুধবার',
        thursday: 'বৃহস্পতিবার'
    };
    
    let html = '';
    let isFirst = true;
    
    for (const [day, periods] of Object.entries(classData.routine)) {
        html += `<tr>
            <td>${dayNames[day]}</td>
            ${periods.slice(0, 3).map(p => `<td>${p.subjectBn}</td>`).join('')}
            ${isFirst ? '<td rowspan="5" class="break-cell">টিফিন</td>' : ''}
            ${periods.slice(3).map(p => `<td>${p.subjectBn}</td>`).join('')}
        </tr>`;
        isFirst = false;
    }
    
    routineBody.innerHTML = html;
}


/* ========================================
   Calendar Functions
   ======================================== */

let currentCalendarDate = new Date(2026, 0, 1); // Start with January 2026

const bengaliMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const bengaliDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBengaliNumber(num) {
    return num.toString().split('').map(d => bengaliNumbers[parseInt(d)]).join('');
}

function initCalendar() {
    renderCalendar();
    
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth')?.addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update header
    document.getElementById('currentMonthYear').textContent = 
        `${bengaliMonths[month]} ${toBengaliNumber(year)}`;
    
    // Get first day and total days
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Build calendar grid
    const grid = document.getElementById('calendarGrid');
    
    // Keep headers
    let html = `
        <div class="day-header">রবি</div>
        <div class="day-header">সোম</div>
        <div class="day-header">মঙ্গল</div>
        <div class="day-header">বুধ</div>
        <div class="day-header">বৃহঃ</div>
        <div class="day-header holiday-header">শুক্র</div>
        <div class="day-header">শনি</div>
    `;
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="day-cell empty"></div>';
    }
    
    // Days of month
    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDateStr(year, month + 1, day);
        const dayOfWeek = date.getDay();
        
        let classes = ['day-cell'];
        let holidayInfo = null;
        
        // Check if Friday (weekly holiday)
        if (dayOfWeek === 5) {
            classes.push('friday-holiday');
        }
        
        // Check if today
        if (date.toDateString() === today.toDateString()) {
            classes.push('today');
        }
        
        // Check for special holidays
        holidayInfo = getHolidayInfo(dateStr);
        if (holidayInfo) {
            classes.push('special-holiday');
        }
        
        html += `<div class="${classes.join(' ')}" data-date="${dateStr}" ${holidayInfo ? `data-holiday="${holidayInfo.nameBn}"` : ''} onclick="showHolidayPopup('${dateStr}')">
            <span class="day-num">${toBengaliNumber(day)}</span>
        </div>`;
    }
    
    grid.innerHTML = html;
    
    // Update monthly holiday list
    updateMonthlyHolidayList(year, month);
    
    // Update all holidays table
    updateAllHolidaysTable();
}

function formatDateStr(year, month, day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getHolidayInfo(dateStr) {
    if (!siteData.holidays.holidays) return null;
    
    for (const holiday of siteData.holidays.holidays) {
        // Single day holiday
        if (holiday.date === dateStr) {
            return holiday;
        }
        // Range holiday
        if (holiday.endDate && dateStr >= holiday.date && dateStr <= holiday.endDate) {
            return holiday;
        }
    }
    return null;
}

function showHolidayPopup(dateStr) {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    const holidayInfo = getHolidayInfo(dateStr);
    
    let message = '';
    
    if (dayOfWeek === 5) {
        message = '🕌 শুক্রবার - সাপ্তাহিক ছুটি';
    }
    
    if (holidayInfo) {
        if (message) message += '\n\n';
        message += `📅 ${holidayInfo.nameBn}`;
        if (holidayInfo.endDate) {
            message += `\n(${holidayInfo.date} থেকে ${holidayInfo.endDate} পর্যন্ত)`;
        }
    }
    
    if (message) {
        alert(message);
    }
}

function updateMonthlyHolidayList(year, month) {
    const listEl = document.getElementById('monthlyHolidayList');
    if (!listEl || !siteData.holidays.holidays) return;
    
    const monthHolidays = [];
    
    // Add all Fridays
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        if (d.getDay() === 5) {
            monthHolidays.push({
                date: formatDateStr(d.getFullYear(), d.getMonth() + 1, d.getDate()),
                nameBn: 'সাপ্তাহিক ছুটি (শুক্রবার)',
                type: 'weekly'
            });
        }
    }
    
    // Add special holidays
    siteData.holidays.holidays.forEach(holiday => {
        const hDate = new Date(holiday.date);
        if (hDate.getFullYear() === year && hDate.getMonth() === month) {
            monthHolidays.push(holiday);
        }
    });
    
    // Sort by date
    monthHolidays.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (monthHolidays.length === 0) {
        listEl.innerHTML = '<p class="no-holiday">এই মাসে কোন বিশেষ ছুটি নেই</p>';
        return;
    }
    
    listEl.innerHTML = monthHolidays.map(h => {
        const date = new Date(h.date);
        return `<div class="holiday-item ${h.type === 'weekly' ? 'weekly' : 'special'}">
            <span class="holiday-date">${toBengaliNumber(date.getDate())} ${bengaliMonths[date.getMonth()]}</span>
            <span class="holiday-day">${bengaliDays[date.getDay()]}</span>
            <span class="holiday-name">${h.nameBn}</span>
        </div>`;
    }).join('');
}

function updateAllHolidaysTable() {
    const tbody = document.getElementById('allHolidaysBody');
    if (!tbody || !siteData.holidays.holidays) return;
    
    const typeNames = {
        'national': 'জাতীয়',
        'religious': 'ধর্মীয়',
        'cultural': 'সাংস্কৃতিক',
        'vacation': 'ছুটি',
        'other': 'অন্যান্য'
    };
    
    tbody.innerHTML = siteData.holidays.holidays.map(h => {
        const date = new Date(h.date);
        let dateText = `${toBengaliNumber(date.getDate())} ${bengaliMonths[date.getMonth()]} ${toBengaliNumber(date.getFullYear())}`;
        
        if (h.endDate) {
            const endDate = new Date(h.endDate);
            dateText += ` - ${toBengaliNumber(endDate.getDate())} ${bengaliMonths[endDate.getMonth()]}`;
        }
        
        return `<tr>
            <td>${dateText}</td>
            <td>${bengaliDays[date.getDay()]}</td>
            <td>${h.nameBn}</td>
            <td><span class="holiday-type ${h.type}">${typeNames[h.type] || h.type}</span></td>
        </tr>`;
    }).join('');
}

// Load data on page load - Single initialization
document.addEventListener('DOMContentLoaded', async () => {
    // Load all JSON data
    await loadAllSiteData();
    
    // Load About Section
    loadAboutSection();
});


// Gallery Popup Functions
function openGalleryPopup(imgSrc, caption) {
    const popup = document.getElementById('galleryPopup');
    const popupImg = document.getElementById('popupImage');
    const popupCaption = document.getElementById('popupCaption');
    
    popupImg.src = imgSrc;
    popupImg.alt = caption;
    popupCaption.textContent = caption;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryPopup() {
    const popup = document.getElementById('galleryPopup');
    popup.classList.remove('active');
    document.body.style.overflow = '';
}

// Close popup on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeGalleryPopup();
    }
});

// Load About Section from school_info.json
async function loadAboutSection() {
    const aboutText = document.getElementById('aboutText');
    const aboutImage = document.getElementById('aboutImage');
    
    if (!aboutText) return;
    
    try {
        const response = await fetch('app_preview/data/school_info.json');
        const data = await response.json();
        
        if (!data.aboutSection) return;
        
        // Build description paragraphs
        let html = data.aboutSection.description.map(p => `<p>${p}</p>`).join('');
        
        // Build features list
        html += '<div class="features-list">';
        html += data.aboutSection.features.map(feature => `
            <div class="feature">
                <i class="fas fa-check-circle"></i>
                <span>${feature}</span>
            </div>
        `).join('');
        html += '</div>';
        
        aboutText.innerHTML = html;
        
        // Set image
        if (aboutImage && data.aboutSection.image) {
            aboutImage.innerHTML = `<img src="${data.aboutSection.image}" alt="স্কুল ভবন">`;
        }
    } catch (error) {
        console.error('Error loading about section:', error);
    }
}


// Collapsible Toggle Function
function toggleCollapsible(header) {
    const collapsible = header.parentElement;
    collapsible.classList.toggle('active');
}

// App Guide Toggle Functions
function toggleAppGuide() {
    const header = document.querySelector('.app-guide-header');
    const content = document.getElementById('appGuideContent');
    const icon = document.getElementById('guideToggleIcon');
    
    header.classList.toggle('active');
    content.classList.toggle('hidden');
}

function toggleGuideItem(headerElement) {
    const content = headerElement.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Toggle current item
    headerElement.classList.toggle('active');
    content.classList.toggle('active');
}

// Download Routine as PDF
function downloadRoutinePDF() {
    // Get current active class tab
    const activeTab = document.querySelector('.routine-tabs .tab-btn.active');
    const className = activeTab ? activeTab.textContent : 'ষষ্ঠ শ্রেণি';
    
    // Get routine table data
    const table = document.querySelector('.routine-table');
    if (!table) {
        alert('রুটিন টেবিল পাওয়া যায়নি');
        return;
    }
    
    // Create a printable version
    const printWindow = window.open('', '_blank');
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <title>ক্লাস রুটিন - ${className} - ডেমো উচ্চ বিদ্যালয়</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Noto Sans Bengali', sans-serif; 
                    padding: 30px;
                    background: white;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #333;
                    padding-bottom: 20px;
                }
                .header h1 { font-size: 24px; margin-bottom: 5px; }
                .header h2 { font-size: 18px; color: #666; margin-bottom: 10px; }
                .header p { font-size: 14px; color: #888; }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #333;
                    padding: 12px 8px;
                    text-align: center;
                    font-size: 14px;
                }
                th {
                    background: #2563eb;
                    color: white;
                    font-weight: 600;
                }
                tr:nth-child(even) { background: #f5f5f5; }
                .break-cell { 
                    background: #fef3c7 !important; 
                    font-weight: 600;
                    color: #92400e;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #888;
                }
                @media print {
                    body { padding: 20px; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>ডেমো উচ্চ বিদ্যালয়</h1>
                <h2>সাপ্তাহিক ক্লাস রুটিন - ${className}</h2>
                <p>শিক্ষাবর্ষ: ২০২৬</p>
            </div>
            ${table.outerHTML}
            <div class="footer">
                <p>© ২০২৫ ডেমো উচ্চ বিদ্যালয় | এই রুটিন পরিবর্তনযোগ্য</p>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                }
            <\/script>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
}


// ========================================
// Phone Resize Functionality
// ========================================

function initPhoneResize() {
    const phoneFrame = document.getElementById('phoneFrame');
    const resizeHandle = document.getElementById('phoneResizeHandle');
    
    if (!phoneFrame) return;
    
    // Check if mobile (handle visible) or desktop (CSS resize)
    const isMobile = window.innerWidth < 768;
    
    if (isMobile && resizeHandle) {
        // Mobile: Use custom resize handle
        initMobileResize(phoneFrame, resizeHandle);
    }
    
    // Restore saved size
    restoreSavedSize(phoneFrame);
    
    // Save size on resize (for both mobile and desktop)
    const resizeObserver = new ResizeObserver(() => {
        const rect = phoneFrame.getBoundingClientRect();
        localStorage.setItem('phoneWidth', rect.width);
        localStorage.setItem('phoneHeight', rect.height);
    });
    resizeObserver.observe(phoneFrame);
}

function initMobileResize(phoneFrame, resizeHandle) {
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    
    // Minimum and maximum sizes
    const minWidth = 200;
    const maxWidth = 400;
    const aspectRatio = 650 / 320; // height / width
    
    resizeHandle.addEventListener('mousedown', startResize);
    resizeHandle.addEventListener('touchstart', startResize, { passive: false });
    
    function startResize(e) {
        e.preventDefault();
        isResizing = true;
        
        const rect = phoneFrame.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;
        
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }
        
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('touchmove', resize, { passive: false });
        document.addEventListener('touchend', stopResize);
        
        // Add resizing class for visual feedback
        phoneFrame.style.transition = 'none';
        resizeHandle.style.background = '#4ade80';
        resizeHandle.style.color = '#000';
    }
    
    function resize(e) {
        if (!isResizing) return;
        e.preventDefault();
        
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        // Calculate new width based on mouse movement
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        // Use the larger delta for proportional resize
        const delta = Math.max(deltaX, deltaY);
        
        let newWidth = startWidth + delta;
        
        // Clamp to min/max
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        
        // Calculate height maintaining aspect ratio
        const newHeight = newWidth * aspectRatio;
        
        // Apply new size
        phoneFrame.style.width = newWidth + 'px';
        phoneFrame.style.height = newHeight + 'px';
    }
    
    function stopResize() {
        isResizing = false;
        
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('touchmove', resize);
        document.removeEventListener('touchend', stopResize);
        
        // Remove resizing visual feedback
        phoneFrame.style.transition = '';
        resizeHandle.style.background = '';
        resizeHandle.style.color = '';
    }
}

function restoreSavedSize(phoneFrame) {
    const savedWidth = localStorage.getItem('phoneWidth');
    const savedHeight = localStorage.getItem('phoneHeight');
    
    if (savedWidth && savedHeight) {
        const width = parseFloat(savedWidth);
        const height = parseFloat(savedHeight);
        
        // Validate saved size
        if (width >= 200 && width <= 450 && height >= 400 && height <= 900) {
            phoneFrame.style.width = width + 'px';
            phoneFrame.style.height = height + 'px';
        }
    }
}

// Initialize phone resize on DOM ready
document.addEventListener('DOMContentLoaded', initPhoneResize);
