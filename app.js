// Application State
let currentPage = 'dashboard';
let medications = [];
let labResults = null;
let userProfile = {};
let dashboardStats = {};

// Sample data from the application
const sampleData = {
  "sampleLabResults": {
    "testType": "Complete Blood Count (CBC)",
    "date": "2025-09-20",
    "currentAiSummary": "Your recent CBC results indicate mild anemia with low hemoglobin and hematocrit levels, while platelets are slightly elevated suggesting possible inflammation. Your iron supplement regimen appears to be helping, and consistency with medications has improved. Continue current treatment plan and consider adding vitamin C to enhance iron absorption.",
    "aiSummaryHistory": [
      {
        "date": "2025-09-20",
        "testType": "Complete Blood Count (CBC)",
        "summary": "Your recent CBC results indicate mild anemia with low hemoglobin and hematocrit levels, while platelets are slightly elevated suggesting possible inflammation. Your iron supplement regimen appears to be helping, and consistency with medications has improved. Continue current treatment plan and consider adding vitamin C to enhance iron absorption."
      },
      {
        "date": "2025-08-15",
        "testType": "Basic Metabolic Panel",
        "summary": "Your glucose levels are well-controlled with current medication. Kidney function markers are normal. Continue monitoring blood sugar and maintain current diabetic medication schedule for optimal management."
      },
      {
        "date": "2025-07-10",
        "testType": "Lipid Panel",
        "summary": "Cholesterol levels have improved since starting dietary changes. HDL is within normal range, but LDL remains slightly elevated. Consider increasing omega-3 rich foods and maintaining regular exercise routine."
      },
      {
        "date": "2025-06-05",
        "testType": "Thyroid Function Tests",
        "summary": "Thyroid function is normal across all markers. TSH levels are stable, indicating good thyroid health. Continue current monitoring schedule and maintain healthy lifestyle habits."
      }
    ]
  },
  "sampleMedications": [
    {
      "id": "med1",
      "name": "Iron Supplement",
      "dosage": 65,
      "unit": "mg",
      "frequency": "once_daily",
      "times": ["08:00"],
      "instructions": "Take with vitamin C for better absorption",
      "withFood": true,
      "active": true,
      "consistencyRate": 85,
      "lastTaken": null,
      "nextDue": "2025-09-26T08:00:00"
    },
    {
      "id": "med2", 
      "name": "Vitamin D3",
      "dosage": 1000,
      "unit": "IU",
      "frequency": "once_daily",
      "times": ["20:00"],
      "instructions": "Take with evening meal",
      "withFood": true,
      "active": true,
      "consistencyRate": 92,
      "lastTaken": "2025-09-25T20:00:00",
      "nextDue": "2025-09-26T20:00:00"
    },
    {
      "id": "med3",
      "name": "Metformin",
      "dosage": 500,
      "unit": "mg", 
      "frequency": "twice_daily",
      "times": ["08:00", "20:00"],
      "instructions": "Take with meals to reduce stomach upset",
      "withFood": true,
      "active": true,
      "consistencyRate": 78,
      "lastTaken": "2025-09-26T08:00:00",
      "nextDue": "2025-09-26T20:00:00"
    }
  ],
  "userProfile": {
    "name": "Sarah Johnson",
    "age": 34,
    "height": "5'6\"",
    "weight": "145 lbs",
    "gender": "Female",
    "bloodType": "O+",
    "conditions": ["Type 2 Diabetes", "Iron Deficiency Anemia"],
    "allergies": ["Penicillin", "Shellfish"],
    "emergencyContact": {
      "name": "Michael Johnson",
      "relation": "Spouse", 
      "phone": "+1 (555) 123-4567"
    },
    "notificationPreferences": {
      "emailReminders": true,
      "pushNotifications": true,
      "soundAlerts": false,
      "reminderAdvance": 30
    }
  },
  "dashboardStats": {
    "lastTestDate": "September 20, 2025",
    "aiHealthSummary": "Recent lab work shows improvement in anemia management with current iron supplementation. Blood sugar levels remain well-controlled with Metformin. Your medication consistency has improved significantly over the past month, which is contributing to better health outcomes. Continue current treatment plan and consider adding vitamin C to enhance iron absorption effectiveness.",
    "activeMedications": 3,
    "consistencyRate": 85
  }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    
    // Load sample data
    medications = [...sampleData.sampleMedications];
    labResults = { ...sampleData.sampleLabResults };
    userProfile = { ...sampleData.userProfile };
    dashboardStats = { ...sampleData.dashboardStats };

    console.log('Loaded medications:', medications);
    console.log('Loaded lab results:', labResults);

    // Set up navigation
    setupNavigation();
    
    // Initialize pages
    initializeDashboard();
    initializeLabResults();
    initializeMedications();
    initializeProfile();
    
    // Set up file uploads
    setupFileUploads();
    
    // Set up modal - do this after DOM is ready
    setTimeout(() => {
        setupModal();
    }, 100);
    
    // Show dashboard by default
    showPage('dashboard');
    
    // Update user name in header
    const userNameEl = document.getElementById('user-name');
    if (userNameEl && userProfile.name) {
        userNameEl.textContent = userProfile.name.split(' ')[0];
    }
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
}

