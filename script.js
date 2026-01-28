// ==========================================
// 1. القائمة اليدوية (للربح منها - Instant Gaming)
// ==========================================
const MY_AFFILIATE_ID = '?igr=gamer-1c110ad'; 

const manualGames = [
    {
        name: "Grand Theft Auto V",
        image: "https://gaming-cdn.com/images/products/186/380x218/grand-theft-auto-v-pc-mac-game-rockstar-cover.jpg",
        price: "€14.99", oldPrice: "€29.99", discount: "-50%",
        link: "https://www.instant-gaming.com/en/186-buy-grand-theft-auto-v-pc-mac-game-rockstar/"
    },
    {
        name: "Elden Ring",
        image: "https://gaming-cdn.com/images/products/4824/380x218/elden-ring-pc-game-steam-europe-cover.jpg",
        price: "€35.99", oldPrice: "€59.99", discount: "-40%",
        link: "https://www.instant-gaming.com/en/4824-buy-elden-ring-pc-game-steam-europe/"
    },
    {
        name: "EA SPORTS FC 25",
        image: "https://gaming-cdn.com/images/products/16286/380x218/ea-sports-fc-25-pc-game-ea-app-cover.jpg",
        price: "€45.99", oldPrice: "€69.99", discount: "-34%",
        link: "https://www.instant-gaming.com/en/16286-buy-ea-sports-fc-25-pc-game-ea-app/"
    }
    // ... يمكنك إضافة المزيد من ألعابك هنا
];

const grid = document.getElementById('games-grid');

// دالة عرض الألعاب
function renderGame(game, isManual = false) {
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'game-card';
    
    // إذا كانت يدوية نضيف كودك، وإذا كانت من API نستخدم الرابط كما هو
    let finalLink = game.link;
    if (isManual) {
        finalLink = game.link + MY_AFFILIATE_ID;
        card.style.border = "1px solid #ffaa00"; // تمييز ألعابك بإطار ذهبي
    }

    const oldPriceHtml = game.oldPrice ? `<span class="old-price">${game.oldPrice}</span>` : '';

    card.innerHTML = `
        <div class="discount-badge" style="${isManual ? 'background:#ffaa00; color:#000;' : ''}">${game.discount}</div>
        <img src="${game.image}" alt="${game.name}" class="card-img" loading="lazy">
        <div class="card-body">
            <h3 class="card-title" title="${game.name}">${game.name}</h3>
            <div class="card-price-row">
                ${oldPriceHtml}
                <span class="price">${game.price}</span>
            </div>
            <a href="${finalLink}" target="_blank" class="btn-buy" style="${isManual ? 'background:#ffaa00; color:#000; border-color:#ffaa00;' : ''}">
                ${isManual ? 'BEST DEAL ⭐' : 'View Deal ↗'}
            </a>
        </div>
    `;
    grid.appendChild(card);
}

// ==========================================
// 2. التنفيذ: عرض اليدوي ثم جلب الأوتوماتيكي
// ==========================================

// أولاً: عرض ألعابك الخاصة (Instant Gaming)
manualGames.forEach(game => renderGame(game, true));

// ثانياً: جلب مئات الألعاب تلقائياً من CheapShark API
async function fetchAutoDeals() {
    if (!grid) return;
    
    // إضافة عنوان فاصل
    const separator = document.createElement('div');
    separator.style.cssText = "grid-column: 1 / -1; margin: 30px 0 10px; padding-bottom:10px; border-bottom:1px solid #333; color:#666; font-size:12px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;";
    separator.innerText = "More Trending Deals (Auto-Updated)";
    grid.appendChild(separator);

    // عرض "جاري التحميل"
    const loader = document.createElement('div');
    loader.innerHTML = "Loading more games...";
    loader.style.color = "#666";
    loader.style.gridColumn = "1 / -1";
    loader.style.textAlign = "center";
    grid.appendChild(loader);

    try {
        // جلب أفضل 60 عرض من Steam و Epic وغيرهم
        const res = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1,25,7&upperPrice=50&sortBy=Metacritic&pageSize=60');
        const deals = await res.json();
        
        loader.remove(); // حذف رسالة التحميل

        deals.forEach(deal => {
            const autoGame = {
                name: deal.title,
                image: deal.thumb,
                price: "€" + deal.salePrice,
                oldPrice: "€" + deal.normalPrice,
                discount: "-" + Math.round(deal.savings) + "%",
                link: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}` // رابط التوجيه
            };
            renderGame(autoGame, false);
        });

    } catch (e) {
        loader.innerText = "Failed to load more deals.";
    }
}

// تشغيل الجلب التلقائي
fetchAutoDeals();

// Glitch Effect
const glitchText = document.querySelector('.glitch-text');
if(glitchText) {
    setInterval(() => {
        glitchText.style.textShadow = Math.random() > 0.95 ? '2px 0 red, -2px 0 blue' : 'none';
    }, 100);
}