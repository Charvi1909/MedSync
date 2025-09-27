// Clean MedSync JavaScript with Genetic Risk Assessment
const AppState = {
    currentPage: 'dashboard',
    medications: [],
    familyMembers: [],
    labResults: [],
    sharedReports: [],
    currentAnalysis: null,
    profile: {
        conditions: [],
        allergies: []
    }
};

// API Configuration
const API_CONFIG = {
    baseUrl: 'https://medsync-backend-xajh.onrender.com',
    endpoints: {
        summarize: '/summarize'
    }
};

// Genetic Risk Database - Simplified for reliability
const GeneticRiskDatabase = {
    conditions: {
        "diabetes type 2": {
            displayName: "Diabetes Type 2",
            populationRisk: 11.2,
            familyRisk: 40,
            recommendations: [
                "Regular glucose screening every 3 years starting at age 35",
                "Maintain healthy weight (BMI < 25)",
                "Exercise at least 150 minutes per week",
                "Follow Mediterranean or DASH diet pattern"
            ],
            warningSigns: [
                "Increased thirst and frequent urination",
                "Unexplained weight loss",
                "Extreme fatigue",
                "Blurred vision"
            ]
        },
        "hypertension": {
            displayName: "Hypertension (High Blood Pressure)",
            populationRisk: 45,
            familyRisk: 60,
            recommendations: [
                "Regular blood pressure monitoring",
                "Reduce sodium intake to <2300mg/day",
                "Regular aerobic exercise",
                "Maintain healthy weight"
            ],
            warningSigns: [
                "Often no symptoms (silent killer)",
                "Severe headaches",
                "Shortness of breath",
                "Chest pain"
            ]
        },
        "heart disease": {
            displayName: "Heart Disease",
            populationRisk: 6.5,
            familyRisk: 40,
            recommendations: [
                "Cholesterol screening every 5 years",
                "Regular cardiovascular exercise",
                "Heart-healthy diet",
                "Don't smoke"
            ],
            warningSigns: [
                "Chest pain or discomfort",
                "Shortness of breath",
                "Irregular heartbeat",
                "Fatigue"
            ]
        },
        "breast cancer": {
            displayName: "Breast Cancer",
            populationRisk: 12.5,
            familyRisk: 17,
            recommendations: [
                "Mammograms annually starting at age 40",
                "Clinical breast exams annually",
                "Maintain healthy weight",
                "Limit alcohol consumption"
            ],
            warningSigns: [
                "New lump in breast or armpit",
                "Changes in breast size or shape",
                "Skin dimpling or puckering",
                "Nipple discharge"
            ]
        }
    },

    calculateRisk(conditionName, familyHistory) {
        const condition = this.conditions[conditionName.toLowerCase()];
        
        if (!condition) {
            return {
                riskLevel: "N/A",
                riskDescription: "No genetic data available for this condition",
                recommendations: ["Consult with a healthcare provider"],
                warningSigns: []
            };
        }

        const hasAffectedFamily = familyHistory.some(member => 
            member.conditions.some(c => 
                c.toLowerCase().includes(conditionName.toLowerCase().split(' ')[0])
            )
        );

        if (hasAffectedFamily) {
            const riskIncrease = condition.familyRisk - condition.populationRisk;
            let riskLevel = "Moderate";
            
            if (riskIncrease >= 20) riskLevel = "High";
            else if (riskIncrease >= 10) riskLevel = "Moderate";
            else riskLevel = "Low-Moderate";

            return {
                riskLevel: riskLevel,
                riskDescription: `${riskLevel} risk (${condition.familyRisk}%) due to family history. Population risk is ${condition.populationRisk}%.`,
                recommendations: condition.recommendations,
                warningSigns: condition.warningSigns || []
            };
        }

        return {
            riskLevel: "Population Level",
            riskDescription: `Standard population risk (${condition.populationRisk}%). No family history of this condition.`,
            recommendations: ["Follow standard screening guidelines"],
            warningSigns: []
        };
    }
};

