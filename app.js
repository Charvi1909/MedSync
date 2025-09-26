// MedSync Application JavaScript

// Application State
let appState = {
    currentPage: 'dashboard',
    userProfile: {
        name: "Sarah Johnson",
        age: 34,
        height: "5'6\"",
        weight: "145 lbs",
        gender: "Female",
        bloodType: "O+",
        conditions: ["Type 2 Diabetes", "Iron Deficiency Anemia"],
        allergies: ["Penicillin", "Shellfish"],
        emergencyContact: {
            name: "Michael Johnson",
            relation: "Spouse",
            phone: "+1 (555) 123-4567"
        },
        notificationPreferences: {
            emailReminders: true,
            pushNotifications: true,
            soundAlerts: false,
            reminderAdvance: 30
        }
    },
    medications: [
        {
            id: "med1",
            name: "Iron Supplement",
            dosage: 65,
            unit: "mg",
            frequency: "once_daily",
            times: ["08:00"],
            instructions: "Take with vitamin C for better absorption",
            withFood: true,
            active: true,
            consistencyRate: 85,
            lastTaken: null,
            nextDue: "2025-09-26T08:00:00"
        },
        {
            id: "med2",
            name: "Vitamin D3",
            dosage: 1000,
            unit: "IU",
            frequency: "once_daily",
            times: ["20:00"],
            instructions: "Take with evening meal",
            withFood: true,
            active: true,
            consistencyRate: 92,
            lastTaken: "2025-09-25T20:00:00",
            nextDue: "2025-09-26T20:00:00"
        },
        {
            id: "med3",
            name: "Metformin",
            dosage: 500,
            unit: "mg",
            frequency: "twice_daily",
            times: ["08:00", "20:00"],
            instructions: "Take with meals to reduce stomach upset",
            withFood: true,
            active: true,
            consistencyRate: 78,
            lastTaken: "2025-09-26T08:00:00",
            nextDue: "2025-09-26T20:00:00"
        }
    ],
    labResults: {
        testType: "Complete Blood Count (CBC)",
        date: "2025-09-20",
        currentAiSummary: "Your recent CBC results indicate mild anemia with low hemoglobin and hematocrit levels, while platelets are slightly elevated suggesting possible inflammation. Your iron supplement regimen appears to be helping, and consistency with medications has improved. Continue current treatment plan and consider adding vitamin C to enhance iron absorption.",
        aiSummaryHistory: [
            {
                date: "2025-09-20",
                testType: "Complete Blood Count (CBC)",
                summary: "Your recent CBC results indicate mild anemia with low hemoglobin and hematocrit levels, while platelets are slightly elevated suggesting possible inflammation. Your iron supplement regimen appears to be helping, and consistency with medications has improved. Continue current treatment plan and consider adding vitamin C to enhance iron absorption."
            },
            {
                date: "2025-08-15",
                testType: "Basic Metabolic Panel",
                summary: "Your glucose levels are well-controlled with current medication. Kidney function markers are normal. Continue monitoring blood sugar and maintain current diabetic medication schedule for optimal management."
            },
            {
                date: "2025-07-10",
                testType: "Lipid Panel",
                summary: "Cholesterol levels have improved since starting dietary changes. HDL is within normal range, but LDL remains slightly elevated. Consider increasing omega-3 rich foods and maintaining regular exercise routine."
            },
            {
                date: "2025-06-05",
                testType: "Thyroid Function Tests",
                summary: "Thyroid function is normal across all markers. TSH levels are stable, indicating good thyroid health. Continue current monitoring schedule and maintain healthy lifestyle habits."
            }
        ]
    },
    dashboardStats: {
        lastTestDate: "September 20, 2025",
        aiHealthSummary: "Recent lab work shows improvement in anemia management with current iron supplementation. Blood sugar levels remain well-controlled with Metformin. Your medication consistency has improved significantly over the past month, which is contributing to better health outcomes. Continue current treatment plan and consider adding vitamin C to enhance iron absorption effectiveness.",
        activeMedications: 3,
        consistencyRate: 85
    },
    familyMembers: [
        {
            id: "fam1",
            name: "Robert Johnson",
            relationship: "Father",
            age: 62,
            status: "living",
            conditions: ["Type 2 Diabetes", "Hypertension", "Coronary Artery Disease"],
            allergies: ["Sulfa drugs"],
            profileImage: "fas fa-user-tie"
        },
        {
            id: "fam2", 
            name: "Linda Johnson",
            relationship: "Mother",
            age: 59,
            status: "living",
            conditions: ["Migraine", "Osteoporosis"],
            allergies: ["Latex"],
            profileImage: "fas fa-user"
        },
        {
            id: "fam3",
            name: "Mark Johnson", 
            relationship: "Brother",
            age: 36,
            status: "living",
            conditions: ["Asthma", "Color Blindness"],
            allergies: ["Peanuts", "Tree nuts"],
            profileImage: "fas fa-user"
        },
        {
            id: "fam4",
            name: "William Johnson",
            relationship: "Paternal Grandfather",
            age: 89,
            status: "living",
            conditions: ["Alzheimer's Disease", "Type 2 Diabetes"],
            allergies: ["Iodine"],
            profileImage: "fas fa-user-shield"
        },
        {
            id: "fam5",
            name: "Margaret Johnson", 
            relationship: "Paternal Grandmother",
            age: 85,
            status: "deceased",
            conditions: ["Thalassemia Beta", "Hypertension"],
            allergies: ["Aspirin"],
            profileImage: "fas fa-user"
        },
        {
            id: "fam6",
            name: "Thomas Wilson",
            relationship: "Maternal Grandfather", 
            age: 91,
            status: "living",
            conditions: ["Parkinson's Disease", "Coronary Artery Disease"],
            allergies: ["Shellfish"],
            profileImage: "fas fa-user-shield"
        },
        {
            id: "fam7",
            name: "Helen Wilson",
            relationship: "Maternal Grandmother",
            age: 88,
            status: "living", 
            conditions: ["Celiac Disease", "Familial Hypercholesterolemia"],
            allergies: ["Gluten", "Penicillin"],
            profileImage: "fas fa-user"
        }
    ],
    geneticRiskConditions: [
        "Sickle Cell Disease", "Thalassemia (Alpha & Beta)", "G6PD Deficiency", 
        "Hereditary Hemochromatosis", "Familial Hypercholesterolemia", "Down Syndrome",
        "Turner Syndrome", "Klinefelter Syndrome", "Fragile X Syndrome", 
        "Type 2 Diabetes (genetic predisposition)", "Hypertension (familial risk)",
        "Coronary Artery Disease (familial risk)", "Asthma (heritable component)",
        "Color Blindness (especially red–green)", "Lactose Intolerance",
        "Celiac Disease", "Polycystic Kidney Disease (PKD)", 
        "Polycystic Ovary Syndrome (PCOS)", "Alzheimer's Disease (familial/genetic risk forms)",
        "Parkinson's Disease (familial forms)", "Obesity (genetic predisposition)",
        "Schizophrenia (genetic risk)", "Bipolar Disorder (genetic risk)",
        "Autism Spectrum Disorder (heritable component)", "Migraine (familial patterns)",
        "Epilepsy (genetic forms)"
    ],
    riskAssessments: [
        {
            condition: "Type 2 Diabetes",
            riskLevel: "high",
            familyMembers: ["Robert Johnson", "William Johnson"],
            inheritancePattern: "Multifactorial inheritance with strong genetic component",
            recommendation: "Regular glucose screening, lifestyle modifications, genetic counseling recommended"
        },
        {
            condition: "Thalassemia Beta", 
            riskLevel: "moderate",
            familyMembers: ["Margaret Johnson"],
            inheritancePattern: "Autosomal recessive inheritance",
            recommendation: "Genetic testing recommended, especially before family planning"
        },
        {
            condition: "Alzheimer's Disease",
            riskLevel: "moderate", 
            familyMembers: ["William Johnson"],
            inheritancePattern: "Complex inheritance with genetic risk factors",
            recommendation: "Cognitive health monitoring, lifestyle modifications, genetic counseling available"
        },
        {
            condition: "Familial Hypercholesterolemia",
            riskLevel: "moderate",
            familyMembers: ["Helen Wilson"], 
            inheritancePattern: "Autosomal dominant inheritance",
            recommendation: "Lipid screening, cardiac risk assessment, genetic testing considered"
        }
    ],
    editingFamilyMember: null
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const toastContainer = document.getElementById('toastContainer');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDashboard();
    initializeLabResults();
    initializeMedications();
    initializeFamilyHistory();
    initializeProfile();
    initializeModals();
    initializeFileUpload();
    
    // Show initial page
    showPage('dashboard');
});

