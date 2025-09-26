// Lightweight MedSync JavaScript
const AppState = {
    currentPage: 'dashboard',
    medications: [
        {
            id: "1",
            name: "Iron Supplement",
            dosage: 65,
            unit: "mg",
            frequency: "twice_daily",
            instructions: "Take with food",
            nextDose: "8:00 PM",
            taken: false
        },
        {
            id: "2",
            name: "Vitamin D3",
            dosage: 1000,
            unit: "IU",
            frequency: "once_daily",
            instructions: "Take with breakfast",
            nextDose: "9:00 AM tomorrow",
            taken: false
        }
    ],
    familyMembers: [
        {
            id: "1",
            name: "Robert Johnson",
            relationship: "Father",
            conditions: ["Hypertension", "Diabetes Type 2"]
        },
        {
            id: "2",
            name: "Margaret Johnson",
            relationship: "Mother",
            conditions: ["Osteoporosis"]
        }
    ],
    labResults: [],
    profile: {
        conditions: ["Anemia", "Vitamin D Deficiency"],
        allergies: ["Penicillin", "Shellfish"]
    }
};

// API Configuration
const API_CONFIG = {
    baseUrl: 'https://medsync-backend-xajh.onrender.com',
    endpoints: {
        summarize: '/summarize'
    }
};

// Utility Functions
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Navigation
function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show page
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(page).classList.add('active');
            
            AppState.currentPage = page;
            loadPage(page);
        });
    });

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

function loadPage(page) {
    switch (page) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'medications':
            renderMedications();
            break;
        case 'family-history':
            renderFamilyHistory();
            break;
        case 'profile':
            renderProfile();
            break;
    }
}

// Dashboard
function renderDashboard() {
    const lastTestDate = document.getElementById('lastTestDate');
    const activeMedications = document.getElementById('activeMedications');
    const consistencyRate = document.getElementById('consistencyRate');
    const todaysMedications = document.getElementById('todaysMedications');
    const aiHealthSummary = document.getElementById('aiHealthSummary');

    if (lastTestDate) {
        lastTestDate.textContent = AppState.labResults.length > 0 
            ? formatDate(AppState.labResults[0].date) 
            : 'No recent tests';
    }

    if (activeMedications) {
        activeMedications.textContent = AppState.medications.length.toString();
    }

    if (consistencyRate) {
        const takenCount = AppState.medications.filter(m => m.taken).length;
        const rate = AppState.medications.length > 0 
            ? Math.round((takenCount / AppState.medications.length) * 100)
            : 0;
        consistencyRate.textContent = `${rate}%`;
    }

    if (todaysMedications) {
        if (AppState.medications.length === 0) {
            todaysMedications.innerHTML = '<div class="empty-state"><p>No medications scheduled</p></div>';
        } else {
            todaysMedications.innerHTML = AppState.medications.map(med => `
                <div class="medication-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
                    <div>
                        <h4 style="margin: 0; font-size: 1rem;">${med.name}</h4>
                        <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary);">${med.dosage} ${med.unit} - ${med.instructions}</p>
                    </div>
                    <div style="font-weight: 500; color: var(--primary-color);">${med.nextDose}</div>
                </div>
            `).join('');
        }
    }

    if (aiHealthSummary) {
        let summary = 'Based on your medication adherence and profile, your health metrics are showing positive trends.';
        if (AppState.labResults.length > 0) {
            summary = `Recent lab analysis: ${AppState.labResults[0].summary.substring(0, 150)}...`;
        }
        aiHealthSummary.textContent = summary;
    }
}

// Lab Results
function initLabResults() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');

    if (!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', () => {
        if (!document.getElementById('uploadProgress').classList.contains('hidden')) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(file);
    });

    // Drag and drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type === 'application/pdf') {
                handleFileUpload(file);
            } else {
                showToast('Please upload a PDF file', 'error');
            }
        }
    });
}

async function handleFileUpload(file) {
    if (file.type !== 'application/pdf') {
        showToast('Please upload a PDF file', 'error');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        showToast('File size must be less than 10MB', 'error');
        return;
    }

    showUploadProgress(true);
    startProgressAnimation();
    showToast('Analyzing your lab report...', 'info');

    try {
        const summary = await uploadToAPI(file);
        displayAnalysis(summary, file.name);
        addToHistory(summary, file.name);
        showToast('Lab report analyzed successfully!', 'success');
        renderDashboard();
    } catch (error) {
        console.error('Upload error:', error);
        showToast(`Upload failed: ${error.message}`, 'error');
    } finally {
        showUploadProgress(false);
    }
}

