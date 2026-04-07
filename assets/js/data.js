// assets/js/data.js

const mockData = {
    affiliates: [
        {
            id: 1,
            name: "Alex Thompson",
            status: "Active",
            revenue: 12500,
            lotVolume: 120.5,
            activeClients: 45,
            avatar: "https://i.pravatar.cc/150?u=alex",
            insight: "Alex is a top-performing IB specializing in the MENA region. High focus on gold and major pairs.",
            socials: [
                { platform: "Instagram", link: "instagram.com/alexfx", followers: "12.4K", engagement: "3.2%" },
                { platform: "YouTube", link: "youtube.com/alexsignals", followers: "45K", engagement: "5.1%" }
            ],
            calls: [
                { date: "2024-04-05", caller: "Niko", platform: "Telegram", summary: "Discussed increase in rebate for Q2." },
                { date: "2024-03-28", caller: "Niko", platform: "Zoom", summary: "Onboarding call for his new sub-IB team." }
            ]
        },
        {
            id: 2,
            name: "Elena Rodriguez",
            status: "Pending",
            revenue: 0,
            lotVolume: 0,
            activeClients: 0,
            avatar: "https://i.pravatar.cc/150?u=elena",
            insight: "Recently registered from Spain. Needs assistance with setting up her marketing materials.",
            socials: [],
            calls: [
                { date: "2024-04-06", caller: "Niko", platform: "WhatsApp", summary: "Initial contact, requested brand guidelines." }
            ]
        },
        {
            id: 3,
            name: "Marcus Chen",
            status: "Active",
            revenue: 8400,
            lotVolume: 95.2,
            activeClients: 32,
            avatar: "https://i.pravatar.cc/150?u=marcus",
            insight: "Marcus focuses on automated trading bots. His clients have high retention but lower volume per trade.",
            socials: [
                { platform: "Twitter", link: "twitter.com/mchentrader", followers: "8.2K", engagement: "2.8%" }
            ],
            calls: [
                { date: "2024-04-01", caller: "Sarah", platform: "Email", summary: "Inquiry about API documentation for his EA." }
            ]
        },
        {
            id: 4,
            name: "Sarah Jenkins",
            status: "Active",
            revenue: 15200,
            lotVolume: 210.0,
            activeClients: 68,
            avatar: "https://i.pravatar.cc/150?u=sarah",
            insight: "Veteran IB with a large network of institutional clients. Very stable performance.",
            socials: [
                { platform: "LinkedIn", link: "linkedin.com/in/sarahj", followers: "5.1K", engagement: "1.2%" }
            ],
            calls: [
                { date: "2024-04-04", caller: "Niko", platform: "Phone", summary: "Request for white-label solution details." }
            ]
        },
        {
            id: 5,
            name: "Yuki Tanaka",
            status: "Pending",
            revenue: 450,
            lotVolume: 5.5,
            activeClients: 3,
            avatar: "https://i.pravatar.cc/150?u=yuki",
            insight: "Small-scale educator in Japan. Transitioning from hobbyist to full-time affiliate.",
            socials: [
                { platform: "TikTok", link: "tiktok.com/@yukitrades", followers: "2.5K", engagement: "12.4%" }
            ],
            calls: []
        }
    ]
};

const aiSuggestions = [
    "Increase rebate to 15% for the next 30 days to incentivize higher volume.",
    "Propose a co-branded webinar to capture their growing YouTube audience.",
    "Share the latest 'XAUUSD Weekly Analysis' PDF to help them engage dormant clients.",
    "Schedule a quarterly performance review to discuss sub-IB expansion.",
    "Provide custom landing pages optimized for mobile traffic."
];

export { mockData, aiSuggestions };
