// assets/js/app.js

// These are now global from data.js
// const { mockData, aiSuggestions } = window; 

let currentAffiliate = null;
let currentCallId = null;
let currentPage = 1;
const rowsPerPage = 10;
let filteredAffiliates = [];

// --- 1. 3D Tilt Effect for Login Card ---
function initTilt() {
    const tiltCard = document.getElementById('tilt-card');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }
}

// --- 2. Auth Logic ---
function initAuth() {
    const authView = document.getElementById('auth-view');
    const appView = document.getElementById('app-view');
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');

    function handleLogin() {
        const email = emailInput.value;
        const pass = passInput.value;

        if (!email || !pass) {
            alert("Please enter both an email and a password.");
            return;
        }

        authView.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        authView.style.opacity = '0';
        authView.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            authView.style.display = 'none';
            appView.style.display = 'grid';
            initCharts();
            filteredAffiliates = [...mockData.affiliates];
            renderTable();
        }, 500);
    }

    if (loginBtn) {
        loginBtn.onclick = function(e) {
            e.preventDefault();
            handleLogin();
        };
    }

    // Allow login with Enter key
    if (passInput) {
        passInput.onkeyup = function(e) {
            if (e.key === 'Enter') handleLogin();
        };
    }
    if (emailInput) {
        emailInput.onkeyup = function(e) {
            if (e.key === 'Enter') handleLogin();
        };
    }
}

// --- 3. Charts Initialization ---
let volChartInst = null;
let tierChartInst = null;

function initCharts() {
    const ctxVolume = document.getElementById('volumeChart').getContext('2d');
    const ctxTier = document.getElementById('tierChart').getContext('2d');

    // Destroy existing instances if they exist
    if (volChartInst) volChartInst.destroy();
    if (tierChartInst) tierChartInst.destroy();

    // Volume Growth (Lots per week)
    volChartInst = new Chart(ctxVolume, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                label: 'Global Volume (Lots)',
                data: [1250, 2100, 1800, 3200, 2900, 4500],
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#38bdf8',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#38bdf8',
                    bodyColor: '#f1f5f9',
                    padding: 12,
                    displayColors: false
                }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, 
                    ticks: { color: '#94a3b8', font: { size: 11 } } 
                },
                x: { 
                    grid: { display: false }, 
                    ticks: { color: '#94a3b8', font: { size: 11 } } 
                }
            }
        }
    });

    // Tier Distribution (Affiliate Tiers)
    tierChartInst = new Chart(ctxTier, {
        type: 'doughnut',
        data: {
            labels: ['Diamond', 'Gold', 'Silver'],
            datasets: [{
                data: [12, 38, 50],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)', 
                    'rgba(245, 158, 11, 0.8)', 
                    'rgba(148, 163, 184, 0.8)'
                ],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { 
                        color: '#f1f5f9', 
                        padding: 20, 
                        font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    padding: 12
                }
            },
            cutout: '75%'
        }
    });
}

// --- 4. Table Logic (Pagination, Search, Filter) ---
function renderTable() {
    const affiliatesTbody = document.getElementById('affiliates-tbody');
    const globalSearch = document.getElementById('global-search');
    const growthFilter = document.getElementById('growth-filter');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    const searchTerm = globalSearch.value.toLowerCase();
    const filterStatus = growthFilter.value;

    filteredAffiliates = mockData.affiliates.filter(aff => {
        const matchesSearch = aff.name.toLowerCase().includes(searchTerm) || aff.id.toString().includes(searchTerm);
        const matchesGrowth = filterStatus === 'All' || aff.growthStatus === filterStatus;
        return matchesSearch && matchesGrowth;
    });

    const totalPages = Math.ceil(filteredAffiliates.length / rowsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedAffiliates = filteredAffiliates.slice(start, end);

    affiliatesTbody.innerHTML = paginatedAffiliates.map(aff => `
        <tr class="clickable" onclick="openDetail(${aff.id})">
            <td>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${aff.avatar}" class="avatar" style="width: 35px; height: 35px;">
                    <div>
                        <div style="font-weight: 700;">${aff.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">ID: #${aff.id}</div>
                    </div>
                </div>
            </td>
            <td><span class="status-badge growth-${aff.growthStatus.toLowerCase()}">${aff.growthStatus} Growth</span></td>
            <td><div style="font-weight: 700;">$${aff.revenue.toLocaleString()}</div></td>
            <td>${aff.lotVolume}</td>
            <td>${aff.activeClients}</td>
            <td><div style="color: ${aff.growthTrend.startsWith('+') ? 'var(--success)' : 'var(--danger)'}; font-weight: 700;">${aff.growthTrend}</div></td>
        </tr>
    `).join('');

    // Update Pagination UI
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
}

// Event Listeners for Table
function initTableEvents() {
    const globalSearch = document.getElementById('global-search');
    const growthFilter = document.getElementById('growth-filter');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    globalSearch.oninput = () => { currentPage = 1; renderTable(); };
    growthFilter.onchange = () => { currentPage = 1; renderTable(); };
    prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; renderTable(); } };
    nextBtn.onclick = () => { 
        const totalPages = Math.ceil(filteredAffiliates.length / rowsPerPage);
        if (currentPage < totalPages) { currentPage++; renderTable(); } 
    };
}

