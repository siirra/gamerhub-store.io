// ==========================================
// CONFIGURATION & AFFILIATE SYSTEM
// ==========================================
const MY_IG_ID = '?igr=gamer-1c110ad'; // كودك في Instant Gaming

// خريطة المتاجر: هنا يمكنك إضافة روابط البحث لمتاجر أخرى مستقبلاً
// حالياً، جعلت "الافتراضي" هو Instant Gaming لضمان الربح من كل النقرات
const AFFILIATE_STORES = {
    // إعدادات البحث الذكي
    "default": {
        // رابط البحث في Instant Gaming مع كودك
        url: "https://www.instant-gaming.com/en/search/?q={GAME_NAME}" + MY_IG_ID
    },
    
    // مثال: لو حصلت مستقبلاً على كود Eneba، يمكنك تفعيل هذا السطر:
    // "eneba": { url: "https://www.eneba.com/store?text={GAME_NAME}&af_id=YOUR_ID" }
};

let storesMap = {}; 

// ==========================================
// 1. الألعاب اليدوية (Instant Gaming)
// ==========================================
const manualGames = [
    {
        name: "Grand Theft Auto V",
        image: "https://gaming-cdn.com/images/products/186/380x218/grand-theft-auto-v-pc-mac-game-rockstar-cover.jpg",
        price: "€14.99", oldPrice: "€29.99", discount: "-50%",
        link: "https://www.instant-gaming.com/en/186-buy-grand-theft-auto-v-pc-mac-game-rockstar/",
        isManual: true 
    },
    {
        name: "Elden Ring",
        image: "https://gaming-cdn.com/images/products/4824/380x218/elden-ring-pc-game-steam-europe-cover.jpg",
        price: "€35.99", oldPrice: "€59.99", discount: "-40%",
        link: "https://www.instant-gaming.com/en/4824-buy-elden-ring-pc-game-steam-europe/",
        isManual: true
    },
    {
        name: "EA SPORTS FC 25",
        image: "https://gaming-cdn.com/images/products/16286/380x218/ea-sports-fc-25-pc-game-ea-app-cover.jpg",
        price: "€45.99", oldPrice: "€69.99", discount: "-34%",
        link: "https://www.instant-gaming.com/en/16286-buy-ea-sports-fc-25-pc-game-ea-app/",
        isManual: true
    },
    {
        name: "Minecraft Java & Bedrock",
        image: "https://gaming-cdn.com/images/products/3339/380x218/minecraft-java-bedrock-edition-pc-game-cover.jpg",
        price: "€18.99", oldPrice: "€29.99", discount: "-33%",
        link: "https://www.instant-gaming.com/en/3339-buy-minecraft-java-bedrock-edition-pc-game/",
        isManual: true
    },
    {
        name: "Call of Duty: Modern Warfare III",
        image: "https://gaming-cdn.com/images/products/9634/380x218/call-of-duty-modern-warfare-iii-cross-gen-bundle-xbox-one-xbox-series-x-s-xbox-one-xbox-series-x-s-game-microsoft-store-europe-cover.jpg",
        price: "€49.99", oldPrice: "€79.99", discount: "-38%",
        link: "https://www.instant-gaming.com/en/9634-buy-call-of-duty-modern-warfare-iii-cross-gen-bundle-xbox-one-xbox-series-x-s-microsoft-store/",
        isManual: true
    }
];

// ==========================================
// HELPER: SMART LINK GENERATOR (المولد الذكي)
// ==========================================
function getSmartAffiliateLink(gameName) {
    // 1. تنظيف اسم اللعبة ليكون مناسباً للرابط
    // نحول المسافات إلى %20 ونحذف الرموز الغريبة
    const cleanName = encodeURIComponent(gameName.trim());
    
    // 2. استخدام القالب الافتراضي (Instant Gaming)
    // سيتم استبدال {GAME_NAME} باسم اللعبة الفعلي
    return AFFILIATE_STORES["default"].url.replace("{GAME_NAME}", cleanName);
}

// ==========================================
// RENDER FUNCTION
// ==========================================
const grid = document.getElementById('games-grid');

function renderGame(game) {
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'game-card';
    
    // صورة Steam عالية الجودة
    let highQualityImage = game.image;
    if (!game.isManual && game.steamAppID && game.steamAppID !== "null" && game.steamAppID !== "0") {
        highQualityImage = `https://cdn.akamai.steamstatic.com/steam/apps/${game.steamAppID}/header.jpg`;
    }

    // إعداد الزر والرابط
    let buttonHtml = '';
    let cardBorder = '';
    
    if (game.isManual) {
        // الألعاب اليدوية: رابط مباشر
        const finalLink = game.link + MY_IG_ID;
        buttonHtml = `<a href="${finalLink}" target="_blank" class="btn-buy" style="background:#ffaa00; color:#000; border-color:#ffaa00;">BEST DEAL ⭐</a>`;
        cardBorder = "border: 1px solid #ffaa00;";
    } else {
        // الألعاب التلقائية: هنا نطبق الحيلة!
        // نولد رابط بحث ذكي في Instant Gaming
        const smartLink = getSmartAffiliateLink(game.name);
        
        // الزر الآن يفتح رابط الأفيلييت الخاص بك بدلاً من المودال
        // غيرت النص إلى "Check Price" ليكون أكثر إثارة للفضول
        buttonHtml = `<a href="${smartLink}" target="_blank" class="btn-buy">Check Price ↗</a>`;
        
        // ملاحظة: إذا كنت مازلت تريد المودال، يمكنك استرجاعه، لكن الأفضل للربح هو الرابط المباشر
    }

    const discountBadge = game.discount ? `<div class="discount-badge" style="${game.isManual ? 'background:#ffaa00; color:#000;' : ''}">${game.discount}</div>` : '';
    const oldPriceHtml = game.oldPrice ? `<span class="old-price">${game.oldPrice}</span>` : '';

    card.style.cssText = cardBorder;
    card.innerHTML = `
        ${discountBadge}
        <img src="${highQualityImage}" alt="${game.name}" class="card-img" loading="lazy" onerror="this.src='${game.image}'">
        <div class="card-body">
            <h3 class="card-title" title="${game.name}">${game.name}</h3>
            <div class="card-price-row">
                ${oldPriceHtml}
                <span class="price">${game.price}</span>
            </div>
            ${buttonHtml}
        </div>
    `;
    grid.appendChild(card);
}

