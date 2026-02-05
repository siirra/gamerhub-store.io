export default function handler(req, res) {
  const { storeId, dealID } = req.query;

  // قاعدة بيانات الروابط الخاصة بك
  // المفتاح هو رقم المتجر في CheapShark
  const affiliateLinks = {
    "1": "https://store.steampowered.com/?ref=YOUR_STEAM_ID",       // Steam (غالباً لا يوجد أفلييت مباشر، يمكنك وضع صفحة الكيوريتور)
    "2": "https://www.gamersgate.com/?aff=YOUR_GAMERSGATE_ID",      // GamersGate
    "3": "https://www.greenmangaming.com/?tap_a=YOUR_GMG_ID",       // GreenManGaming
    "7": "https://www.gog.com/?pp=YOUR_GOG_ID",                     // GOG
    "11": "https://www.humblebundle.com/?partner=YOUR_HUMBLE_ID",   // Humble Store
    "13": "https://store.ubisoft.com/?ref=YOUR_UBISOFT_ID",         // Ubisoft Store
    "15": "https://www.fanatical.com/?ref=YOUR_FANATICAL_ID",       // Fanatical
    "21": "https://www.wingamestore.com/?aff=YOUR_WGS_ID",          // WinGameStore
    "23": "https://www.gamebillet.com/?aff=YOUR_GAMEBILLET_ID",     // GameBillet
    "25": "https://store.epicgames.com/?epic_creator_id=YOUR_EPIC_CODE", // Epic Games
    "27": "https://us.gamesplanet.com/?ref=YOUR_GAMESPLANET_ID",    // Gamesplanet (انتبه للدولة US/UK/DE)
    "29": "https://www.gamesload.com/?aff=YOUR_GAMESLOAD_ID",       // Gamesload
    "30": "https://2game.com/?ref=YOUR_2GAME_ID",                   // 2Game
    "32": "https://www.indiegala.com/?ref=YOUR_INDIEGALA_ID",       // IndieGala
    "35": "https://www.dreamgame.com/?aff=YOUR_DREAMGAME_ID"        // DreamGame
  };

  // هل المتجر موجود في قائمتك؟
  if (affiliateLinks[storeId]) {
    return res.redirect(307, affiliateLinks[storeId]);
  }

  // إذا لم يكن موجوداً، أو إذا فشل الرابط، استخدم CheapShark كاحتياط
  if (dealID) {
    return res.redirect(307, `https://www.cheapshark.com/redirect?dealID=${dealID}`);
  }

  // ملاذ أخير
  return res.redirect(307, "https://www.google.com");
}
