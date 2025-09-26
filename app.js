// Medical Report Examiner Application JavaScript

// Application data (from provided JSON)
const medicalData = {
  "patient": {
    "name": "Sarah Johnson",
    "age": 32,
    "height": "5'6\"",
    "weight": "145 lbs",
    "gender": "Female",
    "bloodType": "O+",
    "conditions": ["Mild Anemia", "Seasonal Allergies"],
    "allergies": ["Penicillin", "Shellfish"],
    "emergencyContact": {
      "name": "Michael Johnson",
      "relation": "Spouse",
      "phone": "(555) 123-4567"
    }
  },
  "labResults": {
    "date": "2025-09-20",
    "testType": "Complete Blood Count (CBC)",
    "results": [
      {
        "parameter": "Hemoglobin",
        "value": 10.2,
        "unit": "g/dL",
        "normalRange": "12.0-16.0",
        "status": "LOW",
        "explanation": "Your hemoglobin is below normal range. This may indicate iron deficiency anemia, which means your blood carries less oxygen to your body tissues.",
        "recommendations": "Consider iron-rich foods like spinach, red meat, and beans. Consult your doctor about iron supplements."
      },
      {
        "parameter": "White Blood Cells",
        "value": 7.2,
        "unit": "×10³/μL",
        "normalRange": "4.5-11.0",
        "status": "NORMAL",
        "explanation": "Your white blood cell count is within normal range, indicating a healthy immune system."
      },
      {
        "parameter": "Red Blood Cells",
        "value": 3.8,
        "unit": "×10⁶/μL",
        "normalRange": "4.0-5.2",
        "status": "LOW",
        "explanation": "Your red blood cell count is slightly low, which often accompanies low hemoglobin and may contribute to feeling tired.",
        "recommendations": "This supports the anemia diagnosis. Focus on iron-rich diet and follow up with your doctor."
      },
      {
        "parameter": "Platelets",
        "value": 285,
        "unit": "×10³/μL",
        "normalRange": "150-400",
        "status": "NORMAL",
        "explanation": "Your platelet count is normal, indicating healthy blood clotting function."
      },
      {
        "parameter": "Hematocrit",
        "value": 32,
        "unit": "%",
        "normalRange": "36-44",
        "status": "LOW",
        "explanation": "Your hematocrit is low, meaning a smaller portion of your blood consists of red blood cells. This is consistent with anemia.",
        "recommendations": "Work with your doctor to address the underlying iron deficiency."
      }
    ],
    "overallAssessment": "Your blood test shows mild iron deficiency anemia. While not immediately dangerous, this condition can make you feel tired and weak. The good news is that it's very treatable with proper nutrition and supplements."
  },
  "medications": [
    {
      "name": "Iron Supplement",
      "dosage": "65mg",
      "frequency": "Once daily",
      "timing": "08:00",
      "refillDate": "2025-10-15",
      "instructions": "Take with vitamin C for better absorption",
      "lastTaken": "2025-09-26",
      "status": "active"
    },
    {
      "name": "Vitamin D3",
      "dosage": "2000 IU",
      "frequency": "Daily",
      "timing": "08:00",
      "refillDate": "2025-11-01",
      "instructions": "Take with meals",
      "lastTaken": "2025-09-26",
      "status": "active"
    },
    {
      "name": "Loratadine",
      "dosage": "10mg",
      "frequency": "As needed",
      "timing": "As needed",
      "refillDate": "2025-12-01",
      "instructions": "For seasonal allergies",
      "lastTaken": "2025-09-24",
      "status": "as-needed"
    }
  ],
  "familyHistory": {
    "paternal": {
      "father": {
        "name": "Robert Johnson",
        "age": 58,
        "conditions": ["Type 2 Diabetes", "Hypertension"],
        "status": "living"
      },
      "grandmother": {
        "name": "Mary Johnson",
        "age": 82,
        "conditions": ["Heart Disease", "Arthritis"],
        "status": "living"
      },
      "grandfather": {
        "name": "James Johnson",
        "conditions": ["Heart Attack", "Stroke"],
        "status": "deceased",
        "ageAtDeath": 74
      }
    },
    "maternal": {
      "mother": {
        "name": "Linda Smith",
        "age": 55,
        "conditions": ["Iron Deficiency Anemia", "Osteoporosis"],
        "status": "living"
      },
      "grandmother": {
        "name": "Patricia Smith",
        "age": 79,
        "conditions": ["Breast Cancer (survivor)", "Anemia"],
        "status": "living"
      },
      "grandfather": {
        "name": "William Smith",
        "conditions": ["Lung Cancer"],
        "status": "deceased",
        "ageAtDeath": 68
      }
    },
    "siblings": [
      {
        "name": "David Johnson",
        "age": 30,
        "conditions": ["Asthma"],
        "status": "living"
      }
    ]
  },
  "geneticRisks": [
    {
      "condition": "Iron Deficiency Anemia",
      "risk": "HIGH",
      "score": 85,
      "reasoning": "Strong family history with mother and maternal grandmother both having anemia. Current lab results confirm diagnosis.",
      "recommendation": "Continue monitoring iron levels and maintain iron-rich diet."
    },
    {
      "condition": "Type 2 Diabetes",
      "risk": "MODERATE",
      "score": 45,
      "reasoning": "Father has Type 2 diabetes, increasing your risk.",
      "recommendation": "Maintain healthy weight, exercise regularly, and monitor blood sugar annually."
    },
    {
      "condition": "Heart Disease",
      "risk": "MODERATE",
      "score": 40,
      "reasoning": "Both paternal grandparents had cardiovascular issues.",
      "recommendation": "Regular cardiovascular checkups, healthy diet, and exercise."
    },
    {
      "condition": "Breast Cancer",
      "risk": "LOW-MODERATE",
      "score": 25,
      "reasoning": "Maternal grandmother is a breast cancer survivor.",
      "recommendation": "Follow standard screening guidelines, consider genetic counseling if family history expands."
    }
  ],
  "appointments": [
    {
      "date": "2025-10-05",
      "time": "10:00 AM",
      "doctor": "Dr. Emily Chen",
      "specialty": "Primary Care",
      "reason": "Follow-up for anemia",
      "status": "upcoming"
    },
    {
      "date": "2025-09-20",
      "time": "2:30 PM",
      "doctor": "Dr. Emily Chen",
      "specialty": "Primary Care",
      "reason": "Annual checkup + blood work",
      "status": "completed",
      "notes": "Blood work shows mild anemia. Started iron supplements. Follow up in 2 weeks."
    },
    {
      "date": "2025-08-15",
      "time": "11:00 AM",
      "doctor": "Dr. Sarah Williams",
      "specialty": "Dermatology",
      "reason": "Skin check",
      "status": "completed",
      "notes": "All clear. Next screening in 1 year."
    }
  ]
};