function showPage(pageName) {
    console.log('Switching to page:', pageName);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`${pageName}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'lab-results': 'Lab Results',
        'medications': 'Medications',
        'profile': 'Profile'
    };
    
    const titleEl = document.getElementById('page-title');
    if (titleEl) {
        titleEl.textContent = titles[pageName] || 'MedSync';
    }
    
    currentPage = pageName;

    // Refresh page content when switching
    if (pageName === 'medications') {
        renderMedicationsGrid();
        // Re-setup modal when switching to medications page
        setTimeout(() => {
            setupModal();
        }, 100);
    } else if (pageName === 'dashboard') {
        renderTodaysMedications();
    } else if (pageName === 'lab-results') {
        renderAiHistory();
    }
}

// Dashboard
function initializeDashboard() {
    console.log('Initializing dashboard...');
    updateDashboardStats();
    renderTodaysMedications();
}

function updateDashboardStats() {
    console.log('Updating dashboard stats:', dashboardStats);
    
    const lastTestEl = document.getElementById('last-test-date');
    const aiHealthSummaryEl = document.getElementById('ai-health-summary');
    const activeMedsEl = document.getElementById('active-meds');
    const consistencyRateEl = document.getElementById('consistency-rate');
    
    if (lastTestEl) lastTestEl.textContent = dashboardStats.lastTestDate;
    if (aiHealthSummaryEl) aiHealthSummaryEl.textContent = dashboardStats.aiHealthSummary;
    if (activeMedsEl) activeMedsEl.textContent = dashboardStats.activeMedications;
    if (consistencyRateEl) consistencyRateEl.textContent = dashboardStats.consistencyRate + '%';
}

function renderTodaysMedications() {
    console.log('Rendering today\'s medications...');
    const container = document.getElementById('today-meds-list');
    if (!container) return;
    
    const todayMeds = getTodaysMedications();
    console.log('Today\'s medications:', todayMeds);
    
    if (todayMeds.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: var(--color-text-secondary); padding: var(--space-20);">No medications scheduled for today.</p>';
        return;
    }
    
    container.innerHTML = todayMeds.map(med => {
        const nextDue = new Date(med.nextDue);
        const now = new Date();
        const isOverdue = nextDue < now;
        const isDueSoon = (nextDue - now) <= 30 * 60 * 1000; // 30 minutes
        
        let statusClass = 'on-time';
        if (isOverdue) statusClass = 'overdue';
        else if (isDueSoon) statusClass = 'due-soon';
        
        const isTaken = med.lastTaken && new Date(med.lastTaken).toDateString() === now.toDateString();
        
        return `
            <div class="medication-item ${statusClass}">
                <div class="medication-info">
                    <h4>${med.name}</h4>
                    <p>${med.dosage} ${med.unit} - Due at ${formatTime(med.times[0])}</p>
                </div>
                <div class="medication-actions">
                    <button class="btn ${isTaken ? 'btn--outline' : 'btn--primary'}" 
                            ${isTaken ? 'disabled' : ''} 
                            onclick="takeMedication('${med.id}', this)">
                        ${isTaken ? 'Taken' : 'Take Now'}
                    </button>
                    <button class="btn btn--outline btn--sm" onclick="remindMedication('${med.id}')">
                        <i class="fas fa-bell"></i> Remind
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getTodaysMedications() {
    const now = new Date();
    const today = now.toDateString();
    
    // For demo purposes, show all active medications as "due today"
    return medications.filter(med => med.active);
}

function getMedicationStatus(med) {
    const now = new Date();
    const nextDue = new Date(med.nextDue);
    
    if (nextDue < now) return 'overdue';
    if ((nextDue - now) <= 30 * 60 * 1000) return 'due-soon';
    return 'on-time';
}

// Lab Results
function initializeLabResults() {
    console.log('Initializing lab results...');
    renderCurrentAiSummary();
    renderAiHistory();
}

function renderCurrentAiSummary() {
    const currentTestTypeEl = document.getElementById('current-test-type');
    const currentTestDateEl = document.getElementById('current-test-date');
    const currentAnalysisSummaryEl = document.getElementById('current-analysis-summary');
    
    if (currentTestTypeEl && labResults) currentTestTypeEl.textContent = labResults.testType;
    if (currentTestDateEl && labResults) currentTestDateEl.textContent = formatDate(labResults.date);
    if (currentAnalysisSummaryEl && labResults) currentAnalysisSummaryEl.textContent = labResults.currentAiSummary;
}

function renderAiHistory() {
    const container = document.getElementById('ai-history-list');
    if (!container || !labResults || !labResults.aiSummaryHistory) return;
    
    container.innerHTML = labResults.aiSummaryHistory.map(item => `
        <div class="ai-history-item">
            <div class="ai-history-header">
                <h4>${item.testType}</h4>
                <span class="ai-history-date">${formatDate(item.date)}</span>
            </div>
            <p class="ai-history-summary">${item.summary}</p>
        </div>
    `).join('');
}

// Medications
function initializeMedications() {
    console.log('Initializing medications...');
    renderMedicationsGrid();
    setupMedicationForm();
}

function renderMedicationsGrid() {
    console.log('Rendering medications grid...');
    const container = document.getElementById('medications-grid');
    if (!container) return;
    
    const activeMeds = medications.filter(med => med.active);
    console.log('Active medications:', activeMeds);
    
    if (activeMeds.length === 0) {
        container.innerHTML = '<p class="text-center" style="color: var(--color-text-secondary); padding: var(--space-20); grid-column: 1/-1;">No medications added yet.</p>';
        return;
    }
    
    container.innerHTML = activeMeds.map(med => {
        const status = getMedicationStatus(med);
        const nextDue = new Date(med.nextDue);
        const isTaken = med.lastTaken && new Date(med.lastTaken).toDateString() === new Date().toDateString();
        
        return `
            <div class="medication-card ${status}">
                <div class="medication-header">
                    <h4>${med.name}</h4>
                    <p class="medication-dosage">${med.dosage} ${med.unit}</p>
                    <p class="medication-schedule">${formatFrequency(med.frequency)} at ${med.times.map(formatTime).join(', ')}</p>
                </div>
                
                <div class="consistency-section">
                    <div class="consistency-label">
                        <span>Consistency</span>
                        <span>${med.consistencyRate}%</span>
                    </div>
                    <div class="consistency-bar">
                        <div class="consistency-fill" style="width: ${med.consistencyRate}%"></div>
                    </div>
                </div>
                
                <div class="next-dose">
                    <strong>Next dose:</strong> ${formatDateTime(nextDue)}
                </div>
                
                <div class="medication-card-actions">
                    <button class="btn ${isTaken ? 'btn--outline' : 'btn--primary'} btn--sm" 
                            ${isTaken ? 'disabled' : ''} 
                            onclick="takeMedication('${med.id}', this)">
                        ${isTaken ? 'Taken' : 'Take Now'}
                    </button>
                    <button class="btn btn--outline btn--sm" onclick="remindMedication('${med.id}')">
                        <i class="fas fa-bell"></i> Remind
                    </button>
                    <button class="btn btn--outline btn--sm" onclick="deleteMedication('${med.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function takeMedication(medId, button) {
    console.log('Taking medication:', medId);
    const med = medications.find(m => m.id === medId);
    if (!med) return;
    
    // Update medication record
    med.lastTaken = new Date().toISOString();
    
    // Calculate next due time
    const now = new Date();
    const nextDue = new Date(med.nextDue);
    
    switch (med.frequency) {
        case 'once_daily':
            nextDue.setDate(nextDue.getDate() + 1);
            break;
        case 'twice_daily':
            nextDue.setHours(nextDue.getHours() + 12);
            break;
        case 'three_times_daily':
            nextDue.setHours(nextDue.getHours() + 8);
            break;
    }
    
    med.nextDue = nextDue.toISOString();
    
    // Update button
    if (button) {
        button.textContent = 'Taken';
        button.classList.remove('btn--primary');
        button.classList.add('btn--outline');
        button.disabled = true;
    }
    
    // Update consistency (simplified calculation)
    med.consistencyRate = Math.min(100, med.consistencyRate + 2);
    
    // Refresh displays
    if (currentPage === 'medications') {
        renderMedicationsGrid();
    }
    
    if (currentPage === 'dashboard') {
        renderTodaysMedications();
        updateDashboardStats();
    }
    
    showToast('Medication marked as taken!', 'success');
}

function remindMedication(medId) {
    const med = medications.find(m => m.id === medId);
    if (!med) return;
    
    // Show reminder notification
    showToast(`Reminder set for ${med.name}! You'll be notified 15 minutes before your next dose.`, 'info');
    
    // In a real app, this would set up an actual notification
    console.log('Reminder set for medication:', med.name);
}

function deleteMedication(medId) {
    console.log('Attempting to delete medication with ID:', medId);
    
    const med = medications.find(m => m.id === medId);
    if (!med) {
        console.error('Medication not found with ID:', medId);
        showToast('Error: Medication not found.', 'error');
        return;
    }
    
    // Show confirmation modal
    showConfirmationModal(
        'Delete Medication',
        `Are you sure you want to delete ${med.name}? This action cannot be undone.`,
        () => {
            // Confirmed - proceed with deletion
            const index = medications.findIndex(m => m.id === medId);
            console.log('Found medication at index:', index);
            
            if (index !== -1) {
                // Mark as inactive instead of removing from array
                medications[index].active = false;
                console.log('Marked medication as inactive:', medications[index]);
                
                // Update active medication count
                const activeMedicationCount = medications.filter(m => m.active).length;
                dashboardStats.activeMedications = activeMedicationCount;
                console.log('Updated active medication count:', activeMedicationCount);
                
                // Refresh all displays
                if (currentPage === 'medications') {
                    renderMedicationsGrid();
                }
                
                if (currentPage === 'dashboard') {
                    renderTodaysMedications();
                    updateDashboardStats();
                }
                
                showToast(`${med.name} deleted successfully!`, 'success');
            } else {
                console.error('Medication not found with ID:', medId);
                showToast('Error: Medication not found.', 'error');
            }
        }
    );
}

// Confirmation Modal Functions
function showConfirmationModal(title, message, onConfirm) {
    const modal = document.getElementById('confirmation-modal');
    const titleEl = document.getElementById('confirmation-title');
    const messageEl = document.getElementById('confirmation-message');
    const confirmBtn = document.getElementById('confirmation-confirm-btn');
    const cancelBtn = document.getElementById('confirmation-cancel-btn');
    const closeBtn = document.getElementById('confirmation-close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    if (!modal || !titleEl || !messageEl || !confirmBtn || !cancelBtn) {
        console.error('Confirmation modal elements not found');
        return;
    }
    
    // Set content
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Show modal
    modal.classList.remove('hidden');
    
    // Set up event listeners
    function hideModal() {
        modal.classList.add('hidden');
        // Clean up event listeners
        confirmBtn.removeEventListener('click', confirmHandler);
        cancelBtn.removeEventListener('click', hideModal);
        if (closeBtn) closeBtn.removeEventListener('click', hideModal);
        if (overlay) overlay.removeEventListener('click', hideModal);
    }
    
    function confirmHandler() {
        hideModal();
        if (onConfirm) onConfirm();
    }
    
    confirmBtn.addEventListener('click', confirmHandler);
    cancelBtn.addEventListener('click', hideModal);
    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (overlay) overlay.addEventListener('click', hideModal);
}

// Profile
function initializeProfile() {
    console.log('Initializing profile...');
    populateProfileForm();
    setupProfileForm();
}

function populateProfileForm() {
    console.log('Populating profile form...');
    
    // Basic information
    const profileNameEl = document.getElementById('profile-name');
    const profileAgeEl = document.getElementById('profile-age');
    const profileHeightEl = document.getElementById('profile-height');
    const profileWeightEl = document.getElementById('profile-weight');
    const profileGenderEl = document.getElementById('profile-gender');
    const profileBloodTypeEl = document.getElementById('profile-blood-type');
    
    if (profileNameEl) profileNameEl.value = userProfile.name || '';
    if (profileAgeEl) profileAgeEl.value = userProfile.age || '';
    if (profileHeightEl) profileHeightEl.value = userProfile.height || '';
    if (profileWeightEl) profileWeightEl.value = userProfile.weight || '';
    if (profileGenderEl) profileGenderEl.value = userProfile.gender || '';
    if (profileBloodTypeEl) profileBloodTypeEl.value = userProfile.bloodType || '';
    
    // Emergency contact
    const emergencyNameEl = document.getElementById('emergency-name');
    const emergencyRelationEl = document.getElementById('emergency-relation');
    const emergencyPhoneEl = document.getElementById('emergency-phone');
    
    if (emergencyNameEl && userProfile.emergencyContact) emergencyNameEl.value = userProfile.emergencyContact.name || '';
    if (emergencyRelationEl && userProfile.emergencyContact) emergencyRelationEl.value = userProfile.emergencyContact.relation || '';
    if (emergencyPhoneEl && userProfile.emergencyContact) emergencyPhoneEl.value = userProfile.emergencyContact.phone || '';
    
    // Notification preferences
    const emailRemindersEl = document.getElementById('email-reminders');
    const pushNotificationsEl = document.getElementById('push-notifications');
    const soundAlertsEl = document.getElementById('sound-alerts');
    
    if (emailRemindersEl && userProfile.notificationPreferences) emailRemindersEl.checked = userProfile.notificationPreferences.emailReminders || false;
    if (pushNotificationsEl && userProfile.notificationPreferences) pushNotificationsEl.checked = userProfile.notificationPreferences.pushNotifications || false;
    if (soundAlertsEl && userProfile.notificationPreferences) soundAlertsEl.checked = userProfile.notificationPreferences.soundAlerts || false;
    
    // Populate tags
    renderTags('conditions', userProfile.conditions || []);
    renderTags('allergies', userProfile.allergies || []);
}

function renderTags(type, tags) {
    const container = document.getElementById(`${type}-container`);
    if (!container) return;
    
    container.innerHTML = tags.map(tag => `
        <span class="tag">
            ${tag}
            <button type="button" class="tag-remove" onclick="removeTag('${type}', '${tag}')">×</button>
        </span>
    `).join('');
}

function removeTag(type, tag) {
    if (type === 'conditions') {
        userProfile.conditions = userProfile.conditions.filter(c => c !== tag);
        renderTags('conditions', userProfile.conditions);
    } else if (type === 'allergies') {
        userProfile.allergies = userProfile.allergies.filter(a => a !== tag);
        renderTags('allergies', userProfile.allergies);
    }
}

function setupProfileForm() {
    // Tag inputs
    setupTagInput('conditions');
    setupTagInput('allergies');
    
    // Form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfile();
        });
    }
}

