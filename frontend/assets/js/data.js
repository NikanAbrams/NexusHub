// assets/js/data.js

const mockData = {
    affiliates: [
        {
            id: 101,
            name: "Alex Thompson",
            country: "AE",
            status: "Active",
            growthStatus: "High",
            revenue: 12500,
            lotVolume: 120.5,
            activeClients: 45,
            totalDeposits: 550000,
            mt4Accounts: 32,
            mt5Accounts: 13,
            volumeAsset: { gold: 65, forex: 35 },
            avgCommission: 12.5,
            growthTrend: "+15%",
            avatar: "https://i.pravatar.cc/150?u=alex",
            insight: "Top-performing IB in MENA. High focus on gold trading and premium signals.",
            socials: [
                { platform: "Instagram", link: "instagram.com/alexfx", followers: "12.4K", engagement: "3.2%" },
                { platform: "YouTube", link: "youtube.com/alexsignals", followers: "45K", engagement: "5.1%" }
            ],
            calls: [
                { id: 1, date: "2024-04-05", caller: "Niko", platform: "Telegram", duration: "12m", outcome: "Positive", summary: "Discussed increase in rebate for Q2." },
                { id: 2, date: "2024-03-28", caller: "Niko", platform: "Zoom", duration: "45m", outcome: "Follow-up", summary: "Onboarding call for his new sub-IB team." }
            ]
        },
        {
            id: 102,
            name: "Elena Rodriguez",
            country: "ES",
            status: "Active",
            growthStatus: "Stable",
            revenue: 8400,
            lotVolume: 95.2,
            activeClients: 32,
            totalDeposits: 210000,
            mt4Accounts: 20,
            mt5Accounts: 12,
            volumeAsset: { gold: 40, forex: 60 },
            avgCommission: 10.2,
            growthTrend: "+2%",
            avatar: "https://i.pravatar.cc/150?u=elena",
            insight: "Focuses on the Spanish market. Strong educational content creator.",
            socials: [
                { platform: "TikTok", link: "tiktok.com/@elena_trades", followers: "25.2K", engagement: "8.4%" },
                { platform: "Instagram", link: "ig.com/elena_rodriguez", followers: "10K", engagement: "4.5%" }
            ],
            calls: [
                { id: 3, date: "2024-04-06", caller: "Niko", platform: "WhatsApp", duration: "5m", outcome: "Resolved", summary: "Initial contact, sent brand guidelines." }
            ]
        },
        {
            id: 103,
            name: "Marcus Chen",
            country: "SG",
            status: "Active",
            growthStatus: "Declining",
            revenue: 4200,
            lotVolume: 45.8,
            activeClients: 18,
            totalDeposits: 95000,
            mt4Accounts: 10,
            mt5Accounts: 8,
            volumeAsset: { gold: 20, forex: 80 },
            avgCommission: 8.5,
            growthTrend: "-5%",
            avatar: "https://i.pravatar.cc/150?u=marcus",
            insight: "Marcus uses automated bots. Low engagement recently due to market volatility.",
            socials: [
                { platform: "Twitter", link: "twitter.com/mchentrader", followers: "8.2K", engagement: "2.8%" },
                { platform: "LinkedIn", link: "linkedin.com/in/mchen", followers: "1.5K", engagement: "0.9%" }
            ],
            calls: [
                { id: 4, date: "2024-04-01", caller: "Sarah", platform: "Email", duration: "N/A", outcome: "Information", summary: "Inquiry about API documentation." }
            ]
        },
        {
            id: 104,
            name: "Sarah Jenkins",
            country: "GB",
            status: "Active",
            growthStatus: "High",
            revenue: 21000,
            lotVolume: 280.5,
            activeClients: 85,
            totalDeposits: 1200000,
            mt4Accounts: 50,
            mt5Accounts: 35,
            volumeAsset: { gold: 50, forex: 50 },
            avgCommission: 15.0,
            growthTrend: "+25%",
            avatar: "https://i.pravatar.cc/150?u=sarah",
            insight: "Institutional-level IB with high-net-worth clients. UK market leader.",
            socials: [
                { platform: "LinkedIn", link: "linkedin.com/in/sarahj", followers: "5.1K", engagement: "1.2%" },
                { platform: "Facebook", link: "fb.com/sarahjenkinsfx", followers: "102K", engagement: "6.7%" }
            ],
            calls: [
                { id: 5, date: "2024-04-04", caller: "Niko", platform: "Phone", duration: "18m", outcome: "Positive", summary: "Request for white-label solution." }
            ]
        },
        {
            id: 105,
            name: "Yuki Tanaka",
            country: "JP",
            status: "Pending",
            growthStatus: "Stable",
            revenue: 1200,
            lotVolume: 15.0,
            activeClients: 5,
            totalDeposits: 30000,
            mt4Accounts: 5,
            mt5Accounts: 0,
            volumeAsset: { gold: 30, forex: 70 },
            avgCommission: 7.0,
            growthTrend: "+8%",
            avatar: "https://i.pravatar.cc/150?u=yuki",
            insight: "Local educator in Tokyo. Recently started with the platform. High potential.",
            socials: [
                { platform: "YouTube", link: "youtube.com/@yukijp", followers: "2.5K", engagement: "12.4%" },
                { platform: "Twitter", link: "twitter.com/yukifx_jp", followers: "15K", engagement: "9.2%" }
            ],
            calls: [
                { id: 6, date: "2024-04-10", caller: "Sarah", platform: "Zoom", duration: "25m", outcome: "Positive", summary: "KYC verification support." }
            ]
        },
        {
            id: 106,
            name: "David Miller",
            country: "US",
            status: "Active",
            growthStatus: "High",
            revenue: 9800,
            lotVolume: 110.2,
            activeClients: 40,
            totalDeposits: 450000,
            mt4Accounts: 25,
            mt5Accounts: 15,
            volumeAsset: { gold: 45, forex: 55 },
            avgCommission: 11.5,
            growthTrend: "+12%",
            avatar: "https://i.pravatar.cc/150?u=david",
            insight: "US-based IB focusing on major forex pairs and indices. Professional trader network.",
            socials: [
                { platform: "Twitter", link: "twitter.com/dmiller_trades", followers: "32K", engagement: "4.1%" },
                { platform: "Instagram", link: "ig.com/davidmiller_fx", followers: "22K", engagement: "5.5%" }
            ],
            calls: [
                { id: 7, date: "2024-04-12", caller: "Niko", platform: "Telegram", duration: "10m", outcome: "Resolved", summary: "Fixed rebate calculation discrepancy." }
            ]
        },
        {
            id: 107,
            name: "Sofia Rossi",
            country: "IT",
            status: "Active",
            growthStatus: "Stable",
            revenue: 6500,
            lotVolume: 78.4,
            activeClients: 28,
            totalDeposits: 180000,
            mt4Accounts: 15,
            mt5Accounts: 13,
            volumeAsset: { gold: 35, forex: 65 },
            avgCommission: 9.8,
            growthTrend: "+4%",
            avatar: "https://i.pravatar.cc/150?u=sofia",
            insight: "Growing network in Italy. High engagement on social media. Focuses on retail education.",
            socials: [
                { platform: "Instagram", link: "ig.com/sofia_fx", followers: "8.5K", engagement: "5.5%" },
                { platform: "TikTok", link: "tiktok.com/@sofia_trades_it", followers: "45K", engagement: "11.2%" }
            ],
            calls: [
                { id: 8, date: "2024-04-15", caller: "Sarah", platform: "WhatsApp", duration: "15m", outcome: "Neutral", summary: "Requested marketing banners in Italian." }
            ]
        },
        {
            id: 108,
            name: "Liam O'Connor",
            country: "IE",
            status: "Pending",
            growthStatus: "Stable",
            revenue: 500,
            lotVolume: 6.2,
            activeClients: 2,
            totalDeposits: 15000,
            mt4Accounts: 2,
            mt5Accounts: 0,
            volumeAsset: { gold: 10, forex: 90 },
            avgCommission: 6.5,
            growthTrend: "+2%",
            avatar: "https://i.pravatar.cc/150?u=liam",
            insight: "New affiliate, transitioning from retail trader. Strong background in technical analysis.",
            socials: [
                { platform: "YouTube", link: "youtube.com/liamtrades", followers: "1.2K", engagement: "8.9%" }
            ],
            calls: [
                { id: 9, date: "2024-04-18", caller: "Niko", platform: "Email", duration: "N/A", outcome: "Information", summary: "Inquiry about partnership tiers." }
            ]
        },
        {
            id: 109,
            name: "Aarav Patel",
            country: "IN",
            status: "Active",
            growthStatus: "High",
            revenue: 15400,
            lotVolume: 190.5,
            activeClients: 55,
            totalDeposits: 620000,
            mt4Accounts: 35,
            mt5Accounts: 20,
            volumeAsset: { gold: 80, forex: 20 },
            avgCommission: 13.2,
            growthTrend: "+18%",
            avatar: "https://i.pravatar.cc/150?u=aarav",
            insight: "Massive reach in the Indian market. Heavy focus on Gold. Large offline trading community.",
            socials: [
                { platform: "Telegram", link: "t.me/aarav_signals", followers: "55K", engagement: "7.2%" },
                { platform: "YouTube", link: "youtube.com/aaravfxindia", followers: "150K", engagement: "4.8%" }
            ],
            calls: [
                { id: 10, date: "2024-04-19", caller: "Niko", platform: "Phone", duration: "30m", outcome: "Positive", summary: "Planning local seminar in Mumbai." }
            ]
        },
        {
            id: 110,
            name: "Chloe Lefebvre",
            country: "FR",
            status: "Active",
            growthStatus: "Declining",
            revenue: 3100,
            lotVolume: 32.4,
            activeClients: 12,
            totalDeposits: 65000,
            mt4Accounts: 8,
            mt5Accounts: 4,
            volumeAsset: { gold: 15, forex: 85 },
            avgCommission: 8.0,
            growthTrend: "-8%",
            avatar: "https://i.pravatar.cc/150?u=chloe",
            insight: "Experienced trader but low affiliate activity lately. Needs reactivation strategy.",
            socials: [
                { platform: "Instagram", link: "ig.com/chloe_fx_fr", followers: "12K", engagement: "2.1%" }
            ],
            calls: [
                { id: 11, date: "2024-04-02", caller: "Sarah", platform: "WhatsApp", duration: "8m", outcome: "Follow-up", summary: "Inquired about low activity, promised to check." }
            ]
        },
        {
            id: 111,
            name: "Hiroshi Sato",
            country: "JP",
            status: "Active",
            growthStatus: "High",
            revenue: 11200,
            lotVolume: 145.8,
            activeClients: 38,
            totalDeposits: 410000,
            mt4Accounts: 20,
            mt5Accounts: 18,
            volumeAsset: { gold: 40, forex: 60 },
            avgCommission: 11.8,
            growthTrend: "+14%",
            avatar: "https://i.pravatar.cc/150?u=hiroshi",
            insight: "Key partner for the Japanese market expansion. Focus on automated trading systems.",
            socials: [
                { platform: "Twitter", link: "twitter.com/hiroshi_ea", followers: "28K", engagement: "6.5%" }
            ],
            calls: [
                { id: 12, date: "2024-04-05", caller: "Niko", platform: "Telegram", duration: "20m", outcome: "Positive", summary: "Technical discussion on EA integration." }
            ]
        },
        {
            id: 112,
            name: "Isabella Garcia",
            country: "ES",
            status: "Active",
            growthStatus: "Stable",
            revenue: 7200,
            lotVolume: 82.5,
            activeClients: 30,
            totalDeposits: 195000,
            mt4Accounts: 18,
            mt5Accounts: 12,
            volumeAsset: { gold: 25, forex: 75 },
            avgCommission: 9.5,
            growthTrend: "+3%",
            avatar: "https://i.pravatar.cc/150?u=isabella",
            insight: "Strong focus on educational webinars. Madrid-based network of semi-pro traders.",
            socials: [
                { platform: "Facebook", link: "fb.com/isabellafx_academy", followers: "50K", engagement: "3.5%" }
            ],
            calls: [
                { id: 13, date: "2024-04-08", caller: "Sarah", platform: "Zoom", duration: "40m", outcome: "Positive", summary: "Co-hosting webinar session next week." }
            ]
        },
        {
            id: 113,
            name: "Noah Wilson",
            country: "US",
            status: "Pending",
            growthStatus: "Stable",
            revenue: 0,
            lotVolume: 0,
            activeClients: 0,
            totalDeposits: 0,
            mt4Accounts: 0,
            mt5Accounts: 0,
            volumeAsset: { gold: 0, forex: 0 },
            avgCommission: 0,
            growthTrend: "0%",
            avatar: "https://i.pravatar.cc/150?u=noah",
            insight: "Waiting for KYC approval. Potential US influencer with high reach.",
            socials: [
                { platform: "YouTube", link: "youtube.com/noahwilsonfx", followers: "200K", engagement: "5.2%" }
            ],
            calls: [
                { id: 14, date: "2024-04-12", caller: "Niko", platform: "Email", duration: "N/A", outcome: "Information", summary: "Waiting for final bank statement document." }
            ]
        },
        {
            id: 114,
            name: "Emma Brown",
            country: "GB",
            status: "Active",
            growthStatus: "High",
            revenue: 14200,
            lotVolume: 165.2,
            activeClients: 48,
            totalDeposits: 510000,
            mt4Accounts: 30,
            mt5Accounts: 18,
            volumeAsset: { gold: 55, forex: 45 },
            avgCommission: 12.8,
            growthTrend: "+16%",
            avatar: "https://i.pravatar.cc/150?u=emma",
            insight: "Excellent retention rate among her sub-IBs. Focus on long-term portfolio management.",
            socials: [
                { platform: "LinkedIn", link: "linkedin.com/in/emmabrownfx", followers: "12K", engagement: "2.4%" }
            ],
            calls: [
                { id: 15, date: "2024-04-14", caller: "Niko", platform: "Phone", duration: "22m", outcome: "Positive", summary: "Discussed sub-IB hierarchy management." }
            ]
        },
        {
            id: 115,
            name: "Lucas Muller",
            country: "DE",
            status: "Active",
            growthStatus: "Stable",
            revenue: 9100,
            lotVolume: 102.4,
            activeClients: 35,
            totalDeposits: 320000,
            mt4Accounts: 22,
            mt5Accounts: 13,
            volumeAsset: { gold: 30, forex: 70 },
            avgCommission: 10.5,
            growthTrend: "+5%",
            avatar: "https://i.pravatar.cc/150?u=lucas",
            insight: "Steady growth in the DACH region. High-quality leads from financial blog.",
            socials: [
                { platform: "Twitter", link: "twitter.com/lmuller_finanz", followers: "8.5K", engagement: "3.1%" }
            ],
            calls: [
                { id: 16, date: "2024-04-16", caller: "Sarah", platform: "Email", duration: "N/A", outcome: "Resolved", summary: "Sent custom tracking links for new campaign." }
            ]
        },
        {
            id: 116,
            name: "Mia Andersen",
            country: "DK",
            status: "Active",
            growthStatus: "High",
            revenue: 18500,
            lotVolume: 220.8,
            activeClients: 62,
            totalDeposits: 840000,
            mt4Accounts: 40,
            mt5Accounts: 22,
            volumeAsset: { gold: 60, forex: 40 },
            avgCommission: 14.5,
            growthTrend: "+22%",
            avatar: "https://i.pravatar.cc/150?u=mia",
            insight: "Top-tier IB with a large client base in Scandinavia. Professional asset manager.",
            socials: [
                { platform: "Instagram", link: "ig.com/mia_andersen_asset", followers: "25K", engagement: "4.2%" },
                { platform: "LinkedIn", link: "linkedin.com/in/mia-andersen-invest", followers: "8.2K", engagement: "1.8%" }
            ],
            calls: [
                { id: 17, date: "2024-04-18", caller: "Niko", platform: "Zoom", duration: "50m", outcome: "Positive", summary: "Annual performance review and VIP event invite." }
            ]
        }
    ]
};

const aiSuggestions = [
    "Increase rebate to 15% for the next 30 days to incentivize higher volume.",
    "Propose a co-branded webinar to capture their growing YouTube audience.",
    "Share the latest 'XAUUSD Weekly Analysis' PDF to help them engage dormant clients.",
    "Schedule a quarterly performance review to discuss sub-IB expansion.",
    "Provide custom landing pages optimized for mobile traffic.",
    "Analyze their MT5 vs MT4 usage; suggest migrating clients for better features.",
    "Invite to the exclusive 'Diamond Tier' dinner at the upcoming FX Expo."
];