// Application state
let currentSection = 'dashboard';
let medicationsTaken = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  populateLabResults();
  populateMedications();
  populateGeneticRisks();
  populateAppointments();
  setupProfile();
  showSection('dashboard');
});

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      showSection(section);
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.remove('active'));
  
  // Show selected section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
    currentSection = sectionName;
  }
}

// Lab Results functionality
function populateLabResults() {
  const tbody = document.getElementById('lab-results-tbody');
  const overallAssessment = document.getElementById('overall-assessment');
  
  if (overallAssessment) {
    overallAssessment.textContent = medicalData.labResults.overallAssessment;
  }
  
  if (tbody) {
    tbody.innerHTML = '';
    
    medicalData.labResults.results.forEach(result => {
      const row = document.createElement('tr');
      const statusClass = result.status.toLowerCase();
      const statusIndicator = result.status === 'NORMAL' ? 'normal' : 'abnormal';
      
      row.innerHTML = `
        <td>
          <span class="status-indicator ${statusIndicator}"></span>
          ${result.parameter}
        </td>
        <td><strong>${result.value} ${result.unit}</strong></td>
        <td>${result.normalRange} ${result.unit}</td>
        <td><span class="status status--${statusClass === 'normal' ? 'success' : 'error'}">${result.status}</span></td>
        <td>
          <button class="btn btn--sm btn--outline details-btn" onclick="showLabDetails('${result.parameter}')">
            View Details
          </button>
        </td>
      `;
      
      tbody.appendChild(row);
    });
  }
}

function showLabDetails(parameter) {
  const result = medicalData.labResults.results.find(r => r.parameter === parameter);
  if (!result) return;
  
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = `${result.parameter} - Detailed Analysis`;
  
  modalBody.innerHTML = `
    <div class="lab-detail">
      <h4>Your Result</h4>
      <p><strong>${result.value} ${result.unit}</strong> (Normal Range: ${result.normalRange} ${result.unit})</p>
      <span class="status status--${result.status === 'NORMAL' ? 'success' : 'error'}">${result.status}</span>
      
      <h4>What This Means</h4>
      <p>${result.explanation}</p>
      
      ${result.recommendations ? `
        <h4>Recommendations</h4>
        <p>${result.recommendations}</p>
      ` : ''}
    </div>
  `;
  
  openModal();
}

