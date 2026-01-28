// قائمة الألعاب التي تريد بيعها (يمكنك إضافة المئات هنا)
const games = [
    {
        name: "Grand Theft Auto V",
        image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
        price: "$14.99",
        oldPrice: "$59.99",
        discount: "-75%",
        // 👇👇 ضع هنا رابط الأفيلييت الخاص بك (مثلاً من G2A أو Instant Gaming)
        link: "https://www.g2a.com/r/YOUR_REF_LINK_HERE" 
    },
    {
        name: "Elden Ring",
        image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_Art.jpg",
        price: "$39.99",
        oldPrice: "$59.99",
        discount: "-30%",
        link: "https://www.instant-gaming.com/en/?igr=YOUR_REF_LINK"
    },
    {
        name: "FIFA 26 (Pre-order)",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Video_Game_Controller_Icon_S.svg", // ضع صورة فيفا هنا
        price: "$69.99",
        oldPrice: "",
        discount: "HOT",
        link: "#"
    },
    {
        name: "Minecraft Java & Bedrock",
        image: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
        price: "$19.99",
        oldPrice: "$29.99",
        discount: "-33%",
        link: "#"
    },
    {
        name: "Cyberpunk 2077",
        image: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
        price: "$29.99",
        oldPrice: "$59.99",
        discount: "-50%",
        link: "#"
    },
    // ... يمكنك نسخ وتكرار هذا الجزء لإضافة المزيد من الألعاب
];

// دالة لعرض الألعاب في الموقع
const grid = document.getElementById('games-grid');

games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    // التحقق مما إذا كان هناك سعر قديم
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
            <a href="${game.link}" target="_blank" class="btn-buy">Buy Now 🛒</a>
        </div>
    `;
    
    grid.appendChild(card);
});

// تأثير بسيط للنص (Glitch Effect)
const glitchText = document.querySelector('.glitch-text');
setInterval(() => {
    glitchText.style.textShadow = Math.random() > 0.9 ? '2px 0 red, -2px 0 blue' : 'none';
}, 100);