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