// Navigation Functions
function initializeNavigation() {
    // Sidebar toggle for mobile
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            showPage(page);
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

function showPage(pageId) {
    // Update active menu item
    menuItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
    });

    // Show selected page
    pages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
    });

    appState.currentPage = pageId;

    // Update page content based on current data
    switch(pageId) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'medications':
            updateMedicationsGrid();
            break;
        case 'lab-results':
            updateLabResults();
            break;
        case 'family-history':
            updateFamilyHistory();
            break;
        case 'profile':
            updateProfile();
            break;
    }
}

// Dashboard Functions
function initializeDashboard() {
    updateDashboard();
}

function updateDashboard() {
    // Update overview cards
    document.getElementById('lastTestDate').textContent = appState.dashboardStats.lastTestDate;
    document.getElementById('activeMedications').textContent = appState.dashboardStats.activeMedications;
    document.getElementById('consistencyRate').textContent = appState.dashboardStats.consistencyRate + '%';

    // Update AI health summary
    document.getElementById('aiHealthSummary').textContent = appState.dashboardStats.aiHealthSummary;

    // Update today's medications
    updateTodaysMedications();
}

function updateTodaysMedications() {
    const container = document.getElementById('todaysMedications');
    const today = new Date().toISOString().split('T')[0];
    
    const todaysMeds = appState.medications.filter(med => med.active);
    
    if (todaysMeds.length === 0) {
        container.innerHTML = '<p class="text-muted">No medications scheduled for today.</p>';
        return;
    }

    container.innerHTML = todaysMeds.map(med => {
        const timesDue = med.times.map(time => {
            const medTime = new Date(`${today}T${time}:00`);
            const now = new Date();
            const isOverdue = medTime < now;
            const isTaken = med.lastTaken && new Date(med.lastTaken).toDateString() === now.toDateString();
            
            return {
                time,
                isOverdue,
                isTaken,
                timeStr: formatTime(time)
            };
        });

        return `
            <div class="medication-item">
                <div class="medication-info">
                    <h4>${med.name}</h4>
                    <div class="medication-details">
                        ${med.dosage} ${med.unit} • ${timesDue.map(t => t.timeStr).join(', ')}
                    </div>
                </div>
                <div class="medication-actions">
                    <button class="btn btn--sm btn--take" onclick="markMedicationTaken('${med.id}')">
                        <i class="fas fa-check"></i> Take
                    </button>
                    <button class="btn btn--sm btn--remind" onclick="remindMedication('${med.id}')">
                        <i class="fas fa-bell"></i> Remind
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Lab Results Functions
function initializeLabResults() {
    updateLabResults();
}

function updateLabResults() {
    // Update current analysis
    document.getElementById('currentTestType').textContent = appState.labResults.testType;
    document.getElementById('currentTestDate').textContent = formatDate(appState.labResults.date);
    document.getElementById('currentAnalysis').textContent = appState.labResults.currentAiSummary;

    // Update analysis history
    updateAnalysisHistory();
}

function updateAnalysisHistory() {
    const container = document.getElementById('analysisHistory');
    
    container.innerHTML = appState.labResults.aiSummaryHistory.map(item => `
        <div class="history-item">
            <div class="history-header">
                <span class="test-type">${item.testType}</span>
                <span class="test-date">${formatDate(item.date)}</span>
            </div>
            <div class="history-summary">${item.summary}</div>
        </div>
    `).join('');
}

// File Upload Functions
function initializeFileUpload() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const uploadProgress = document.getElementById('uploadProgress');

    // Click to browse files
    uploadZone.addEventListener('click', () => {
        if (!uploadProgress.classList.contains('hidden')) return;
        fileInput.click();
    });

    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0 && files[0].type === 'application/pdf') {
            handleFileUpload(files[0]);
        } else {
            showToast('Please upload a PDF file', 'error');
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

function handleFileUpload(file) {
    const uploadContent = document.querySelector('.upload-content');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    // Show progress
    uploadContent.style.display = 'none';
    uploadProgress.classList.remove('hidden');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Simulate AI analysis
            setTimeout(() => {
                uploadContent.style.display = 'block';
                uploadProgress.classList.add('hidden');
                progressFill.style.width = '0%';
                
                showToast('Lab report uploaded and analyzed successfully!', 'success');
                
                // Update with new mock analysis
                const newAnalysis = {
                    date: new Date().toISOString().split('T')[0],
                    testType: "Complete Blood Count (CBC)",
                    summary: "New lab results uploaded. AI analysis shows continued improvement in anemia markers. Iron levels are responding well to current supplementation protocol."
                };
                
                appState.labResults.currentAiSummary = newAnalysis.summary;
                appState.labResults.date = newAnalysis.date;
                appState.labResults.aiSummaryHistory.unshift(newAnalysis);
                
                updateLabResults();
            }, 1000);
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = `Uploading... ${Math.round(progress)}%`;
    }, 200);
}

// Medications Functions
function initializeMedications() {
    updateMedicationsGrid();
    initializeAddMedicationModal();
}

function updateMedicationsGrid() {
    const grid = document.getElementById('medicationsGrid');
    
    if (appState.medications.length === 0) {
        grid.innerHTML = '<p class="text-muted">No medications added yet.</p>';
        return;
    }

    grid.innerHTML = appState.medications.map(med => `
        <div class="medication-card">
            <div class="medication-header">
                <div>
                    <h3 class="medication-name">${med.name}</h3>
                    <p class="medication-dosage">${med.dosage} ${med.unit} • ${getFrequencyText(med.frequency)}</p>
                </div>
                <span class="medication-status ${med.active ? 'active' : 'inactive'}">
                    ${med.active ? 'Active' : 'Inactive'}
                </span>
            </div>
            
            <div class="medication-schedule">
                ${med.times.map(time => `
                    <div class="schedule-item">
                        <span class="schedule-time">${formatTime(time)}</span>
                        <span class="schedule-taken text-success">
                            ${isTimePassedToday(time) ? '✓' : ''}
                        </span>
                    </div>
                `).join('')}
            </div>
            
            <div class="consistency-rate">
                <div class="consistency-label">
                    <span>Consistency Rate</span>
                    <span class="fw-medium">${med.consistencyRate}%</span>
                </div>
                <div class="consistency-bar">
                    <div class="consistency-fill" style="width: ${med.consistencyRate}%"></div>
                </div>
            </div>
            
            <div class="medication-card-actions">
                <button class="btn btn--sm btn--take" onclick="markMedicationTaken('${med.id}')">
                    <i class="fas fa-check"></i> Take
                </button>
                <button class="btn btn--sm btn--remind" onclick="remindMedication('${med.id}')">
                    <i class="fas fa-bell"></i> Remind
                </button>
                <button class="btn btn--sm btn--icon btn--delete" onclick="deleteMedication('${med.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function initializeAddMedicationModal() {
    const addBtn = document.getElementById('addMedicationBtn');
    const modal = document.getElementById('addMedicationModal');
    const closeBtn = document.getElementById('closeMedicationModal');
    const cancelBtn = document.getElementById('cancelMedicationModal');
    const saveBtn = document.getElementById('saveMedicationBtn');
    const form = document.getElementById('addMedicationForm');
    const frequencySelect = document.getElementById('medicationFrequency');

    addBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        form.reset();
        updateTimeInputs();
    });

    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    frequencySelect.addEventListener('change', updateTimeInputs);

    saveBtn.addEventListener('click', saveMedication);
}

