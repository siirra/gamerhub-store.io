import requests
import json
import time

# ==========================================
# 1. إعدادات المتجر (قائمة ألعابك)
# ==========================================
# هنا نضع أرقام الألعاب (App ID) التي تريد بيعها + رابط الربح الخاص بك
MY_CATALOG = [
    {
        "id": 1245620,  # Elden Ring
        "affiliate_link": "https://www.instant-gaming.com/en/games/elden-ring/?igr=GAMERHUB"
    },
    {
        "id": 2358720,  # Black Myth: Wukong
        "affiliate_link": "https://www.cdkeys.com/black-myth-wukong?partner=GAMERHUB"
    },
    {
        "id": 271590,   # GTA V
        "affiliate_link": "https://www.g2a.com/gta-v?ref=GAMERHUB"
    },
    {
        "id": 1174180,  # Red Dead Redemption 2
        "affiliate_link": "https://www.instant-gaming.com/rdr2/?igr=GAMERHUB"
    },
    {
        "id": 730,      # CS2 Prime (Counter-Strike)
        "affiliate_link": "https://www.g2a.com/cs2-prime?ref=GAMERHUB"
    }
]

def fetch_game_data(game_config):
    """جلب بيانات لعبة واحدة ودمجها مع رابط الربح"""
    app_id = game_config['id']
    url = f"https://store.steampowered.com/api/appdetails?appids={app_id}&cc=us"
    
    try:
        print(f"🔄 Scanning App ID: {app_id}...")
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = response.json()
        
        if data[str(app_id)]['success']:
            details = data[str(app_id)]['data']
            
            # التعامل مع الأسعار (إذا كانت مجانية أو مدفوعة)
            if details['is_free']:
                price = 0
                old_price = 0
            elif 'price_overview' in details:
                price = details['price_overview']['final'] / 100
                old_price = details['price_overview']['initial'] / 100
            else:
                return None # تخطي إذا لم يوجد سعر

            return {
                "id": app_id,
                "name": details['name'],
                "image": details['header_image'],
                "price": price,           # السعر الحالي
                "oldPrice": old_price,    # السعر الأصلي
                "discount": details.get('price_overview', {}).get('discount_percent', 0),
                "link": game_config['affiliate_link'] # رابط الربح الخاص بك
            }
        
    except Exception as e:
        print(f"❌ Error fetching {app_id}: {e}")
        return None

def main():
    print("--- 🚀 STARTING BULK SCAN ---")
    final_database = []
    
    for game in MY_CATALOG:
        result = fetch_game_data(game)
        if result:
            final_database.append(result)
            print(f"✅ Found: {result['name']} (${result['price']})")
        
        # ننتظر ثانية واحدة بين كل طلب حتى لا يحظرنا ستيم
        time.sleep(1)

    # حفظ البيانات في ملف JSON
    with open('games.json', 'w', encoding='utf-8') as f:
        json.dump(final_database, f, indent=4, ensure_ascii=False)
        
    print("\n--- ✨ DATABASE UPDATED SUCCESSFULLY ---")
    print(f"Saved {len(final_database)} games to 'games.json'")

if __name__ == "__main__":
    main()