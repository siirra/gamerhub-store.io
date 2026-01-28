// ==========================================
// CONFIGURATION
// ==========================================
const MY_AFFILIATE_ID = '?igr=gamer-1c110ad'; // معرفك

// ==========================================
// GAME LIBRARY (MASSIVE COLLECTION)
// ==========================================
const games = [
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
    },
    {
        name: "Minecraft Java & Bedrock",
        image: "https://gaming-cdn.com/images/products/3339/380x218/minecraft-java-bedrock-edition-pc-game-cover.jpg",
        price: "€18.99", oldPrice: "€29.99", discount: "-33%",
        link: "https://www.instant-gaming.com/en/3339-buy-minecraft-java-bedrock-edition-pc-game/"
    },
    {
        name: "Call of Duty: Modern Warfare III",
        image: "https://gaming-cdn.com/images/products/9634/380x218/call-of-duty-modern-warfare-iii-cross-gen-bundle-xbox-one-xbox-series-x-s-xbox-one-xbox-series-x-s-game-microsoft-store-europe-cover.jpg",
        price: "€49.99", oldPrice: "€79.99", discount: "-38%",
        link: "https://www.instant-gaming.com/en/9634-buy-call-of-duty-modern-warfare-iii-cross-gen-bundle-xbox-one-xbox-series-x-s-microsoft-store/"
    },
    {
        name: "Red Dead Redemption 2",
        image: "https://gaming-cdn.com/images/products/3159/380x218/red-dead-redemption-2-pc-game-rockstar-cover.jpg",
        price: "€19.89", oldPrice: "€59.99", discount: "-67%",
        link: "https://www.instant-gaming.com/en/3159-buy-red-dead-redemption-2-pc-game-rockstar/"
    },
    {
        name: "God of War Ragnarök",
        image: "https://gaming-cdn.com/images/products/9228/380x218/god-of-war-ragnarok-pc-game-steam-cover.jpg",
        price: "€38.99", oldPrice: "€59.99", discount: "-35%",
        link: "https://www.instant-gaming.com/en/9228-buy-god-of-war-ragnarok-pc-game-steam/"
    },
    {
        name: "Hogwarts Legacy",
        image: "https://gaming-cdn.com/images/products/7073/380x218/hogwarts-legacy-pc-game-steam-cover.jpg",
        price: "€22.49", oldPrice: "€59.99", discount: "-63%",
        link: "https://www.instant-gaming.com/en/7073-buy-hogwarts-legacy-pc-game-steam/"
    },
    {
        name: "Cyberpunk 2077: Ultimate",
        image: "https://gaming-cdn.com/images/products/15320/380x218/cyberpunk-2077-ultimate-edition-xbox-series-x-s-xbox-series-x-s-game-microsoft-store-cover.jpg",
        price: "€32.99", oldPrice: "€79.99", discount: "-59%",
        link: "https://www.instant-gaming.com/en/15320-buy-cyberpunk-2077-ultimate-edition-xbox-series-x-s-microsoft-store/"
    },
    {
        name: "Spider-Man Remastered",
        image: "https://gaming-cdn.com/images/products/12061/380x218/marvel-s-spider-man-remastered-pc-game-steam-cover.jpg",
        price: "€28.99", oldPrice: "€59.99", discount: "-52%",
        link: "https://www.instant-gaming.com/en/12061-buy-marvel-s-spider-man-remastered-pc-game-steam/"
    },
    {
        name: "The Last of Us Part I",
        image: "https://gaming-cdn.com/images/products/9226/380x218/the-last-of-us-part-i-pc-game-steam-cover.jpg",
        price: "€31.49", oldPrice: "€59.99", discount: "-48%",
        link: "https://www.instant-gaming.com/en/9226-buy-the-last-of-us-part-i-pc-game-steam/"
    },
    {
        name: "Forza Horizon 5",
        image: "https://gaming-cdn.com/images/products/8824/380x218/forza-horizon-5-pc-xbox-one-xbox-series-x-s-pc-xbox-one-xbox-series-x-s-game-microsoft-store-cover.jpg",
        price: "€26.99", oldPrice: "€59.99", discount: "-55%",
        link: "https://www.instant-gaming.com/en/8824-buy-forza-horizon-5-pc-xbox-one-xbox-series-x-s-microsoft-store/"
    },
    {
        name: "Resident Evil 4 Remake",
        image: "https://gaming-cdn.com/images/products/11977/380x218/resident-evil-4-pc-game-steam-cover.jpg",
        price: "€24.99", oldPrice: "€39.99", discount: "-38%",
        link: "https://www.instant-gaming.com/en/11977-buy-resident-evil-4-pc-game-steam/"
    },
    {
        name: "Assetto Corsa Ultimate",
        image: "https://gaming-cdn.com/images/products/2569/380x218/assetto-corsa-ultimate-edition-ultimate-edition-pc-game-steam-cover.jpg",
        price: "€6.99", oldPrice: "€39.99", discount: "-83%",
        link: "https://www.instant-gaming.com/en/2569-buy-assetto-corsa-ultimate-edition-ultimate-edition-pc-game-steam/"
    },
    {
        name: "Ready or Not",
        image: "https://gaming-cdn.com/images/products/6007/380x218/ready-or-not-pc-game-steam-cover.jpg",
        price: "€23.99", oldPrice: "€49.99", discount: "-52%",
        link: "https://www.instant-gaming.com/en/6007-buy-ready-or-not-pc-game-steam/"
    },
    {
        name: "Sea of Thieves 2024",
        image: "https://gaming-cdn.com/images/products/2199/380x218/sea-of-thieves-2024-edition-2024-edition-pc-xbox-one-xbox-series-x-s-game-microsoft-store-cover.jpg",
        price: "€18.99", oldPrice: "€39.99", discount: "-53%",
        link: "https://www.instant-gaming.com/en/2199-buy-sea-of-thieves-2024-edition-2024-edition-pc-xbox-one-xbox-series-x-s-microsoft-store/"
    },
    {
        name: "No Man's Sky",
        image: "https://gaming-cdn.com/images/products/430/380x218/no-man-s-sky-pc-game-steam-cover.jpg",
        price: "€19.49", oldPrice: "€58.99", discount: "-67%",
        link: "https://www.instant-gaming.com/en/430-buy-no-man-s-sky-pc-game-steam/"
    },
    {
        name: "DayZ",
        image: "https://gaming-cdn.com/images/products/434/380x218/dayz-pc-game-steam-cover.jpg",
        price: "€22.99", oldPrice: "€49.99", discount: "-54%",
        link: "https://www.instant-gaming.com/en/434-buy-dayz-pc-game-steam/"
    },
    {
        name: "Rust",
        image: "https://gaming-cdn.com/images/products/314/380x218/rust-pc-game-steam-cover.jpg",
        price: "€26.99", oldPrice: "€39.99", discount: "-33%",
        link: "https://www.instant-gaming.com/en/314-buy-rust-pc-game-steam/"
    },
    {
        name: "Black Myth: Wukong",
        image: "https://gaming-cdn.com/images/products/12674/380x218/black-myth-wukong-pc-game-steam-cover.jpg",
        price: "€53.99", oldPrice: "€59.99", discount: "-10%",
        link: "https://www.instant-gaming.com/en/12674-buy-black-myth-wukong-pc-game-steam/"
    }
];

// ==========================================
// RENDER LOGIC
// ==========================================
const grid = document.getElementById('games-grid');

games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    // دمج رابط الأفيلييت
    const affiliateLink = game.link + MY_AFFILIATE_ID;
    
    const oldPriceHtml = game.oldPrice ? `<span class="old-price">${game.oldPrice}</span>` : '';

    card.innerHTML = `
        <div class="discount-badge">${game.discount}</div>
        <img src="${game.image}" alt="${game.name}" class="card-img" loading="lazy">
        <div class="card-body">
            <h3 class="card-title" title="${game.name}">${game.name}</h3>
            <div class="card-price-row">
                ${oldPriceHtml}
                <span class="price">${game.price}</span>
            </div>
            <a href="${affiliateLink}" target="_blank" class="btn-buy">Buy Now 🛒</a>
        </div>
    `;
    
    grid.appendChild(card);
});

// Glitch Effect for Title
const glitchText = document.querySelector('.glitch-text');
if(glitchText) {
    setInterval(() => {
        glitchText.style.textShadow = Math.random() > 0.95 ? '2px 0 red, -2px 0 blue' : 'none';
    }, 100);
}