function updateTimeInputs() {
    const frequency = document.getElementById('medicationFrequency').value;
    const container = document.getElementById('timeInputs');
    
    const timeCount = {
        'once_daily': 1,
        'twice_daily': 2,
        'three_times_daily': 3,
        'four_times_daily': 4,
        'as_needed': 1
    };

    const count = timeCount[frequency] || 1;
    
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'time';
        input.className = 'form-control time-input';
        input.required = true;
        container.appendChild(input);
    }
}

function saveMedication() {
    const form = document.getElementById('addMedicationForm');
    const formData = new FormData(form);
    
    const name = document.getElementById('medicationName').value.trim();
    const dosage = parseFloat(document.getElementById('medicationDosage').value);
    const unit = document.getElementById('medicationUnit').value;
    const frequency = document.getElementById('medicationFrequency').value;
    const instructions = document.getElementById('medicationInstructions').value.trim();
    const withFood = document.getElementById('medicationWithFood').checked;
    
    const times = Array.from(document.querySelectorAll('.time-input')).map(input => input.value).filter(time => time);
    
    if (!name || !dosage || times.length === 0) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const newMedication = {
        id: 'med' + Date.now(),
        name,
        dosage,
        unit,
        frequency,
        times,
        instructions,
        withFood,
        active: true,
        consistencyRate: 0,
        lastTaken: null,
        nextDue: calculateNextDue(times[0])
    };

    appState.medications.push(newMedication);
    appState.dashboardStats.activeMedications = appState.medications.filter(med => med.active).length;
    
    updateMedicationsGrid();
    updateTodaysMedications();
    updateDashboard();
    
    document.getElementById('addMedicationModal').classList.add('hidden');
    showToast('Medication added successfully!', 'success');
}

