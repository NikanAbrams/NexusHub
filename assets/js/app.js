// assets/js/app.js
import { mockData, aiSuggestions } from './data.js';

let currentAffiliate = null;
let currentCallIndex = null;

// DOM Elements
const authView = document.getElementById('auth-view');
const appView = document.getElementById('app-view');
const loginBtn = document.getElementById('login-btn');
const affiliatesTbody = document.getElementById('affiliates-tbody');
const globalSearch = document.getElementById('global-search');
const statusFilter = document.getElementById('status-filter');

// Modals
const detailModal = document.getElementById('detail-modal');
const editCallModal = document.getElementById('edit-call-modal');
const closeBtns = document.querySelectorAll('.close-btn');

// --- Auth Logic ---
loginBtn.addEventListener('click', () => {
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput.value) && passwordInput.value.length > 0) {
        authView.style.display = 'none';
        appView.style.display = 'grid';
        renderAffiliates();
    } else {
        alert('Please enter a valid email address and password.');
    }
});

// --- Affiliate Table Logic ---
function renderAffiliates() {
    const searchTerm = globalSearch.value.toLowerCase();
    const filterStatus = statusFilter.value;

    const filtered = mockData.affiliates.filter(aff => {
        const matchesSearch = aff.name.toLowerCase().includes(searchTerm);
        const matchesStatus = filterStatus === 'All' || aff.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    affiliatesTbody.innerHTML = filtered.map(aff => `
        <tr class="clickable" data-id="${aff.id}">
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${aff.avatar}" class="avatar" style="width: 32px; height: 32px;">
                    ${aff.name}
                </div>
            </td>
            <td><span class="status-badge status-${aff.status.toLowerCase()}">${aff.status}</span></td>
            <td>$${aff.revenue.toLocaleString()}</td>
            <td>${aff.lotVolume}</td>
            <td>${aff.activeClients}</td>
        </tr>
    `).join('');

    // Row clicks
    document.querySelectorAll('#affiliates-tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            const id = parseInt(row.dataset.id);
            openDetailModal(id);
        });
    });
}

globalSearch.addEventListener('input', renderAffiliates);
statusFilter.addEventListener('change', renderAffiliates);

// --- Detail Modal Logic ---
function openDetailModal(id) {
    currentAffiliate = mockData.affiliates.find(a => a.id === id);
    if (!currentAffiliate) return;

    // Header
    document.getElementById('detail-name').textContent = currentAffiliate.name;
    document.getElementById('detail-avatar').style.backgroundImage = `url(${currentAffiliate.avatar})`;
    document.getElementById('detail-avatar').style.backgroundSize = 'cover';
    const statusBadge = document.getElementById('detail-status');
    statusBadge.textContent = currentAffiliate.status;
    statusBadge.className = `status-badge status-${currentAffiliate.status.toLowerCase()}`;

    // Tab 1: Stats
    document.getElementById('stat-clients').textContent = currentAffiliate.activeClients;
    document.getElementById('stat-volume').textContent = currentAffiliate.lotVolume;
    document.getElementById('stat-revenue').textContent = `$${currentAffiliate.revenue.toLocaleString()}`;

    // Tab 2: Marketing
    document.getElementById('marketing-insight').textContent = currentAffiliate.insight;
    renderSocials();

    // Tab 3: Connection
    renderCalls();
    renderAISuggestions();

    detailModal.style.display = 'flex';
}

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Socials Logic
function renderSocials() {
    const tbody = document.getElementById('socials-tbody');
    tbody.innerHTML = currentAffiliate.socials.map(s => `
        <tr>
            <td>${s.platform}</td>
            <td><a href="#" style="color: var(--primary);">${s.link}</a></td>
            <td>${s.followers}</td>
            <td>${s.engagement}</td>
        </tr>
    `).join('');
}

document.getElementById('add-social-btn').addEventListener('click', () => {
    const platform = prompt("Enter Platform (e.g. TikTok, Twitch):");
    if (!platform) return;
    const link = prompt("Enter Link:");
    if (!link) return;

    // Simulate "filling in" fake data
    const followers = (Math.random() * 50).toFixed(1) + "K";
    const engagement = (Math.random() * 8 + 1).toFixed(1) + "%";

    currentAffiliate.socials.push({ platform, link, followers, engagement });
    renderSocials();
});

// Calls Logic
function renderCalls() {
    const tbody = document.getElementById('calls-tbody');
    tbody.innerHTML = currentAffiliate.calls.map((c, index) => `
        <tr class="clickable" data-index="${index}">
            <td>${c.date}</td>
            <td>${c.caller}</td>
            <td>${c.platform}</td>
            <td>${c.summary}</td>
        </tr>
    `).join('');

    tbody.querySelectorAll('tr').forEach(row => {
        row.addEventListener('click', (e) => {
            e.stopPropagation();
            currentCallIndex = parseInt(row.dataset.index);
            const call = currentAffiliate.calls[currentCallIndex];
            document.getElementById('edit-caller').value = call.caller;
            document.getElementById('edit-summary').value = call.summary;
            editCallModal.style.display = 'flex';
        });
    });
}

function renderAISuggestions() {
    const list = document.getElementById('ai-suggestions-list');
    // Pick 2-3 random suggestions
    const shuffled = [...aiSuggestions].sort(() => 0.5 - Math.random());
    list.innerHTML = shuffled.slice(0, 3).map(s => `<li class="ai-item">${s}</li>`).join('');
}

// Edit Call Save
document.getElementById('save-call-btn').addEventListener('click', () => {
    const caller = document.getElementById('edit-caller').value;
    const summary = document.getElementById('edit-summary').value;

    if (currentAffiliate && currentCallIndex !== null) {
        currentAffiliate.calls[currentCallIndex].caller = caller;
        currentAffiliate.calls[currentCallIndex].summary = summary;
        renderCalls();
        editCallModal.style.display = 'none';
    }
});

// Close Modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        detailModal.style.display = 'none';
        editCallModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === detailModal) detailModal.style.display = 'none';
    if (e.target === editCallModal) editCallModal.style.display = 'none';
});