function setupTagInput(type) {
    const input = document.getElementById(`${type}-input`);
    if (!input) return;
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = this.value.trim();
            if (value) {
                addTag(type, value);
                this.value = '';
            }
        }
    });
}

function addTag(type, value) {
    if (type === 'conditions') {
        if (!userProfile.conditions) userProfile.conditions = [];
        if (!userProfile.conditions.includes(value)) {
            userProfile.conditions.push(value);
            renderTags('conditions', userProfile.conditions);
        }
    } else if (type === 'allergies') {
        if (!userProfile.allergies) userProfile.allergies = [];
        if (!userProfile.allergies.includes(value)) {
            userProfile.allergies.push(value);
            renderTags('allergies', userProfile.allergies);
        }
    }
}

function saveProfile() {
    const form = document.getElementById('profile-form');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    if (btnText) btnText.textContent = 'Saving...';
    if (btnLoader) btnLoader.classList.remove('hidden');
    if (submitBtn) submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update user profile
        const profileNameEl = document.getElementById('profile-name');
        const profileAgeEl = document.getElementById('profile-age');
        const profileHeightEl = document.getElementById('profile-height');
        const profileWeightEl = document.getElementById('profile-weight');
        const profileGenderEl = document.getElementById('profile-gender');
        const profileBloodTypeEl = document.getElementById('profile-blood-type');
        const emergencyNameEl = document.getElementById('emergency-name');
        const emergencyRelationEl = document.getElementById('emergency-relation');
        const emergencyPhoneEl = document.getElementById('emergency-phone');
        const emailRemindersEl = document.getElementById('email-reminders');
        const pushNotificationsEl = document.getElementById('push-notifications');
        const soundAlertsEl = document.getElementById('sound-alerts');
        
        if (profileNameEl) userProfile.name = profileNameEl.value;
        if (profileAgeEl) userProfile.age = parseInt(profileAgeEl.value) || 0;
        if (profileHeightEl) userProfile.height = profileHeightEl.value;
        if (profileWeightEl) userProfile.weight = profileWeightEl.value;
        if (profileGenderEl) userProfile.gender = profileGenderEl.value;
        if (profileBloodTypeEl) userProfile.bloodType = profileBloodTypeEl.value;
        
        userProfile.emergencyContact = {
            name: emergencyNameEl ? emergencyNameEl.value : '',
            relation: emergencyRelationEl ? emergencyRelationEl.value : '',
            phone: emergencyPhoneEl ? emergencyPhoneEl.value : ''
        };
        
        userProfile.notificationPreferences = {
            emailReminders: emailRemindersEl ? emailRemindersEl.checked : false,
            pushNotifications: pushNotificationsEl ? pushNotificationsEl.checked : false,
            soundAlerts: soundAlertsEl ? soundAlertsEl.checked : false
        };
        
        // Update header name
        const userNameEl = document.getElementById('user-name');
        if (userNameEl && userProfile.name) {
            userNameEl.textContent = userProfile.name.split(' ')[0];
        }
        
        // Reset button state
        if (btnText) btnText.textContent = 'Save Profile';
        if (btnLoader) btnLoader.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = false;
        
        showToast('Profile saved successfully!', 'success');
    }, 1500);
}