// ==========================================
// 2. AUTO-FETCH LOGIC
// ==========================================

async function initStore() {
    if (!grid) return;

    // عرض اليدوي
    manualGames.forEach(g => renderGame(g));

    // جلب أسماء المتاجر (احتياطي)
    try {
        const storeRes = await fetch('https://www.cheapshark.com/api/1.0/stores');
        const stores = await storeRes.json();
        stores.forEach(s => {
            storesMap[s.storeID] = { name: s.storeName, icon: `https://www.cheapshark.com${s.images.icon}` };
        });
    } catch(e) {}

    try {
        const separator = document.createElement('div');
        separator.style.cssText = "grid-column: 1 / -1; margin: 30px 0 10px; border-bottom:1px solid #333; color:#666; font-size:12px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;";
        separator.innerText = "Trending Steam Deals (Auto-Updated)";
        grid.appendChild(separator);

        // جلب أفضل التخفيضات
        const res = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1,2,25,27&upperPrice=60&sortBy=Savings&onSale=1&pageSize=100');
        const deals = await res.json();
        const seenTitles = new Set();
        
        deals.forEach(deal => {
            const cleanName = deal.title.toLowerCase().trim();
            const savingsVal = parseFloat(deal.savings);

            // شرط: وجود Steam ID + تخفيض جيد
            const isOnSteam = deal.steamAppID && deal.steamAppID !== "0" && deal.steamAppID !== "null";

            if (!seenTitles.has(cleanName) && savingsVal >= 10 && isOnSteam) {
                seenTitles.add(cleanName);
                
                const discountStr = `-${Math.round(savingsVal)}%`;
                const oldPriceStr = `€${deal.normalPrice}`;

                renderGame({
                    name: deal.title,
                    image: deal.thumb,
                    price: "€" + deal.salePrice, // هذا السعر للعرض فقط
                    oldPrice: oldPriceStr,
                    discount: discountStr,
                    gameID: deal.gameID, 
                    steamAppID: deal.steamAppID, 
                    isManual: false
                });
            }
        });

    } catch (e) { console.error(e); }
}

// ==========================================
// 4. SMART SEARCH SYSTEM (البحث العلوي)
// ==========================================

const searchInput = document.getElementById('store-search-input');
const searchDropdown = document.getElementById('search-results-dropdown');
let searchTimeout = null;

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(searchTimeout);

        if (query.length < 2) {
            searchDropdown.classList.remove('active');
            searchDropdown.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('active');
        }
    });
}

async function performSearch(query) {
    try {
        searchDropdown.innerHTML = '<div style="padding:15px; text-align:center; color:#666; font-size:12px;">Searching...</div>';
        searchDropdown.classList.add('active');

        const res = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}&limit=6`);
        const games = await res.json();

        searchDropdown.innerHTML = ''; 

        if (games.length === 0) {
            searchDropdown.innerHTML = '<div style="padding:15px; text-align:center; color:#ff4444; font-size:12px;">No games found.</div>';
            return;
        }

        games.forEach(game => {
            const item = document.createElement('div');
            item.className = 'search-item';
            
            // عند الضغط على نتيجة البحث، نستخدم الرابط الذكي أيضاً!
            const smartLink = getSmartAffiliateLink(game.external);

            item.onclick = () => {
                // فتح الرابط الربحي في تبويب جديد
                window.open(smartLink, '_blank');
                searchDropdown.classList.remove('active');
                searchInput.value = ''; 
            };

            item.innerHTML = `
                <img src="${game.thumb}" alt="${game.external}">
                <div class="search-item-info">
                    <span class="search-item-title">${game.external}</span>
                    <span class="search-item-price">Check Price ↗</span>
                </div>
            `;
            
            searchDropdown.appendChild(item);
        });

    } catch (e) {
        console.error(e);
        searchDropdown.classList.remove('active');
    }
}

// ==========================================
// Glitch Effect
// ==========================================
const glitchText = document.querySelector('.glitch-text');
if(glitchText) {
    setInterval(() => {
        glitchText.style.textShadow = Math.random() > 0.95 ? '2px 0 red, -2px 0 blue' : 'none';
    }, 100);
}

// بدء التشغيل
initStore();