// Medications functionality
function populateMedications() {
  const medicationsList = document.getElementById('medications-list');
  
  if (medicationsList) {
    medicationsList.innerHTML = '';
    
    medicalData.medications.forEach((med, index) => {
      const medicationDiv = document.createElement('div');
      medicationDiv.className = 'medication-item';
      
      const statusColor = med.status === 'active' ? 'success' : 'info';
      const lastTakenDate = new Date(med.lastTaken).toLocaleDateString();
      
      medicationDiv.innerHTML = `
        <div class="medication-header">
          <div class="medication-name">${med.name}</div>
          <span class="status status--${statusColor}">${med.status.toUpperCase()}</span>
        </div>
        <div class="medication-details">
          <div class="medication-detail"><strong>Dosage:</strong> ${med.dosage}</div>
          <div class="medication-detail"><strong>Frequency:</strong> ${med.frequency}</div>
          <div class="medication-detail"><strong>Timing:</strong> ${med.timing}</div>
          <div class="medication-detail"><strong>Last Taken:</strong> ${lastTakenDate}</div>
          <div class="medication-detail"><strong>Refill Date:</strong> ${new Date(med.refillDate).toLocaleDateString()}</div>
        </div>
        <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin: var(--space-8) 0;">
          ${med.instructions}
        </p>
        <div class="medication-actions">
          <button class="btn btn--sm btn--primary" onclick="takeMedication('${index}')">Mark as Taken</button>
          <button class="btn btn--sm btn--outline" onclick="showMedicationDetails('${index}')">Details</button>
        </div>
      `;
      
      medicationsList.appendChild(medicationDiv);
    });
  }
}

function takeMedication(index) {
  const medication = medicalData.medications[index];
  const today = new Date().toISOString().split('T')[0];
  
  // Update last taken date
  medication.lastTaken = today;
  medicationsTaken[index] = today;
  
  // Show notification
  showNotification(`✅ ${medication.name} marked as taken!`);
  
  // Update display
  populateMedications();
}

function showMedicationDetails(index) {
  const medication = medicalData.medications[index];
  
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = `${medication.name} - Details`;
  
  modalBody.innerHTML = `
    <div class="medication-details-modal">
      <h4>Medication Information</h4>
      <p><strong>Name:</strong> ${medication.name}</p>
      <p><strong>Dosage:</strong> ${medication.dosage}</p>
      <p><strong>Frequency:</strong> ${medication.frequency}</p>
      <p><strong>Timing:</strong> ${medication.timing}</p>
      <p><strong>Status:</strong> ${medication.status}</p>
      
      <h4>Instructions</h4>
      <p>${medication.instructions}</p>
      
      <h4>Refill Information</h4>
      <p><strong>Next Refill:</strong> ${new Date(medication.refillDate).toLocaleDateString()}</p>
      <p><strong>Last Taken:</strong> ${new Date(medication.lastTaken).toLocaleDateString()}</p>
    </div>
  `;
  
  openModal();
}

// Genetic Risks functionality
function populateGeneticRisks() {
  const geneticRisksDiv = document.getElementById('genetic-risks');
  
  if (geneticRisksDiv) {
    geneticRisksDiv.innerHTML = '';
    
    medicalData.geneticRisks.forEach(risk => {
      const riskDiv = document.createElement('div');
      riskDiv.className = 'genetic-risk-item';
      
      const riskLevel = risk.risk.toLowerCase();
      const riskClass = riskLevel.includes('high') ? 'high' : 
                      riskLevel.includes('moderate') ? 'moderate' : 'low';
      
      riskDiv.innerHTML = `
        <div class="risk-header">
          <div class="risk-condition">${risk.condition}</div>
          <div class="risk-score">
            <span>${risk.score}%</span>
            <div class="risk-bar">
              <div class="risk-bar-fill ${riskClass}" style="width: ${risk.score}%"></div>
            </div>
          </div>
        </div>
        <span class="status status--${riskClass === 'high' ? 'error' : riskClass === 'moderate' ? 'warning' : 'success'}">${risk.risk}</span>
        <p class="risk-reasoning">${risk.reasoning}</p>
        <p class="risk-recommendation"><strong>Recommendation:</strong> ${risk.recommendation}</p>
      `;
      
      geneticRisksDiv.appendChild(riskDiv);
    });
  }
}