// Report Database (using localStorage)
const ReportDB = {
    async saveReport(reportData) {
        try {
            const reportId = generateId();
            const report = {
                id: reportId,
                ...reportData,
                createdAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            };
            
            const reports = JSON.parse(localStorage.getItem('medSyncReports') || '[]');
            reports.push(report);
            localStorage.setItem('medSyncReports', JSON.stringify(reports));
            
            return { success: true, reportId, shareUrl: `${window.location.origin}/report/${reportId}` };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    async getUserReports() {
        try {
            const reports = JSON.parse(localStorage.getItem('medSyncReports') || '[]');
            const validReports = reports.filter(r => new Date(r.expiresAt) >= new Date());
            return { success: true, reports: validReports };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

// Markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    if (!markdown) return '';
    
    let html = markdown
        .replace(/### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/#### (.*?)$/gm, '<h4>$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\- (.*?)$/gm, '<li>$1</li>')
        .replace(/---+/g, '<hr>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><h/g, '<h');
    html = html.replace(/<\/h(\d)><\/p>/g, '</h$1>');
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    
    return html;
}

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
            
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(page).classList.add('active');
            
            AppState.currentPage = page;
            loadPage(page);
        });
    });

    if (sidebarToggle && sidebar) {
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
        case 'reports':
            renderReports();
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
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border);">
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
        let summary = 'Based on your medication consistency, your health metrics are showing positive trends.';
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
    const shareReportBtn = document.getElementById('shareReportBtn');
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    if (!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', () => {
        if (!document.getElementById('uploadProgress').classList.contains('hidden')) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(file);
    });

    if (shareReportBtn) shareReportBtn.addEventListener('click', shareCurrentReport);
    if (copyLinkBtn) copyLinkBtn.addEventListener('click', copyReportLink);

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
        if (files.length > 0 && files[0].type === 'application/pdf') {
            handleFileUpload(files[0]);
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
    setTimeout(() => progressFill.style.width = '95%', 2400);
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
    const analysisActions = document.getElementById('analysisActions');

    if (currentTestType) currentTestType.textContent = fileName;
    if (currentTestDate) currentTestDate.textContent = formatDate(new Date());
    
    if (currentAnalysis) {
        const htmlContent = convertMarkdownToHTML(summary);
        currentAnalysis.innerHTML = htmlContent;
    }

    AppState.currentAnalysis = { fileName, summary, date: new Date().toISOString() };

    if (analysisActions) analysisActions.classList.remove('hidden');
}

async function shareCurrentReport() {
    if (!AppState.currentAnalysis) {
        showToast('No analysis to share', 'error');
        return;
    }

    try {
        const result = await ReportDB.saveReport(AppState.currentAnalysis);
        if (result.success) {
            showShareModal(result.shareUrl);
            showToast('Report shared successfully!', 'success');
        } else {
            showToast('Failed to share report', 'error');
        }
    } catch (error) {
        showToast('Failed to share report', 'error');
    }
}

async function copyReportLink() {
    if (!AppState.currentAnalysis) {
        showToast('No analysis to share', 'error');
        return;
    }

    try {
        const result = await ReportDB.saveReport(AppState.currentAnalysis);
        if (result.success) {
            await navigator.clipboard.writeText(result.shareUrl);
            showToast('Link copied to clipboard!', 'success');
        }
    } catch (error) {
        showToast('Failed to copy link', 'error');
    }
}

function showShareModal(shareUrl) {
    const modal = document.getElementById('shareReportModal');
    const shareLink = document.getElementById('shareReportLink');
    
    if (modal && shareLink) {
        shareLink.value = shareUrl;
        modal.classList.remove('hidden');
    }
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
        <div class="history-item" onclick="displayAnalysis('${result.summary.replace(/'/g, "\\'")}', '${result.fileName}')">
            <h4>${result.fileName} <span class="history-date">${formatDate(result.date)}</span></h4>
            <div class="history-summary">${result.summary.replace(/[#*]/g, '').substring(0, 150)}...</div>
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
        container.innerHTML = '<div class="empty-state"><p>No medications added yet.</p></div>';
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

// Family History with Genetic Risk Assessment
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

    if (AppState.familyMembers.length === 0) {
        container.innerHTML = `
            <div class="card">
                <h3><i class="fas fa-info-circle"></i> Genetic Risk Assessment</h3>
                <p>Add family members with their medical conditions to see personalized genetic risk assessments.</p>
                <p><strong>Available genetic data for:</strong> Diabetes Type 2, Hypertension, Heart Disease, Breast Cancer</p>
            </div>
        `;
        return;
    }

    // Get all unique conditions from family history
    const allConditions = new Set();
    AppState.familyMembers.forEach(member => {
        member.conditions.forEach(condition => {
            allConditions.add(condition.toLowerCase().trim());
        });
    });

    if (allConditions.size === 0) {
        container.innerHTML = `
            <div class="card">
                <h3><i class="fas fa-info-circle"></i> Genetic Risk Assessment</h3>
                <p>Family members added but no medical conditions specified. Add conditions to see risk assessments.</p>
            </div>
        `;
        return;
    }

    const riskAssessments = [];
    
    // Check each condition against our database
    ['diabetes type 2', 'hypertension', 'heart disease', 'breast cancer'].forEach(condition => {
        const riskData = GeneticRiskDatabase.calculateRisk(condition, AppState.familyMembers);
        
        if (riskData.riskLevel !== "N/A" && riskData.riskLevel !== "Population Level") {
            riskAssessments.push({
                condition: GeneticRiskDatabase.conditions[condition].displayName,
                ...riskData
            });
        }
    });

    if (riskAssessments.length === 0) {
        container.innerHTML = `
            <div class="card">
                <h3><i class="fas fa-info-circle"></i> Genetic Risk Assessment</h3>
                <p style="color: var(--warning-color);">
                    <i class="fas fa-exclamation-triangle"></i>
                    No genetic risk data available for the conditions in your family history.
                </p>
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
                    <p><strong>Conditions in your family:</strong></p>
                    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                        ${Array.from(allConditions).map(condition => `<li style="text-transform: capitalize;">${condition}</li>`).join('')}
                    </ul>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">
                        We have genetic risk data for: Diabetes Type 2, Hypertension, Heart Disease, and Breast Cancer.
                    </p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-dna"></i> Genetic Risk Assessment</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                Based on your family medical history:
            </p>
            
            ${riskAssessments.map(risk => `
                <div style="margin-bottom: 2rem; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div>
                            <h4 style="margin: 0; color: var(--text-color);">${risk.condition}</h4>
                        </div>
                        <span style="padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; 
                                     background: ${risk.riskLevel === 'High' ? '#fef3c7' : '#dbeafe'}; 
                                     color: ${risk.riskLevel === 'High' ? '#d97706' : '#2563eb'};">
                            ${risk.riskLevel} Risk
                        </span>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <p style="margin: 0; color: var(--text-color); font-weight: 500;">${risk.riskDescription}</p>
                    </div>
                    
                    <details style="margin-bottom: 1rem;">
                        <summary style="cursor: pointer; font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem;">
                            <i class="fas fa-lightbulb"></i> Preventive Recommendations
                        </summary>
                        <ul style="margin: 0.5rem 0; padding-left: 1.5rem; font-size: 0.9rem;">
                            ${risk.recommendations.map(rec => `<li style="margin: 0.25rem 0;">${rec}</li>`).join('')}
                        </ul>
                    </details>
                    
                    ${risk.warningSigns && risk.warningSigns.length > 0 ? `
                        <details>
                            <summary style="cursor: pointer; font-weight: 600; color: var(--warning-color); margin-bottom: 0.5rem;">
                                <i class="fas fa-exclamation-triangle"></i> Warning Signs
                            </summary>
                            <ul style="margin: 0.5rem 0; padding-left: 1.5rem; font-size: 0.9rem;">
                                ${risk.warningSigns.map(sign => `<li style="margin: 0.25rem 0;">${sign}</li>`).join('')}
                            </ul>
                        </details>
                    ` : ''}
                </div>
            `).join('')}
            
            <div style="background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 1rem; margin-top: 1.5rem;">
                <p style="margin: 0; font-size: 0.9rem; color: var(--primary-color);">
                    <i class="fas fa-info-circle"></i>
                    <strong>Note:</strong> These assessments are based on family history and population data. 
                    Consult with a healthcare provider for personalized medical advice.
                </p>
            </div>
        </div>
    `;
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

// Reports
function initReports() {
    const generateLinkBtn = document.getElementById('generateLinkBtn');
    if (generateLinkBtn) {
        generateLinkBtn.addEventListener('click', async () => {
            if (!AppState.currentAnalysis) {
                showToast('No analysis available. Upload a lab report first.', 'error');
                return;
            }

            try {
                const result = await ReportDB.saveReport(AppState.currentAnalysis);
                if (result.success) {
                    const reportLink = document.getElementById('reportLink');
                    if (reportLink) reportLink.value = result.shareUrl;
                    showToast('Share link generated!', 'success');
                }
            } catch (error) {
                showToast('Failed to generate link', 'error');
            }
        });
    }
}

async function renderReports() {
    try {
        const result = await ReportDB.getUserReports();
        if (result.success) {
            AppState.sharedReports = result.reports;
            renderSharedReports();
        }
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

function renderSharedReports() {
    const container = document.getElementById('sharedReportsList');
    if (!container) return;

    if (AppState.sharedReports.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No shared reports yet</p></div>';
        return;
    }

    container.innerHTML = AppState.sharedReports.map(report => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 0.5rem;">
            <div>
                <h4 style="margin: 0; font-size: 1rem;">${report.fileName}</h4>
                <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary);">
                    Shared on ${formatDate(report.createdAt)}
                </p>
            </div>
            <button class="btn btn-secondary" onclick="copyToClipboard('${report.shareUrl}')">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `).join('');
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Link copied to clipboard!', 'success');
    } catch (error) {
        showToast('Failed to copy link', 'error');
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

// Share modal handlers
function initShareModal() {
    const closeShareModal = document.getElementById('closeShareModal');
    const closeShareModalBtn = document.getElementById('closeShareModalBtn');
    const copyShareLinkBtn = document.getElementById('copyShareLinkBtn');
    const shareModal = document.getElementById('shareReportModal');

    if (closeShareModal) {
        closeShareModal.addEventListener('click', () => shareModal.classList.add('hidden'));
    }

    if (closeShareModalBtn) {
        closeShareModalBtn.addEventListener('click', () => shareModal.classList.add('hidden'));
    }

    if (copyShareLinkBtn) {
        copyShareLinkBtn.addEventListener('click', async () => {
            const shareLink = document.getElementById('shareReportLink');
            try {
                await navigator.clipboard.writeText(shareLink.value);
                showToast('Link copied to clipboard!', 'success');
            } catch (error) {
                showToast('Failed to copy link', 'error');
            }
        });
    }

    if (shareModal) {
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal || e.target.classList.contains('modal-overlay')) {
                shareModal.classList.add('hidden');
            }
        });
    }
}

// Utilities
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
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
    initReports();
    initShareModal();
    
    loadPage(AppState.currentPage);
    
    console.log('MedSync initialized successfully');
});