// Family History Functions
function initializeFamilyHistory() {
    initializeAddFamilyMemberModal();
    initializeFamilyMemberDetailsModal();
    updateFamilyHistory();
}

function updateFamilyHistory() {
    updateGeneticWarnings();
    updateFamilyGrid();
}

function updateGeneticWarnings() {
    const container = document.getElementById('geneticWarnings');
    
    if (appState.riskAssessments.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = appState.riskAssessments.map(risk => `
        <div class="genetic-warning genetic-warning--${risk.riskLevel}">
            <div class="warning-icon">
                <i class="fas ${getRiskIcon(risk.riskLevel)}"></i>
            </div>
            <div class="warning-content">
                <h4>${risk.condition} - ${risk.riskLevel.toUpperCase()} RISK</h4>
                <div class="warning-details">${risk.inheritancePattern}</div>
                <div class="family-affected">
                    <strong>Affected family members:</strong> ${risk.familyMembers.join(', ')}
                </div>
                <div class="warning-recommendation">
                    <strong>Recommendation:</strong> ${risk.recommendation}
                </div>
            </div>
        </div>
    `).join('');
}

function updateFamilyGrid() {
    const grid = document.getElementById('familyGrid');
    
    if (appState.familyMembers.length === 0) {
        grid.innerHTML = '<p class="text-muted">No family members added yet.</p>';
        return;
    }

    grid.innerHTML = appState.familyMembers.map(member => `
        <div class="family-member-card" onclick="showFamilyMemberDetails('${member.id}')">
            <div class="family-status ${member.status}">${member.status}</div>
            
            <div class="family-header">
                <div class="family-avatar">
                    <i class="${member.profileImage}"></i>
                </div>
                <div class="family-info">
                    <h3>${member.name}</h3>
                    <div class="family-relationship">${member.relationship}</div>
                    <div class="family-age-status">Age: ${member.age} • ${member.status}</div>
                </div>
            </div>

            ${member.conditions.length > 0 ? `
                <div class="family-conditions">
                    <h4>Medical Conditions</h4>
                    <div class="conditions-list">
                        ${member.conditions.map(condition => `
                            <span class="condition-tag ${isGeneticRiskCondition(condition) ? 'genetic-risk' : ''}">
                                ${condition}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${member.allergies.length > 0 ? `
                <div class="family-allergies">
                    <h4>Allergies</h4>
                    <div class="allergies-list">
                        ${member.allergies.map(allergy => `
                            <span class="allergy-tag">${allergy}</span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="family-member-actions">
                <button class="btn btn--sm btn--secondary" onclick="event.stopPropagation(); editFamilyMember('${member.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn--sm btn--icon btn--delete" onclick="event.stopPropagation(); deleteFamilyMember('${member.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function initializeAddFamilyMemberModal() {
    const addBtn = document.getElementById('addFamilyMemberBtn');
    const modal = document.getElementById('addFamilyMemberModal');
    const closeBtn = document.getElementById('closeFamilyMemberModal');
    const cancelBtn = document.getElementById('cancelFamilyMemberModal');
    const saveBtn = document.getElementById('saveFamilyMemberBtn');

    addBtn.addEventListener('click', () => {
        appState.editingFamilyMember = null;
        resetFamilyMemberForm();
        document.getElementById('familyModalTitle').textContent = 'Add Family Member';
        modal.classList.remove('hidden');
    });

    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    saveBtn.addEventListener('click', saveFamilyMember);
}

function initializeFamilyMemberDetailsModal() {
    const modal = document.getElementById('familyMemberDetailsModal');
    const closeBtn = document.getElementById('closeFamilyDetailsModal');
    const closeBtn2 = document.getElementById('closeFamilyDetailsBtn');
    const editBtn = document.getElementById('editFamilyMemberBtn');

    [closeBtn, closeBtn2].forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    editBtn.addEventListener('click', () => {
        if (appState.currentFamilyMember) {
            modal.classList.add('hidden');
            editFamilyMember(appState.currentFamilyMember.id);
        }
    });
}

function showFamilyMemberDetails(memberId) {
    const member = appState.familyMembers.find(m => m.id === memberId);
    if (!member) return;

    appState.currentFamilyMember = member;
    const modal = document.getElementById('familyMemberDetailsModal');
    const title = document.getElementById('familyDetailsTitle');
    const content = document.getElementById('familyDetailsContent');

    title.textContent = `${member.name} - Family Details`;

    const geneticConditions = member.conditions.filter(condition => isGeneticRiskCondition(condition));

    content.innerHTML = `
        <div class="family-detail-section">
            <h4>Personal Information</h4>
            <div class="family-detail-info">
                <div class="family-detail-item">
                    <div class="family-detail-label">Full Name</div>
                    <div class="family-detail-value">${member.name}</div>
                </div>
                <div class="family-detail-item">
                    <div class="family-detail-label">Relationship</div>
                    <div class="family-detail-value">${member.relationship}</div>
                </div>
                <div class="family-detail-item">
                    <div class="family-detail-label">Age</div>
                    <div class="family-detail-value">${member.age} years</div>
                </div>
                <div class="family-detail-item">
                    <div class="family-detail-label">Status</div>
                    <div class="family-detail-value">${member.status}</div>
                </div>
            </div>
        </div>

        ${member.conditions.length > 0 ? `
            <div class="family-detail-section">
                <h4>Medical Conditions</h4>
                <div class="family-detail-list">
                    ${member.conditions.map(condition => `
                        <span class="family-detail-tag ${isGeneticRiskCondition(condition) ? 'genetic-risk' : ''}">
                            ${condition}
                        </span>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        ${member.allergies.length > 0 ? `
            <div class="family-detail-section">
                <h4>Allergies</h4>
                <div class="family-detail-list">
                    ${member.allergies.map(allergy => `
                        <span class="family-detail-tag">${allergy}</span>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        ${geneticConditions.length > 0 ? `
            <div class="family-detail-section">
                <div class="genetic-info-panel">
                    <h5><i class="fas fa-exclamation-triangle"></i> Genetic Risk Information</h5>
                    <p>This family member has ${geneticConditions.length} condition(s) with genetic components: <strong>${geneticConditions.join(', ')}</strong>. These conditions may increase your risk due to shared genetics. Consider discussing genetic counseling with your healthcare provider.</p>
                </div>
            </div>
        ` : ''}
    `;

    modal.classList.remove('hidden');
}

function editFamilyMember(memberId) {
    const member = appState.familyMembers.find(m => m.id === memberId);
    if (!member) return;

    appState.editingFamilyMember = member;
    
    // Fill form with existing data
    document.getElementById('familyMemberName').value = member.name;
    document.getElementById('familyMemberRelationship').value = member.relationship;
    document.getElementById('familyMemberAge').value = member.age;
    document.getElementById('familyMemberStatus').value = member.status;
    document.getElementById('familyMemberConditions').value = member.conditions.join(', ');
    document.getElementById('familyMemberAllergies').value = member.allergies.join(', ');
    
    document.getElementById('familyModalTitle').textContent = 'Edit Family Member';
    document.getElementById('addFamilyMemberModal').classList.remove('hidden');
}

function resetFamilyMemberForm() {
    document.getElementById('addFamilyMemberForm').reset();
}

function saveFamilyMember() {
    const name = document.getElementById('familyMemberName').value.trim();
    const relationship = document.getElementById('familyMemberRelationship').value;
    const age = parseInt(document.getElementById('familyMemberAge').value);
    const status = document.getElementById('familyMemberStatus').value;
    const conditionsText = document.getElementById('familyMemberConditions').value.trim();
    const allergiesText = document.getElementById('familyMemberAllergies').value.trim();

    if (!name || !relationship || !age || !status) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const conditions = conditionsText ? conditionsText.split(',').map(c => c.trim()).filter(c => c) : [];
    const allergies = allergiesText ? allergiesText.split(',').map(a => a.trim()).filter(a => a) : [];

    const profileImages = {
        'Father': 'fas fa-user-tie',
        'Mother': 'fas fa-user',
        'Brother': 'fas fa-user',
        'Sister': 'fas fa-user',
        'Son': 'fas fa-user',
        'Daughter': 'fas fa-user',
        'Paternal Grandfather': 'fas fa-user-shield',
        'Paternal Grandmother': 'fas fa-user',
        'Maternal Grandfather': 'fas fa-user-shield',
        'Maternal Grandmother': 'fas fa-user',
        'Uncle': 'fas fa-user-tie',
        'Aunt': 'fas fa-user',
        'Cousin': 'fas fa-user'
    };

    if (appState.editingFamilyMember) {
        // Update existing member
        const member = appState.editingFamilyMember;
        member.name = name;
        member.relationship = relationship;
        member.age = age;
        member.status = status;
        member.conditions = conditions;
        member.allergies = allergies;
        member.profileImage = profileImages[relationship] || 'fas fa-user';
        
        showToast('Family member updated successfully!', 'success');
    } else {
        // Add new member
        const newMember = {
            id: 'fam' + Date.now(),
            name,
            relationship,
            age,
            status,
            conditions,
            allergies,
            profileImage: profileImages[relationship] || 'fas fa-user'
        };
        
        appState.familyMembers.push(newMember);
        showToast('Family member added successfully!', 'success');
    }

    // Update risk assessments
    updateRiskAssessments();
    updateFamilyHistory();
    
    document.getElementById('addFamilyMemberModal').classList.add('hidden');
}

function deleteFamilyMember(memberId) {
    const member = appState.familyMembers.find(m => m.id === memberId);
    if (member) {
        showConfirmModal(
            'Delete Family Member',
            `Are you sure you want to delete ${member.name} from your family history? This action cannot be undone.`,
            () => {
                appState.familyMembers = appState.familyMembers.filter(m => m.id !== memberId);
                updateRiskAssessments();
                updateFamilyHistory();
                showToast('Family member deleted successfully', 'success');
            }
        );
    }
}

function updateRiskAssessments() {
    // Reset risk assessments
    appState.riskAssessments = [];
    
    // Analyze family members for genetic conditions
    const conditionCounts = {};
    const membersByCondition = {};

    appState.familyMembers.forEach(member => {
        member.conditions.forEach(condition => {
            // Normalize condition names for genetic assessment
            const normalizedCondition = normalizeConditionForAssessment(condition);
            if (isGeneticRiskCondition(normalizedCondition)) {
                if (!conditionCounts[normalizedCondition]) {
                    conditionCounts[normalizedCondition] = 0;
                    membersByCondition[normalizedCondition] = [];
                }
                conditionCounts[normalizedCondition]++;
                membersByCondition[normalizedCondition].push(member.name);
            }
        });
    });

    // Create risk assessments based on family history
    Object.entries(conditionCounts).forEach(([condition, count]) => {
        const riskLevel = determineRiskLevel(condition, count, membersByCondition[condition]);
        const assessment = {
            condition: condition,
            riskLevel: riskLevel,
            familyMembers: membersByCondition[condition],
            inheritancePattern: getInheritancePattern(condition),
            recommendation: getRecommendation(condition, riskLevel)
        };
        appState.riskAssessments.push(assessment);
    });
}

// Profile Functions
function initializeProfile() {
    updateProfile();
    initializeProfileForms();
}

function updateProfile() {
    const profile = appState.userProfile;
    
    // Personal info
    document.getElementById('profileName').value = profile.name;
    document.getElementById('profileAge').value = profile.age;
    document.getElementById('profileHeight').value = profile.height;
    document.getElementById('profileWeight').value = profile.weight;
    document.getElementById('profileGender').value = profile.gender;
    document.getElementById('profileBloodType').value = profile.bloodType;
    
    // Emergency contact
    document.getElementById('emergencyName').value = profile.emergencyContact.name;
    document.getElementById('emergencyRelation').value = profile.emergencyContact.relation;
    document.getElementById('emergencyPhone').value = profile.emergencyContact.phone;
    
    // Notification preferences
    document.getElementById('emailReminders').checked = profile.notificationPreferences.emailReminders;
    document.getElementById('pushNotifications').checked = profile.notificationPreferences.pushNotifications;
    document.getElementById('soundAlerts').checked = profile.notificationPreferences.soundAlerts;
    document.getElementById('reminderAdvance').value = profile.notificationPreferences.reminderAdvance;
    
    // Tags
    updateTags('conditionsTags', profile.conditions, 'condition');
    updateTags('allergiesTags', profile.allergies, 'allergy');
}

function updateTags(containerId, items, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map(item => `
        <div class="tag">
            <span>${item}</span>
            <button class="tag-remove" onclick="removeTag('${type}', '${item}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function initializeProfileForms() {
    // Personal info form
    document.getElementById('personalInfoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        savePersonalInfo();
    });

    // Emergency contact form
    document.getElementById('emergencyContactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveEmergencyContact();
    });

    // Notification preferences form
    document.getElementById('notificationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveNotificationPreferences();
    });

    // Add condition button
    document.getElementById('addConditionBtn').addEventListener('click', () => {
        const input = document.getElementById('newCondition');
        const value = input.value.trim();
        if (value && !appState.userProfile.conditions.includes(value)) {
            appState.userProfile.conditions.push(value);
            updateTags('conditionsTags', appState.userProfile.conditions, 'condition');
            input.value = '';
            showToast('Medical condition added', 'success');
        }
    });

    // Add allergy button
    document.getElementById('addAllergyBtn').addEventListener('click', () => {
        const input = document.getElementById('newAllergy');
        const value = input.value.trim();
        if (value && !appState.userProfile.allergies.includes(value)) {
            appState.userProfile.allergies.push(value);
            updateTags('allergiesTags', appState.userProfile.allergies, 'allergy');
            input.value = '';
            showToast('Allergy added', 'success');
        }
    });

    // Enter key handlers for tag inputs
    document.getElementById('newCondition').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('addConditionBtn').click();
        }
    });

    document.getElementById('newAllergy').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('addAllergyBtn').click();
        }
    });
}