// File Upload
function setupFileUploads() {
    console.log('Setting up file uploads...');
    
    // Lab results upload only
    setupFileUpload('lab-upload-zone', 'lab-file-input', 'lab-upload-btn', 'lab-upload-progress', 'lab-progress-fill');
}

function setupFileUpload(zoneId, inputId, btnId, progressId, progressFillId) {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    
    if (!zone || !input || !btn) {
        console.log('File upload elements not found:', zoneId, inputId, btnId);
        return;
    }
    
    console.log('Setting up file upload for:', zoneId);
    
    // Button click
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Upload button clicked');
        input.click();
    });
    
    // File selection
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
            handleFileUpload(file, progressId, progressFillId);
        }
    });
    
    // Drag and drop
    zone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    zone.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    zone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            console.log('File dropped:', file.name);
            handleFileUpload(file, progressId, progressFillId);
        }
    });
    
    // Make zone clickable
    zone.addEventListener('click', function(e) {
        if (e.target === zone || e.target.tagName === 'I' || e.target.tagName === 'P') {
            input.click();
        }
    });
}

function handleFileUpload(file, progressId, progressFillId) {
    console.log('Handling file upload:', file.name, file.type);
    
    // Validate file type
    if (file.type !== 'application/pdf') {
        showToast('Please upload PDF files only.', 'error');
        return;
    }
    
    // Show progress
    const progressContainer = progressId ? document.getElementById(progressId) : null;
    const progressFill = progressFillId ? document.getElementById(progressFillId) : null;
    
    if (progressContainer && progressFill) {
        progressContainer.classList.remove('hidden');
        
        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    progressContainer.classList.add('hidden');
                    
                    // Generate new AI summary for the uploaded report
                    const newSummary = "New analysis from uploaded report shows continued improvement in overall health markers. Blood work indicates positive response to current treatment plan. Consistency with medication schedule is key to maintaining these positive trends.";
                    
                    // Update current AI summary
                    labResults.currentAiSummary = newSummary;
                    labResults.date = new Date().toISOString().split('T')[0];
                    
                    // Add to history
                    labResults.aiSummaryHistory.unshift({
                        date: labResults.date,
                        testType: "Complete Blood Count (CBC)",
                        summary: newSummary
                    });
                    
                    // Update dashboard
                    dashboardStats.lastTestDate = formatDate(labResults.date);
                    dashboardStats.aiHealthSummary = newSummary;
                    
                    // Refresh displays
                    if (currentPage === 'lab-results') {
                        renderCurrentAiSummary();
                        renderAiHistory();
                    }
                    if (currentPage === 'dashboard') {
                        updateDashboardStats();
                    }
                    
                    showToast('Lab report uploaded and AI analysis generated successfully!', 'success');
                }, 1000);
            }
            progressFill.style.width = progress + '%';
        }, 200);
    } else {
        // Generate new AI summary for the uploaded report
        const newSummary = "New analysis from uploaded report shows continued improvement in overall health markers. Blood work indicates positive response to current treatment plan. Consistency with medication schedule is key to maintaining these positive trends.";
        
        // Update current AI summary
        labResults.currentAiSummary = newSummary;
        labResults.date = new Date().toISOString().split('T')[0];
        
        // Add to history
        labResults.aiSummaryHistory.unshift({
            date: labResults.date,
            testType: "Complete Blood Count (CBC)",
            summary: newSummary
        });
        
        // Update dashboard
        dashboardStats.lastTestDate = formatDate(labResults.date);
        dashboardStats.aiHealthSummary = newSummary;
        
        // Refresh displays
        if (currentPage === 'lab-results') {
            renderCurrentAiSummary();
            renderAiHistory();
        }
        if (currentPage === 'dashboard') {
            updateDashboardStats();
        }
        
        showToast('Lab report uploaded and AI analysis generated successfully!', 'success');
    }
}

