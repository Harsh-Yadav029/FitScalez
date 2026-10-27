import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { VisitorAnalytics } from "../models/analytics.model.js";

const recordPageView = asyncHandler(async (req, res) => {
    const { deviceId, path, title, referrer, visitNumber, isReturning, device, location } = req.body;

    if (!deviceId || !path) {
        return res.status(200).json(new ApiResponse(200, null, "Ignored incomplete tracking"));
    }

    const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "";

    const record = await VisitorAnalytics.create({
        deviceId,
        path,
        title: title || "",
        referrer: referrer || "",
        visitNumber: visitNumber || 1,
        isReturning: Boolean(isReturning),
        device: device || null,
        location: location || null,
        ip: clientIp,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, { id: record._id }, "Page view recorded"));
});

const getAnalyticsStats = asyncHandler(async (req, res) => {
    const totalViews = await VisitorAnalytics.countDocuments();
    const uniqueDevices = await VisitorAnalytics.distinct("deviceId");

    // Views in the last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const todayViews = await VisitorAnalytics.countDocuments({ createdAt: { $gte: last24h } });

    // Recent 50 page views
    const recentViews = await VisitorAnalytics.find()
        .sort({ createdAt: -1 })
        .limit(50);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalPageViews: totalViews,
                uniqueVisitors: uniqueDevices.length,
                todayViews,
                recentViews,
            },
            "Analytics statistics fetched successfully"
        )
    );
});

export { recordPageView, getAnalyticsStats };
