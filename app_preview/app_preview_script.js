/* App Preview - With Bangla/English Support */

let currentTab = 'home';
let screenHistory = [];
let currentLang = 'en';

// Translations
const translations = {
    en: {
        home: 'Home', results: 'Results', payments: 'Payments',
        attendance: 'Attendance', profile: 'Profile', settings: 'Settings',
        login: 'Login', apply: 'Apply', logout: 'Logout',
        email: 'Email', password: 'Password', forgotPassword: 'Forgot Password?',
        appName: 'School Management', loginSubtitle: 'Login to your account',
        helpText: 'Contact school office for help',
        welcome: 'Welcome!', quickActions: 'Quick Actions',
        progress: 'Progress', rankings: 'Rankings',
        quickStats: 'Quick Stats', attendanceLabel: 'Attendance',
        classPosition: 'Class Position', dueFee: 'Due Fee', average: 'Average',
        recentResults: 'Recent Results', viewAll: 'View All',
        monthlyTest: 'Monthly Test - December', obtained: 'Obtained',
        percentage: 'Percentage', position: 'Position', passed: 'Passed',
        all: 'All', monthly: 'Monthly', term: 'Term', annual: 'Annual',
        paymentMethod: 'Payment Method', bkash: 'bKash', cash: 'Cash', card: 'Card',
        paymentHistory: 'Payment History', payNow: 'Pay Now',
        dueAmount: 'Due', lastPayDate: 'Last payment date',
        present: 'Present', absent: 'Absent', late: 'Late', holiday: 'Holiday',
        recentAttendance: 'Recent Attendance',
        studentInfo: 'Student Info', guardianInfo: 'Guardian Info',
        name: 'Name', className: 'Class', section: 'Section',
        rollNumber: 'Roll Number', academicYear: 'Academic Year', dob: 'Date of Birth',
        fatherName: "Father's Name", motherName: "Mother's Name",
        mobile: 'Mobile', address: 'Address',
        appearance: 'Appearance', theme: 'Theme', darkMode: 'Dark Mode',
        language: 'Language', school: 'School',
        teachersPanel: 'Teachers Panel', viewTeachers: 'View all teachers info',
        classRoutine: 'Class Routine', classSchedule: 'Class schedule',
        notifications: 'Notifications', pushNotifications: 'Push Notifications',
        resultPaymentUpdates: 'Result & payment updates'
    },
    bn: {
        home: 'হোম', results: 'ফলাফল', payments: 'পেমেন্ট',
        attendance: 'উপস্থিতি', profile: 'প্রোফাইল', settings: 'সেটিংস',
        login: 'লগইন', apply: 'আবেদন', logout: 'লগআউট',
        email: 'ইমেইল', password: 'পাসওয়ার্ড', forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
        appName: 'স্কুল ম্যানেজমেন্ট', loginSubtitle: 'আপনার অ্যাকাউন্টে লগইন করুন',
        helpText: 'সমস্যা হলে স্কুল অফিসে যোগাযোগ করুন',
        welcome: 'স্বাগতম!', quickActions: 'দ্রুত অ্যাকশন',
        progress: 'অগ্রগতি', rankings: 'র‍্যাংকিং',
        quickStats: 'দ্রুত পরিসংখ্যান', attendanceLabel: 'উপস্থিতি',
        classPosition: 'শ্রেণিতে অবস্থান', dueFee: 'বকেয়া ফি', average: 'গড়',
        recentResults: 'সাম্প্রতিক ফলাফল', viewAll: 'সব দেখুন',
        monthlyTest: 'মাসিক পরীক্ষা - ডিসেম্বর', obtained: 'প্রাপ্ত',
        percentage: 'শতাংশ', position: 'অবস্থান', passed: 'উত্তীর্ণ',
        all: 'সব', monthly: 'মাসিক', term: 'সাময়িক', annual: 'বার্ষিক',
        paymentMethod: 'পেমেন্ট পদ্ধতি', bkash: 'বিকাশ', cash: 'নগদ', card: 'কার্ড',
        paymentHistory: 'পেমেন্ট ইতিহাস', payNow: 'এখনই পরিশোধ করুন',
        dueAmount: 'বকেয়া', lastPayDate: 'পরিশোধের শেষ তারিখ',
        present: 'উপস্থিত', absent: 'অনুপস্থিত', late: 'বিলম্বে', holiday: 'ছুটি',
        recentAttendance: 'সাম্প্রতিক উপস্থিতি',
        studentInfo: 'ছাত্র তথ্য', guardianInfo: 'অভিভাবক তথ্য',
        name: 'নাম', className: 'শ্রেণি', section: 'শাখা',
        rollNumber: 'রোল নম্বর', academicYear: 'শিক্ষাবর্ষ', dob: 'জন্ম তারিখ',
        fatherName: 'পিতার নাম', motherName: 'মাতার নাম',
        mobile: 'মোবাইল', address: 'ঠিকানা',
        appearance: 'Appearance', theme: 'Theme', darkMode: 'Dark Mode',
        language: 'Language', school: 'School',
        teachersPanel: 'Teachers Panel', viewTeachers: 'View all teachers info',
        classRoutine: 'Class Routine', classSchedule: 'Class schedule',
        notifications: 'Notifications', pushNotifications: 'Push Notifications',
        resultPaymentUpdates: 'Result & payment updates'
    }
};