// Modal Management
function setupModal() {
    console.log('Setting up modal...');
    
    const modal = document.getElementById('add-medication-modal');
    const addBtn = document.getElementById('add-medication-btn');
    
    if (!modal) {
        console.log('Modal element not found');
        return;
    }
    
    if (!addBtn) {
        console.log('Add medication button not found');
        return;
    }
    
    console.log('Modal elements found, setting up event listeners');
    
    // Remove existing event listeners to prevent duplicates
    const newAddBtn = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newAddBtn, addBtn);
    
    // Show modal
    newAddBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Add medication button clicked - showing modal');
        showMedicationModal();
    });
    
    // Set up other modal controls
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideMedicationModal();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideMedicationModal();
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', hideMedicationModal);
    }
    
    // Frequency change handler
    const freqSelect = document.getElementById('med-frequency');
    if (freqSelect) {
        freqSelect.addEventListener('change', updateTimeInputs);
    }
    
    // Form submission
    const form = document.getElementById('medication-form');
    if (form) {
        // Remove existing listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Medication form submitted');
            addMedication();
        });
    }
}

function showMedicationModal() {
    console.log('Showing medication modal');
    const modal = document.getElementById('add-medication-modal');
    if (modal) {
        modal.classList.remove('hidden');
        resetMedicationForm();
    }
}