function showUploadProgress(show) {
    const uploadContent = document.getElementById('uploadContent');
    const uploadProgress = document.getElementById('uploadProgress');
    
    if (show) {
        uploadContent.style.display = 'none';
        uploadProgress.classList.remove('hidden');
    } else {
        setTimeout(() => {
            uploadContent.style.display = 'flex';
            uploadProgress.classList.add('hidden');
            resetProgress();
        }, 500);
    }
}

function startProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (!progressFill) return;

    progressFill.style.width = '0%';
    setTimeout(() => progressFill.style.width = '20%', 100);
    setTimeout(() => {
        progressFill.style.width = '50%';
        progressText.textContent = 'Analyzing document...';
    }, 800);
    setTimeout(() => {
        progressFill.style.width = '80%';
        progressText.textContent = 'Generating summary...';
    }, 1600);
    setTimeout(() => {
        progressFill.style.width = '95%';
        progressText.textContent = 'Finalizing...';
    }, 2400);
}

function resetProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        progressFill.style.width = '0%';
        progressText.textContent = 'Processing your lab report...';
    }
}

async function uploadToAPI(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.summarize}`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result.summary || 'Analysis completed successfully';
}

function displayAnalysis(summary, fileName) {
    const currentTestType = document.getElementById('currentTestType');
    const currentTestDate = document.getElementById('currentTestDate');
    const currentAnalysis = document.getElementById('currentAnalysis');

    if (currentTestType) currentTestType.textContent = fileName;
    if (currentTestDate) currentTestDate.textContent = formatDate(new Date());
    if (currentAnalysis) currentAnalysis.textContent = summary;
}

function addToHistory(summary, fileName) {
    const result = {
        id: generateId(),
        fileName: fileName,
        summary: summary,
        date: new Date().toISOString()
    };

    AppState.labResults.unshift(result);
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('analysisHistory');
    if (!container) return;

    if (AppState.labResults.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No previous analyses available</p></div>';
        return;
    }

    container.innerHTML = AppState.labResults.map(result => `
        <div class="history-item" onclick="displayAnalysis('${result.summary}', '${result.fileName}')">
            <h4>${result.fileName} <span class="history-date">${formatDate(result.date)}</span></h4>
            <div class="history-summary">${result.summary.substring(0, 150)}...</div>
        </div>
    `).join('');
}

// Medications
function initMedications() {
    const addBtn = document.getElementById('addMedicationBtn');
    const modal = document.getElementById('addMedicationModal');
    const closeBtn = document.getElementById('closeMedicationModal');
    const cancelBtn = document.getElementById('cancelMedicationModal');
    const saveBtn = document.getElementById('saveMedicationBtn');

    if (addBtn) addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal('addMedicationModal'));
    if (cancelBtn) cancelBtn.addEventListener('click', () => closeModal('addMedicationModal'));
    if (saveBtn) saveBtn.addEventListener('click', saveMedication);

    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeModal('addMedicationModal');
            }
        });
    }
}

function saveMedication() {
    const name = document.getElementById('medicationName').value.trim();
    const dosage = document.getElementById('medicationDosage').value;
    const unit = document.getElementById('medicationUnit').value;
    const frequency = document.getElementById('medicationFrequency').value;
    const instructions = document.getElementById('medicationInstructions').value.trim();

    if (!name || !dosage || !unit || !frequency) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const medication = {
        id: generateId(),
        name: name,
        dosage: parseFloat(dosage),
        unit: unit,
        frequency: frequency,
        instructions: instructions || 'No special instructions',
        nextDose: calculateNextDose(frequency),
        taken: false
    };

    AppState.medications.push(medication);
    renderMedications();
    renderDashboard();
    closeModal('addMedicationModal');
    showToast('Medication added successfully!', 'success');
}

function calculateNextDose(frequency) {
    const times = {
        'once_daily': ['9:00 AM'],
        'twice_daily': ['8:00 AM', '8:00 PM'],
        'three_times_daily': ['8:00 AM', '2:00 PM', '8:00 PM']
    };
    return times[frequency]?.[0] || '9:00 AM';
}

function renderMedications() {
    const container = document.getElementById('medicationsGrid');
    if (!container) return;

    if (AppState.medications.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No medications added yet. Click "Add Medication" to get started.</p></div>';
        return;
    }

    container.innerHTML = AppState.medications.map(med => `
        <div class="card medication-card">
            <div class="medication-header">
                <div>
                    <h3 class="medication-name">${med.name}</h3>
                    <p class="medication-dosage">${med.dosage} ${med.unit}</p>
                </div>
                <div class="medication-actions">
                    <button class="btn btn-outline" onclick="deleteMedication('${med.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="medication-details">
                <div class="medication-detail">
                    <span class="label">Frequency:</span>
                    <span class="value">${formatFrequency(med.frequency)}</span>
                </div>
                <div class="medication-detail">
                    <span class="label">Next Dose:</span>
                    <span class="value">${med.nextDose}</span>
                </div>
                <div class="medication-detail">
                    <span class="label">Instructions:</span>
                    <span class="value">${med.instructions}</span>
                </div>
            </div>
            
            <button class="taken-button ${med.taken ? 'taken' : ''}" 
                    onclick="markAsTaken('${med.id}')" 
                    ${med.taken ? 'disabled' : ''}>
                <i class="fas fa-${med.taken ? 'check' : 'pills'}"></i>
                ${med.taken ? 'Taken' : 'Mark as Taken'}
            </button>
        </div>
    `).join('');
}

function markAsTaken(id) {
    const medication = AppState.medications.find(med => med.id === id);
    if (medication && !medication.taken) {
        medication.taken = true;
        renderMedications();
        renderDashboard();
        showToast(`${medication.name} marked as taken!`, 'success');
    }
}

function deleteMedication(id) {
    const index = AppState.medications.findIndex(med => med.id === id);
    if (index !== -1) {
        const name = AppState.medications[index].name;
        AppState.medications.splice(index, 1);
        renderMedications();
        renderDashboard();
        showToast(`${name} deleted successfully!`, 'success');
    }
}

function formatFrequency(frequency) {
    const frequencies = {
        'once_daily': 'Once Daily',
        'twice_daily': 'Twice Daily',
        'three_times_daily': 'Three Times Daily'
    };
    return frequencies[frequency] || frequency;
}

// Family History
function initFamilyHistory() {
    const addBtn = document.getElementById('addFamilyMemberBtn');
    const modal = document.getElementById('addFamilyMemberModal');
    const closeBtn = document.getElementById('closeFamilyMemberModal');
    const cancelBtn = document.getElementById('cancelFamilyMemberModal');
    const saveBtn = document.getElementById('saveFamilyMemberBtn');

    if (addBtn) addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal('addFamilyMemberModal'));
    if (cancelBtn) cancelBtn.addEventListener('click', () => closeModal('addFamilyMemberModal'));
    if (saveBtn) saveBtn.addEventListener('click', saveFamilyMember);

    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeModal('addFamilyMemberModal');
            }
        });
    }
}

function saveFamilyMember() {
    const name = document.getElementById('familyMemberName').value.trim();
    const relationship = document.getElementById('familyMemberRelationship').value;
    const conditions = document.getElementById('familyMemberConditions').value.trim();

    if (!name || !relationship) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    const member = {
        id: generateId(),
        name: name,
        relationship: relationship,
        conditions: conditions ? conditions.split(',').map(c => c.trim()).filter(c => c) : []
    };

    AppState.familyMembers.push(member);
    renderFamilyHistory();
    closeModal('addFamilyMemberModal');
    showToast(`${name} added successfully!`, 'success');
}

function renderFamilyHistory() {
    updateGeneticRisks();
    
    const container = document.getElementById('familyGrid');
    if (!container) return;

    if (AppState.familyMembers.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No family members added yet.</p></div>';
        return;
    }

    container.innerHTML = AppState.familyMembers.map(member => `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                    <h4>${member.name}</h4>
                    <p style="color: var(--text-secondary); margin: 0;">${member.relationship}</p>
                </div>
                <button class="btn btn-outline" onclick="deleteFamilyMember('${member.id}')" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            ${member.conditions.length > 0 ? `
                <div>
                    <strong>Conditions:</strong>
                    <p style="margin: 0.5rem 0 0 0;">${member.conditions.join(', ')}</p>
                </div>
            ` : '<p style="color: var(--text-secondary); margin: 0;"><em>No conditions recorded</em></p>'}
        </div>
    `).join('');
}

function updateGeneticRisks() {
    const container = document.getElementById('geneticWarnings');
    if (!container) return;

    const conditionCounts = {};
    AppState.familyMembers.forEach(member => {
        member.conditions.forEach(condition => {
            const key = condition.toLowerCase();
            conditionCounts[key] = (conditionCounts[key] || 0) + 1;
        });
    });

    const riskConditions = Object.entries(conditionCounts)
        .filter(([, count]) => count >= 1)
        .map(([condition, count]) => ({
            condition: condition.charAt(0).toUpperCase() + condition.slice(1),
            level: count >= 2 ? 'high' : 'moderate'
        }));

    if (riskConditions.length === 0) {
        container.innerHTML = `
            <div class="card">
                <h3><i class="fas fa-info-circle"></i> Genetic Risk Factors</h3>
                <p>No genetic risk factors identified. Add family medical history to see risk assessments.</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="card">
                <h3><i class="fas fa-exclamation-triangle"></i> Genetic Risk Factors</h3>
                ${riskConditions.map(risk => `
                    <div class="risk-item">
                        <span class="risk-condition">${risk.condition}</span>
                        <span class="status ${risk.level}">${risk.level} Risk</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function deleteFamilyMember(id) {
    const index = AppState.familyMembers.findIndex(member => member.id === id);
    if (index !== -1) {
        const name = AppState.familyMembers[index].name;
        AppState.familyMembers.splice(index, 1);
        renderFamilyHistory();
        showToast(`${name} removed successfully!`, 'success');
    }
}

// Profile
function initProfile() {
    const personalForm = document.getElementById('personalInfoForm');
    const addConditionBtn = document.getElementById('addConditionBtn');
    const addAllergyBtn = document.getElementById('addAllergyBtn');

    if (personalForm) {
        personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Profile updated successfully!', 'success');
        });
    }

    if (addConditionBtn) {
        addConditionBtn.addEventListener('click', () => {
            const input = document.getElementById('newCondition');
            const condition = input.value.trim();
            if (condition && !AppState.profile.conditions.includes(condition)) {
                AppState.profile.conditions.push(condition);
                input.value = '';
                renderProfile();
                showToast('Condition added!', 'success');
            }
        });
    }

    if (addAllergyBtn) {
        addAllergyBtn.addEventListener('click', () => {
            const input = document.getElementById('newAllergy');
            const allergy = input.value.trim();
            if (allergy && !AppState.profile.allergies.includes(allergy)) {
                AppState.profile.allergies.push(allergy);
                input.value = '';
                renderProfile();
                showToast('Allergy added!', 'success');
            }
        });
    }
}

function renderProfile() {
    const conditionsContainer = document.getElementById('conditionsTags');
    const allergiesContainer = document.getElementById('allergiesTags');

    if (conditionsContainer) {
        conditionsContainer.innerHTML = AppState.profile.conditions.map(condition => `
            <span class="tag">
                ${condition}
                <button type="button" class="tag-remove" onclick="removeCondition('${condition}')">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
    }

    if (allergiesContainer) {
        allergiesContainer.innerHTML = AppState.profile.allergies.map(allergy => `
            <span class="tag">
                ${allergy}
                <button type="button" class="tag-remove" onclick="removeAllergy('${allergy}')">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
    }
}

function removeCondition(condition) {
    AppState.profile.conditions = AppState.profile.conditions.filter(c => c !== condition);
    renderProfile();
    showToast('Condition removed!', 'success');
}

function removeAllergy(allergy) {
    AppState.profile.allergies = AppState.profile.allergies.filter(a => a !== allergy);
    renderProfile();
    showToast('Allergy removed!', 'success');
}

// Utilities
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        // Reset form
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLabResults();
    initMedications();
    initFamilyHistory();
    initProfile();
    
    // Load initial page
    loadPage(AppState.currentPage);
    
    console.log('MedSync initialized successfully');
});