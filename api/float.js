// الملف: api/float.js
// هذا الكود يعمل كوسيط (Proxy) لتخطي حماية CORS

export default async function handler(request, response) {
    // 1. السماح للإضافة بالاتصال بهذا الرابط (CORS Headers)
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // التعامل مع طلبات التحقق (Preflight)
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    // 2. استلام رابط الفحص من الإضافة
    const { url } = request.query;

    if (!url) {
        return response.status(400).json({ error: 'Missing url parameter' });
    }

    try {
        // 3. السيرفر يطلب البيانات من CSGOFloat (السيرفرات لا تواجه مشكلة CORS)
        // ملاحظة: نقوم بترميز الرابط لضمان وصوله بشكل صحيح
        const targetUrl = `https://api.csgofloat.com/?url=${encodeURIComponent(url)}`;
        
        const apiRes = await fetch(targetUrl);
        
        if (!apiRes.ok) {
            throw new Error(`CSGOFloat API responded with ${apiRes.status}`);
        }

        const data = await apiRes.json();

        // 4. إرسال البيانات النظيفة إلى الإضافة
        return response.status(200).json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        return response.status(500).json({ error: 'Failed to fetch float data', details: error.message });
    }
}