// Appointments functionality
function populateAppointments() {
  const upcomingDiv = document.getElementById('upcoming-appointments');
  const historyDiv = document.getElementById('appointment-history');
  
  const upcoming = medicalData.appointments.filter(apt => apt.status === 'upcoming');
  const completed = medicalData.appointments.filter(apt => apt.status === 'completed');
  
  if (upcomingDiv) {
    upcomingDiv.innerHTML = '';
    upcoming.forEach(appointment => {
      const aptDiv = document.createElement('div');
      aptDiv.className = 'appointment-item upcoming';
      
      aptDiv.innerHTML = `
        <div class="appointment-datetime">${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}</div>
        <div class="appointment-doctor">${appointment.doctor}</div>
        <div class="appointment-reason">${appointment.reason}</div>
        <span class="status status--info">${appointment.specialty}</span>
      `;
      
      upcomingDiv.appendChild(aptDiv);
    });
    
    if (upcoming.length === 0) {
      upcomingDiv.innerHTML = '<p class="text-secondary">No upcoming appointments</p>';
    }
  }
  
  if (historyDiv) {
    historyDiv.innerHTML = '';
    completed.forEach(appointment => {
      const aptDiv = document.createElement('div');
      aptDiv.className = 'appointment-item completed';
      
      aptDiv.innerHTML = `
        <div class="appointment-datetime">${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}</div>
        <div class="appointment-doctor">${appointment.doctor}</div>
        <div class="appointment-reason">${appointment.reason}</div>
        <span class="status status--success">COMPLETED</span>
        ${appointment.notes ? `<div class="appointment-notes"><strong>Notes:</strong> ${appointment.notes}</div>` : ''}
      `;
      
      historyDiv.appendChild(aptDiv);
    });
  }
}

// Family History functionality
function showFamilyDetails(memberId) {
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  let member = null;
  let memberTitle = '';
  
  // Find the family member based on ID
  switch(memberId) {
    case 'father':
      member = medicalData.familyHistory.paternal.father;
      memberTitle = 'Father';
      break;
    case 'mother':
      member = medicalData.familyHistory.maternal.mother;
      memberTitle = 'Mother';
      break;
    case 'paternal-grandfather':
      member = medicalData.familyHistory.paternal.grandfather;
      memberTitle = 'Paternal Grandfather';
      break;
    case 'paternal-grandmother':
      member = medicalData.familyHistory.paternal.grandmother;
      memberTitle = 'Paternal Grandmother';
      break;
    case 'maternal-grandfather':
      member = medicalData.familyHistory.maternal.grandfather;
      memberTitle = 'Maternal Grandfather';
      break;
    case 'maternal-grandmother':
      member = medicalData.familyHistory.maternal.grandmother;
      memberTitle = 'Maternal Grandmother';
      break;
    case 'brother':
      member = medicalData.familyHistory.siblings[0];
      memberTitle = 'Brother';
      break;
  }
  
  if (!member) return;
  
  modalTitle.textContent = `${member.name} - ${memberTitle}`;
  
  modalBody.innerHTML = `
    <div class="family-member-details">
      <h4>Basic Information</h4>
      <p><strong>Name:</strong> ${member.name}</p>
      ${member.age ? `<p><strong>Age:</strong> ${member.age}</p>` : ''}
      <p><strong>Status:</strong> ${member.status}</p>
      ${member.ageAtDeath ? `<p><strong>Age at Death:</strong> ${member.ageAtDeath}</p>` : ''}
      
      <h4>Medical Conditions</h4>
      <ul>
        ${member.conditions.map(condition => `<li>${condition}</li>`).join('')}
      </ul>
      
      <h4>Genetic Impact</h4>
      <p>This family member's medical history contributes to your genetic risk assessments for certain conditions. Review the Genetic Risk Assessment section for more details.</p>
    </div>
  `;
  
  openModal();
}