function hideMedicationModal() {
    console.log('Hiding medication modal');
    const modal = document.getElementById('add-medication-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function resetMedicationForm() {
    const form = document.getElementById('medication-form');
    if (form) {
        form.reset();
        updateTimeInputs();
    }
}

function updateTimeInputs() {
    const freqSelect = document.getElementById('med-frequency');
    const container = document.getElementById('time-inputs');
    const timesGroup = document.getElementById('times-group');
    
    if (!freqSelect || !container || !timesGroup) return;
    
    const frequency = freqSelect.value;
    
    if (frequency === 'as_needed') {
        timesGroup.style.display = 'none';
        return;
    }
    
    timesGroup.style.display = 'block';
    
    const timeCount = {
        'once_daily': 1,
        'twice_daily': 2,
        'three_times_daily': 3
    }[frequency] || 1;
    
    const defaultTimes = {
        1: ['08:00'],
        2: ['08:00', '20:00'],
        3: ['08:00', '14:00', '20:00']
    }[timeCount];
    
    container.innerHTML = '';
    
    for (let i = 0; i < timeCount; i++) {
        const timeGroup = document.createElement('div');
        timeGroup.className = 'time-input-group';
        
        timeGroup.innerHTML = `
            <input type="time" class="form-control" name="time-${i}" value="${defaultTimes[i]}" required>
            ${timeCount > 1 ? `<button type="button" class="remove-time" onclick="removeTimeInput(this)"><i class="fas fa-times"></i></button>` : ''}
        `;
        
        container.appendChild(timeGroup);
    }
}

function removeTimeInput(button) {
    button.parentElement.remove();
}

function addMedication() {
    console.log('Adding new medication...');
    
    const form = document.getElementById('medication-form');
    if (!form) return;
    
    // Collect time inputs
    const timeInputs = form.querySelectorAll('input[type="time"]');
    const times = Array.from(timeInputs).map(input => input.value);
    
    const medNameEl = document.getElementById('med-name');
    const medDosageEl = document.getElementById('med-dosage');
    const medUnitEl = document.getElementById('med-unit');
    const medFrequencyEl = document.getElementById('med-frequency');
    const medInstructionsEl = document.getElementById('med-instructions');
    const medWithFoodEl = document.getElementById('med-with-food');
    
    if (!medNameEl || !medDosageEl || !medUnitEl || !medFrequencyEl) {
        console.log('Required form elements not found');
        return;
    }
    
    if (!medNameEl.value || !medDosageEl.value || !medUnitEl.value || !medFrequencyEl.value) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }
    
    const newMed = {
        id: 'med' + Date.now(),
        name: medNameEl.value,
        dosage: parseInt(medDosageEl.value),
        unit: medUnitEl.value,
        frequency: medFrequencyEl.value,
        times: times,
        instructions: medInstructionsEl ? medInstructionsEl.value : '',
        withFood: medWithFoodEl ? medWithFoodEl.checked : false,
        active: true,
        consistencyRate: 100,
        lastTaken: null,
        nextDue: calculateNextDue(times[0] || '08:00', medFrequencyEl.value),
        createdAt: new Date().toISOString()
    };
    
    console.log('New medication:', newMed);
    
    medications.push(newMed);
    
    // Update dashboard stats
    dashboardStats.activeMedications = medications.filter(m => m.active).length;
    
    // Refresh displays
    renderMedicationsGrid();
    if (currentPage === 'dashboard') {
        renderTodaysMedications();
        updateDashboardStats();
    }
    
    // Hide modal
    hideMedicationModal();
    
    showToast(`${newMed.name} added successfully!`, 'success');
}

