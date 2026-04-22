// frontend/assets/js/app.js

const API_URL = 'http://localhost:3000/api';

async function apiRequest(endpoint, method = 'GET', body = null) {
    const userData = localStorage.getItem('nexushub_user');
    const token = userData ? JSON.parse(userData).token : null;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();
        
        if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('nexushub_user');
            window.location.href = 'index.html';
            return;
        }

        if (!response.ok) throw new Error(result.message || 'Something went wrong');
        return result;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        alert(error.message);
        throw error;
    }
}

// Security Guard: Prevent access to pages if not logged in
function securityGuard() {
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const userData = localStorage.getItem('nexushub_user');

    if (!userData && !isLoginPage) {
        // Trying to access dashboard without login
        window.location.href = 'index.html';
    } else if (userData && isLoginPage) {
        // Already logged in, don't show login page
        window.location.href = 'dashboard.html';
    }
}

let currentData = { affiliates: [] };
let currentAffiliate = null;
let currentCallId = null;
let currentPage = 1;
const rowsPerPage = 10;
let filteredAffiliates = [];

async function loadData() {
    const result = await apiRequest('/affiliates');
    if (result.success) {
        currentData.affiliates = result.data;
        if (document.getElementById('app-view')) {
            renderTable();
        }
    }
}

function getAffiliateIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

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
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');

    async function handleLogin() {
        const email = emailInput.value;
        const password = passInput.value;

        if (!email || !password) {
            alert("Please enter both an email and a password.");
            return;
        }

        try {
            const result = await apiRequest('/auth/login', 'POST', { email, password });
            if (result.success) {
                localStorage.setItem('nexushub_user', JSON.stringify(result.data));
                const authView = document.getElementById('auth-view');
                if (authView) {
                    authView.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                    authView.style.opacity = '0';
                    authView.style.transform = 'scale(0.95)';
                }
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            }
        } catch (err) {
            // Error handled in apiRequest
        }
    }

    if (loginBtn) {
        loginBtn.onclick = function(e) {
            e.preventDefault();
            handleLogin();
        };
    }

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

function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('nexushub_user');
            window.location.href = 'index.html';
        };
    }
}

function updateHeaderUser() {
    const userData = localStorage.getItem('nexushub_user');
    if (userData) {
        const user = JSON.parse(userData);
        const nameElems = document.querySelectorAll('.user-name');
        const roleElems = document.querySelectorAll('.user-role');
        nameElems.forEach(el => el.textContent = user.name);
        roleElems.forEach(el => el.textContent = user.role);
    }
}

// --- 3. Charts Initialization ---
let volChartInst = null;
let tierChartInst = null;

