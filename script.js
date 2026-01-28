// ==========================================
// CONFIGURATION
// ==========================================
const MY_AFFILIATE_ID = '?igr=gamer-1c110ad'; 
let storesMap = {}; // لتخزين أسماء المتاجر (1 = Steam, etc.)

// ==========================================
// 1. الألعاب اليدوية (Instant Gaming) - تبقى كما هي
// ==========================================
const manualGames = [
    {
        name: "Grand Theft Auto V",
        image: "https://gaming-cdn.com/images/products/186/380x218/grand-theft-auto-v-pc-mac-game-rockstar-cover.jpg",
        price: "€14.99", oldPrice: "€29.99", discount: "-50%",
        link: "https://www.instant-gaming.com/en/186-buy-grand-theft-auto-v-pc-mac-game-rockstar/",
        isManual: true // علامة لتمييزها
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
    }
];

// ==========================================
// RENDER FUNCTION
// ==========================================
const grid = document.getElementById('games-grid');

function renderGame(game) {
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'game-card';
    
    // إعداد الرابط والزر
    let buttonHtml = '';
    let cardBorder = '';
    
    if (game.isManual) {
        // الألعاب اليدوية: رابط مباشر
        const finalLink = game.link + MY_AFFILIATE_ID;
        buttonHtml = `<a href="${finalLink}" target="_blank" class="btn-buy" style="background:#ffaa00; color:#000; border-color:#ffaa00;">BEST DEAL ⭐</a>`;
        cardBorder = "border: 1px solid #ffaa00;";
    } else {
        // الألعاب التلقائية: زر يفتح المودال
        // game.gameID هو المفتاح لجلب التفاصيل
        buttonHtml = `<button onclick="openGameModal('${game.gameID}', '${game.name}', '${game.image}')" class="btn-buy">View ${game.dealCount || ''} Deals ↗</button>`;
    }

    const discountBadge = game.discount ? `<div class="discount-badge" style="${game.isManual ? 'background:#ffaa00; color:#000;' : ''}">${game.discount}</div>` : '';
    const oldPriceHtml = game.oldPrice ? `<span class="old-price">${game.oldPrice}</span>` : '';

    card.style.cssText = cardBorder;
    card.innerHTML = `
        ${discountBadge}
        <img src="${game.image}" alt="${game.name}" class="card-img" loading="lazy">
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
// 2. AUTO-FETCH LOGIC (مع حل مشكلة التكرار)
// ==========================================

async function initStore() {
    if (!grid) return;

    // 1. عرض اليدوي أولاً
    manualGames.forEach(g => renderGame(g));

    // 2. جلب أسماء المتاجر (مرة واحدة)
    try {
        const storeRes = await fetch('https://www.cheapshark.com/api/1.0/stores');
        const stores = await storeRes.json();
        stores.forEach(s => {
            storesMap[s.storeID] = { name: s.storeName, icon: `https://www.cheapshark.com${s.images.icon}` };
        });
    } catch(e) {}

    // 3. جلب العروض التلقائية
    try {
        const separator = document.createElement('div');
        separator.style.cssText = "grid-column: 1 / -1; margin: 30px 0 10px; border-bottom:1px solid #333; color:#666; font-size:12px; font-weight:bold; letter-spacing:1px; text-transform:uppercase;";
        separator.innerText = "Trending Deals (All Stores)";
        grid.appendChild(separator);

        // نجلب الكثير لضمان التنوع بعد حذف المكرر
        const res = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1,25,7,2&upperPrice=50&sortBy=Metacritic&pageSize=100');
        const deals = await res.json();

        // **فلترة التكرار**: نستخدم Set لتخزين العناوين التي ظهرت
        const seenTitles = new Set();
        
        deals.forEach(deal => {
            // تنظيف الاسم (إزالة العلامات التجارية الزائدة للمقارنة)
            const cleanName = deal.title.toLowerCase().trim();
            
            if (!seenTitles.has(cleanName)) {
                seenTitles.add(cleanName);
                
                // إضافة اللعبة للقائمة
                renderGame({
                    name: deal.title,
                    image: deal.thumb,
                    price: "€" + deal.salePrice,
                    oldPrice: "€" + deal.normalPrice,
                    discount: "-" + Math.round(deal.savings) + "%",
                    gameID: deal.gameID, // مهم جداً للمودال
                    isManual: false,
                    dealCount: "+" // مجرد شكل جمالي
                });
            }
        });

    } catch (e) { console.error(e); }
}

// ==========================================
// 3. MODAL LOGIC (عرض التفاصيل)
// ==========================================
const modal = document.getElementById('game-modal');
const modalList = document.getElementById('modal-deals-list');

async function openGameModal(gameID, title, image) {
    if(!modal) return;
    
    // تعبئة البيانات الأساسية
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-img').src = image;
    modalList.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">Fetching live prices...</p>';
    
    // إظهار النافذة
    modal.classList.add('active');

    // جلب التفاصيل من API
    try {
        const res = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`);
        const data = await res.json();
        
        modalList.innerHTML = ''; // مسح التحميل

        // ترتيب العروض حسب السعر
        const deals = data.deals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        deals.forEach(deal => {
            const storeInfo = storesMap[deal.storeID] || { name: 'Store', icon: '' };
            const savings = parseFloat(deal.savings) > 0 ? `-${Math.round(deal.savings)}%` : '';
            
            const row = document.createElement('div');
            row.className = 'deal-row';
            row.innerHTML = `
                <div class="store-name">
                    <img src="${storeInfo.icon}" class="store-icon-img" onerror="this.style.display='none'">
                    ${storeInfo.name}
                </div>
                <div class="deal-actions">
                    ${savings ? `<span class="deal-discount">${savings}</span>` : ''}
                    <span class="deal-price">$${deal.price}</span>
                    <a href="https://www.cheapshark.com/redirect?dealID=${deal.dealID}" target="_blank" class="btn-go-deal">GO ↗</a>
                </div>
            `;
            modalList.appendChild(row);
        });

    } catch(e) {
        modalList.innerHTML = '<p style="text-align:center; color:#ff4444;">Failed to load deals.</p>';
    }
}

// إغلاق المودال
if(modal) {
    document.getElementById('close-modal').onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => {
        if(e.target === modal) modal.classList.remove('active');
    };
}

// تشغيل السكريبت
initStore();