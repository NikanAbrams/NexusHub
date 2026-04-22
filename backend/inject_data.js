// backend/inject_data.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleAffiliates = [
    {
        name: "Alex Thompson",
        email: "alex.t@nexushub.com",
        country: "AE",
        status: "Active",
        growthStatus: "High",
        revenue: 12500,
        lotVolume: 120.5,
        activeClients: 45,
        totalDeposits: 550000,
        mt4Accounts: 32,
        mt5Accounts: 13,
        avgCommission: 12.5,
        growthTrend: "+15%",
        avatar: "https://i.pravatar.cc/150?u=alex",
        insight: "Top-performing IB in MENA. High focus on gold trading.",
        socials: [
            { platform: "Instagram", link: "ig.com/alexfx", followers: "12.4K", engagement: "3.2%" },
            { platform: "YouTube", link: "yt.com/alexsignals", followers: "45K", engagement: "5.1%" }
        ],
        calls: [{ id: 1, date: "2024-04-05", caller: "Niko", platform: "Telegram", duration: "12m", outcome: "Positive", summary: "Discussed increase in rebate." }]
    },
    {
        name: "Elena Rodriguez",
        email: "elena.r@nexushub.com",
        country: "ES",
        status: "Active",
        growthStatus: "Stable",
        revenue: 8400,
        lotVolume: 95.2,
        activeClients: 32,
        totalDeposits: 210000,
        mt4Accounts: 20,
        mt5Accounts: 12,
        avgCommission: 10.2,
        growthTrend: "+2%",
        avatar: "https://i.pravatar.cc/150?u=elena",
        insight: "Focuses on the Spanish market. Strong educational content creator.",
        socials: [{ platform: "TikTok", link: "tiktok.com/@elena_trades", followers: "25.2K", engagement: "8.4%" }],
        calls: []
    },
    {
        name: "Marcus Chen",
        email: "marcus.c@nexushub.com",
        country: "SG",
        status: "Active",
        growthStatus: "Declining",
        revenue: 4200,
        lotVolume: 45.8,
        activeClients: 18,
        totalDeposits: 95000,
        mt4Accounts: 10,
        mt5Accounts: 8,
        avgCommission: 8.5,
        growthTrend: "-5%",
        avatar: "https://i.pravatar.cc/150?u=marcus",
        insight: "Uses automated bots. Low engagement recently due to market volatility.",
        socials: [{ platform: "Twitter", link: "twitter.com/mchentrader", followers: "8.2K", engagement: "2.8%" }],
        calls: []
    },
    {
        name: "Aarav Patel",
        email: "aarav.p@nexushub.com",
        country: "IN",
        status: "Active",
        growthStatus: "High",
        revenue: 15400,
        lotVolume: 190.5,
        activeClients: 55,
        totalDeposits: 620000,
        mt4Accounts: 35,
        mt5Accounts: 20,
        avgCommission: 13.2,
        growthTrend: "+18%",
        avatar: "https://i.pravatar.cc/150?u=aarav",
        insight: "Massive reach in India. Heavy focus on Gold (XAUUSD).",
        socials: [{ platform: "Telegram", link: "t.me/aarav_signals", followers: "55K", engagement: "7.2%" }],
        calls: []
    },
    {
        name: "Sarah Jenkins",
        email: "sarah.j@nexushub.com",
        country: "GB",
        status: "Active",
        growthStatus: "High",
        revenue: 21000,
        lotVolume: 280.5,
        activeClients: 85,
        totalDeposits: 1200000,
        mt4Accounts: 50,
        mt5Accounts: 35,
        avgCommission: 15.0,
        growthTrend: "+25%",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        insight: "Institutional-level IB with high-net-worth clients.",
        socials: [],
        calls: []
    },
    {
        name: "Yuki Tanaka",
        email: "yuki.t@nexushub.com",
        country: "JP",
        status: "Active",
        growthStatus: "Stable",
        revenue: 1200,
        lotVolume: 15.0,
        activeClients: 5,
        totalDeposits: 30000,
        mt4Accounts: 5,
        mt5Accounts: 0,
        avgCommission: 7.0,
        growthTrend: "+8%",
        avatar: "https://i.pravatar.cc/150?u=yuki",
        insight: "Local educator in Tokyo. Recently started with the platform.",
        socials: [],
        calls: []
    },
    {
        name: "David Miller",
        email: "david.m@nexushub.com",
        country: "US",
        status: "Active",
        growthStatus: "High",
        revenue: 9800,
        lotVolume: 110.2,
        activeClients: 40,
        totalDeposits: 450000,
        mt4Accounts: 25,
        mt5Accounts: 15,
        avgCommission: 11.5,
        growthTrend: "+12%",
        avatar: "https://i.pravatar.cc/150?u=david",
        insight: "US-based IB focusing on major forex pairs and indices.",
        socials: [],
        calls: []
    },
    {
        name: "Sofia Rossi",
        email: "sofia.r@nexushub.com",
        country: "IT",
        status: "Active",
        growthStatus: "Stable",
        revenue: 6500,
        lotVolume: 78.4,
        activeClients: 28,
        totalDeposits: 180000,
        mt4Accounts: 15,
        mt5Accounts: 13,
        avgCommission: 9.8,
        growthTrend: "+4%",
        avatar: "https://i.pravatar.cc/150?u=sofia",
        insight: "Growing network in Italy. High engagement on social media.",
        socials: [],
        calls: []
    },
    {
        name: "Hiroshi Sato",
        email: "hiroshi.s@nexushub.com",
        country: "JP",
        status: "Active",
        growthStatus: "High",
        revenue: 11200,
        lotVolume: 145.8,
        activeClients: 38,
        totalDeposits: 410000,
        mt4Accounts: 20,
        mt5Accounts: 18,
        avgCommission: 11.8,
        growthTrend: "+14%",
        avatar: "https://i.pravatar.cc/150?u=hiroshi",
        insight: "Key partner for the Japanese market expansion.",
        socials: [],
        calls: []
    },
    {
        name: "Lucas Muller",
        email: "lucas.m@nexushub.com",
        country: "DE",
        status: "Active",
        growthStatus: "Stable",
        revenue: 9100,
        lotVolume: 102.4,
        activeClients: 35,
        totalDeposits: 320000,
        mt4Accounts: 22,
        mt5Accounts: 13,
        avgCommission: 10.5,
        growthTrend: "+5%",
        avatar: "https://i.pravatar.cc/150?u=lucas",
        insight: "Steady growth in the DACH region.",
        socials: [],
        calls: []
    }
];

async function run() {
    console.log('🚀 Injecting data into PostgreSQL...');
    for (const data of sampleAffiliates) {
        await prisma.affiliate.upsert({
            where: { email: data.email },
            update: {},
            create: data
        });
    }
    console.log('✅ Success! 10 Affiliates added.');
}

run()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