// Modal Functions
function initializeModals() {
    initializeConfirmModal();
}

function initializeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    const closeBtn = document.getElementById('closeConfirmModal');
    const cancelBtn = document.getElementById('cancelConfirm');
    
    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

// Medication Actions
function markMedicationTaken(medId) {
    const med = appState.medications.find(m => m.id === medId);
    if (med) {
        med.lastTaken = new Date().toISOString();
        med.consistencyRate = Math.min(100, med.consistencyRate + 2);
        
        updateDashboard();
        updateMedicationsGrid();
        updateTodaysMedications();
        
        showToast(`${med.name} marked as taken`, 'success');
    }
}

function remindMedication(medId) {
    const med = appState.medications.find(m => m.id === medId);
    if (med) {
        showToast(`Reminder set for ${med.name}`, 'info');
    }
}

function deleteMedication(medId) {
    const med = appState.medications.find(m => m.id === medId);
    if (med) {
        showConfirmModal(
            'Delete Medication',
            `Are you sure you want to delete ${med.name}? This action cannot be undone.`,
            () => {
                appState.medications = appState.medications.filter(m => m.id !== medId);
                appState.dashboardStats.activeMedications = appState.medications.filter(m => m.active).length;
                
                updateMedicationsGrid();
                updateDashboard();
                updateTodaysMedications();
                
                showToast('Medication deleted successfully', 'success');
            }
        );
    }
}