function calculateNextDue(time, frequency) {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    const nextDue = new Date();
    nextDue.setHours(hours, minutes, 0, 0);
    
    // If the time has passed today, set for tomorrow
    if (nextDue <= now) {
        nextDue.setDate(nextDue.getDate() + 1);
    }
    
    return nextDue.toISOString();
}

function setupMedicationForm() {
    // This function is called from initializeMedications
    // Modal setup is handled separately in setupModal
}

// Toast Notifications
function showToast(message, type = 'info') {
    console.log('Showing toast:', message, type);
    
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="toast-icon ${icons[type]}"></i>
        <div class="toast-message">${message}</div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4000);
}

// Utility Functions
function formatTime(time24) {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function formatDateTime(dateTime) {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    const now = new Date();
    
    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
        return formatTime(date.toTimeString().slice(0, 5));
    }
    
    // If tomorrow, show "Tomorrow at time"
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow at ${formatTime(date.toTimeString().slice(0, 5))}`;
    }
    
    // Otherwise show full date and time
    return `${formatDate(date.toISOString().split('T')[0])} at ${formatTime(date.toTimeString().slice(0, 5))}`;
}

function formatFrequency(frequency) {
    const frequencies = {
        'once_daily': 'Once daily',
        'twice_daily': 'Twice daily', 
        'three_times_daily': 'Three times daily',
        'as_needed': 'As needed'
    };
    return frequencies[frequency] || frequency;
}

// Make functions globally available for onclick handlers
window.takeMedication = takeMedication;
window.remindMedication = remindMedication;
window.deleteMedication = deleteMedication;
window.removeTag = removeTag;
window.removeTimeInput = removeTimeInput;
window.showMedicationModal = showMedicationModal;
window.hideMedicationModal = hideMedicationModal;