// --- 5. Detail View Logic ---
window.openDetail = function(id) {
    const detailModal = document.getElementById('detail-modal');
    currentAffiliate = mockData.affiliates.find(a => a.id === id);
    if (!currentAffiliate) return;

    // Header
    document.getElementById('detail-name').textContent = currentAffiliate.name;
    document.getElementById('detail-avatar').style.backgroundImage = `url(${currentAffiliate.avatar})`;
    document.getElementById('detail-avatar').style.backgroundSize = 'cover';
    document.getElementById('detail-country-tag').textContent = currentAffiliate.country;
    
    const gs = document.getElementById('detail-growth-status');
    gs.textContent = `${currentAffiliate.growthStatus} Performance`;
    gs.className = `status-badge growth-${currentAffiliate.growthStatus.toLowerCase()}`;
    gs.style.display = 'inline-block';

    // Tab 1: IB Dashboard
    document.getElementById('det-deposits').textContent = `$${currentAffiliate.totalDeposits.toLocaleString()}`;
    document.getElementById('det-accounts').textContent = `${currentAffiliate.mt4Accounts} / ${currentAffiliate.mt5Accounts}`;
    document.getElementById('det-commission').textContent = `${currentAffiliate.avgCommission}%`;
    document.getElementById('det-gold-pct').textContent = `${currentAffiliate.volumeAsset.gold}%`;
    document.getElementById('det-forex-pct').textContent = `${currentAffiliate.volumeAsset.forex}%`;
    const gt = document.getElementById('det-growth-trend');
    gt.textContent = currentAffiliate.growthTrend;
    gt.style.color = currentAffiliate.growthTrend.startsWith('+') ? 'var(--success)' : 'var(--danger)';

    // Tab 2: Marketing
    document.getElementById('det-insight').textContent = currentAffiliate.insight;
    renderSocials();

    // Tab 3: Connection
    renderCalls();
    typeWriterEffect("ai-strategy-text", aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]);

    detailModal.style.display = 'flex';
};

// Tab Switching
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.onclick = function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
            
            if (tab.dataset.tab === 'connection') {
                typeWriterEffect("ai-strategy-text", aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]);
            }
        };
    });
}

// Marketing Sync Simulation
function initMarketingSync() {
    const syncMarketingBtn = document.getElementById('sync-marketing-btn');
    const marketingLoading = document.getElementById('marketing-loading');

    if (syncMarketingBtn) {
        syncMarketingBtn.onclick = function() {
            marketingLoading.style.display = 'flex';
            syncMarketingBtn.disabled = true;
            
            setTimeout(() => {
                marketingLoading.style.display = 'none';
                syncMarketingBtn.disabled = false;
                
                // Update mock data for "live" effect
                if (currentAffiliate.socials.length > 0) {
                    currentAffiliate.socials.forEach(s => {
                        const currentFollowers = parseFloat(s.followers);
                        s.followers = (currentFollowers + (Math.random() * 0.5)).toFixed(1) + "K";
                    });
                    renderSocials();
                } else {
                    alert("No social connections found for this affiliate.");
                }
            }, 2000);
        };
    }
}