// Profile Actions
function savePersonalInfo() {
    const profile = appState.userProfile;
    
    profile.name = document.getElementById('profileName').value;
    profile.age = parseInt(document.getElementById('profileAge').value);
    profile.height = document.getElementById('profileHeight').value;
    profile.weight = document.getElementById('profileWeight').value;
    profile.gender = document.getElementById('profileGender').value;
    profile.bloodType = document.getElementById('profileBloodType').value;
    
    showToast('Personal information saved', 'success');
}

function saveEmergencyContact() {
    const profile = appState.userProfile;
    
    profile.emergencyContact.name = document.getElementById('emergencyName').value;
    profile.emergencyContact.relation = document.getElementById('emergencyRelation').value;
    profile.emergencyContact.phone = document.getElementById('emergencyPhone').value;
    
    showToast('Emergency contact saved', 'success');
}

function saveNotificationPreferences() {
    const profile = appState.userProfile;
    
    profile.notificationPreferences.emailReminders = document.getElementById('emailReminders').checked;
    profile.notificationPreferences.pushNotifications = document.getElementById('pushNotifications').checked;
    profile.notificationPreferences.soundAlerts = document.getElementById('soundAlerts').checked;
    profile.notificationPreferences.reminderAdvance = parseInt(document.getElementById('reminderAdvance').value);
    
    showToast('Notification preferences saved', 'success');
}

