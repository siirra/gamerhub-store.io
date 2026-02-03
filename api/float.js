// api/float.js
export default async function handler(req, res) {
    const { url } = req.query;

    // السماح للإضافة بالوصول للسيرفر (CORS) - مهم جداً
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // التعامل مع طلبات OPTIONS (Preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // نطلب البيانات من CSFloat عبر سيرفر Vercel (IP نظيف)
        const csfloatUrl = `https://api.csfloat.com/api/v1/inspect?url=${encodeURIComponent(url)}`;
        
        const response = await fetch(csfloatUrl, {
            headers: {
                // نستخدم User-Agent لمتصفح حقيقي لتجنب الحظر
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            // إذا فشل الطلب، نرسل رمز الخطأ
            return res.status(response.status).json({ error: 'CSFloat API Blocked/Error' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
