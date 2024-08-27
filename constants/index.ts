export const sidebarLinks = [
    {
        imgURL: '/icons/home.svg',
        route: '/',
        label: 'Home',
    },
    // Dashboard
    {
        imgURL: '/icons/dashboard.svg',
        route: '/dashboard',
        label: 'Dashboard',
    },
    {
        imgURL: '/icons/wallet.svg', // Assuming you have an icon for the wallet
        route: '/wallet',
        label: 'Wallet',
    },
    {
        imgURL: '/icons/news.svg', // Assuming you have an icon for the news
        route: '/news',
        label: 'News',
    },
    {
        imgURL: '/icons/stock-fund.svg', // Assuming you have an icon for Stock & fund
        route: '/stock-fund',
        label: 'Stock & fund',
        children: [
            {
                imgURL: '/icons/stock.svg',
                route: '/stock',
                label: 'Stock',
            },
            {
                imgURL: '/icons/cryptocurrency.svg',
                route: '/cryptocurrency',
                label: 'Cryptocurrency',
            },
            {
                imgURL: '/icons/mutual-fund.svg',
                route: '/mutual-fund',
                label: 'Mutual Fund',
            },
            {
                imgURL: '/icons/gold.svg',
                route: '/gold',
                label: 'Gold',
            },
        ],
    },
    {
        imgURL: '/icons/community.svg', // Assuming you have an icon for the community
        route: '/community',
        label: 'Our community',
    },
    {
        imgURL: '/icons/settings.svg',
        route: '/settings',
        label: 'Settings',
        notificationCount: 1, // Assuming the red dot is a notification indicator
    },
    {
        imgURL: '/icons/contact.svg', // Assuming you have an icon for contact us
        route: '/contact-us',
        label: 'Contact us',
    },
]