function removeTag(type, item) {
    if (type === 'condition') {
        appState.userProfile.conditions = appState.userProfile.conditions.filter(c => c !== item);
        updateTags('conditionsTags', appState.userProfile.conditions, 'condition');
    } else if (type === 'allergy') {
        appState.userProfile.allergies = appState.userProfile.allergies.filter(a => a !== item);
        updateTags('allergiesTags', appState.userProfile.allergies, 'allergy');
    }
    showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} removed`, 'success');
}

// Family History Utility Functions
function isGeneticRiskCondition(condition) {
    const normalizedCondition = normalizeConditionForAssessment(condition);
    return appState.geneticRiskConditions.some(geneticCondition => 
        geneticCondition.toLowerCase().includes(normalizedCondition.toLowerCase()) ||
        normalizedCondition.toLowerCase().includes(geneticCondition.toLowerCase())
    );
}

function normalizeConditionForAssessment(condition) {
    // Handle common variations and synonyms
    const conditionMap = {
        'Diabetes': 'Type 2 Diabetes (genetic predisposition)',
        'Type 2 Diabetes': 'Type 2 Diabetes (genetic predisposition)',
        'Hypertension': 'Hypertension (familial risk)',
        'High Blood Pressure': 'Hypertension (familial risk)',
        'Coronary Artery Disease': 'Coronary Artery Disease (familial risk)',
        'Heart Disease': 'Coronary Artery Disease (familial risk)',
        'Asthma': 'Asthma (heritable component)',
        'Color Blindness': 'Color Blindness (especially red–green)',
        'Colorblind': 'Color Blindness (especially red–green)',
        'Migraine': 'Migraine (familial patterns)',
        'Migraines': 'Migraine (familial patterns)',
        'Thalassemia Beta': 'Thalassemia (Alpha & Beta)',
        'Beta Thalassemia': 'Thalassemia (Alpha & Beta)',
        'Alzheimer\'s Disease': 'Alzheimer\'s Disease (familial/genetic risk forms)',
        'Alzheimer\'s': 'Alzheimer\'s Disease (familial/genetic risk forms)',
        'Parkinson\'s Disease': 'Parkinson\'s Disease (familial forms)',
        'Parkinson\'s': 'Parkinson\'s Disease (familial forms)'
    };
    
    return conditionMap[condition] || condition;
}

function determineRiskLevel(condition, count, affectedMembers) {
    // Risk assessment logic based on condition type and family history
    const highRiskConditions = [
        'Familial Hypercholesterolemia',
        'Sickle Cell Disease',
        'Thalassemia (Alpha & Beta)',
        'Down Syndrome',
        'Turner Syndrome',
        'Klinefelter Syndrome',
        'Fragile X Syndrome'
    ];

    const moderateRiskConditions = [
        'Type 2 Diabetes (genetic predisposition)',
        'Alzheimer\'s Disease (familial/genetic risk forms)',
        'Parkinson\'s Disease (familial forms)',
        'Celiac Disease',
        'Polycystic Kidney Disease (PKD)',
        'Polycystic Ovary Syndrome (PCOS)'
    ];

    if (highRiskConditions.includes(condition) || count >= 3) {
        return 'high';
    } else if (moderateRiskConditions.includes(condition) || count >= 2) {
        return 'moderate';
    } else {
        return 'low';
    }
}

function getInheritancePattern(condition) {
    const inheritancePatterns = {
        'Type 2 Diabetes (genetic predisposition)': 'Multifactorial inheritance with strong genetic component',
        'Thalassemia (Alpha & Beta)': 'Autosomal recessive inheritance',
        'Alzheimer\'s Disease (familial/genetic risk forms)': 'Complex inheritance with genetic risk factors',
        'Familial Hypercholesterolemia': 'Autosomal dominant inheritance',
        'Hypertension (familial risk)': 'Multifactorial inheritance with genetic predisposition',
        'Coronary Artery Disease (familial risk)': 'Multifactorial inheritance with genetic component',
        'Asthma (heritable component)': 'Complex inheritance with environmental factors',
        'Color Blindness (especially red–green)': 'X-linked recessive inheritance',
        'Celiac Disease': 'Multifactorial inheritance with HLA association',
        'Migraine (familial patterns)': 'Complex inheritance with genetic predisposition',
        'Parkinson\'s Disease (familial forms)': 'Autosomal dominant/recessive variations'
    };
    
    return inheritancePatterns[condition] || 'Genetic predisposition with variable inheritance patterns';
}

function getRecommendation(condition, riskLevel) {
    const recommendations = {
        'high': {
            'Type 2 Diabetes (genetic predisposition)': 'Immediate genetic counseling recommended, regular glucose screening, aggressive lifestyle modifications',
            'Thalassemia (Alpha & Beta)': 'Genetic testing strongly recommended before family planning, carrier screening advised',
            'Familial Hypercholesterolemia': 'Immediate lipid screening, cardiac assessment, genetic testing recommended',
            'default': 'Genetic counseling strongly recommended, regular screening, lifestyle modifications'
        },
        'moderate': {
            'Type 2 Diabetes (genetic predisposition)': 'Regular glucose screening, lifestyle modifications, genetic counseling recommended',
            'Alzheimer\'s Disease (familial/genetic risk forms)': 'Cognitive health monitoring, lifestyle modifications, genetic counseling available',
            'Parkinson\'s Disease (familial forms)': 'Neurological monitoring, lifestyle modifications, genetic counseling consideration',
            'default': 'Regular screening recommended, lifestyle modifications, genetic counseling available'
        },
        'low': {
            'default': 'General health monitoring, maintain healthy lifestyle, discuss with healthcare provider'
        }
    };
    
    const riskRecommendations = recommendations[riskLevel];
    return riskRecommendations[condition] || riskRecommendations['default'];
}

function getRiskIcon(riskLevel) {
    const icons = {
        'high': 'fa-exclamation-triangle',
        'moderate': 'fa-exclamation-circle',
        'low': 'fa-info-circle'
    };
    return icons[riskLevel] || 'fa-info-circle';
}

// Utility Functions
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function isTimePassedToday(time) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const timeToday = new Date(`${today}T${time}:00`);
    return now > timeToday;
}

function getFrequencyText(frequency) {
    const frequencies = {
        'once_daily': 'Once Daily',
        'twice_daily': 'Twice Daily',
        'three_times_daily': 'Three Times Daily',
        'four_times_daily': 'Four Times Daily',
        'as_needed': 'As Needed'
    };
    return frequencies[frequency] || frequency;
}

function calculateNextDue(time) {
    const today = new Date().toISOString().split('T')[0];
    const nextDue = new Date(`${today}T${time}:00`);
    
    if (nextDue < new Date()) {
        nextDue.setDate(nextDue.getDate() + 1);
    }
    
    return nextDue.toISOString();
}

// Toast Notification Functions
function showToast(message, type = 'info', title = null) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const titles = {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title || titles[type]}</div>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        hideToast(toast);
    });
    
    toastContainer.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        hideToast(toast);
    }, 4000);
}

function hideToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Confirmation Modal
function showConfirmModal(title, message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmTitle');
    const messageEl = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmAction');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Remove existing listeners and add new one
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    
    newConfirmBtn.addEventListener('click', () => {
        onConfirm();
        modal.classList.add('hidden');
    });
    
    modal.classList.remove('hidden');
}

// Handle responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal:not(.hidden)');
        openModals.forEach(modal => modal.classList.add('hidden'));
        
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }
});

// Handle form submissions
document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.id === 'addMedicationForm') {
        e.preventDefault();
        saveMedication();
    } else if (form.id === 'addFamilyMemberForm') {
        e.preventDefault();
        saveFamilyMember();
    }
});

// Initialize risk assessments on page load
document.addEventListener('DOMContentLoaded', function() {
    updateRiskAssessments();
});