// Lightweight client-side telemetry hook for Fitscalez MERN app
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const STORAGE_KEYS = {
    DEVICE_ID: "fitscalez_device_id",
    VISIT_COUNT: "fitscalez_visit_count",
    JOURNEY: "fitscalez_journey",
    GEO: "fitscalez_geo",
};

// Generate or retrieve persistent pseudo-anonymous device ID
export function getOrCreateDeviceId() {
    try {
        let id = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
        if (!id) {
            id = "DEV-" + Math.random().toString(16).substring(2, 6).toUpperCase() + "-" + Date.now().toString(16).slice(-4).toUpperCase();
            localStorage.setItem(STORAGE_KEYS.DEVICE_ID, id);
        }
        return id;
    } catch {
        return "DEV-ANON";
    }
}

// Get device specifications
export function getDeviceSpecs() {
    if (typeof window === "undefined") return {};
    const ua = navigator.userAgent || "";
    let os = "Desktop";
    if (/android/i.test(ua)) os = "Android";
    else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
    else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
    else if (/windows/i.test(ua)) os = "Windows";
    else if (/linux/i.test(ua)) os = "Linux";

    let browser = "Browser";
    if (/chrome|crios/i.test(ua) && !/edge|edg|opr/i.test(ua)) browser = "Chrome";
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari";
    else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
    else if (/edg/i.test(ua)) browser = "Edge";

    const isMobile = window.innerWidth <= 768;

    return {
        type: isMobile ? "Mobile" : "Desktop",
        os,
        browser,
        screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    };
}

// Get cached or fresh approximate geolocation
export async function getGeoContext() {
    try {
        const cached = localStorage.getItem(STORAGE_KEYS.GEO);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
                return parsed.data;
            }
        }

        const res = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(3000) });
        const data = await res.json();
        if (data && data.success) {
            const geo = {
                ip: data.ip,
                city: data.city,
                region: data.region,
                country: data.country,
                flag: data.country_code,
                isp: data.connection?.isp || "",
                lat: data.latitude,
                lon: data.longitude,
            };
            localStorage.setItem(STORAGE_KEYS.GEO, JSON.stringify({ timestamp: Date.now(), data: geo }));
            return geo;
        }
    } catch {
        // Fallback silently if offline or blocked
    }
    return null;
}

// Track page view and send to MongoDB backend
export async function trackPageView(path, title) {
    try {
        const deviceId = getOrCreateDeviceId();
        const visitCount = parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || "0", 10) + 1;
        localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, visitCount.toString());

        // Update journey in localStorage
        let journey = [];
        try {
            journey = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOURNEY) || "[]");
        } catch {
            journey = [];
        }
        if (!journey.includes(path)) {
            journey.push(path);
            if (journey.length > 10) journey = journey.slice(-10);
            localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(journey));
        }

        const device = getDeviceSpecs();
        const location = await getGeoContext();

        // Send to MongoDB backend in non-blocking fashion
        fetch(`${API_BASE}/analytics/track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                deviceId,
                path,
                title: title || document.title,
                referrer: document.referrer || "",
                visitNumber: visitCount,
                isReturning: visitCount > 1,
                device,
                location,
            }),
        }).catch(() => {});
    } catch {
        // Never crash user experience
    }
}

// Get rich telemetry packet to attach when user submits Contact/Lead form
export async function getLeadTelemetryContext() {
    try {
        const deviceId = getOrCreateDeviceId();
        const visitCount = parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || "1", 10);
        const device = getDeviceSpecs();
        const location = await getGeoContext();
        let journey = [];
        try {
            journey = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOURNEY) || "[]");
        } catch {}

        return {
            deviceId,
            visitCount,
            isReturning: visitCount > 1,
            device,
            location,
            journey,
        };
    } catch {
        return {};
    }
}
