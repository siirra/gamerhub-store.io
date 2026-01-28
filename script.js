// معرف الأفيلييت الخاص بك
const MY_AFFILIATE_ID = '?igr=gamer-1c110ad';

// قائمة الألعاب (ضع الروابط العادية المباشرة للعبة هنا)
const games = [
    {
        name: "Grand Theft Auto V",
        image: "https://gaming-cdn.com/images/products/186/380x218/grand-theft-auto-v-pc-mac-game-rockstar-cover.jpg",
        price: "€14.99", // العملة حسب الجمهور المستهدف
        oldPrice: "€29.99",
        discount: "-50%",
        // ضع رابط اللعبة المباشر فقط، الكود سيضيف معرفك
        link: "https://www.instant-gaming.com/en/186-buy-grand-theft-auto-v-pc-mac-game-rockstar/" 
    },
    {
        name: "Elden Ring",
        image: "https://gaming-cdn.com/images/products/4824/380x218/elden-ring-pc-game-steam-europe-cover.jpg",
        price: "€35.99",
        oldPrice: "€59.99",
        discount: "-40%",
        link: "https://www.instant-gaming.com/en/4824-buy-elden-ring-pc-game-steam-europe/"
    },
    {
        name: "FIFA 25 (FC 25)",
        image: "https://gaming-cdn.com/images/products/16286/380x218/ea-sports-fc-25-pc-game-ea-app-cover.jpg", 
        price: "€45.99",
        oldPrice: "€69.99",
        discount: "-34%",
        link: "https://www.instant-gaming.com/en/16286-buy-ea-sports-fc-25-pc-game-ea-app/"
    },
    {
        name: "Minecraft Java & Bedrock",
        image: "https://gaming-cdn.com/images/products/3339/380x218/minecraft-java-bedrock-edition-pc-game-cover.jpg",
        price: "€18.99",
        oldPrice: "€29.99",
        discount: "-33%",
        link: "https://www.instant-gaming.com/en/3339-buy-minecraft-java-bedrock-edition-pc-game/"
    }
];

const grid = document.getElementById('games-grid');

games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    // 👇👇 السحر هنا: دمج الرابط مع معرفك تلقائياً
    const affiliateLink = game.link + MY_AFFILIATE_ID;
    
    const oldPriceHtml = game.oldPrice ? `<span class="old-price">${game.oldPrice}</span>` : '';

    card.innerHTML = `
        <div class="discount-badge">${game.discount}</div>
        <img src="${game.image}" alt="${game.name}" class="card-img">
        <div class="card-body">
            <h3 class="card-title">${game.name}</h3>
            <div class="card-price-row">
                ${oldPriceHtml}
                <span class="price">${game.price}</span>
            </div>
            <a href="${affiliateLink}" target="_blank" class="btn-buy">Buy Now 🛒</a>
        </div>
    `;
    
    grid.appendChild(card);
});

// تأثير النص
const glitchText = document.querySelector('.glitch-text');
if(glitchText) {
    setInterval(() => {
        glitchText.style.textShadow = Math.random() > 0.9 ? '2px 0 red, -2px 0 blue' : 'none';
    }, 100);
}