function renderSocials() {
    const tbody = document.getElementById('socials-tbody');
    if (!currentAffiliate.socials || currentAffiliate.socials.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 40px;">No social platforms linked.</td></tr>';
        return;
    }
    tbody.innerHTML = currentAffiliate.socials.map(s => `
        <tr>
            <td style="font-weight: 700;">${s.platform}</td>
            <td><a href="#" style="color: var(--primary); font-size: 0.9rem;">${s.link}</a></td>
            <td><div style="font-weight: 700;">${s.followers}</div></td>
            <td><div style="color: var(--success); font-weight: 700;">${s.engagement}</div></td>
        </tr>
    `).join('');
}

// Calls History
function renderCalls() {
    const tbody = document.getElementById('calls-tbody');
    if (!currentAffiliate.calls || currentAffiliate.calls.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px;">No call history recorded.</td></tr>';
        return;
    }
    tbody.innerHTML = currentAffiliate.calls.map(c => `
        <tr class="clickable" onclick="openEditCall(${c.id})">
            <td>${c.date}</td>
            <td style="font-weight: 700;">${c.caller}</td>
            <td>${c.platform}</td>
            <td>${c.duration}</td>
            <td><span class="status-badge" style="background: rgba(255,255,255,0.05);">${c.outcome}</span></td>
            <td style="font-size: 0.85rem; color: var(--text-muted);">${c.summary}</td>
        </tr>
    `).join('');
}

// Typewriter Effect
let typewriterTimeout;
function typeWriterEffect(elementId, text) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = "";
    let i = 0;
    clearTimeout(typewriterTimeout);
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typewriterTimeout = setTimeout(type, 30);
        }
    }
    type();
}

// --- 6. Edit Call Logic ---
window.openEditCall = function(id) {
    const editCallModal = document.getElementById('edit-call-modal');
    currentCallId = id;
    const call = currentAffiliate.calls.find(c => c.id === id);
    document.getElementById('edit-summary').value = call.summary;
    document.getElementById('edit-outcome').value = call.outcome;
    editCallModal.style.display = 'flex';
};

function initEditCallEvents() {
    const saveBtn = document.getElementById('save-call-changes');
    if (saveBtn) {
        saveBtn.onclick = function() {
            const call = currentAffiliate.calls.find(c => c.id === currentCallId);
            call.summary = document.getElementById('edit-summary').value;
            call.outcome = document.getElementById('edit-outcome').value;
            renderCalls();
            document.getElementById('edit-call-modal').style.display = 'none';
        };
    }
}

// --- 7. Add Affiliate Logic ---
function initAddAffiliateEvents() {
    const openBtn = document.getElementById('open-add-aff-btn');
    const modal = document.getElementById('add-aff-modal');
    const closeBtn = document.getElementById('close-add-aff');
    const saveBtn = document.getElementById('save-new-aff-btn');

    if (openBtn) {
        openBtn.onclick = () => modal.style.display = 'flex';
    }

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }

    if (saveBtn) {
        saveBtn.onclick = function() {
            const name = document.getElementById('new-aff-name').value;
            const country = document.getElementById('new-aff-country').value;
            const growth = document.getElementById('new-aff-growth').value;

            if (!name || !country) {
                alert("Please fill in all fields.");
                return;
            }

            const newAff = {
                id: Date.now(),
                name: name,
                country: country.toUpperCase(),
                status: "Active",
                growthStatus: growth,
                revenue: 0,
                lotVolume: 0,
                activeClients: 0,
                totalDeposits: 0,
                mt4Accounts: 0,
                mt5Accounts: 0,
                volumeAsset: { gold: 0, forex: 0 },
                avgCommission: 0,
                growthTrend: "0%",
                avatar: `https://i.pravatar.cc/150?u=${name}`,
                insight: "New partner. No data yet.",
                socials: [],
                calls: []
            };

            mockData.affiliates.unshift(newAff);
            filteredAffiliates = [...mockData.affiliates];
            currentPage = 1;
            renderTable();
            modal.style.display = 'none';
            
            // Clear fields
            document.getElementById('new-aff-name').value = '';
            document.getElementById('new-aff-country').value = '';
        };
    }
}

// Initialization
window.onload = function() {
    initTilt();
    initAuth();
    initTableEvents();
    initTabs();
    initMarketingSync();
    initEditCallEvents();
    initAddAffiliateEvents();

    // Modal Close Events
    document.getElementById('close-detail').onclick = () => document.getElementById('detail-modal').style.display = 'none';
    document.getElementById('close-edit-call').onclick = () => document.getElementById('edit-call-modal').style.display = 'none';

    window.onclick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    };
};
