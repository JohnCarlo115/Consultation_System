let selectedProfessorName = "Prof. Santos"; // Default fallback

function selectProfessor(cardElement, profName) {
    // 1. Remove selected highlight state from all professor cards
    const allCards = document.querySelectorAll('.prof-card');
    allCards.forEach(card => card.classList.remove('selected'));

    // 2. Add selected highlight state to clicked card
    cardElement.classList.add('selected');

    // 3. Save selected professor name
    selectedProfessorName = profName;
}

document.getElementById('ccs-consultation-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;
  const selectedProf = document.querySelector('.prof-card.selected');

  // Helper to show/clear inline errors
  const setError = (id, msg) => {
    const input = document.getElementById(id);
    const err = document.getElementById('err-' + id);
    if (msg) {
      input?.classList.add('invalid');
      if (err) err.textContent = msg;
      isValid = false;
    } else {
      input?.classList.remove('invalid');
      if (err) err.textContent = '';
    }
  };

  // 1. Validate Professor Selection
  if (!selectedProf) {
    triggerNotification('Please select a professor in Step 1 before submitting.', 'error');
    isValid = false;
  }

  // 2. Validate Student Number (e.g. 2024-00101)
  const studentId = document.getElementById('student-id').value.trim();
  const idPattern = /^\d{4}-\d{5}$/;
  if (!studentId) {
    setError('student-id', 'Student number is required.');
  } else if (!idPattern.test(studentId)) {
    setError('student-id', 'Format must be YYYY-XXXXX (e.g., 2024-00101).');
  } else {
    setError('student-id', '');
  }

  // 3. Validate Course/Section, Subject, Type, Topic
  const course = document.getElementById('course-section').value.trim();
  setError('course-section', course ? '' : 'Course & Section is required (e.g., BSIT-NA3B).');

  const subject = document.getElementById('subject-code').value.trim();
  setError('subject-code', subject ? '' : 'Subject code or title is required.');

  const consultType = document.getElementById('consult-type').value;
  setError('consult-type', consultType ? '' : 'Please select a consultation type.');

  const topic = document.getElementById('consult-topic').value.trim();
  setError('consult-topic', topic.length >= 10 ? '' : 'Please enter at least 10 characters describing your concern.');

  // 4. Validate Date (Cannot be in the past) & Time
  const dateVal = document.getElementById('consult-date').value;
  const todayStr = new Date().toISOString().split('T')[0];
  if (!dateVal) {
    setError('consult-date', 'Please choose a preferred date.');
  } else if (dateVal < todayStr) {
    setError('consult-date', 'Consultation date cannot be in the past.');
  } else {
    setError('consult-date', '');
  }

  const timeVal = document.getElementById('consult-time').value;
  setError('consult-time', timeVal ? '' : 'Please choose a preferred time.');

  // 5. If valid, populate Confirmation Status box & trigger notification
  if (isValid) {
    const profName = selectedProf.querySelector('h4')?.textContent || 'Selected Professor';
    const confirmBox = document.getElementById('confirmation-status-box');
    if (confirmBox) {
      confirmBox.innerHTML = `
        <div style="text-align:left; font-size:0.88rem; line-height:1.6;">
          <p style="color:#2f855a; font-weight:700; margin-bottom:8px;">&#10004; CCS Consultation Request Submitted</p>
          <p><strong>Student ID:</strong> ${studentId} (${course})</p>
          <p><strong>Faculty:</strong> ${profName}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Type:</strong> ${consultType}</p>
          <p><strong>Schedule:</strong> ${dateVal} at ${timeVal}</p>
          <p><strong>Purpose:</strong> ${topic}</p>
        </div>
      `;
    }
    triggerNotification(`Consultation request with ${profName} submitted for ${dateVal}!`, 'success');
  }
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
}
function dismissNotification() {
  const bar = document.getElementById('global-notification-bar');
  if (bar) bar.style.display = 'none';
}

// Call this function whenever an action happens (e.g., booking confirmed, student called)
function triggerNotification(message, type = 'info') {
  const bar = document.getElementById('global-notification-bar');
  const msgEl = document.getElementById('notif-message');
  if (!bar || !msgEl) return;

  msgEl.textContent = message;
  bar.style.display = 'flex';

  if (type === 'error') {
    bar.style.backgroundColor = '#fff5f5';
    bar.style.borderLeftColor = '#e53e3e';
    bar.style.color = '#9b2c2c';
  } else if (type === 'success') {
    bar.style.backgroundColor = '#f0fff4';
    bar.style.borderLeftColor = '#38a169';
    bar.style.color = '#276749';
  } else {
    bar.style.backgroundColor = '#ebf8ff';
    bar.style.borderLeftColor = '#3182ce';
    bar.style.color = '#2c5282';
  }
}