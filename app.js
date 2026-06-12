/**
 * Cyber Sentinel Core Logic
 * App Script for D.V.S. Manikanta's Portfolio
 * Web3Forms Access Key: 8db24770-9b4a-46d9-a4f0-6da94a25920f
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initSystemStats();
  initTypewriter();
  initCanvasBackground();
  initSocLogs();
  initTimeline();
  initSplunkMock();
  initOwaspMock();
  initContactTerminal();
});

/* ==========================================
   1. SYSTEM CLOCK & STATS
   ========================================== */
function initClock() {
  const clockEl = document.getElementById('utc-clock');
  if (!clockEl) return;
  
  function updateClock() {
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, '0');
    const m = String(now.getUTCMinutes()).padStart(2, '0');
    const s = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s} UTC`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}

function initSystemStats() {
  const cpuEl = document.getElementById('cpu-load');
  const latencyEl = document.getElementById('network-latency');
  const threatLevelEl = document.getElementById('threat-level-text');
  const sysStatusEl = document.getElementById('sys-status-text');
  
  if (cpuEl) {
    setInterval(() => {
      const load = Math.floor(Math.random() * 12) + 4; // 4% - 15%
      cpuEl.textContent = `${String(load).padStart(2, '0')}%`;
    }, 2500);
  }
  
  if (latencyEl) {
    setInterval(() => {
      const lat = Math.floor(Math.random() * 8) + 14; // 14ms - 21ms
      latencyEl.textContent = `${lat}ms`;
    }, 3000);
  }

  if (threatLevelEl && sysStatusEl) {
    threatLevelEl.addEventListener('click', () => {
      triggerThreatSimulation();
    });
  }
}

let simulatedThreatActive = false;
function triggerThreatSimulation() {
  if (simulatedThreatActive) return;
  simulatedThreatActive = true;
  
  const threatLevelEl = document.getElementById('threat-level-text');
  const sysStatusEl = document.getElementById('sys-status-text');
  const statusBar = document.getElementById('top-status-bar');
  
  appendLogLine('ALERT', 'Manual threat simulator triggered from Status Bar console.');
  
  threatLevelEl.textContent = 'CRITICAL';
  threatLevelEl.className = 'status-val glow-text-red';
  sysStatusEl.textContent = 'BREACH_DETECTED';
  sysStatusEl.className = 'status-val glow-text-red';
  
  statusBar.style.boxShadow = '0 2px 20px rgba(255, 51, 102, 0.4)';
  statusBar.style.borderColor = 'var(--accent-red)';
  
  setTimeout(() => appendLogLine('ALERT', 'IDS Signature match: MITRE T1190 Exploit Public-Facing Application.'), 800);
  setTimeout(() => appendLogLine('ALERT', 'Wazuh Alert Rule 1002: Host network port scanning activity detected.'), 1500);
  setTimeout(() => appendLogLine('WARN', 'IP 185.220.101.4 isolated by Snort IPS firewall rules.'), 2500);
  
  setTimeout(() => {
    threatLevelEl.textContent = 'LOW';
    threatLevelEl.className = 'status-val glow-text-green';
    sysStatusEl.textContent = 'SECURE';
    sysStatusEl.className = 'status-val glow-text-green';
    statusBar.style.boxShadow = '';
    statusBar.style.borderColor = '';
    appendLogLine('OK', 'Threat threat mitigations completed. System status: SECURE.');
    simulatedThreatActive = false;
  }, 8000);
}

/* ==========================================
   2. TYPEWRITER EFFECT
   ========================================== */
function initTypewriter() {
  const txtElement = document.getElementById('typewriter-text');
  if (!txtElement) return;
  
  const words = [
    "SOC Analyst",
    "Cybersecurity Analyst",
    "Threat Hunter",
    "Incident Responder"
  ];
  
  let txt = '';
  let wordIndex = 0;
  let isDeleting = false;
  
  function type() {
    const current = wordIndex % words.length;
    const fullTxt = words[current];
    
    if (isDeleting) {
      txt = fullTxt.substring(0, txt.length - 1);
    } else {
      txt = fullTxt.substring(0, txt.length + 1);
    }
    
    txtElement.textContent = txt;
    
    let typeSpeed = 100;
    if (isDeleting) { typeSpeed /= 2; }
    
    if (!isDeleting && txt === fullTxt) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && txt === '') {
      isDeleting = false;
      wordIndex++;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

/* ==========================================
   3. CANVAS NETWORK BACKGROUND
   ========================================== */
function initCanvasBackground() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let particles = [];
  const properties = {
    particleColor: 'rgba(0, 240, 255, 0.4)',
    lineColor: 'rgba(0, 240, 255, 0.08)',
    particleRadius: 1.5,
    particleCount: 80,
    particleMaxVelocity: 0.5,
    lineLength: 150,
    mouseRadius: 180
  };
  
  const mouse = { x: null, y: null };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
    }
    
    update() {
      this.x += this.velocityX;
      this.y += this.velocityY;
      
      if (this.x < 0 || this.x > width) this.velocityX *= -1;
      if (this.y < 0 || this.y > height) this.velocityY *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < properties.particleCount; i++) {
    particles.push(new Particle());
  }
  
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        
        if (dist < properties.lineLength) {
          const alpha = (1 - (dist / properties.lineLength)) * 0.15;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      
      if (mouse.x !== null && mouse.y !== null) {
        const mouseDist = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
        if (mouseDist < properties.mouseRadius) {
          const alpha = (1 - (mouseDist / properties.mouseRadius)) * 0.25;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }
  
  function loop() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = 'rgba(6, 7, 10, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    for (let p of particles) {
      p.update();
      p.draw();
    }
    
    drawLines();
    requestAnimationFrame(loop);
  }
  
  loop();
}

/* ==========================================
   4. LIVE SOC FEED GENERATOR
   ========================================== */
const socLogsContainer = document.getElementById('soc-logs-container');

const logTemplates = [
  { type: 'INFO', msg: 'Wazuh Agent synchronized on node HOST-W10-230. Integrity checks: OK.' },
  { type: 'WARN', msg: 'Multiple failed ssh authentications detected on root gateway. Target: local-router.' },
  { type: 'INFO', msg: 'Splunk forwarder index pipeline check. 0 packets dropped.' },
  { type: 'ALERT', msg: 'IDS payload match: Potential SQL Injection attempted at /api/v1/user/search.' },
  { type: 'OK', msg: 'Active Directory domain sync complete. Replication state: OPTIMAL.' },
  { type: 'ALERT', msg: 'Snort matching SID 100025: Suspicious outbound SMB traffic directed to IP 198.51.100.12.' },
  { type: 'INFO', msg: 'AWS CloudTrail log query returned 42 events. Security compliance score: 100%.' },
  { type: 'WARN', msg: 'Privilege escalation audit alert: user "syn_guest" modified file permissions on CTF-Web.' },
  { type: 'OK', msg: 'OpenVAS vulnerability DB signature update finished successfully.' },
  { type: 'WARN', msg: 'Port scan sweeps detected from external address subnet 203.0.113.0/24.' }
];

function appendLogLine(type, msg) {
  if (!socLogsContainer) return;
  
  const line = document.createElement('div');
  line.className = 'console-line';
  
  const now = new Date();
  const timeStr = now.toISOString().split('T')[1].substring(0, 8);
  
  let tagClass = 'info';
  if (type === 'WARN') tagClass = 'warn';
  if (type === 'ALERT') tagClass = 'alert';
  if (type === 'OK') tagClass = 'ok';
  
  line.innerHTML = `
    <span class="timestamp">[${timeStr}]</span>
    <span class="tag ${tagClass}">${type}</span>
    <span class="msg">${msg}</span>
  `;
  
  socLogsContainer.appendChild(line);
  
  while (socLogsContainer.children.length > 20) {
    socLogsContainer.removeChild(socLogsContainer.firstChild);
  }
  
  socLogsContainer.scrollTop = socLogsContainer.scrollHeight;
}

function initSocLogs() {
  if (!socLogsContainer) return;
  
  for (let i = 0; i < 8; i++) {
    const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
    appendLogLine(template.type, template.msg);
  }
  
  setInterval(() => {
    const roll = Math.random();
    let selected;
    if (roll < 0.6) {
      selected = logTemplates.filter(t => t.type === 'INFO')[Math.floor(Math.random() * 3)];
    } else if (roll < 0.75) {
      selected = logTemplates.filter(t => t.type === 'OK')[Math.floor(Math.random() * 2)];
    } else if (roll < 0.9) {
      selected = logTemplates.filter(t => t.type === 'WARN')[Math.floor(Math.random() * 2)];
    } else {
      selected = logTemplates.filter(t => t.type === 'ALERT')[Math.floor(Math.random() * 3)];
    }
    
    if (selected) {
      appendLogLine(selected.type, selected.msg);
    }
  }, 4500);
}

/* ==========================================
   5. WORK EXPERIENCE TIMELINE DATA & INTERACTIVITY
   ========================================== */
const jobDetails = {
  spypro: {
    role: "SOC Analyst Intern",
    company: "SpyPro Security Solutions",
    location: "Hyderabad, Telangana | On-site",
    duration: "Jan 2026 – Apr 2026",
    bullets: [
      "Monitored and investigated security events 24/7 using SIEM tools (Splunk, Wazuh) in a live SOC environment.",
      "Performed alert triage, incident ticketing, escalation, and documentation following defined SOC workflows and incident lifecycle procedures.",
      "Conducted log analysis and event correlation across Windows Event Logs, firewall logs, and AWS CloudTrail logs to detect and investigate threats.",
      "Applied MITRE ATT&CK framework for IOC analysis; investigated DDoS attacks, phishing campaigns, malware infections, and suspicious login activities.",
      "Configured and maintained SIEM detection rules, use cases, and incident response playbooks to improve SOC operations."
    ]
  },
  synthoquest: {
    role: "Cybersecurity Intern",
    company: "Synthoquest Pvt. Ltd.",
    location: "Guntur, Andhra Pradesh | Remote/On-site",
    duration: "Apr 2025 – May 2025",
    bullets: [
      "Performed vulnerability assessments and penetration testing on virtualized lab environments including DC1, Sunset, Metasploitable, and Vulnhub CTF machines.",
      "Configured system hardening and network security controls; applied threat analysis techniques using Linux (Debian, Ubuntu) in practical lab scenarios.",
      "Analyzed security misconfigurations and documented remediation strategies, strengthening understanding of endpoint monitoring and network security."
    ]
  },
  police: {
    role: "State Clues Team Intern (Apprenticeship)",
    company: "Telangana State Police",
    location: "Hyderabad, Telangana | On-site",
    duration: "Dec 2023 – Feb 2024",
    bullets: [
      "Assisted in digital evidence handling and forensic investigation procedures following law enforcement protocols and evidence preservation standards.",
      "Analyzed physical and digital evidence using forensic methodologies; maintained chain-of-custody integrity and documented all findings accurately.",
      "Collaborated with senior professionals on crime scene documentation and evidence processing, developing analytical thinking and investigative skills."
    ]
  }
};

function populateJobDetails(jobId) {
  const container = document.getElementById('timeline-content');
  if (!container) return;
  
  const data = jobDetails[jobId];
  if (!data) return;
  
  const bulletHTML = data.bullets.map(bullet => `<li>${bullet}</li>`).join('');
  
  container.style.opacity = 0;
  
  setTimeout(() => {
    container.innerHTML = `
      <div class="details-header">
        <h3 class="details-role">${data.role}</h3>
        <div class="details-meta">
          <div class="meta-item"><span>ORG:</span> ${data.company}</div>
          <div class="meta-item"><span>LOC:</span> ${data.location}</div>
          <div class="meta-item"><span>TIME:</span> ${data.duration}</div>
        </div>
      </div>
      <ul class="details-bullets">
        ${bulletHTML}
      </ul>
    `;
    container.style.transition = 'opacity 0.2s ease-in-out';
    container.style.opacity = 1;
  }, 150);
}

function initTimeline() {
  const tabs = document.querySelectorAll('#timeline-tabs .timeline-tab');
  if (tabs.length === 0) return;
  
  populateJobDetails('spypro');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      const activeTab = e.currentTarget;
      activeTab.classList.add('active');
      
      const jobId = activeTab.getAttribute('data-job');
      populateJobDetails(jobId);
    });
  });
}

/* ==========================================
   6. PROJECTS REAL-TIME SPLUNK CHART
   ========================================== */
function initSplunkMock() {
  const pathEl = document.getElementById('splunk-line-path');
  const fillEl = document.getElementById('splunk-fill-path');
  const epsEl = document.getElementById('splunk-eps');
  const logsEl = document.getElementById('splunk-logs-box');
  
  if (!pathEl || !fillEl) return;
  
  let points = Array(20).fill(60);
  const chartWidth = 400;
  const chartHeight = 120;
  
  const splunkLogs = [
    'Processed 982 pkts/sec. State: nominal',
    'Snort engine heartbeat OK. Memory leak: 0%',
    'Splunk forwarder channel 0 active'
  ];
  
  function updateSplunkLogs(newLog) {
    splunkLogs.push(newLog);
    if (splunkLogs.length > 3) splunkLogs.shift();
    
    if (logsEl) {
      logsEl.innerHTML = splunkLogs.map(l => {
        const timeStr = new Date().toISOString().split('T')[1].substring(0, 8);
        const isAlert = l.includes('ALERT') || l.includes('Block') || l.includes('Scan');
        const alertClass = isAlert ? 'class="alert"' : '';
        return `<div class="splunk-logs-line"><span>${timeStr} ${l}</span><span ${alertClass}>${isAlert ? 'ALERT' : 'OK'}</span></div>`;
      }).join('');
    }
  }

  function drawChart() {
    let lastVal = points[points.length - 1];
    let nextVal = lastVal + (Math.random() * 30 - 15);
    
    if (nextVal < 10) nextVal = 15;
    if (nextVal > 110) nextVal = 105;
    
    points.push(nextVal);
    points.shift();
    
    const normalizedVal = Math.floor(((120 - nextVal) / 110) * 200 + 900);
    if (epsEl) epsEl.textContent = `${normalizedVal.toLocaleString()} eps`;
    
    const step = chartWidth / (points.length - 1);
    let pathD = `M 0 ${points[0]}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${i * step} ${points[i]}`;
    }
    pathEl.setAttribute('d', pathD);
    
    let fillD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;
    fillEl.setAttribute('d', fillD);
    
    if (Math.random() < 0.12) {
      const alertIps = ['198.51.100.42', '185.220.101.4', '45.132.88.94'];
      const alertIp = alertIps[Math.floor(Math.random() * alertIps.length)];
      updateSplunkLogs(`ALERT: Traffic spike detected from ${alertIp}`);
      
      const alertState = document.getElementById('splunk-alert');
      if (alertState) {
        alertState.textContent = 'HIGH';
        alertState.style.color = 'var(--accent-red)';
        setTimeout(() => {
          alertState.textContent = 'LOW';
          alertState.style.color = 'var(--accent-cyan)';
        }, 1500);
      }
    } else if (Math.random() < 0.25) {
      updateSplunkLogs(`SecOps processed ${normalizedVal} flows/sec`);
    }
  }
  
  drawChart();
  setInterval(drawChart, 1500);
}

/* ==========================================
   7. OWASP VULNERABILITY SCANNER INTERACTIVE CARD
   ========================================== */
function initOwaspMock() {
  const items = document.querySelectorAll('.vuln-item');
  const bar = document.getElementById('scanner-bar');
  const state = document.getElementById('scanner-state');
  
  if (items.length === 0) return;
  
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      const clicked = e.currentTarget;
      if (clicked.classList.contains('active')) return;
      
      items.forEach(i => i.classList.remove('active'));
      clicked.classList.add('active');
      
      if (bar && state) {
        state.textContent = 'ANALYZING_CVSS_VECTOR...';
        state.style.color = 'var(--accent-yellow)';
        bar.style.width = '100%';
        bar.style.backgroundColor = 'var(--accent-yellow)';
        
        setTimeout(() => {
          state.textContent = 'ANALYSIS_COMPLETE';
          
          const vulnType = clicked.getAttribute('data-vuln');
          if (vulnType === 'sqli') {
            bar.style.width = '98%';
            bar.style.backgroundColor = 'var(--accent-red)';
            state.style.color = 'var(--accent-red)';
          } else if (vulnType === 'xss') {
            bar.style.width = '82%';
            bar.style.backgroundColor = 'var(--accent-red)';
            state.style.color = 'var(--accent-red)';
          } else {
            bar.style.width = '65%';
            bar.style.backgroundColor = 'var(--accent-yellow)';
            state.style.color = 'var(--accent-yellow)';
          }
        }, 600);
      }
    });
  });
}

/* ==========================================
   8. SECURE UPLINK CONTACT TERMINAL (Web3Forms Integrated)
   ========================================== */
function initContactTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const inputEl = document.getElementById('terminal-cli-input');
  const historyEl = document.getElementById('terminal-output-history');
  
  if (!inputEl || !historyEl || !terminalBody) return;
  
  terminalBody.addEventListener('click', () => {
    inputEl.focus();
  });
  
  let contactState = {
    active: false,
    step: 0,
    name: '',
    email: '',
    message: ''
  };

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = inputEl.value.trim();
      inputEl.value = '';
      
      if (command === '') return;
      
      handleCommandInput(command);
    }
  });

  function printLine(text, delay = 0, isGlow = false) {
    const line = document.createElement('div');
    if (isGlow) line.className = 'glow-text';
    line.innerHTML = text;
    historyEl.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommandInput(cmd) {
    const promptLine = document.createElement('div');
    promptLine.innerHTML = `<span class="prompt-prefix">${contactState.active ? 'guest@manikanta-soc (secure_uplink):~$' : 'guest@manikanta-soc:~$'}</span> <span>${escapeHTML(cmd)}</span>`;
    historyEl.appendChild(promptLine);
    
    if (contactState.active) {
      handleContactFormWizard(cmd);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return;
    }
    
    const cleanCmd = cmd.toLowerCase().trim();
    
    switch(cleanCmd) {
      case 'help':
        printLine('Available Terminal Payload Commands:');
        printLine('&nbsp;&nbsp;<span class="glow-text">about</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- General candidate profile review');
        printLine('&nbsp;&nbsp;<span class="glow-text">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Technical toolset & security controls audit');
        printLine('&nbsp;&nbsp;<span class="glow-text">experience</span>&nbsp;&nbsp;&nbsp;- Detailed cybersecurity career log history');
        printLine('&nbsp;&nbsp;<span class="glow-text">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Active security case studies review');
        printLine('&nbsp;&nbsp;<span class="glow-text">socials</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Extract verified communications channels');
        printLine('&nbsp;&nbsp;<span class="glow-text">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Initialize encrypted communication channel wizard');
        printLine('&nbsp;&nbsp;<span class="glow-text">threat-sim</span>&nbsp;&nbsp;&nbsp;- Trigger localized active threat breach scenario');
        printLine('&nbsp;&nbsp;<span class="glow-text">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear screen buffer');
        break;
        
      case 'about':
        printLine('Candidate Profile Summary:');
        printLine('Subject: D.V.S. Manikanta');
        printLine('Role: SOC Analyst | Cybersecurity Analyst');
        printLine('Focus Areas: SIEM Engineering, Incident Response Playbooks, Log Event Triage, MITRE ATT&CK.');
        printLine('Bio: Master\'s graduate in Cybersecurity with practical internship background. Possesses forensics science education that enhances chain-of-custody handling & digital evidence investigation.');
        break;
        
      case 'skills':
        printLine('Executing technical skills audit...');
        printLine('SECOPS_SIEM:&nbsp;&nbsp;&nbsp;Splunk, Wazuh, Snort, Wireshark, Alert Triage, Incident Ticketing, AWS Logs.');
        printLine('VULN_ASSESS:&nbsp;&nbsp;&nbsp;Nessus, OpenVAS, Metasploit, OWASP Top 10 auditing, System Hardening.');
        printLine('GRC_FRAMEWORKS: NIST CSF, ISO 27001 Basics, Risk Assessment, Audit Support.');
        printLine('SYSTEMS_DEV:&nbsp;&nbsp;Linux (Debian, Ubuntu, Kali), Active Directory, Windows event logs, Python, Bash.');
        break;
        
      case 'experience':
        printLine('Extracting Job Chronology:');
        printLine('01. <strong>SOC Analyst Intern @ SpyPro Security Solutions</strong> (Jan 2026 – Apr 2026)');
        printLine('&nbsp;&nbsp;&nbsp;&nbsp;- 24/7 SIEM monitoring, log correlation (Syslog, CloudTrail), MITRE ATT&CK mappings.');
        printLine('02. <strong>Cybersecurity Intern @ Synthoquest Pvt. Ltd.</strong> (Apr 2025 – May 2025)');
        printLine('&nbsp;&nbsp;&nbsp;&nbsp;- Penetration testing virtual lab environments, network hardening policies.');
        printLine('03. <strong>State Clues Team Intern @ Telangana State Police</strong> (Dec 2023 – Feb 2024)');
        printLine('&nbsp;&nbsp;&nbsp;&nbsp;- Digital forensic preservation procedures, chain-of-custody integrity support.');
        break;
        
      case 'projects':
        printLine('Active Case Files:');
        printLine('PROJECT_01: Snort & Splunk Real-time Intrusion Detection Dashboard.');
        printLine('&nbsp;&nbsp;&nbsp;&nbsp;- Processes > 1,000 events/second. Centralized logs dashboard visualizations.');
        printLine('PROJECT_02: OWASP Top 10 Security Assessment.');
        printLine('&nbsp;&nbsp;&nbsp;&nbsp;- Vulnerability mapping report for SQLi, XSS, and authorization leaks on Juice Shop.');
        break;
        
      case 'socials':
        printLine('Secure Transmission Channels:');
        printLine('Email:&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:manidevarakonda564@gmail.com" class="glow-text">manidevarakonda564@gmail.com</a>');
        printLine('Phone:&nbsp;&nbsp;&nbsp;&nbsp;<span class="glow-text">+91 9347275219</span>');
        printLine('LinkedIn:&nbsp;<a href="https://www.linkedin.com/in/mani-devarakonda-05bb92339" target="_blank" class="glow-text">linkedin.com/in/mani-devarakonda-05bb92339</a>');
        printLine('Location:&nbsp;Yanam, Puducherry, India');
        break;
        
      case 'clear':
        historyEl.innerHTML = '';
        break;
        
      case 'threat-sim':
        triggerThreatSimulation();
        break;
        
      case 'contact':
        contactState.active = true;
        contactState.step = 1;
        printLine('Initializing handshake wizard (Secure Web3Forms Uplink channel)...');
        printLine('Please enter your <strong>Full Name/Organization</strong>:');
        break;
        
      default:
        printLine(`Command not found: "${escapeHTML(cleanCmd)}". Type <span class="glow-text">help</span> to view instructions.`);
    }
    
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleContactFormWizard(input) {
    if (input.toLowerCase() === 'exit') {
      contactState.active = false;
      contactState.step = 0;
      printLine('Channel wizard terminated. Returning to main shell.');
      return;
    }
    
    switch(contactState.step) {
      case 1:
        contactState.name = input;
        contactState.step = 2;
        printLine(`Name recorded: <span class="glow-text">${escapeHTML(input)}</span>`);
        printLine('Enter your <strong>Email Address</strong> (or type "exit" to abort):');
        break;
      case 2:
        if (!validateEmail(input)) {
          printLine('Warning: Invalid email format check failed. Enter valid email address:');
        } else {
          contactState.email = input;
          contactState.step = 3;
          printLine(`Email recorded: <span class="glow-text">${escapeHTML(input)}</span>`);
          printLine('Enter your <strong>Message Payload</strong>:');
        }
        break;
      case 3:
        contactState.message = input;
        printLine('Message payload compiled. Initializing secure Web3Forms routing...', 0, true);
        
        // Disable terminal input during submission
        inputEl.disabled = true;
        
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '8db24770-9b4a-46d9-a4f0-6da94a25920f',
            name: contactState.name,
            email: contactState.email,
            message: contactState.message,
            subject: 'New Web3Forms Contact Message - Portfolio'
          })
        })
        .then(res => res.json())
        .then(data => {
          inputEl.disabled = false;
          inputEl.focus();
          
          if (data.success) {
            printLine('Transmission SUCCESS. Packet routed payload delivered.', 0, true);
            printLine(`Thank you, <strong>${escapeHTML(contactState.name)}</strong>. D.V.S. Manikanta has been paged. Code [200 OK].`);
          } else {
            printLine('Transmission FAILED. Code [' + data.message + ']', 0, false);
          }
          
          contactState.active = false;
          contactState.step = 0;
          contactState.name = '';
          contactState.email = '';
          contactState.message = '';
        })
        .catch(err => {
          inputEl.disabled = false;
          inputEl.focus();
          printLine('Network Error: Socket connection interrupted.', 0, false);
          
          contactState.active = false;
          contactState.step = 0;
        });
        break;
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
}
