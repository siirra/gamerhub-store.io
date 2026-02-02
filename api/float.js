export default async function handler(request, response) {
    // إعدادات السماح (CORS)
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') return response.status(200).end();

    const { url } = request.query;

    if (!url) {
        return response.status(400).json({ error: 'No URL provided' });
    }

    try {
        const targetUrl = `https://api.csgofloat.com/?url=${encodeURIComponent(url)}`;
        const apiRes = await fetch(targetUrl);

        // --- التعديل الجذري هنا: التحقق من نوع الرد قبل قراءته ---
        const contentType = apiRes.headers.get("content-type");
        let data;

        if (contentType && contentType.includes("application/json")) {
            data = await apiRes.json();
        } else {
            // في حالة الخطأ 429 أو غيره، قد يكون الرد نصاً وليس JSON
            const textBody = await apiRes.text();
            data = { error: "Upstream Error", details: textBody };
        }

        // إرجاع حالة الرد كما هي (سواء 200 أو 429) للإضافة
        return response.status(apiRes.status).json(data);

    } catch (error) {
        return response.status(500).json({ 
            error: 'Proxy Internal Error', 
            details: error.message 
        });
    }
}
