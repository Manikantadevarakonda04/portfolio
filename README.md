# Cyber Sentinel - D.V.S. Manikanta Portfolio

A highly professional, interactive single-page Security Operations Center (SOC) dashboard-themed portfolio website for **D.V.S. Manikanta (SOC Analyst / Cybersecurity Analyst)**.

## 🌟 Key Features
- **Top SecOps Status Bar**: Displays simulated CPU load, latency fluctuations, a dynamic UTC clock, and an interactive threat level indicator.
- **Canvas Particle Network background**: Responsive canvas showing interactive, floating data nodes that connect to each other and react to cursor proximity.
- **Simulated SOC Alert Triage Feed**: A scrolling terminal widget continuously logging real-time threat detection telemetry (Wazuh/Splunk logs).
- **Interactive Timeline Incident Reports**: Work experience organized as clickable incident investigation sheets detailing roles at SpyPro Security Solutions, Synthoquest, and Telangana State Police.
- **Dynamic Case Studies & Laboratories**:
  - *Splunk Snort IDS/IPS Mockup*: Renders a live, real-time SVG waveform updating every 1.5s representing ~1,000 eps event rates.
  - *OWASP Top 10 Web Scanner*: Interactive penetration test log displaying vulnerabilities, CVSS score ratings, and mitigation actions.
- **Secure CLI Contact Form (Web3Forms Integrated)**: A fully functional terminal prompt shell that accepts commands (`help`, `about`, `skills`, `projects`, `clear`, `threat-sim`) and leads users through a form wizard forwarding payloads directly to your inbox.

## 🛠️ Tech Stack
- **Structure**: Semantic HTML5 markup
- **Styling**: Modern, responsive CSS (variables, grid layouts, keyframe glows, dark modes)
- **Logic**: Vanilla ES6 JavaScript (HTML5 Canvas rendering, API fetch integrations)
- **Contact Forms**: Web3Forms API endpoint routing

## 🚀 Local Execution
To view the dashboard, simply clone the repository and open `index.html` in any modern web browser, or launch a local directory server:
```bash
# Start a local python server
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

## 📄 License
This project is licensed under the [MIT License](LICENSE).
