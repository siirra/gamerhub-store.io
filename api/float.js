export default async function handler(request, response) {
    // 1. إعدادات السماح (CORS) - ضرورية للإضافة
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // التعامل مع طلبات المتصفح الأولية
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    const { url } = request.query;

    if (!url) {
        return response.status(400).json({ error: 'No URL provided' });
    }

    try {
        // 2. طلب البيانات من CSGOFloat
        const targetUrl = `https://api.csgofloat.com/?url=${encodeURIComponent(url)}`;
        const apiRes = await fetch(targetUrl);

        // 3. التحقق الذكي من نوع الرد (الحل الجذري للخطأ 500)
        const contentType = apiRes.headers.get("content-type");
        let data;

        if (contentType && contentType.includes("application/json")) {
            // إذا كان الرد JSON (بيانات صحيحة)
            data = await apiRes.json();
        } else {
            // إذا كان الرد نصاً (مثل رسالة خطأ أو حظر مؤقت)
            const textBody = await apiRes.text();
            data = { error: "Upstream Error", details: textBody };
        }

        // 4. إرسال الحالة الحقيقية للإضافة (200 أو 429) بدلاً من الانهيار
        return response.status(apiRes.status).json(data);

    } catch (error) {
        // خطأ حقيقي في السيرفر
        console.error("Proxy Error:", error);
        return response.status(500).json({ 
            error: 'Proxy Internal Error', 
            details: error.message 
        });
    }
}