// Get translation
function t(key) {
    return translations[currentLang][key] || key;
}

// Update all translations
function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((btn.textContent.includes('English') && currentLang === 'en') ||
            (btn.textContent.includes('বাংলা') && currentLang === 'bn')) {
            btn.classList.add('active');
        }
    });
}

// Switch language
function switchLanguage(lang) {
    currentLang = lang;
    updateTranslations();
    localStorage.setItem('appLang', lang);
}

// Show Main App after Login
function showMainApp() {
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('mainAppScreen').classList.add('active');
}

// Logout
function logout() {
    document.getElementById('mainAppScreen').classList.remove('active');
    document.querySelectorAll('.sub-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('loginScreen').classList.add('active');
    switchTab('home');
}

// Switch Bottom Navigation Tabs
function switchTab(tab) {
    currentTab = tab;
    
    // Update nav items - all icons use fas (solid) class
    document.querySelectorAll('.nav-item').forEach(item => {
        const itemTab = item.dataset.tab;
        item.classList.remove('active');
        
        if (itemTab === tab) {
            item.classList.add('active');
        }
    });

    // Hide all content
    document.querySelectorAll('.screen-content').forEach(c => c.classList.add('hidden'));
    
    // Show selected content
    const content = document.getElementById(tab + 'Content');
    if (content) content.classList.remove('hidden');

    // Update title
    const titles = {
        home: t('home'),
        results: t('results'),
        payments: t('payments'),
        attendance: t('attendance'),
        profile: t('profile')
    };
    document.getElementById('screenTitle').textContent = titles[tab] || 'Home';

    // Hide sub screens
    document.querySelectorAll('.sub-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('bottomNav').style.display = 'flex';
    document.querySelector('.app-header').style.display = 'flex';
}


// Show Sub Screens
function showScreen(screenId) {
    screenHistory.push(currentTab);
    document.querySelectorAll('.screen-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(screenId).classList.add('active');
    document.getElementById('bottomNav').style.display = 'none';
    document.querySelector('.app-header').style.display = 'none';
    
    // Load data for specific screens
    if (screenId === 'teachersPanelScreen') {
        loadTeachersPanel();
    } else if (screenId === 'classRoutineScreen') {
        loadClassRoutine();
    }
}

// Load Teachers Panel
async function loadTeachersPanel() {
    const grid = document.getElementById('teachersGridApp');
    grid.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> লোড হচ্ছে...</div>';
    
    try {
        const response = await fetch('data/teachers.json');
        const data = await response.json();
        
        if (!data.teachers || data.teachers.length === 0) {
            grid.innerHTML = '<p class="no-data">কোন শিক্ষক তথ্য পাওয়া যায়নি</p>';
            return;
        }
        
        grid.innerHTML = data.teachers.map(teacher => `
            <div class="teacher-card-app">
                <div class="teacher-avatar-app ${teacher.nameBn.includes('খাতুন') || teacher.nameBn.includes('বেগম') || teacher.nameBn.includes('আক্তার') ? 'female' : ''}" 
                     ${teacher.imageUrl ? `onclick="showImagePopup('${teacher.imageUrl}')"` : ''}>
                    ${teacher.imageUrl ? `<img src="${teacher.imageUrl}" alt="${teacher.nameBn}">` : '<i class="fas fa-user-tie"></i>'}
                </div>
                <h4>${teacher.nameBn}</h4>
                <p class="designation">${teacher.designationBn}</p>
                <p class="subject">${teacher.subjectBn}</p>
                <div class="teacher-contact-app">
                    <a href="tel:${teacher.phone}"><i class="fas fa-phone"></i> ${teacher.phone}</a>
                    <a href="mailto:${teacher.email}"><i class="fas fa-envelope"></i> ${teacher.email}</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading teachers:', error);
        grid.innerHTML = '<p class="no-data">শিক্ষক তথ্য লোড করতে সমস্যা হয়েছে</p>';
    }
}

// Class Routine Data
let classRoutineData = null;
let currentClassIndex = 0;

// Load Class Routine
async function loadClassRoutine() {
    const tabs = document.getElementById('routineTabsApp');
    const tbody = document.getElementById('routineBodyApp');
    const thead = document.getElementById('routineHeadApp');
    
    tbody.innerHTML = '<tr><td colspan="6" class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> লোড হচ্ছে...</td></tr>';
    
    try {
        const response = await fetch('data/class_routine.json');
        classRoutineData = await response.json();
        
        if (!classRoutineData.classes || classRoutineData.classes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6">কোন রুটিন পাওয়া যায়নি</td></tr>';
            return;
        }
        
        // Create tabs
        tabs.innerHTML = classRoutineData.classes.map((cls, index) => 
            `<button class="routine-tab-btn ${index === 0 ? 'active' : ''}" onclick="switchRoutineTab(${index})">${cls.className}</button>`
        ).join('');
        
        // Create header
        const timing = classRoutineData.periodTiming;
        thead.innerHTML = `
            <tr>
                <th>দিন</th>
                <th>১ম পিরিয়ড<br><small>${timing.period1.start}-${timing.period1.end}</small></th>
                <th>২য় পিরিয়ড<br><small>${timing.period2.start}-${timing.period2.end}</small></th>
                <th>৩য় পিরিয়ড<br><small>${timing.period3.start}-${timing.period3.end}</small></th>
                <th>বিরতি<br><small>${timing.tiffinBreak.start}-${timing.tiffinBreak.end}</small></th>
                <th>৪র্থ পিরিয়ড<br><small>${timing.period5.start}-${timing.period5.end}</small></th>
            </tr>
        `;
        
        // Render first class
        renderRoutineTableApp(0);
    } catch (error) {
        console.error('Error loading routine:', error);
        tbody.innerHTML = '<tr><td colspan="6">রুটিন লোড করতে সমস্যা হয়েছে</td></tr>';
    }
}

function switchRoutineTab(index) {
    currentClassIndex = index;
    document.querySelectorAll('.routine-tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    renderRoutineTableApp(index);
}

function renderRoutineTableApp(classIndex) {
    const tbody = document.getElementById('routineBodyApp');
    if (!classRoutineData) return;
    
    const classData = classRoutineData.classes[classIndex];
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
    
    tbody.innerHTML = html;
}

// Download Routine PDF
function downloadRoutinePDFApp() {
    if (!classRoutineData) return;
    
    const className = classRoutineData.classes[currentClassIndex]?.className || 'ক্লাস রুটিন';
    const table = document.getElementById('routineTableApp');
    
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
            <script>window.onload = function() { window.print(); }<\/script>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
}

// Show Settings
function showSettings() {
    screenHistory.push(currentTab);
    document.querySelectorAll('.screen-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('settingsContent').classList.remove('hidden');
    document.getElementById('bottomNav').style.display = 'none';
    document.querySelector('.app-header').style.display = 'none';
}

// Toggle Notices Panel
function toggleNoticesPanel() {
    const panel = document.getElementById('noticesPanel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        loadNoticesPanel();
    } else {
        panel.classList.add('hidden');
    }
}

// Load Notices into Panel
async function loadNoticesPanel() {
    const content = document.getElementById('noticesPanelContent');
    content.innerHTML = '<div class="no-notices"><i class="fas fa-spinner fa-spin"></i><p>লোড হচ্ছে...</p></div>';
    
    try {
        const response = await fetch('data/notices.json');
        const data = await response.json();
        
        if (!data.notices || data.notices.length === 0) {
            content.innerHTML = '<div class="no-notices"><i class="fas fa-bell-slash"></i><p>কোন নোটিশ নেই</p></div>';
            return;
        }
        
        const sortedNotices = data.notices
            .filter(n => n.isActive)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        content.innerHTML = sortedNotices.map(notice => `
            <div class="notice-item ${notice.type === 'urgent' ? 'urgent' : ''}">
                <div class="notice-item-header">
                    <div class="notice-item-date">
                        <span class="day">${notice.day}</span>
                        <span class="month">${notice.month}</span>
                    </div>
                    <span class="notice-item-badge ${notice.type}">${notice.typeBn}</span>
                </div>
                <h4>${notice.titleBn}</h4>
                <p>${notice.contentBn}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading notices:', error);
        content.innerHTML = '<div class="no-notices"><i class="fas fa-exclamation-triangle"></i><p>নোটিশ লোড করতে সমস্যা হয়েছে</p></div>';
    }
}

// Go Back
function goBack() {
    document.querySelectorAll('.sub-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('bottomNav').style.display = 'flex';
    document.querySelector('.app-header').style.display = 'flex';
    const previousTab = screenHistory.pop() || 'home';
    switchTab(previousTab);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language
    const savedLang = localStorage.getItem('appLang') || 'en';
    currentLang = savedLang;
    updateTranslations();
    
    // Login tabs
    document.querySelectorAll('.login-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.login-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Payment method buttons
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Language toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.textContent.includes('English') ? 'en' : 'bn';
            switchLanguage(lang);
        });
    });

    // Password toggle
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});


// Image Popup Functions
function showImagePopup(imageSrc) {
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    popupImage.src = imageSrc;
    popup.classList.add('active');
}

function hideImagePopup() {
    const popup = document.getElementById('imagePopup');
    popup.classList.remove('active');
}

// App Download Popup Functions
const popupMessages = {
    payment: {
        title: 'পেমেন্ট করুন',
        message: 'ছাত্র/ছাত্রীদের বকেয়া পরিশোধ করতে অ্যাপ ব্যবহার করুন।'
    },
    result: {
        title: 'রিয়াল তথ্য দেখুন',
        message: 'এখানকার সকল তথ্যই মক বা ডেমো। রিয়াল তথ্য দেখতে অ্যাপ এ লগইন করুন।'
    },
    settings: {
        title: 'সকল সুবিধা পান',
        message: 'সকল সুবিধা উপভোগ করতে অ্যাপ ব্যবহার করুন।'
    },
    attendance: {
        title: 'উপস্থিতি দেখুন',
        message: 'ছাত্র/ছাত্রীদের উপস্থিতি দেখতে অ্যাপ ব্যবহার করুন।'
    }
};

function showAppPopup(type) {
    const popup = document.getElementById('appDownloadPopup');
    const title = document.getElementById('popupTitle');
    const message = document.getElementById('popupMessage');
    
    const content = popupMessages[type] || popupMessages.settings;
    title.textContent = content.title;
    message.textContent = content.message;
    
    popup.classList.add('active');
}

function hideAppDownloadPopup(event) {
    if (event && event.target !== event.currentTarget) return;
    const popup = document.getElementById('appDownloadPopup');
    popup.classList.remove('active');
}

// Login Tab Switching
function showLoginTab(tab) {
    const loginContent = document.getElementById('loginTabContent');
    const applyContent = document.getElementById('applyTabContent');
    const tabBtns = document.querySelectorAll('.login-tabs .tab-btn');
    
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'login') {
        loginContent.classList.remove('hidden');
        applyContent.classList.add('hidden');
        tabBtns[0].classList.add('active');
    } else {
        loginContent.classList.add('hidden');
        applyContent.classList.remove('hidden');
        tabBtns[1].classList.add('active');
    }
}

// Close popup on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideImagePopup();
    }
});