function initCharts() {
    const canvasVolume = document.getElementById('volumeChart');
    const canvasTier = document.getElementById('tierChart');

    if (!canvasVolume || !canvasTier) return;

    const ctxVolume = canvasVolume.getContext('2d');
    const ctxTier = canvasTier.getContext('2d');

    if (volChartInst) volChartInst.destroy();
    if (tierChartInst) tierChartInst.destroy();

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

// --- 4. Table Logic ---
function renderTable() {
    const affiliatesTbody = document.getElementById('affiliates-tbody');
    const globalSearch = document.getElementById('global-search');
    const growthFilter = document.getElementById('growth-filter');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    if (!affiliatesTbody) return;

    const searchTerm = globalSearch.value.toLowerCase();
    const filterStatus = growthFilter.value;

    filteredAffiliates = currentData.affiliates.filter(aff => {
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
        <tr class="clickable">
            <td onclick="window.location.href='affiliate-detail.html?id=${aff.id}'">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${aff.avatar}" class="avatar" style="width: 35px; height: 35px;">
                    <div>
                        <div style="font-weight: 700;">${aff.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">ID: #${aff.id}</div>
                    </div>
                </div>
            </td>
            <td onclick="window.location.href='affiliate-detail.html?id=${aff.id}'" data-label="Growth Status"><span class="status-badge growth-${aff.growthStatus.toLowerCase()}">${aff.growthStatus} Growth</span></td>
            <td onclick="window.location.href='affiliate-detail.html?id=${aff.id}'" data-label="Total Revenue"><div style="font-weight: 700;">$${aff.revenue.toLocaleString()}</div></td>
            <td onclick="window.location.href='affiliate-detail.html?id=${aff.id}'" data-label="Lot Volume">${aff.lotVolume}</td>
            <td onclick="window.location.href='affiliate-detail.html?id=${aff.id}'" data-label="Active Clients">${aff.activeClients}</td>
            <td onclick="window.location.href='affiliate-detail.html?id=${aff.id}'" data-label="Trend"><div style="color: ${aff.growthTrend.startsWith('+') ? 'var(--success)' : 'var(--danger)'}; font-weight: 700;">${aff.growthTrend}</div></td>
            <td>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-primary" onclick="openEditAffiliate(${aff.id})" style="padding: 5px 10px; width: auto; font-size: 0.75rem; background: var(--warning);">Edit</button>
                    <button class="btn-primary" onclick="deleteAffiliate(${aff.id})" style="padding: 5px 10px; width: auto; font-size: 0.75rem; background: var(--danger);">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
}

window.deleteAffiliate = async function(id) {
    if (confirm("Are you sure you want to delete this affiliate?")) {
        try {
            await apiRequest(`/affiliates/${id}`, 'DELETE');
            await loadData();
        } catch (err) {
            console.error(err);
        }
    }
};

window.openEditAffiliate = function(id) {
    const aff = currentData.affiliates.find(a => a.id === id);
    if (!aff) return;

    // Use a prompt for quick implementation of Step 6
    const newName = prompt("Edit Partner Name:", aff.name);
    const newCountry = prompt("Edit Country Code:", aff.country);
    
    if (newName && newCountry) {
        apiRequest(`/affiliates/${id}`, 'PUT', { name: newName, country: newCountry.toUpperCase() })
            .then(() => loadData());
    }
};


function initTableEvents() {
    const globalSearch = document.getElementById('global-search');
    const growthFilter = document.getElementById('growth-filter');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (globalSearch) globalSearch.oninput = () => { currentPage = 1; renderTable(); };
    if (growthFilter) growthFilter.onchange = () => { currentPage = 1; renderTable(); };
    if (prevBtn) prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; renderTable(); } };
    if (nextBtn) nextBtn.onclick = () => { 
        const totalPages = Math.ceil(filteredAffiliates.length / rowsPerPage);
        if (currentPage < totalPages) { currentPage++; renderTable(); } 
    };
}

// --- 5. Detail View Logic ---
async function populateAffiliateData() {
    const id = getAffiliateIdFromUrl();
    if (!id) return;

    if (currentData.affiliates.length === 0) {
        await loadData();
    }

    currentAffiliate = currentData.affiliates.find(a => a.id === id);
    if (!currentAffiliate) {
        alert("Affiliate not found!");
        window.location.href = 'dashboard.html';
        return;
    }

    const detailName = document.getElementById('detail-name');
    if (detailName) {
        detailName.textContent = currentAffiliate.name;
        document.getElementById('detail-avatar').style.backgroundImage = `url(${currentAffiliate.avatar})`;
        document.getElementById('detail-avatar').style.backgroundSize = 'cover';
        document.getElementById('detail-country-tag').textContent = currentAffiliate.country;
        
        const gs = document.getElementById('detail-growth-status');
        gs.textContent = `${currentAffiliate.growthStatus} Performance`;
        gs.className = `status-badge growth-${currentAffiliate.growthStatus.toLowerCase()}`;
        gs.style.display = 'inline-block';
    }

    if (document.getElementById('ib-dashboard')) {
        document.getElementById('det-deposits').textContent = `$${currentAffiliate.totalDeposits.toLocaleString()}`;
        document.getElementById('det-accounts').textContent = `${currentAffiliate.mt4Accounts} / ${currentAffiliate.mt5Accounts}`;
        document.getElementById('det-commission').textContent = `${currentAffiliate.avgCommission}%`;
        document.getElementById('det-gold-pct').textContent = `${currentAffiliate.volumeAsset?.gold || 0}%`;
        document.getElementById('det-forex-pct').textContent = `${currentAffiliate.volumeAsset?.forex || 0}%`;
        const gt = document.getElementById('det-growth-trend');
        gt.textContent = currentAffiliate.growthTrend;
        gt.style.color = currentAffiliate.growthTrend.startsWith('+') ? 'var(--success)' : 'var(--danger)';
    }

    if (document.getElementById('marketing')) {
        document.getElementById('det-insight').textContent = currentAffiliate.insight;
        renderSocials();
        initMarketingSync();
    }

    if (document.getElementById('connection')) {
        renderCalls();
        typeWriterEffect("ai-strategy-text", aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]);
        initEditCallEvents();
    }
}

function initMarketingSync() {
    const syncMarketingBtn = document.getElementById('sync-marketing-btn');
    const marketingLoading = document.getElementById('marketing-loading');

    if (syncMarketingBtn) {
        syncMarketingBtn.onclick = async function() {
            marketingLoading.style.display = 'flex';
            syncMarketingBtn.disabled = true;
            
            setTimeout(async () => {
                marketingLoading.style.display = 'none';
                syncMarketingBtn.disabled = false;
                
                if (currentAffiliate.socials && currentAffiliate.socials.length > 0) {
                    currentAffiliate.socials.forEach(s => {
                        const currentFollowers = parseFloat(s.followers);
                        s.followers = (currentFollowers + (Math.random() * 0.5)).toFixed(1) + "K";
                    });
                    
                    // Update via API
                    await apiRequest(`/affiliates/${currentAffiliate.id}`, 'PUT', { socials: currentAffiliate.socials });
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
    if (!tbody) return;
    if (!currentAffiliate.socials || currentAffiliate.socials.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 40px;">No social platforms linked.</td></tr>';
        return;
    }
    tbody.innerHTML = currentAffiliate.socials.map(s => `
        <tr>
            <td style="font-weight: 700;">${s.platform}</td>
            <td data-label="Profile Link"><a href="#" style="color: var(--primary); font-size: 0.9rem;">${s.link}</a></td>
            <td data-label="Followers"><div style="font-weight: 700;">${s.followers}</div></td>
            <td data-label="Engagement Rate"><div style="color: var(--success); font-weight: 700;">${s.engagement}</div></td>
        </tr>
    `).join('');
}

function renderCalls() {
    const tbody = document.getElementById('calls-tbody');
    if (!tbody) return;
    if (!currentAffiliate.calls || currentAffiliate.calls.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 40px;">No call history recorded.</td></tr>';
        return;
    }
    tbody.innerHTML = currentAffiliate.calls.map(c => `
        <tr class="clickable" onclick="openEditCall(${c.id})">
            <td>${c.date}</td>
            <td data-label="Caller" style="font-weight: 700;">${c.caller}</td>
            <td data-label="Platform">${c.platform}</td>
            <td data-label="Duration">${c.duration}</td>
            <td data-label="Outcome"><span class="status-badge" style="background: rgba(255,255,255,0.05);">${c.outcome}</span></td>
            <td data-label="Summary" style="font-size: 0.85rem; color: var(--text-muted);">${c.summary}</td>
        </tr>
    `).join('');
}

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
    const closeBtn = document.getElementById('close-edit-call');

    if (saveBtn) {
        saveBtn.onclick = async function() {
            const callIndex = currentAffiliate.calls.findIndex(c => c.id === currentCallId);
            currentAffiliate.calls[callIndex].summary = document.getElementById('edit-summary').value;
            currentAffiliate.calls[callIndex].outcome = document.getElementById('edit-outcome').value;
            
            await apiRequest(`/affiliates/${currentAffiliate.id}`, 'PUT', { calls: currentAffiliate.calls });
            renderCalls();
            document.getElementById('edit-call-modal').style.display = 'none';
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => document.getElementById('edit-call-modal').style.display = 'none';
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
        saveBtn.onclick = async function() {
            const name = document.getElementById('new-aff-name').value;
            const country = document.getElementById('new-aff-country').value;
            const growth = document.getElementById('new-aff-growth').value;

            if (!name || !country) {
                alert("Please fill in all fields.");
                return;
            }

            const newAff = {
                name: name,
                email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
                country: country.toUpperCase(),
                status: "Active",
                growthStatus: growth,
                growthTrend: "0%",
                avatar: `https://i.pravatar.cc/150?u=${name}`,
                insight: "New partner. No data yet.",
                socials: [],
                calls: []
            };

            const result = await apiRequest('/affiliates', 'POST', newAff);
            if (result.success) {
                await loadData();
                modal.style.display = 'none';
                document.getElementById('new-aff-name').value = '';
                document.getElementById('new-aff-country').value = '';
            }
        };
    }
}

// Initialization
window.onload = async function() {
    securityGuard(); // Check if user is allowed to see this page first
    updateHeaderUser();
    initTilt();
    initAuth();
    initLogout();
    
    if (document.getElementById('app-view')) {
        await loadData();
        initTableEvents();
        initAddAffiliateEvents();
        initCharts();
    } else if (document.getElementById('detail-header')) {
        await populateAffiliateData();
    }

    window.onclick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    };
};
