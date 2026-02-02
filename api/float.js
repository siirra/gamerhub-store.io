export default async function handler(request, response) {
    // إعدادات السماح (CORS)
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') return response.status(200).end();

    const { url } = request.query;

    // 1. التحقق من وجود الرابط
    if (!url) {
        return response.status(400).json({ error: 'No URL provided' });
    }

    try {
        // 2. طلب البيانات من CSGOFloat
        const targetUrl = `https://api.csgofloat.com/?url=${encodeURIComponent(url)}`;
        const apiRes = await fetch(targetUrl);

        // 3. قراءة رد CSGOFloat
        const data = await apiRes.json();

        // 4. تمرير حالة الرد كما هي (إذا كانت 200 أو 429 أو غيرها)
        return response.status(apiRes.status).json(data);

    } catch (error) {
        // خطأ حقيقي في السيرفر (مثل انقطاع النت)
        return response.status(500).json({ 
            error: 'Server Error', 
            details: error.message 
        });
    }
}