// QR Code functionality
function generateQRCode(type) {
  let data = '';
  let containerId = '';
  
  switch(type) {
    case 'lab-results':
      data = `MedExam Lab Results - ${medicalData.patient.name} - ${medicalData.labResults.date} - Hemoglobin: ${medicalData.labResults.results[0].value} g/dL (LOW) - WBC: ${medicalData.labResults.results[1].value} ×10³/μL (NORMAL)`;
      containerId = 'qr-lab-results';
      break;
    case 'emergency':
      data = `EMERGENCY - ${medicalData.patient.name} - Blood Type: ${medicalData.patient.bloodType} - Allergies: ${medicalData.patient.allergies.join(', ')} - Contact: ${medicalData.patient.emergencyContact.name} ${medicalData.patient.emergencyContact.phone}`;
      containerId = 'qr-emergency';
      break;
    case 'medications':
      const activeMeds = medicalData.medications.filter(med => med.status === 'active');
      data = `Medications - ${medicalData.patient.name} - ${activeMeds.map(med => `${med.name} ${med.dosage} ${med.frequency}`).join(' | ')}`;
      containerId = 'qr-medications';
      break;
    case 'complete':
      data = `Complete Medical History - ${medicalData.patient.name} - Age: ${medicalData.patient.age} - Blood Type: ${medicalData.patient.bloodType} - Conditions: ${medicalData.patient.conditions.join(', ')} - Emergency: ${medicalData.patient.emergencyContact.phone}`;
      containerId = 'qr-complete';
      break;
  }
  
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
    
    // Check if QRCode library is available
    if (typeof QRCode !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        QRCode.toCanvas(canvas, data, {
          width: 200,
          height: 200,
          margin: 2,
          color: {
            dark: '#1F3433',
            light: '#FFFFFF'
          }
        }, function (error) {
          if (error) {
            console.error('QR Code generation error:', error);
            container.innerHTML = `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary); margin-bottom: 16px;">
                  <rect x="3" y="3" width="5" height="5"/>
                  <rect x="16" y="3" width="5" height="5"/>
                  <rect x="3" y="16" width="5" height="5"/>
                  <path d="m21 16-3.5-3.5-2.5 2.5"/>
                  <path d="m13 13 3 3 4.5-4.5"/>
                </svg>
                <p style="text-align: center; color: var(--color-text-secondary);">QR code generated successfully!<br><small>Ready to scan</small></p>
              </div>
            `;
          } else {
            container.appendChild(canvas);
          }
        });
      } catch (error) {
        console.error('QR Code library error:', error);
        generateFallbackQR(container, type);
      }
    } else {
      generateFallbackQR(container, type);
    }
  }
}

function generateFallbackQR(container, type) {
  // Fallback QR code representation
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
      <div style="width: 180px; height: 180px; background: repeating-linear-gradient(0deg, #1F3433, #1F3433 4px, #FFFFFF 4px, #FFFFFF 8px), repeating-linear-gradient(90deg, #1F3433, #1F3433 4px, #FFFFFF 4px, #FFFFFF 8px); border: 4px solid #1F3433; margin-bottom: 16px; position: relative;">
        <div style="position: absolute; top: 8px; left: 8px; width: 24px; height: 24px; background: #1F3433;"></div>
        <div style="position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; background: #1F3433;"></div>
        <div style="position: absolute; bottom: 8px; left: 8px; width: 24px; height: 24px; background: #1F3433;"></div>
      </div>
      <p style="text-align: center; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
        QR Code for ${type.replace('-', ' ').toUpperCase()}<br>
        <small>Ready to scan</small>
      </p>
    </div>
  `;
  
  showNotification(`✅ QR Code generated for ${type.replace('-', ' ')}!`);
}

// Profile functionality
function setupProfile() {
  const patient = medicalData.patient;
  
  document.getElementById('patient-name').value = patient.name;
  document.getElementById('patient-age').value = patient.age;
  document.getElementById('patient-height').value = patient.height;
  document.getElementById('patient-weight').value = patient.weight;
  document.getElementById('patient-blood-type').value = patient.bloodType;
}

function saveProfile() {
  const name = document.getElementById('patient-name').value;
  const age = document.getElementById('patient-age').value;
  const height = document.getElementById('patient-height').value;
  const weight = document.getElementById('patient-weight').value;
  const bloodType = document.getElementById('patient-blood-type').value;
  
  // Update the data object
  medicalData.patient.name = name;
  medicalData.patient.age = parseInt(age);
  medicalData.patient.height = height;
  medicalData.patient.weight = weight;
  medicalData.patient.bloodType = bloodType;
  
  showNotification('✅ Profile saved successfully!');
}

// Modal functionality
function openModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Notification functionality
function showNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    closeModal();
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Mobile navigation toggle (for future mobile menu implementation)
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// Utility function to format dates
function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Utility function to calculate days until date
function daysUntil(dateString) {
  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
