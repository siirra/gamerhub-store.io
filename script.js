// ==========================================
// CONFIGURATION
// ==========================================
const MY_AFFILIATE_ID = '?igr=gamer-1c110ad'; 
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
// RENDER FUNCTION
// ==========================================
const grid = document.getElementById('games-grid');

function renderGame(game) {
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'game-card';
    
    // منطق الصور عالية الجودة
    let highQualityImage = game.image;
    if (!game.isManual && game.steamAppID && game.steamAppID !== "null" && game.steamAppID !== "0") {
        highQualityImage = `https://cdn.akamai.steamstatic.com/steam/apps/${game.steamAppID}/header.jpg`;
    }

    // إعداد الرابط والزر
    let buttonHtml = '';
    let cardBorder = '';
    
    if (game.isManual) {
        const finalLink = game.link + MY_AFFILIATE_ID;
        buttonHtml = `<a href="${finalLink}" target="_blank" class="btn-buy" style="background:#ffaa00; color:#000; border-color:#ffaa00;">BEST DEAL ⭐</a>`;
        cardBorder = "border: 1px solid #ffaa00;";
    } else {
        const safeName = game.name.replace(/'/g, "\\'");
        buttonHtml = `<button onclick="openGameModal('${game.gameID}', '${safeName}', '${highQualityImage}')" class="btn-buy">View Deals ↗</button>`;
    }

    // شارة التخفيض (فوق الصورة)
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
// 2. AUTO-FETCH LOGIC (مع فلتر Steam فقط)
// ==========================================

async function initStore() {
    if (!grid) return;

    manualGames.forEach(g => renderGame(g));

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

            // ================================================================
            // 👇👇 الفلتر الجديد: شرط وجود Steam App ID 👇👇
            // ================================================================
            const isOnSteam = deal.steamAppID && deal.steamAppID !== "0" && deal.steamAppID !== "null";

            // الشروط: 
            // 1. لم تظهر من قبل
            // 2. التخفيض أكثر من 10%
            // 3. اللعبة موجودة على ستيم (isOnSteam)
            if (!seenTitles.has(cleanName) && savingsVal >= 10 && isOnSteam) {
                seenTitles.add(cleanName);
                
                const discountStr = `-${Math.round(savingsVal)}%`;
                const oldPriceStr = `€${deal.normalPrice}`;

                renderGame({
                    name: deal.title,
                    image: deal.thumb,
                    price: "€" + deal.salePrice,
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
// 3. MODAL LOGIC
// ==========================================
const modal = document.getElementById('game-modal');
const modalList = document.getElementById('modal-deals-list');

async function openGameModal(gameID, title, image) {
    if(!modal) return;
    
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-img').src = image; 
    modalList.innerHTML = '<p style="text-align:center; color:#888; padding:20px;">Fetching live prices...</p>';
    
    modal.classList.add('active');

    try {
        const res = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`);
        const data = await res.json();
        
        modalList.innerHTML = ''; 

        const deals = data.deals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        deals.forEach(deal => {
            const storeInfo = storesMap[deal.storeID] || { name: 'Store', icon: '' };
            const savingsVal = parseFloat(deal.savings);
            const savingsStr = savingsVal > 0 ? `-${Math.round(savingsVal)}%` : '';

            const row = document.createElement('div');
            row.className = 'deal-row';
            row.innerHTML = `
                <div class="store-name">
                    <img src="${storeInfo.icon}" class="store-icon-img" onerror="this.style.display='none'">
                    ${storeInfo.name}
                </div>
                <div class="deal-actions">
                    ${savingsStr ? `<span class="deal-discount">${savingsStr}</span>` : ''}
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

if(modal) {
    document.getElementById('close-modal').onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => {
        if(e.target === modal) modal.classList.remove('active');
    };
}

const glitchText = document.querySelector('.glitch-text');
if(glitchText) {
    setInterval(() => {
        glitchText.style.textShadow = Math.random() > 0.95 ? '2px 0 red, -2px 0 blue' : 'none';
    }, 100);
}
// ==========================================
// 4. SMART SEARCH SYSTEM (نظام البحث الذكي)
// ==========================================

const searchInput = document.getElementById('store-search-input');
const searchDropdown = document.getElementById('search-results-dropdown');
let searchTimeout = null;

if (searchInput) {
    // الاستماع للكتابة
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        // تنظيف المؤقت السابق (Debounce) لمنع الطلبات الكثيرة
        clearTimeout(searchTimeout);

        if (query.length < 2) {
            searchDropdown.classList.remove('active');
            searchDropdown.innerHTML = '';
            return;
        }

        // انتظار 300 ميلي ثانية بعد توقف الكتابة قبل البحث
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    // إخفاء القائمة عند الضغط خارجها
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('active');
        }
    });
}

async function performSearch(query) {
    try {
        // عرض حالة التحميل
        searchDropdown.innerHTML = '<div style="padding:15px; text-align:center; color:#666; font-size:12px;">Searching...</div>';
        searchDropdown.classList.add('active');

        // جلب البيانات من API
        const res = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${query}&limit=6`);
        const games = await res.json();

        searchDropdown.innerHTML = ''; // مسح التحميل

        if (games.length === 0) {
            searchDropdown.innerHTML = '<div style="padding:15px; text-align:center; color:#ff4444; font-size:12px;">No games found.</div>';
            return;
        }

        // عرض النتائج
        games.forEach(game => {
            const item = document.createElement('div');
            item.className = 'search-item';
            
            // تنظيف الاسم لاستخدامه في الدالة
            const safeName = game.external.replace(/'/g, "\\'");
            
            // عند الضغط، نفتح المودال ونخفي القائمة
            item.onclick = () => {
                openGameModal(game.gameID, safeName, game.thumb);
                searchDropdown.classList.remove('active');
                searchInput.value = ''; // تفريغ الحقل
            };

            item.innerHTML = `
                <img src="${game.thumb}" alt="${game.external}">
                <div class="search-item-info">
                    <span class="search-item-title">${game.external}</span>
                    <span class="search-item-price">Best: $${game.cheapest}</span>
                </div>
            `;
            
            searchDropdown.appendChild(item);
        });

    } catch (e) {
        console.error(e);
        searchDropdown.classList.remove('active');
    }
}

initStore();